<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class message extends Model
{
    use HasFactory;

    protected $table = 'message';

    protected $fillable = [
        'title',
        'content',
        'priority',
        'isActive', 
    ];

    protected $casts = [
        'isActive' => 'boolean',
    ];
}
