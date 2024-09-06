<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', [AuthController::class, 'login']);
    Route::get('fetch-data', [AuthController::class, 'fetchData']);
    Route::post('register', [AuthController::class, 'register']);
    Route::get('refresh', [AuthController::class, 'refresh']);
    Route::post('send-verification-code', [AuthController::class, 'sendVerificationCode']);
    Route::post('check-verification-code', [AuthController::class, 'checkVerificationCode']);
    Route::post('reset-password', [AuthController::class, 'resetPassword']);
});
