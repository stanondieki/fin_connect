<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class BudgetController extends Controller {
    public function store(Request $request): JsonResponse {
        $validated = $request->validate([
            'month' => 'required|string',
            'year' => 'required|integer',
            'category' => 'required|string',
            'subcategory' => 'required|string',
            'amount' => 'required|numeric|min:0',
        ]);

        $budget = Budget::create($validated);
        return response()->json(['message' => 'Budget saved successfully', 'data' => $budget], 201);
    }

    public function index(): JsonResponse {
        return response()->json(Budget::all());
    }
}

