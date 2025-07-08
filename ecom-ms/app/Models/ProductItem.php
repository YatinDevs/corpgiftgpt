<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductItem extends Model
{
    /** @use HasFactory<\Database\Factories\ProductItemFactory> */
    use HasFactory;
    
    protected $fillable = ['product_id', 'name'];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

}
