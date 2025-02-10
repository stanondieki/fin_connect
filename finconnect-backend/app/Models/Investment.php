<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Investment extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'amount', 'interest', 'date', 'maturity_date'];
    protected $casts = [
        'date' => 'date:Y-m-d',
        'maturityDate' => 'date:Y-m-d',
    ];
    
}
