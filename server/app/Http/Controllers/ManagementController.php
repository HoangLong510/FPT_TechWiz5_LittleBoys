<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Brand;
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

    // Brand management
    public function createBrand(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        try {
            $imagePath = null;
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                // Lưu hình ảnh vào thư mục 'public/images'
                $imagePath = $image->store('images', 'public'); // Lưu vào 'storage/app/public/images'
            }

            $brand = Brand::create([
                'name' => $validatedData['name'],
                'image' => $imagePath ? $imagePath : null
            ]);

            return response()->json([
                'success' => true,
                'data' => $brand
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while creating the brand.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getBrands(Request $request)
    {
        $search = $request->query('search', '');
        $page = $request->query('page', 1);

        try {
            $brands = Brand::where('name', 'like', '%' . $search . '%')
                ->paginate(10, ['*'], 'page', $page);

            // Đảm bảo chỉ thêm 'storage/' một lần
            $brands->getCollection()->transform(function ($brand) {
                $brand->image = $brand->image ? asset('storage/' . $brand->image) : null;
                return $brand;
            });

            return response()->json([
                'brands' => $brands->items(),
                'totalPages' => $brands->lastPage(),
                'currentPage' => $brands->currentPage(),
                'totalItems' => $brands->total()
            ]);
        } catch (\Exception $e) {
            \Log::error('Error fetching brands: ' . $e->getMessage());
            return response()->json(['error' => 'Server Error'], 500);
        }
    }

    public function getBrandDetail($id)
    {
        try {
            $brand = Brand::find($id);

            if ($brand) {
                // Xử lý hình ảnh nếu có
                $brand->image = $brand->image ? asset('storage/' . $brand->image) : null;

                return response()->json([
                    'success' => true,
                    'brand' => $brand
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Brand not found.'
                ], 404);
            }
        } catch (\Exception $e) {
            \Log::error('Error fetching brand details: ' . $e->getMessage());
            return response()->json(['error' => 'Server Error'], 500);
        }
    }

    public function updateBrand(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        try {
            $brand = Brand::find($id);

            if ($brand) {
                if ($request->hasFile('image')) {
                    // Delete old image if it exists
                    if ($brand->image && Storage::exists('public/' . $brand->image)) {
                        Storage::delete('public/' . $brand->image);
                    }

                    $imagePath = null;
                    if ($request->hasFile('image')) {
                        $image = $request->file('image');
                        // Save the new image in the 'public/images' directory
                        $imagePath = $image->store('images', 'public');
                        $validatedData['image'] = $imagePath;
                    }

                    $brand->update($validatedData);
                } else {
                    $brand->update([
                        'name' => $request->name,
                        'image' => $brand->image
                    ]);
                }

                return response()->json([
                    'success' => true,
                    'data' => $brand
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
                'message' => 'An error occurred while updating the brand.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function deleteBrand($id)
    {
        $brand = Brand::find($id);

        if ($brand) {
            // Xóa hình ảnh nếu có
            if ($brand->image && Storage::exists('public/' . $brand->image)) {
                Storage::delete('public/' . $brand->image);
            }

            // Xóa thương hiệu
            $brand->delete();
            return response()->json([
                'success' => true,
                'message' => 'Brand deleted successfully.'
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Brand not found.'
            ], 404);
        }
    }

    //category

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
                // Process the image path if available
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
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        try {
            $category = Category::find($id);

            if ($category) {
                if ($request->hasFile('image')) {
                    // Delete old image if it exists
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
            // Delete the image if it exists
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

    // Create a new product
    public function createProduct(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'quantity' => 'required|integer',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'brand_id' => 'required|exists:brands,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        try {
            $imagePath = null;
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imagePath = $image->store('images', 'public'); // Lưu vào 'storage/app/public/images'
            }

            $product = Product::create([
                'name' => $validatedData['name'],
                'price' => $validatedData['price'],
                'quantity' => $validatedData['quantity'],
                'description' => $validatedData['description'],
                'category_id' => $validatedData['category_id'],
                'brand_id' => $validatedData['brand_id'],
                'image' => $imagePath
            ]);

            return response()->json([
                'success' => true,
                'data' => $product
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while creating the product.',
                'error' => $e->getMessage()
            ], 500);
        }
    }



    // Update the specified product
    public function updateProduct(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'quantity' => 'required|integer',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'brand_id' => 'required|exists:brands,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        try {
            $product = Product::find($id);

            if ($product) {
                if ($request->hasFile('image')) {
                    // Delete old image if it exists
                    if ($product->image && Storage::exists('public/' . $product->image)) {
                        Storage::delete('public/' . $product->image);
                    }

                    $imagePath = null;
                    if ($request->hasFile('image')) {
                        $image = $request->file('image');
                        // Save the new image in the 'public/images' directory
                        $imagePath = $image->store('images', 'public');
                        $validatedData['image'] = $imagePath;
                    }

                    $product->update($validatedData);
                } else {
                    $product->update([
                        'name' => $request->name,
                        'image' => $product->image
                    ]);
                }

                return response()->json([
                    'success' => true,
                    'data' => $product
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
                'message' => 'An error occurred while updating the product.',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    // Optionally, you might want to add methods to get products and product details
    public function getProducts(Request $request)
    {
        $search = $request->query('search', '');
        $page = $request->query('page', 1);

        // Lọc sản phẩm dựa trên từ khóa tìm kiếm
        $productsQuery = Product::with(['brand', 'category'])
            ->where(function ($query) use ($search) {
                if ($search) {
                    $query->where('name', 'like', '%' . $search . '%');
                }
            });

        // Phân trang
        $products = $productsQuery->paginate(10, ['*'], 'page', $page);

        // Đảm bảo chỉ thêm 'storage/' một lần
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

    public function getProduct($id)
    {
        $product = Product::with(['brand', 'category'])->findOrFail($id);

        // Xử lý hình ảnh nếu có
        $product->image = $product->image ? asset('storage/' . $product->image) : null;

        return response()->json([
            'success' => true,
            'data' => $product
        ]);
    }


    //hoạt động 
    public function fetchActivityLogs(Request $request)
    {
        try {
            $user = auth()->user();

            // Ghi log ID người dùng để kiểm tra
            \Log::info('Fetching activity logs for user ID: ' . $user->id);

            // Lấy log hoạt động cho người dùng
            $activityLogs = ActivityLog::where('user_id', $user->id)
                ->orderBy('created_at', 'desc')
                ->take(10) // Lấy 10 bản ghi gần đây nhất
                ->get();

            // Trả về dữ liệu
            return response()->json([
                'success' => true,
                'data' => $activityLogs
            ]);
        } catch (\Exception $e) {
            // Ghi log lỗi
            \Log::error('Error fetching activity logs: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Error fetching activity logs.'
            ], 500);
        }
    }

}
