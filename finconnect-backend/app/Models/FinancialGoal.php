<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FinancialGoal extends Model {
    use HasFactory;

    protected $fillable = ['name', 'opening', 'target', 'target_date'];
}

