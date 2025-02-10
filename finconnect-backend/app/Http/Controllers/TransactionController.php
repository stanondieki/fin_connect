<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\IncomeTransaction;
use App\Models\ExpenseTransaction;
use Illuminate\Support\Facades\Validator;

class TransactionController extends Controller
{
    public function storeIncome(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'reference' => 'nullable|string|max:255',
            'date' => 'required|date',
            'account' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'sub_category' => 'required|string|max:255',
            'note' => 'nullable|string',
            'receipt' => 'nullable|file|mimes:jpg,png,pdf|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->all();

        // Handle file upload
        if ($request->hasFile('receipt')) {
            $data['receipt'] = $request->file('receipt')->store('receipts', 'public');
        }

        $income = IncomeTransaction::create($data);

        return response()->json(['message' => 'Income Transaction saved successfully', 'data' => $income], 201);
    }

    public function storeExpense(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'reference' => 'nullable|string|max:255',
            'date' => 'required|date',
            'account' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'sub_category' => 'required|string|max:255',
            'note' => 'nullable|string',
            'receipt' => 'nullable|file|mimes:jpg,png,pdf|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->all();

        // Handle file upload
        if ($request->hasFile('receipt')) {
            $data['receipt'] = $request->file('receipt')->store('receipts', 'public');
        }

        $expense = ExpenseTransaction::create($data);

        return response()->json(['message' => 'Expense Transaction saved successfully', 'data' => $expense], 201);
    }
}

