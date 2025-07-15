<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with(['category', 'variants.options', 'items', 'combos'])
            ->when($request->category, function ($query, $category) {
                $query->whereHas('category', function ($q) use ($category) {
                    $q->where('slug', $category);
                });
            })
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%");
            });

        return ProductResource::collection(
            $request->has('all') 
                ? $query->get() 
                : $query->paginate($request->per_page ?? 15)
        );
    }

    public function store(StoreProductRequest $request)
    {
        $product = Product::create($request->validated());
        
        if ($request->has('variants')) {
            $this->syncVariants($product, $request->variants);
        }
        
        if ($request->has('items')) {
            $product->items()->createMany($request->items);
        }
        
        return new ProductResource($product->load(['category', 'variants.options', 'items']));
    }

    public function show(Product $product)
    {
        return new ProductResource($product->load(['category', 'variants.options', 'items', 'combos']));
    }

    public function update(UpdateProductRequest $request, Product $product)
    {
        $product->update($request->validated());
        
        if ($request->has('variants')) {
            $this->syncVariants($product, $request->variants);
        }
        
        if ($request->has('items')) {
            $product->items()->delete();
            $product->items()->createMany($request->items);
        }
        
        return new ProductResource($product->load(['category', 'variants.options', 'items']));
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->noContent();
    }

    protected function syncVariants(Product $product, array $variants)
    {
        $product->variants()->delete();
        
        foreach ($variants as $variantData) {
            $variant = $product->variants()->create([
                'name' => $variantData['name']
            ]);
            
            if (isset($variantData['options'])) {
                $variant->options()->createMany(
                    array_map(fn($value) => ['value' => $value], $variantData['options'])
                );
            }
        }
    }
} 