<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IncomeSubCategory extends Model {
    use HasFactory;

    protected $fillable = ['income_category_id', 'sub_category', 'description'];

    public function category() {
        return $this->belongsTo(IncomeCategory::class, 'income_category_id');
    }
}

