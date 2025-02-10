<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('financial_goals', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->decimal('opening', 15, 2);
            $table->decimal('target', 15, 2);
            $table->date('target_date');
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('financial_goals');
    }
};

