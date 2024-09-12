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
    Route::post('/get-accounts', [ManagementController::class,'getAccounts']);
    Route::get('/get-account-detail/{id}', [ManagementController::class,'getAccountDetail']);
    Route::post('/update-role', [ManagementController::class,'updateAccountRole']);
    Route::get('/lock-account/{id}', [ManagementController::class,'lockAccount']);
    Route::get('/unlock-account/{id}', [ManagementController::class,'unlockAccount']);
});