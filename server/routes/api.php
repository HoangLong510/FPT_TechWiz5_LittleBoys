<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ManagementController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\supplierController;
use App\Http\Controllers\CategoryController;

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
    Route::post('register-supplier/{id}', [AuthController::class, 'updateToSupplier']);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'management'
], function ($router) {
    Route::post('/fetch-data-chart', [ManagementController::class, 'fetchDataChart']);//first chart
    Route::post('/fetch-data-secondchart', [ManagementController::class, 'fetchAccountStatistics']);//second chart
    Route::post('/fetch-accounts', [ManagementController::class, 'fetchAccounts']);
    Route::get('/fetch-account-detail/{id}', [ManagementController::class, 'fetchAccountDetail']);
    Route::post('/account/update', [ManagementController::class, 'updateAccount']);
    Route::get('/lock-account/{id}', [ManagementController::class, 'lockAccount']);
    Route::get('/unlock-account/{id}', [ManagementController::class, 'unlockAccount']);

    Route::get('/supplier', [ManagementController::class, 'getSuppliers']);
    Route::put('/change-role/{id}', [ManagementController::class, 'changeRole']);



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

    //hoat động
    Route::get('/fetch-activity-logs', [ManagementController::class, 'fetchActivityLogs']);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'user'
], function ($router) {
    Route::post('update', [UserController::class, 'userUpdate']);

    Route::get('add-to-cart/{id}', [UserController::class, 'addToCart']);
    Route::get('remove-to-cart/{id}', [UserController::class, 'removeToCart']);
    Route::get('fetch-data-cart', [UserController::class, 'fetchDataCart']);
    Route::post('update-quantity-cart', [UserController::class, 'updateQuantityCart']);
    Route::post('fetch-favorites', [UserController::class, 'fetchFavorites']);
    Route::get('remove-favorite/{id}', [UserController::class, 'removeFavorite']);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'product'
], function ($router) {
    Route::post('fetch-data-products', [ProductController::class, 'fetchDataProducts']);
    Route::get('fetch-data-categories', [ProductController::class, 'fetchDataCategories']);
    Route::get('fetch-data-product-detail/{id}', [ProductController::class, 'fetchDataProductDetails']);

    // comment
    Route::post('comment', [ProductController::class, 'addNewComment']);
    Route::get('fetch-comments/{productId}', [ProductController::class, 'fetchComments']);
    Route::post('remove-comment', [ProductController::class, 'removeComment']);

    // favorite
    Route::get('toggle-favorite/{productId}', [ProductController::class, 'toggleFavorite']);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'supplier'
], function ($router) {
    Route::post('/fetch-data-chart', [supplierController::class, 'fetchSupplierDataChart']);
    Route::post('/products/create', [supplierController::class, 'createProduct']);
    Route::post('/products/{id}', [supplierController::class, 'updateProduct']);
    Route::delete('/products/{id}', [supplierController::class, 'deleteProduct']);
    Route::get('/products', [supplierController::class, 'getProducts']);
    Route::get('/products/{id}', [supplierController::class, 'getProduct']);

    //cate
    Route::get('/categories', [supplierController::class, 'getCategories']);

});
