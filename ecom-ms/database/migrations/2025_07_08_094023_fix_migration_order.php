<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // This ensures proper foreign key relationships
        Schema::disableForeignKeyConstraints();
        
        // Drop tables in reverse order of creation
        Schema::dropIfExists('combo_product');
        Schema::dropIfExists('combos');
        Schema::dropIfExists('product_variant_options');
        Schema::dropIfExists('product_variants');
        Schema::dropIfExists('product_items');
        Schema::dropIfExists('products');
        Schema::dropIfExists('categories');
        
        Schema::enableForeignKeyConstraints();
        
        // Now re-run all migrations properly
        Artisan::call('migrate');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
