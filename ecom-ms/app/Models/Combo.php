<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Combo extends Model
{
    /** @use HasFactory<\Database\Factories\ComboFactory> */
    use HasFactory;

    protected $fillable = [
        'combo_id', 'name', 'description', 'price', 'image_url'
    ];

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'combo_product')
            ->withPivot('quantity');
    }
}
