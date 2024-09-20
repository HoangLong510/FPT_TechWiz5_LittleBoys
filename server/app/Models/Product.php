<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    // Danh sách các thuộc tính có thể gán giá trị
    protected $fillable = ['name', 'supplier_id', 'price', 'quantity', 'category_id', 'description', 'image'];

    // Định nghĩa quan hệ với supplier
    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    // Định nghĩa quan hệ với Category
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
