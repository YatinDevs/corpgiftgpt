<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ComboPack;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class ComboPackController extends Controller
{
    public function index(Request $request)
    {
        $query = ComboPack::with(['products', 'category']);

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%$search%")
                  ->orWhere('description', 'like', "%$search%")
                  ->orWhere('combo_code', 'like', "%$search%");
            });
        }

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->has('is_active')) {
            $query->where('is_active', $request->is_active);
        }

        $comboPacks = $query->paginate($request->per_page ?? 15);
        return response()->json($comboPacks);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category_id' => 'required|exists:categories,id',
            'combo_code' => 'required|unique:combo_packs,combo_code',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'discount_price' => 'nullable|numeric|min:0',
            'is_active' => 'boolean',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'products' => 'required|array',
            'products.*.id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
        ]);

        $validator->after(function ($validator) use ($request) {
            if ($request->has('products')) {
                $products = Product::whereIn('id', collect($request->products)->pluck('id'))
                    ->get();
                    
                if ($products->pluck('category_id')->unique()->count() > 1) {
                    $validator->errors()->add('products', 'All products must belong to the same category');
                }
                
                if ($request->category_id && !$products->every(function ($product) use ($request) {
                    return $product->category_id == $request->category_id;
                })) {
                    $validator->errors()->add('category_id', 'Products must belong to the selected category');
                }
            }
        });

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $data = $validator->validated();

        if ($request->hasFile('images')) {
            $imagePaths = [];
            foreach ($request->file('images') as $image) {
                $imagePaths[] = $image->store('combo_packs', 'public');
            }
            $data['images'] = $imagePaths;
        }

        DB::beginTransaction();

        try {
            $comboPack = ComboPack::create($data);

            $productsToAttach = [];
            foreach ($request->products as $product) {
                $productsToAttach[$product['id']] = ['quantity' => $product['quantity']];
            }
            $comboPack->products()->sync($productsToAttach);

            DB::commit();
            return response()->json($comboPack->load(['products', 'category']), 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to create combo pack: ' . $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        $comboPack = ComboPack::with(['products', 'category'])->findOrFail($id);
        return response()->json($comboPack);
    }

    public function update(Request $request, $id)
    {
        $comboPack = ComboPack::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'category_id' => 'sometimes|required|exists:categories,id',
            'combo_code' => 'sometimes|required|unique:combo_packs,combo_code,'.$id,
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'sometimes|required|numeric|min:0',
            'discount_price' => 'nullable|numeric|min:0',
            'is_active' => 'boolean',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'products' => 'sometimes|required|array',
            'products.*.id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
        ]);

        $validator->after(function ($validator) use ($request, $comboPack) {
            if ($request->has('products')) {
                $products = Product::whereIn('id', collect($request->products)->pluck('id'))
                    ->get();
                    
                if ($products->pluck('category_id')->unique()->count() > 1) {
                    $validator->errors()->add('products', 'All products must belong to the same category');
                }
                
                $categoryId = $request->category_id ?? $comboPack->category_id;
                if ($categoryId && !$products->every(function ($product) use ($categoryId) {
                    return $product->category_id == $categoryId;
                })) {
                    $validator->errors()->add('category_id', 'Products must belong to the selected category');
                }
            }
        });

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $data = $validator->validated();

        if ($request->hasFile('images')) {
            if ($comboPack->images) {
                foreach ($comboPack->images as $oldImage) {
                    \Storage::disk('public')->delete($oldImage);
                }
            }

            $imagePaths = [];
            foreach ($request->file('images') as $image) {
                $imagePaths[] = $image->store('combo_packs', 'public');
            }
            $data['images'] = $imagePaths;
        }

        DB::beginTransaction();

        try {
            $comboPack->update($data);

            if ($request->has('products')) {
                $productsToAttach = [];
                foreach ($request->products as $product) {
                    $productsToAttach[$product['id']] = ['quantity' => $product['quantity']];
                }
                $comboPack->products()->sync($productsToAttach);
            }

            DB::commit();
            return response()->json($comboPack->load(['products', 'category']));
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to update combo pack: ' . $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        $comboPack = ComboPack::findOrFail($id);
        
        if ($comboPack->images) {
            foreach ($comboPack->images as $image) {
                \Storage::disk('public')->delete($image);
            }
        }

        $comboPack->delete();

        return response()->json(null, 204);
    }
}