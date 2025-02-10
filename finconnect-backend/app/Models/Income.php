<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Income extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'amount',
        'reference',
        'date',
        'category',
        'sub_category',
        'note',
        'receipt',
    ];
}

