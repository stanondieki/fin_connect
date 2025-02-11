<?php

namespace App\Http\Controllers;

use App\Models\IncomeSubCategory;
use Illuminate\Http\Request;

class IncomeSubCategoryController extends Controller {
    public function index() {
        return response()->json(IncomeSubCategory::with('category')->get());
    }

    public function store(Request $request) {
        $request->validate([
            'income_category_id' => 'required|exists:income_categories,id',
            'sub_category' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $subCategory = IncomeSubCategory::create($request->all());

        return response()->json($subCategory, 201);
    }
}
