<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;

class ReportController extends Controller
{
    public function incomeReport()
    {
        $income = Transaction::where('type', 'income')->get();
        return response()->json(['data' => $income]);
    }

    public function expenseReport()
    {
        $expenses = Transaction::where('type', 'expense')->get();
        return response()->json(['data' => $expenses]);
    }

    public function incomeVsExpense()
    {
        $income = Transaction::where('type', 'income')->sum('amount');
        $expenses = Transaction::where('type', 'expense')->sum('amount');

        return response()->json([
            'income' => $income,
            'expenses' => $expenses,
            'balance' => $income - $expenses
        ]);
    }

    public function upcomingIncome()
    {
        $upcomingIncome = Transaction::where('type', 'income')
            ->where('status', 'pending')
            ->get();

        return response()->json(['data' => $upcomingIncome]);
    }

    public function incomeMonthlyReport()
    {
        $income = Transaction::where('type', 'income')
            ->selectRaw('MONTH(created_at) as month, SUM(amount) as total')
            ->groupBy('month')
            ->get();

        return response()->json(['data' => $income]);
    }

    public function expenseMonthlyReport()
    {
        $expenses = Transaction::where('type', 'expense')
            ->selectRaw('MONTH(created_at) as month, SUM(amount) as total')
            ->groupBy('month')
            ->get();

        return response()->json(['data' => $expenses]);
    }

    public function accountTransactionReport()
    {
        $transactions = Transaction::orderBy('created_at', 'desc')->get();
        return response()->json(['data' => $transactions]);
    }

    public function upcomingExpense()
    {
        $upcomingExpenses = Transaction::where('type', 'expense')
            ->where('status', 'pending')
            ->get();

        return response()->json(['data' => $upcomingExpenses]);
    }
}
