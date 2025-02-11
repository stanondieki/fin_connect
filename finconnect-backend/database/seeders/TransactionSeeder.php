<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Transaction;

class TransactionSeeder extends Seeder
{
    public function run()
    {
        Transaction::create(['type' => 'income', 'amount' => 5000, 'status' => 'completed']);
        Transaction::create(['type' => 'expense', 'amount' => 2000, 'status' => 'completed']);
        Transaction::create(['type' => 'income', 'amount' => 3000, 'status' => 'pending']);
        Transaction::create(['type' => 'expense', 'amount' => 1000, 'status' => 'pending']);
    }
}

