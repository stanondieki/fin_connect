<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IncomeCategory extends Model {
    use HasFactory;

    protected $fillable = ['name', 'description', 'color'];

    public function subCategories() {
        return $this->hasMany(IncomeSubCategory::class, 'income_category_id');
    }
}
