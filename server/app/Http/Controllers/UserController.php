<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Cart;
use App\Models\Favorite;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use App\Models\ActivityLog;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', [
            'except' => [

            ]
        ]);
    }

    public function userUpdate()
    {
        $error = [];
        $user = auth()->user();

        $fullname = request('fullname');
        $phone = request('phone');
        $gender = request('gender');
        $address = request('address');

        if (empty($fullname) || empty($gender) || empty($address) || empty($phone)) {
            $msg = new \stdClass();
            $msg->en = "All fields are required!";
            $msg->vi = "Tất cả các trường đều bắt buộc!";
            array_push($error, $msg);
        } else {
            if ($user->role == "admin") {
                $msg = new \stdClass();
                $msg->en = "Admin account cannot edit profile!";
                $msg->vi = "Tài khoản quản trị không thể chỉnh sửa hồ sơ!";
                array_push($error, $msg);
            } else {
                $regexFullname = "/^(?! )[a-zA-Z\s\u{0080}-\u{FFFF}]{2,50}(?<! )$/u";
                $regexPhone = "/^0[9|8|1|7|3|5]([-. ]?[0-9]{7,9})$/";

                if (!preg_match($regexFullname, $fullname)) {
                    $msg = new \stdClass();
                    $msg->en = "The name must be from 2 to 50 characters long. Numbers and special characters are not allowed.";
                    $msg->vi = "Tên phải dài từ 2 đến 50 ký tự. Không được phép sử dụng số và ký tự đặc biệt.";
                    array_push($error, $msg);
                }

                if (!preg_match($regexPhone, $phone)) {
                    $msg = new \stdClass();
                    $msg->en = "Invalid phone number format. It must start with 09, 08, 01, 07, 03, or 05 and be followed by 7 to 9 digits.";
                    $msg->vi = "Định dạng số điện thoại không hợp lệ. Số phải bắt đầu bằng 09, 08, 01, 07, 03 hoặc 05 và theo sau là 7 đến 9 chữ số.";
                    array_push($error, $msg);
                } else {
                    if ($phone != $user->phone) {
                        $checkPhone = User::where('phone', $phone)->first();
                        if ($checkPhone) {
                            $msg = new \stdClass();
                            $msg->en = "Phone number already exists.";
                            $msg->vi = "Số điện thoại đã tồn tại.";
                            array_push($error, $msg);
                        }
                    }
                }
            }
        }

        if (count($error) > 0) {
            return response()->json([
                'success' => false,
                'message' => $error
            ], 400);
        } else {
            User::where('id', $user->id)->update([
                'fullname' => $fullname,
                'phone' => $phone,
                'gender' => $gender,
                'address' => $address
            ]);

            //ghi lại hoạt động
            ActivityLog::create([
                'user_id' => $user->id,
                'activity_type' => 'profile_update',
                'description' => 'User updated their profile.'
            ]);

            $msg = new \stdClass();
            $msg->vi = "Cập nhật hồ sơ thành công!";
            $msg->en = "Update profile successfully!";

            return response()->json([
                'success' => true,
                'message' => [$msg]
            ]);
        }
    }

    public function addToCart($id)
    {
        $user = auth()->user();

        $find = Cart::where("product_id", $id)
            ->where("user_id", $user->id)
            ->first();

        if ($find) {
            Cart::where("product_id", $id)
                ->update([
                    "quantity" => $find->quantity + 1
                ]);
        } else {
            $cart = new Cart();
            $cart->user_id = $user->id;
            $cart->product_id = $id;
            $cart->quantity = 1;
            $cart->save();
        }

        $carts = DB::table('carts')
            ->join("products", "product_id", "=", "products.id")
            ->where("carts.user_id", $user->id)
            ->select('carts.id as id', 'products.price as price', 'carts.quantity as quantity', 'products.image as image', 'products.name as name', 'carts.product_id as product_id', 'carts.user_id as user_id', 'products.quantity as product_quantity')
            ->get();

        return response()->json([
            "success" => true,
            "carts" => $carts
        ]);
    }

    public function fetchDataCart()
    {
        $user = auth()->user();

        $carts = DB::table('carts')
            ->join("products", "product_id", "=", "products.id")
            ->where("carts.user_id", $user->id)
            ->select('carts.id as id', 'products.price as price', 'carts.quantity as quantity', 'products.image as image', 'products.name as name', 'carts.product_id as product_id', 'carts.user_id as user_id', 'products.quantity as product_quantity')
            ->get();

        return response()->json([
            "success" => true,
            "carts" => $carts
        ]);
    }

    public function removeToCart($id)
    {
        $user = auth()->user();
        $find = Cart::where("product_id", $id)->where("user_id", $user->id)->first();

        if ($user->id == $find->user_id) {
            Cart::where("id", $find->id)->delete();
        }

        $carts = DB::table('carts')
            ->join("products", "product_id", "=", "products.id")
            ->where("carts.user_id", $user->id)
            ->select('carts.id as id', 'products.price as price', 'carts.quantity as quantity', 'products.image as image', 'products.name as name', 'carts.product_id as product_id', 'carts.user_id as user_id', 'products.quantity as product_quantity')
            ->get();


        return response()->json([
            "success" => true,
            "carts" => $carts
        ]);
    }

    public function updateQuantityCart()
    {
        $error = [];
        $user = auth()->user();
        $id = request('id');
        $quantity = intval(request('quantity'));

        $find = Cart::where("id", $id)->first();

        if ($user->id != $find->user_id) {
            $msg = new \stdClass();
            $msg->vi = "Cập nhật giỏ hàng không thành công!";
            $msg->en = "Update cart failed!";
            array_push($error, $msg);
        } else {
            if (!$quantity) {
                Cart::where("id", $id)->delete();
                $carts = DB::table('carts')
                    ->join("products", "product_id", "=", "products.id")
                    ->where("carts.user_id", $user->id)
                    ->select('carts.id as id', 'products.price as price', 'carts.quantity as quantity', 'products.image as image', 'products.name as name', 'carts.product_id as product_id', 'carts.user_id as user_id', 'products.quantity as product_quantity')
                    ->get();
                return response()->json([
                    'success' => true,
                    'carts' => $carts
                ]);
            } else {
                if ($quantity < 1) {
                    $msg = new \stdClass();
                    $msg->vi = "Số lượng không được nhỏ hơn 1!";
                    $msg->en = "Quantity cannot be less than 1!";
                    array_push($error, $msg);
                }
            }
        }

        if (count($error) > 0) {
            return response()->json([
                'success' => false,
                'message' => $error
            ], 400);
        } else {
            Cart::where('id', $id)->update([
                'quantity' => $quantity
            ]);
            $carts = DB::table('carts')
                ->join("products", "product_id", "=", "products.id")
                ->where("carts.user_id", $user->id)
                ->select('carts.id as id', 'products.price as price', 'carts.quantity as quantity', 'products.image as image', 'products.name as name', 'carts.product_id as product_id', 'carts.user_id as user_id', 'products.quantity as product_quantity')
                ->get();
            return response()->json([
                'success' => true,
                'carts' => $carts
            ]);
        }
    }

    // favorite
    public function fetchFavorites()
    {
        $user = auth()->user();

        $count = Favorite::where('user_id', $user->id)->count();

        $perPage = 5;
        $totalPage = ceil($count / $perPage);
        $page = request('page');
        $offset = ($page - 1) * $perPage;

        $favorites = DB::table('favorites')
            ->join("products", "product_id", "=", "products.id")
            ->where("favorites.user_id", $user->id)
            ->select('favorites.id as id', 'products.price as price', 'products.image as image', 'products.name as name', 'favorites.product_id as product_id')
            ->orderBy('favorites.created_at', 'desc')
            ->skip($offset)
            ->take($perPage)
            ->get();

        return response()->json([
            "success" => true,
            "favorites" => $favorites,
            "totalPage" => $totalPage
        ]);
    }

    public function removeFavorite($id)
    {
        $user = auth()->user();

        Favorite::where("id", $id)
            ->where("user_id", $user->id)
            ->delete();

        $msg = new \stdClass();
        $msg->vi = "Xóa sản phẩm yêu thích thành công!";
        $msg->en = "Deleted favorite product successfully!";

        return response()->json([
            "success" => true,
            "message" => [$msg]
        ]);
    }

    // order
    public function createOrder()
    {
        $user = auth()->user();

        $fullname = request('fullname');
        $phone = request('phone');
        $address = request('address');
        $note = request('note');

        $carts = Cart::where('user_id', $user->id)->get();

        if (count($carts) > 0) {
            $order = new Order();
            $order->user_id = $user->id;
            $order->fullname = $fullname;
            $order->email = $user->email;
            $order->phone = $phone;
            $order->address = $address;
            $order->note = $note;
            $order->save();

            $order_id = $order->id;

            for ($i = 0; $i < count($carts); $i++) {
                $product = Product::where('id', $carts[$i]->product_id)->first();

                $orderDetail = new OrderDetail();
                $orderDetail->order_id = $order_id;
                $orderDetail->product_id = $carts[$i]->product_id;
                $orderDetail->quantity = $carts[$i]->quantity;
                $orderDetail->price = $product->price;
                $orderDetail->save();

                $product->quantity -= $carts[$i]->quantity;
                $product->save();
            }

            Cart::where('user_id', $user->id)->delete();

            $msg = new \stdClass();
            $msg->vi = "Đặt hàng thành công!";
            $msg->en = "Order successfully!";

            return response()->json([
                "success" => true,
                "message" => [$msg]
            ]);
        } else {
            $msg = new \stdClass();
            $msg->vi = "Giỏ hàng của bạn đang trống!";
            $msg->en = "Your cart is empty!";

            return response()->json([
                "success" => false,
                "message" => [$msg]
            ]);
        }
    }

    public function fetchOrders()
    {
        $user = auth()->user();

        $count = Order::where('user_id', $user->id)->count();

        $perPage = 5;
        $totalPage = ceil($count / $perPage);
        $page = request('page');
        $offset = ($page - 1) * $perPage;

        $orders = Order::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->skip($offset)
            ->take($perPage)
            ->get();

        if (count($orders) > 0) {
            foreach ($orders as $order) {
                $totalPrice = 0;
                $detail = OrderDetail::where('order_id', $order->id)->get();
                foreach ($detail as $item) {
                    $totalPrice += $item->quantity * $item->price;
                }
                $order->total_price = $totalPrice;
            }
        }

        return response()->json([
            "success" => true,
            "orders" => $orders,
            "totalPage" => $totalPage
        ]);
    }

    public function fetchOrderDetails($id)
    {
        $user = auth()->user();

        $order = Order::where('id', $id)->first();

        if ($order->user_id == $user->id) {
            $order->details = DB::table('order_details')
                ->join("products", "product_id", "=", "products.id")
                ->select(
                    'products.name as name',
                    'products.image',
                    'order_details.price as price',
                    'order_details.quantity as quantity'
                )
                ->where('order_details.order_id', $id)
                ->get();

            $order->total_price = 0;

            foreach ($order->details as $item) {
                $order->total_price += $item->quantity * $item->price;
            }

            return response()->json([
                "success" => true,
                "order" => $order
            ]);
        }

        return response()->json([
            "success" => false
        ]);
    }
}