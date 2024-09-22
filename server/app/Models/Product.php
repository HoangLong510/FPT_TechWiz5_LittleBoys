<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    // Danh sách các thuộc tính có thể gán giá trị
    protected $fillable = ['name', 'user_id', 'price', 'quantity', 'category_id', 'description', 'image'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Định nghĩa quan hệ với Category
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

}
