<?php

namespace App\Http\Controllers;

use App\Models\Investment;
use Illuminate\Http\Request;

class InvestmentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'amount' => 'required|numeric',
            'interest' => 'required|numeric',
            'date' => 'required|date',
            'maturity_date' => 'required|date|after_or_equal:date',
        ]);

        $investment = Investment::create($request->all());

        return response()->json([
            'message' => 'Investment saved successfully',
            'investment' => $investment
        ], 201);
    }

    public function index()
    {
        return response()->json(Investment::all(), 200);
    }

    public function destroy($id)
    {
        $investment = Investment::findOrFail($id);
        $investment->delete();

        return response()->json(['message' => 'Investment deleted successfully'], 200);
    }
}

