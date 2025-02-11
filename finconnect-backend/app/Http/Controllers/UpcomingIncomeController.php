<?php

namespace App\Http\Controllers;

use App\Models\UpcomingIncome;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UpcomingIncomeController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'amount' => 'required|numeric',
            'reference' => 'nullable|string|max:255',
            'date' => 'required|date',
            'category' => 'required|string|max:255',
            'sub_category' => 'nullable|string|max:255',
            'note' => 'nullable|string',
            'receipt' => 'nullable|file|mimes:jpg,png,pdf|max:2048',
        ]);

        $receiptPath = $request->file('receipt') 
            ? $request->file('receipt')->store('receipts', 'public') 
            : null;

        UpcomingIncome::create([
            'name' => $request->name,
            'amount' => $request->amount,
            'reference' => $request->reference,
            'date' => $request->date,
            'category' => $request->category,
            'sub_category' => $request->sub_category,
            'note' => $request->note,
            'receipt' => $receiptPath,
        ]);

        return response()->json(['message' => 'Upcoming income saved successfully!'], 201);
    }
}

