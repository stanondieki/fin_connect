<?php

namespace App\Http\Controllers;

use App\Models\IncomeCategory;
use Illuminate\Http\Request;

class IncomeCategoryController extends Controller {
    public function index() {
        return response()->json(IncomeCategory::with('subCategories')->get());
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'color' => 'nullable|string',
        ]);

        $category = IncomeCategory::create($request->all());

        return response()->json($category, 201);
    }
}

