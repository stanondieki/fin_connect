<?php

namespace App\Http\Controllers;

use App\Models\FinancialGoal;
use Illuminate\Http\Request;

class FinancialGoalController extends Controller {
    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'opening' => 'required|numeric|min:0',
            'target' => 'required|numeric|min:0',
            'target_date' => 'required|date',
        ]);

        $goal = FinancialGoal::create($validated);
        return response()->json(['message' => 'Financial goal added successfully!', 'goal' => $goal], 201);
    }
}

