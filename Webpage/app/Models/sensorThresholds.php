<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class sensorThresholds extends Model
{
    use HasFactory;

    protected $table = 'sensor_thresholds';

    protected $fillable = [
        'co_value',
        'lpg_value',
        'smoke_value',
        'fire_value',
    ];
}
