<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\ActivityLog;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;


class ManagementController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', [
            'except' => [

            ]
        ]);
    }

    // Account management
    public function fetchAccounts()
    {
        $user = auth()->user();
        $search = request('search');


        if ($user && $user->role === 'admin') {
            $count = User::where('fullname', 'LIKE', "%{$search}%")
                ->orWhere('email', 'LIKE', "%{$search}%")
                ->orWhere('phone', 'LIKE', "%{$search}%")
                ->count();

            $perPage = 5;
            $totalPage = ceil($count / $perPage);
            $page = request('page');
            $offset = ($page - 1) * $perPage;

            $accounts = User::where('fullname', 'LIKE', "%{$search}%")
                ->orWhere('email', 'LIKE', "%{$search}%")
                ->orWhere('phone', 'LIKE', "%{$search}%")
                ->orderBy('fullname', 'asc')
                ->orderBy('role', 'asc')
                ->skip($offset)
                ->take($perPage)
                ->get();
            return response()->json([
                'success' => true,
                'accounts' => $accounts,
                'totalPage' => $totalPage
            ], 200);
        } else {
            return response()->json([
                'success' => false
            ], 400);
        }
    }

    public function fetchAccountDetail($id)
    {
        $user = auth()->user();

        if ($user && $user->role === 'admin') {
            $account = User::where('id', $id)->first();
            if ($account) {
                return response()->json([
                    'success' => true,
                    'account' => $account
                ], 200);
            } else {
                return response()->json([
                    'success' => false
                ], 400);
            }
        } else {
            return response()->json([
                'success' => false
            ], 400);
        }
    }

    public function updateAccount()
    {
        $error = [];
        $user = auth()->user();

        $id = request('id');
        $fullname = request('fullname');
        $gender = request('gender');
        $address = request('address');
        $role = request('role');
        $active = request('active');

        if (!$user || $user->role !== 'admin') {
            $msg = new \stdClass();
            $msg->vi = "Bạn không thể thực hiện hành động này!";
            $msg->en = "You cannot perform this action!!";
            array_push($error, $msg);
        } else {
            $account = User::where("id", $id)->first();
            if (!$account) {
                $msg = new \stdClass();
                $msg->vi = "Không tìm thấy tài khoản!";
                $msg->en = "Account not found!";
                array_push($error, $msg);
            } else {
                if ($account->email === "admin") {
                    $msg = new \stdClass();
                    $msg->vi = "Bạn không thể cập nhật tài khoản quản trị!";
                    $msg->en = "You cannot update admin account!";
                    array_push($error, $msg);
                } else {
                    $regexFullname = "/^(?! )[a-zA-Z\s\u{0080}-\u{FFFF}]{2,50}(?<! )$/u";

                    if (empty($fullname) || empty($gender) || empty($address) || empty($role)) {
                        $msg = new \stdClass();
                        $msg->en = "All fields are required!";
                        $msg->vi = "Tất cả các trường đều bắt buộc!";
                        array_push($error, $msg);
                    } else {
                        if (!preg_match($regexFullname, $fullname)) {
                            $msg = new \stdClass();
                            $msg->en = "The name must be from 2 to 50 characters long. Numbers and special characters are not allowed.";
                            $msg->vi = "Tên phải dài từ 2 đến 50 ký tự. Không được phép sử dụng số và ký tự đặc biệt.";
                            array_push($error, $msg);
                        }
                    }
                }
            }
        }

        if (count($error) > 0) {
            return response()->json([
                "success" => false,
                "message" => $error
            ], 400);
        } else {
            User::where("id", $id)->update([
                "fullname" => $fullname,
                "gender" => $gender,
                "address" => $address,
                "role" => $role,
                "active" => $active
            ]);
            $msg = new \stdClass();
            $msg->en = "Update account successfully!";
            $msg->vi = "Cập nhật tài khoản thành công!";
            if ($user->id != $id) {
                return response()->json([
                    "success" => true,
                    "message" => [$msg]
                ], 200);
            } else {
                $user = User::where("id", $id)->first();
                return response()->json([
                    "success" => true,
                    "message" => [$msg],
                    "user" => $user
                ], 200);
            }
        }
    }

    // Designer management

    public function getDesigners(Request $request)
    {
        $search = $request->query('search', '');
        $page = $request->query('page', 1);

        try {
            $designers = User::where('role', 'designer')
                ->where('fullname', 'like', '%' . $search . '%')
                ->paginate(10, ['*'], 'page', $page);

            $designers->getCollection()->transform(function ($designer) {
                $designer->image = $designer->image ? asset('storage/' . $designer->image) : null;
                return $designer;
            });

            return response()->json([
                'designers' => $designers->items(),
                'totalPages' => $designers->lastPage(),
                'currentPage' => $designers->currentPage(),
                'totalItems' => $designers->total(),
            ], 200);
        } catch (\Exception $e) {
            \Log::error('Error fetching designers: ' . $e->getMessage());
            return response()->json(['error' => 'Server Error'], 500);
        }
    }


    // Tạo Category (Create Category)
    
    public function createCategory(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        try {
            $imagePath = null;
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                // Save the image in the 'public/images' directory
                $imagePath = $image->store('images', 'public');
            }

            $category = Category::create([
                'name' => $validatedData['name'],
                'image' => $imagePath ? $imagePath : null
            ]);

            return response()->json([
                'success' => true,
                'data' => $category
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while creating the category.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Lấy danh sách Category (Get Categories)
    public function getCategories(Request $request)
    {
        $search = $request->query('search', '');
        $page = $request->query('page', 1);

        try {
            $categories = Category::where('name', 'like', '%' . $search . '%')
                ->paginate(10, ['*'], 'page', $page);

            // Ensure 'storage/' is prefixed correctly
            $categories->getCollection()->transform(function ($category) {
                $category->image = $category->image ? asset('storage/' . $category->image) : null;
                return $category;
            });

            return response()->json([
                'categories' => $categories->items(),
                'totalPages' => $categories->lastPage(),
                'currentPage' => $categories->currentPage(),
                'totalItems' => $categories->total()
            ]);
        } catch (\Exception $e) {
            \Log::error('Error fetching categories: ' . $e->getMessage());
            return response()->json(['error' => 'Server Error'], 500);
        }
    }

    // Lấy chi tiết Category (Get Category Detail)
    public function getCategoryDetail($id)
    {
        try {
            $category = Category::find($id);

            if ($category) {
                $category->image = $category->image ? asset('storage/' . $category->image) : null;

                return response()->json([
                    'success' => true,
                    'category' => $category
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Category not found.'
                ], 404);
            }
        } catch (\Exception $e) {
            \Log::error('Error fetching category details: ' . $e->getMessage());
            return response()->json(['error' => 'Server Error'], 500);
        }
    }
    // Cập nhật Category (Update Category)
    public function updateCategory(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        try {
            $category = Category::find($id);

            if ($category) {
                if ($request->hasFile('image')) {
                    if ($category->image && Storage::exists('public/' . $category->image)) {
                        Storage::delete('public/' . $category->image);
                    }

                    $imagePath = null;
                    if ($request->hasFile('image')) {
                        $image = $request->file('image');
                        // Save the new image in the 'public/images' directory
                        $imagePath = $image->store('images', 'public');
                        $validatedData['image'] = $imagePath;
                    }

                    $category->update($validatedData);
                } else {
                    $category->update([
                        'name' => $request->name,
                        'image' => $category->image
                    ]);
                }

                return response()->json([
                    'success' => true,
                    'data' => $category
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Category not found.'
                ], 404);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while updating the category.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    // Xóa Category (Delete Category)
    public function deleteCategory($id)
    {
        $category = Category::find($id);

        if ($category) {
            if ($category->image && Storage::exists('public/' . $category->image)) {
                Storage::delete('public/' . $category->image);
            }

            // Delete the category
            $category->delete();
            return response()->json([
                'success' => true,
                'message' => 'Category deleted successfully.'
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Category not found.'
            ], 404);
        }
    }

    //prodcut
    public function createProduct(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'quantity' => 'required|integer',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        try {
            $user = auth()->user();

            $imagePath = null;
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imagePath = $image->store('images', 'public'); // Lưu vào 'storage/app/public/images'
            }

            // Tạo sản phẩm
            $product = Product::create([
                'name' => $validatedData['name'],
                'price' => $validatedData['price'],
                'quantity' => $validatedData['quantity'],
                'description' => $validatedData['description'],
                'category_id' => $validatedData['category_id'],
                'user_id' => $user->id,
                'image' => $imagePath
            ]);

            return response()->json([
                'success' => true,
                'data' => $product
            ], 201);
        } catch (\Exception $e) {
            // Log lỗi chi tiết
            \Log::error($e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'An error occurred while creating the product.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function updateProduct(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'quantity' => 'required|integer',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        try {
            $user = auth()->user();
            $product = Product::find($id);

            if (!$product || $user->role != 'admin') {
                return response()->json([
                    'success' => false,
                    'message' => 'Product not found or you do not have permission to update this product.'
                ], 404);
            }

            if ($request->hasFile('image')) {
                if ($product->image && Storage::exists('public/' . $product->image)) {
                    Storage::delete('public/' . $product->image);
                }

                $imagePath = $request->file('image')->store('images', 'public');
                $validatedData['image'] = $imagePath;
            }

            $product->update($validatedData);

            return response()->json([
                'success' => true,
                'data' => $product
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Error updating product: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'An error occurred while updating the product.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getProduct($id)
    {
        $product = Product::where('id', $id)->first();

        $product->image = $product->image ? asset('storage/' . $product->image) : null;

        return response()->json([
            'success' => true,
            'data' => $product
        ]);
    }

    public function getProducts(Request $request)
    {
        $search = $request->query('search', '');
        $page = $request->query('page', 1);

        $productsQuery = Product::with([

            'category'
        ])
            ->where(function ($query) use ($search) {
                if ($search) {
                    $query->where('name', 'like', '%' . $search . '%');
                }
            });

        $products = $productsQuery->paginate(10, ['*'], 'page', $page);

        $products->getCollection()->transform(function ($product) {
            $product->image = $product->image ? asset('storage/' . $product->image) : null;

            return $product;
        });

        return response()->json([
            'success' => true,
            'data' => $products->items(),
            'totalPages' => $products->lastPage()
        ]);
    }

    public function deleteProduct($id)
    {
        try {
            $product = Product::find($id);

            if (!$product) {
                return response()->json([
                    'success' => false,
                    'message' => 'Product not found.'
                ], 404);
            }

            // Xóa ảnh nếu có
            if ($product->image && Storage::exists('public/' . $product->image)) {
                Storage::delete('public/' . $product->image);
            }

            // Xóa sản phẩm
            $product->delete();

            return response()->json([
                'success' => true,
                'message' => 'Product deleted successfully.'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while deleting the product.',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    //hoạt động
    public function fetchActivityLogs(Request $request)
    {
        try {
            $user = auth()->user();

            \Log::info('Fetching activity logs for user ID: ' . $user->id);

            $activityLogs = ActivityLog::where('user_id', $user->id)
                ->orderBy('created_at', 'desc')
                ->take(10) // Lấy 10 bản ghi gần đây nhất
                ->get();

            return response()->json([
                'success' => true,
                'data' => $activityLogs
            ]);
        } catch (\Exception $e) {
            \Log::error('Error fetching activity logs: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Error fetching activity logs.'
            ], 500);
        }
    }
    ///First Chart
    public function fetchDataChart(Request $request)
    {
        // Validate the date range input
        $request->validate([
            'dateRange' => 'required|string',
        ]);

        // Explode the date range and validate its format
        $dates = explode('_to_', $request->input('dateRange'));
        if (count($dates) !== 2 || !strtotime($dates[0]) || !strtotime($dates[1])) {
            return response()->json(['error' => 'Invalid date range'], 400);
        }

        // Query product data, including category and user
        $products = Product::with('category', 'user')
            ->whereBetween('created_at', [$dates[0], $dates[1]]) // Ensure proper date range format
            ->get();

        // Group products by user_id and calculate category and product counts
        $data = $products->groupBy('user_id')->map(function ($productsBySupplier) {
            $user = $productsBySupplier->first()->user;
            return [
                'supplier_name' => $user ? $user->fullname : 'Unknown Supplier', // Check for null user
                'total_categories' => $productsBySupplier->pluck('category_id')->unique()->count(),
                'total_products' => $productsBySupplier->count()
            ];
        })->values(); // Convert to array

        return response()->json($data);
    }
    //Second Chart
    public function fetchAccountStatistics(Request $request)
    {

        // Get the current date and time with proper timezone handling
        $now = Carbon::now()->setTimezone('UTC'); // Adjust the timezone if needed

        // Total accounts
        $totalAccounts = User::count();

        // Locked accounts (where active = 0)
        $lockedAccounts = User::where('active', 0)->count();

        // Accounts created today
        $accountsCreatedToday = User::whereDate('created_at', $now->toDateString())->count();

        // Start and end of the week (considering current time)
        $startOfWeek = $now->copy()->startOfWeek(); // Cloning $now to keep original
        $endOfWeek = $now;

        // Start and end of the month
        $startOfMonth = $now->copy()->startOfMonth();
        $endOfMonth = $now;

        // Accounts created this week (from start of the week to now)
        $accountsCreatedThisWeek = User::whereBetween('created_at', [$startOfWeek, $endOfWeek])->count();

        // Accounts created this month (from start of the month to now)
        $accountsCreatedThisMonth = User::whereBetween('created_at', [$startOfMonth, $endOfMonth])->count();

        // Locked accounts created today
        $lockedAccountsToday = User::where('active', 0)
            ->whereDate('created_at', $now->toDateString())
            ->count();

        // Locked accounts created this week (from start of the week to now)
        $lockedAccountsThisWeek = User::where('active', 0)
            ->whereBetween('created_at', [$startOfWeek, $endOfWeek])
            ->count();

        // Locked accounts created this month (from start of the month to now)
        $lockedAccountsThisMonth = User::where('active', 0)
            ->whereBetween('created_at', [$startOfMonth, $endOfMonth])
            ->count();

        // Count users with role 'user'
        $roleUserCount = User::where('role', 'user')->count();

        // Count users with role 'supplier'
        $roleSupplierCount = User::where('role', 'designer')->count();

        // Return the statistics as a JSON response
        return response()->json([
            'totalAccounts' => $totalAccounts,
            'lockedAccounts' => $lockedAccounts,
            'lockedAccountsToday' => $lockedAccountsToday,
            'lockedAccountsThisWeek' => $lockedAccountsThisWeek,
            'lockedAccountsThisMonth' => $lockedAccountsThisMonth,
            'accountsCreatedToday' => $accountsCreatedToday,
            'accountsCreatedThisWeek' => $accountsCreatedThisWeek,
            'accountsCreatedThisMonth' => $accountsCreatedThisMonth,
            'roleUserCount' => $roleUserCount,
            'roleSupplierCount' => $roleSupplierCount,
        ]);
    }

    // Order
    public function fetchOrders()
    {
        $count = Order::count();

        $perPage = 5;
        $totalPage = ceil($count / $perPage);
        $page = request('page');
        $offset = ($page - 1) * $perPage;

        $orders = Order::orderBy('created_at', 'desc')
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

        if ($user->role == 'admin') {
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

    public function updateOrderType()
    {
        $user = auth()->user();

        $id = request('id');
        $type = request('type');

        if ($user->role == 'admin') {
            Order::where('id', $id)->update([
                'type' => $type
            ]);

            if ($type == 'success') {
                $msg = new \stdClass();
                $msg->vi = "Đã hoàn thành đơn hàng!";
                $msg->en = "Order completed!";
            } else {
                $msg = new \stdClass();
                $msg->vi = "Đã hủy bỏ đơn hàng!";
                $msg->en = "Order Cancelled!";
            }
            return response()->json([
                "success" => true,
                'message' => [$msg]
            ]);
        } else {
            return response()->json([
                "success" => false
            ]);
        }
    }
}
