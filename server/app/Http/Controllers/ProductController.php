<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use App\Models\Cart;

class ProductController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', [
            'except' => [
                'fetchDataProducts',
                'fetchDataCategories',
                'fetchDataProductDetails'
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
        $product = Product::find($id)->first();
        if ($product) {
            return response()->json([
                "success" => true,
                "product" => $product
            ]);
        } else {
            return response()->json([
                "success" => false
            ], 400);
        }
    }

    public function addToCart($id)
    {
        $user = auth()->user();

        $find = Cart::where("product_id", $id)
            ->where("user_id", $user->id)
            ->first();

        if($find) {
            Cart::where("product_id", $id)
            ->update([
                "quantity" => $find->quantity + 1
            ]);
            return response()->json([
                "success" => true
            ]);
        } else {
            $cart = new Cart();
            $cart->user_id = $user->id;
            $cart->product_id = $id;
            $cart->quantity = 1;
            $cart->save();
            return response()->json([
                "success" => true
            ]);
        }
    }
}
