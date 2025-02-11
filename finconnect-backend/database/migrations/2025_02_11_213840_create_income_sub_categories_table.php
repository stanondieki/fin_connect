<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('income_sub_categories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('income_category_id')->constrained('income_categories')->onDelete('cascade');
            $table->string('sub_category');
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('income_sub_categories');
    }
};

