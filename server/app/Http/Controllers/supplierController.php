<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Storage;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\Category;

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
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
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
        $productsQuery = Product::with(['category'])
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
        $product = Product::with(['category'])->findOrFail($id);

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

}
