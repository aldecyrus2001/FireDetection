<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class contacts extends Model
{
    use HasFactory;

    protected $table = "contact";

    protected $fillable = [
        'name',
        'phone',
        'priority_level',
    ];

    
}
