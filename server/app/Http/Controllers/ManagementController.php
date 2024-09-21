<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use App\Models\ActivityLog;


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

    // Supplier management

    public function getSuppliers(Request $request)
    {
        $search = $request->query('search', '');
        $page = $request->query('page', 1);

        try {
            $suppliers = User::where('role', 'supplier')
                ->where('fullname', 'like', '%' . $search . '%')
                ->paginate(10, ['*'], 'page', $page);

            $suppliers->getCollection()->transform(function ($supplier) {
                $supplier->image = $supplier->image ? asset('storage/' . $supplier->image) : null;
                return $supplier;
            });

            return response()->json([
                'suppliers' => $suppliers->items(),
                'totalPages' => $suppliers->lastPage(),
                'currentPage' => $suppliers->currentPage(),
                'totalItems' => $suppliers->total(),
            ], 200);
        } catch (\Exception $e) {
            \Log::error('Error fetching suppliers: ' . $e->getMessage());
            return response()->json(['error' => 'Server Error'], 500);
        }
    }

    public function changeRole(Request $request, $id)
    {
        try {
            $user = User::find($id);

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not found.'
                ], 404);
            }

            if ($user->role !== 'supplier') {
                return response()->json([
                    'success' => false,
                    'message' => 'User is not a supplier.'
                ], 400);
            }

            $products = Product::where('user_id', $user->id)->get();

            foreach ($products as $product) {
                $product->delete();
            }

            $user->role = 'user';
            $user->save();

            return response()->json([
                'success' => true,
                'message' => 'Supplier role changed to user and products deleted.'
            ], 200);
        } catch (\Exception $e) {
            \Log::error('Error changing role: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'An error occurred while changing the role.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Tạo Category (Create Category)
    public function createCategory(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
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
    public function getProducts(Request $request)
    {
        $search = $request->query('search', '');
        $page = $request->query('page', 1);

        $productsQuery = Product::with([
            'user' => function ($query) {
                $query->where('role', 'supplier');
            },
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

            if ($product->user) {
                $product->supplier_name = $product->user->fullname;
            }

            return $product;
        });

        return response()->json([
            'success' => true,
            'data' => $products->items(),
            'totalPages' => $products->lastPage()
        ]);
    }

    //delete product 

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

}
