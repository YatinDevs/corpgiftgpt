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
        Schema::create('products', function (Blueprint $table) {
            $table->id(); // Auto-incrementing primary key
            $table->string('product_id', 50)->unique(); // Your original H934, H935 etc.
            $table->string('name');
            $table->foreignId('category_id')->constrained('categories');
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->string('image_url');
            $table->string('size')->nullable();
            $table->timestamps();
            $table->engine = 'InnoDB';
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
