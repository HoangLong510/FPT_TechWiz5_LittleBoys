<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Storage;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\DB;

class supplierController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', [
            'except' => [

            ]
        ]);
    }

    // Create a new product
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

    // Update the specified product
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

            if (!$product || $product->user_id !== $user->id) {
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


    public function getProducts(Request $request)
    {
        $search = $request->query('search', '');
        $page = $request->query('page', 1);
        $user = auth()->user();

        $productsQuery = Product::with(['category'])
            ->where('user_id', $user->id)
            ->where(function ($query) use ($search) {
                if ($search) {
                    $query->where('name', 'like', '%' . $search . '%');
                }
            });

        // Phân trang
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


    public function getProduct($id)
    {
        $user = auth()->user(); // Lấy thông tin người dùng hiện tại
        $product = Product::with(['user', 'category'])->where('user_id', $user->id)->findOrFail($id);

        // Xử lý hình ảnh nếu có
        $product->image = $product->image ? asset('storage/' . $product->image) : null;

        return response()->json([
            'success' => true,
            'data' => $product
        ]);
    }

    //cate

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

    public function deleteProduct($id)
    {
        try {
            $user = auth()->user();
            $product = Product::find($id);

            if (!$product || $product->user_id !== $user->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Product not found or you do not have permission to delete this product.'
                ], 404);
            }

            if ($product->image && Storage::exists('public/' . $product->image)) {
                Storage::delete('public/' . $product->image);
            }

            $product->delete();

            return response()->json([
                'success' => true,
                'message' => 'Product deleted successfully.'
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Error deleting product: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'An error occurred while deleting the product.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    // Lấy data truyền về supplier chart
    public function fetchSupplierDataChart(Request $request)
{
    // Get the supplier's user_id from the request
    $user = auth()->user();
    $dateRange = $request->input('dateRange');

    // Query the products for this supplier within the specified date range
    $products = Product::where('user_id', $user->id) // Filter by supplier's user_id

        ->get();

    // Calculate total products, in-stock products, and out-of-stock products
    $totalProducts = $products->count(); // Total number of products
    $inStockProducts = $products->where('quantity', '>', 0)->count(); // Products with quantity > 0
    $outOfStockProducts = $products->where('quantity', 0)->count(); // Products with quantity = 0

    // Prepare the data for front-end response
    $data = [
        ['category' => 'Sản phẩm', 'value' => $totalProducts],
        ['category' => 'Còn hàng', 'value' => $inStockProducts],
        ['category' => 'Hết hàng', 'value' => $outOfStockProducts],
    ];

    return response()->json($data);
}

}
