<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\{
    CategoryController,
    ProductController,
    ComboPackController
};

Route::prefix('categories')->group(function () {
    Route::get('/', [CategoryController::class, 'index']);
    Route::post('/', [CategoryController::class, 'store']);
    Route::get('/{id}', [CategoryController::class, 'show']);
    Route::put('/{id}', [CategoryController::class, 'update']);
    Route::patch('/{id}', [CategoryController::class, 'update']);
    Route::delete('/{id}', [CategoryController::class, 'destroy']);
    
    Route::get('/{id}/products', [CategoryController::class, 'show']);
    Route::get('/{id}/combo-packs', [CategoryController::class, 'comboPacks']);
});

Route::prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'index']);
    Route::post('/', [ProductController::class, 'store']);
    Route::get('/{id}', [ProductController::class, 'show']);
    Route::put('/{id}', [ProductController::class, 'update']);
    Route::patch('/{id}', [ProductController::class, 'update']);
    Route::delete('/{id}', [ProductController::class, 'destroy']);
    Route::get('/search/{query}', [ProductController::class, 'index']);
});

Route::prefix('combo-packs')->group(function () {
    Route::get('/', [ComboPackController::class, 'index']);
    Route::post('/', [ComboPackController::class, 'store']);
    Route::get('/{id}', [ComboPackController::class, 'show']);
    Route::put('/{id}', [ComboPackController::class, 'update']);
    Route::patch('/{id}', [ComboPackController::class, 'update']);
    Route::delete('/{id}', [ComboPackController::class, 'destroy']);
    Route::get('/{id}/products', [ComboPackController::class, 'show']);
    Route::get('/{id}/category', [ComboPackController::class, 'show']);
});

Route::get('/status', function () {
    return response()->json(['status' => 'API is running']);
});

Route::get('/ping', function() {
    return response()->json([
        'status' => 'success',
        'message' => 'API is working',
        'timestamp' => now()
    ]);
});