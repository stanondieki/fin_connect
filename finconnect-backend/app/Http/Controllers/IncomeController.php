<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Income;
use Illuminate\Support\Facades\Storage;

class IncomeController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'amount' => 'required|numeric',
            'reference' => 'nullable|string|max:255',
            'date' => 'required|date',
            'category' => 'required|string|max:255',
            'sub_category' => 'required|string|max:255',
            'note' => 'nullable|string',
            'receipt' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        $receiptPath = null;
        if ($request->hasFile('receipt')) {
            $receiptPath = $request->file('receipt')->store('receipts', 'public');
        }

        $income = Income::create([
            'name' => $request->name,
            'amount' => $request->amount,
            'reference' => $request->reference,
            'date' => $request->date,
            'category' => $request->category,
            'sub_category' => $request->sub_category,
            'note' => $request->note,
            'receipt' => $receiptPath,
        ]);

        return response()->json(['message' => 'Income added successfully', 'income' => $income], 201);
    }
}

