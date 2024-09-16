<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ManagementController;

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('fetch-data', [AuthController::class, 'fetchData']);
    Route::post('register', [AuthController::class, 'register']);
    Route::get('refresh', [AuthController::class, 'refresh']);
    Route::post('send-verification-code', [AuthController::class, 'sendVerificationCode']);
    Route::post('check-verification-code', [AuthController::class, 'checkVerificationCode']);
    Route::post('reset-password', [AuthController::class, 'resetPassword']);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'management'
], function ($router) {
    Route::post('/fetch-accounts', [ManagementController::class,'fetchAccounts']);
    Route::get('/fetch-account-detail/{id}', [ManagementController::class,'fetchAccountDetail']);
    Route::post('/account/update', [ManagementController::class,'updateAccount']);
    Route::get('/lock-account/{id}', [ManagementController::class,'lockAccount']);
    Route::get('/unlock-account/{id}', [ManagementController::class,'unlockAccount']);

    Route::post('/create-brand', [ManagementController::class, 'createBrand']);
    Route::get('/brands', [ManagementController::class, 'getBrands']);
    Route::get('/get-brand-detail/{id}', [ManagementController::class, 'getBrandDetail']);
    Route::post('/update-brand/{id}', [ManagementController::class, 'updateBrand']);
    Route::delete('/delete-brand/{id}', [ManagementController::class, 'deleteBrand']);

    // Các route cho Category
    Route::post('/create-category', [ManagementController::class, 'createCategory']);
    Route::get('/categories', [ManagementController::class, 'getCategories']);
    Route::get('/get-category-detail/{id}', [ManagementController::class, 'getCategoryDetail']);
    Route::post('/update-category/{id}', [ManagementController::class, 'updateCategory']);
    Route::delete('/delete-category/{id}', [ManagementController::class, 'deleteCategory']);

    //product
    Route::post('/products', [ManagementController::class, 'createProduct']);
    Route::post('/products/{id}', [ManagementController::class, 'updateProduct']);
    Route::delete('/products/{id}', [ManagementController::class, 'deleteProduct']);
    Route::get('/products', [ManagementController::class, 'getProducts']);
    Route::get('/products/{id}', [ManagementController::class, 'getProduct']);
});