<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class sensorReport extends Model
{
    use HasFactory;

    protected $table = 'sensor_report';

    protected $fillable = [
        'sensorID',
        'lpg_value',
        'co_value',
        'smoke_value',
        'fire_value',
        'date',
        'time'
    ];

    protected $casts = [
        'lpg_value' => 'float',
        'co_value' => 'float',
        'smoke_value' => 'float',
        'fire_value' => 'float',
        'time' => 'string',
    ];

    public function sensor()
    {
        return $this->belongsTo(sensor::class, 'sensorID', 'sensorID');
    }
}
