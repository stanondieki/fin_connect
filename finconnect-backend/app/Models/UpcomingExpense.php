<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UpcomingExpense extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'amount',
        'reference',
        'date',
        'category',
        'subCategory',
        'note',
        'receipt',
    ];
}
