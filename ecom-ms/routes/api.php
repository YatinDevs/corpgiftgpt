<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\{
    CategoryController,
    ProductController,
    ComboPackController
};

// Main API Resources
Route::apiResources([
    'categories' => CategoryController::class,
    'products' => ProductController::class,
    'combo-packs' => ComboPackController::class,
]);

// Category Relationships
Route::prefix('categories')->group(function () {
    Route::get('{id}/products', [CategoryController::class, 'products']);
    Route::get('active', [CategoryController::class, 'active']); // Get active categories
});

// Combo Pack Relationships
Route::prefix('combo-packs')->group(function () {
    Route::get('{id}/products', [ComboPackController::class, 'products']);
    Route::get('active', [ComboPackController::class, 'active']); // Get active combos
});

// Product Features
Route::prefix('products')->group(function () {
    Route::get('search', [ProductController::class, 'search']);
    Route::get('featured', [ProductController::class, 'featured']);
    Route::get('deals', [ProductController::class, 'deals']); // Special offers
});

// Health Check
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