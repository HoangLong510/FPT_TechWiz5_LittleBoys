<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use App\Models\Cart;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', [
            'except' => [
                'fetchDataProducts',
                'fetchDataCategories',
                'fetchDataProductDetails',
            ]
        ]);
    }

    public function fetchDataProducts()
    {
        $search = request('search');
        $page = request('page');
        $sort = request('sort');
        $filterCategory = request('filterCategory');

        $count = Product::where('name', 'LIKE', "%{$search}%")
            ->count();

        $perPage = 20;
        $totalPage = ceil($count / $perPage);
        $offset = ($page - 1) * $perPage;

        $products = Product::orWhere('name', 'LIKE', "%{$search}%")
            ->when($filterCategory, function ($query, $filterCategory) {
                return $query->where("category_id", $filterCategory);
            })
            ->when($sort, function ($query, $sort) {
                return $query->orderBy("price", $sort);
            })
            ->orderBy("created_at", "desc")
            ->skip($offset)
            ->take($perPage)
            ->get();

        return response()->json([
            "success" => true,
            "products" => $products,
            "totalPage" => $totalPage
        ]);
    }

    public function fetchDataCategories()
    {
        $categories = Category::all();
        return response()->json([
            "success" => true,
            "categories" => $categories
        ]);
    }

    public function fetchDataProductDetails($id)
    {
        $product = Product::where('id', $id)->first();
        $existsCart = false;
        $user = auth()->user();
        if($user){
            $existsCart = Cart::where('product_id', $id)->where('user_id', $user->id)->exists();
        }

        if ($product) {
            return response()->json([
                "success" => true,
                "product" => $product,
                "existsCart" => $existsCart
            ]);
        } else {
            return response()->json([
                "success" => false
            ], 400);
        }
    }

    public function removeToCart($id)
    {
        $user = auth()->user();
        
        Cart::where("product_id", $id)->where("user_id", $user->id)->delete();

        $carts = DB::table('carts')
            ->join("products", "product_id", "=", "products.id")
            ->where("carts.user_id", $user->id)
            ->select('carts.id as id', 'products.price as price', 'carts.quantity as quantity', 'products.image as image', 'products.name as name', 'carts.product_id as product_id', 'carts.user_id as user_id')
            ->get();


        return response()->json([
            "success" => true,
            "carts" => $carts
        ]);
    }
}
