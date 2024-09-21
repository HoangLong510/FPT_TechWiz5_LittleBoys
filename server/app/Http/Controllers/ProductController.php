<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use App\Models\Cart;
use App\Models\Comment;
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
                'fetchComments'
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
        if ($user) {
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

    // comment
    public function addNewComment()
    {
        $error = [];
        $user = auth()->user();

        $productId = request('productId');
        $content = request('content');

        if (!$content) {
            $msg = new \stdClass();
            $msg->en = "Please enter your comment!";
            $msg->vi = "Vui lòng nhập bình luận!";
            array_push($error, $msg);
        } else {
            if (!$user) {
                $msg = new \stdClass();
                $msg->en = "You are not logged in!";
                $msg->vi = "Bạn chưa đăng nhập!";
                array_push($error, $msg);
            }
        }

        if (count($error) > 0) {
            return response()->json([
                "success" => false,
                "message" => $error
            ]);
        } else {
            $comment = new Comment();
            $comment->user_id = $user->id;
            $comment->product_id = $productId;
            $comment->content = $content;
            $comment->save();

            $comments = DB::table('comments')
                ->join("users", "user_id", "=", "users.id")
                ->where("comments.product_id", $productId)
                ->select('comments.id as id', 'users.fullname as fullname', 'comments.content as content', 'comments.created_at as created_at')
                ->orderBy("created_at", "desc")
                ->get();

            $msg = new \stdClass();
            $msg->en = "Comment successfully!";
            $msg->vi = "Bình luận thành công!";

            return response()->json([
                "success" => true,
                "message" => [$msg],
                "comments" => $comments
            ]);
        }
    }

    public function fetchComments($productId)
    {
        $comments = DB::table('comments')
            ->join("users", "user_id", "=", "users.id")
            ->where("comments.product_id", $productId)
            ->select('comments.id as id', 'users.fullname as fullname', 'comments.content as content', 'comments.created_at as created_at')
            ->orderBy("created_at", "desc")
            ->get();

        return response()->json([
            "success" => true,
            "comments" => $comments
        ]);
    }
}
