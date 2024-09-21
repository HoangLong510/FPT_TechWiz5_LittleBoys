<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = ['type', 'fullname', 'email', 'phone', 'address', 'user_id', 'note'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
