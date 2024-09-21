<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\CategoryChart;
use Illuminate\Http\Request;

class CategoryChartController extends Controller
{
    public function getCategoryCharts()
    {
        // Fetch users with role supplier and join with category charts and products
        $suppliers = User::where('role', 'supplier')
            ->with(['categoryCharts', 'products']) // assuming you have relationships set up
            ->get()
            ->map(function ($supplier) {
                // Calculate total stock (sum of product quantities)
                $totalStock = $supplier->products->sum('quantity');

                // Calculate out of stock (number of products with quantity 0)
                $outOfStock = $supplier->products->where('quantity', 0)->count();

                // Total orders from category charts (assuming categoryCharts relation exists)
                $totalOrders = $supplier->categoryCharts->sum('orders');

                return [
                    'supplier_name' => $supplier->fullname,
                    'orders' => $totalOrders,
                    'stock' => $totalStock,
                    'out_of_stock' => $outOfStock
                ];
            });

        return response()->json($suppliers);
    }
}
