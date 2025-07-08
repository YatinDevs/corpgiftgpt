<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreComboRequest;
use App\Http\Resources\ComboResource;
use App\Models\Combo;
use Illuminate\Http\Request;

class ComboController extends Controller
{
    public function index(Request $request)
    {
        $combos = Combo::with('products')->get();
        return ComboResource::collection($combos);
    }

    public function store(StoreComboRequest $request)
    {
        $combo = Combo::create($request->only(['name', 'description', 'price', 'image_url']));
        
        if ($request->has('products')) {
            $this->syncProducts($combo, $request->products);
        }
        
        return new ComboResource($combo->load('products'));
    }

    public function show(Combo $combo)
    {
        return new ComboResource($combo->load('products'));
    }

    protected function syncProducts(Combo $combo, array $products)
    {
        $syncData = [];
        
        foreach ($products as $product) {
            $syncData[$product['id']] = ['quantity' => $product['quantity'] ?? 1];
        }
        
        $combo->products()->sync($syncData);
    }
}