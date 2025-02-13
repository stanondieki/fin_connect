<?php

namespace App\Http\Controllers;

use App\Models\Debt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DebtController extends Controller
{
    public function index()
    {
        return response()->json(Auth::user()->debts, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'interest' => 'required|numeric|min:0|max:100',
            'investment_date' => 'required|date',
            'maturity_date' => 'required|date|after:investment_date',
        ]);

        $debt = Auth::user()->debts()->create($request->all());

        return response()->json($debt, 201);
    }

    public function destroy(Debt $debt)
    {
        if ($debt->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $debt->delete();
        return response()->json(['message' => 'Debt deleted successfully'], 200);
    }
}
