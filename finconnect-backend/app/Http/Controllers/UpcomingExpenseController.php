<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UpcomingExpense;
use Illuminate\Http\JsonResponse;

class UpcomingExpenseController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        // Validate request
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'amount' => 'required|numeric',
            'reference' => 'nullable|string|max:255',
            'date' => 'required|date',
            'category' => 'required|string|max:255',
            'subCategory' => 'required|string|max:255',
            'note' => 'nullable|string',
            'receipt' => 'nullable|file|mimes:jpg,png,pdf|max:2048',
        ]);

        // Handle file upload if present
        if ($request->hasFile('receipt')) {
            $validatedData['receipt'] = $request->file('receipt')->store('receipts', 'public');
        }

        // Save data to the database
        $expense = UpcomingExpense::create($validatedData);

        return response()->json([
            'message' => 'Expense saved successfully',
            'expense' => $expense,
        ], 201);
    }
}
