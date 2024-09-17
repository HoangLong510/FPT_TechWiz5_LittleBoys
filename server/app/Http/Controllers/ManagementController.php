<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;

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
    public function getAccounts()
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

    public function getAccountDetail($id)
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

    public function updateAccountRole()
    {
        $error = [];
        $user = auth()->user();
        $id = request('id');
        $role = request('role');

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
                    $msg->vi = "Bạn không thể cập nhật vai trò cho tài khoản quản trị!";
                    $msg->en = "You cannot update admin account role!";
                    array_push($error, $msg);
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
                "role" => $role
            ]);
            $msg = new \stdClass();
            $msg->en = "Role update successfully!";
            $msg->vi = "Cập nhật vai trò thành công!";
            return response()->json([
                "success" => true,
                "message" => [$msg]
            ], 200);
        }
    }

    function lockAccount($id)
    {
        $error = [];
        $user = auth()->user();

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
                    $msg->vi = "Bạn không thể khóa tài khoản quản trị!";
                    $msg->en = "You cannot lock admin account!";
                    array_push($error, $msg);
                } else {
                    if ($user->id == $id) {
                        $msg = new \stdClass();
                        $msg->vi = "Bạn không thể khóa chính bạn!";
                        $msg->en = "You cannot lock your own account!";
                        array_push($error, $msg);
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
                "active" => 0
            ]);
            $msg = new \stdClass();
            $msg->en = "Account locked successfully!";
            $msg->vi = "Khóa tài khoản thành công!";
            return response()->json([
                "success" => true,
                "message" => [$msg]
            ], 200);
        }
    }

    function unlockAccount($id)
    {
        $error = [];
        $user = auth()->user();
        if (!$user || $user->role !== 'admin') {
            $msg = new \stdClass();
            $msg->vi = "Bạn không thể thực hiện hành động này!";
            $msg->en = "You cannot perform this action!!";
            array_push($error, $msg);
        }

        if (count($error) > 0) {
            return response()->json([
                "success" => false,
                "message" => $error
            ], 400);
        } else {
            User::where("id", $id)->update([
                "active" => 1
            ]);
            $msg = new \stdClass();
            $msg->en = "Account unlocked successfully!";
            $msg->vi = "Mở khóa tài khoản thành công!";
            return response()->json([
                "success" => true,
                "message" => [$msg]
            ], 200);
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
        $brands->getCollection()->transform(function($brand) {
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
                // Xóa hình ảnh cũ nếu có
                if ($brand->image && Storage::exists('public/' . $brand->image)) {
                    Storage::delete('public/' . $brand->image);
                }

                $imagePath = null;
                if ($request->hasFile('image')) {
                    $image = $request->file('image');
                    // Lưu hình ảnh vào thư mục 'public/images'
                    $imagePath = $image->store('images', 'public'); // Lưu vào 'storage/app/public/images'
                    $validatedData['image'] = $imagePath; // Cập nhật đường dẫn hình ảnh
                }

                $brand->update($validatedData);

                return response()->json([
                    'success' => true,
                    'data' => $brand
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Brand not found.'
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
                $imagePath = $image->store('images/cate', 'public');
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
        $categories->getCollection()->transform(function($category) {
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
            // Xóa hình ảnh cũ nếu có
            if ($product->image && Storage::exists('public/' . $product->image)) {
                Storage::delete('public/' . $product->image);
            }

            $imagePath = null;
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imagePath = $image->store('images', 'public'); // Lưu vào 'storage/app/public/images'
            }

            $product->update(array_merge($validatedData, ['image' => $imagePath]));

            return response()->json([
                'success' => true,
                'data' => $product
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Product not found.'
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

     
     // Delete the specified product
     public function deleteProduct($id)
{
    try {
        $product = Product::findOrFail($id);
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

}
