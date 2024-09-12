<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'fullname' => 'admin',
            'email' => 'admin',
            'phone' => '',
            'role' => 'admin',
            'password' => Hash::make('123456'),
            'address'=> '',
            'gender'=> 'male'
        ]);
    }
}
