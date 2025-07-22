<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sensor extends Model
{
    use HasFactory;

    protected $table = 'sensor';
    protected $primaryKey = 'sensorID';

    protected $fillable = [
        'sensor_name',
        'sensor_location',
        'token',
        'x_axis',
        'y_axis',
        'last_seen',
        'status',
        'isAlert',
    ];

    protected $casts = [
        'x_axis' => 'float',
        'y_axis' => 'float',
        'isAlert' => 'boolean',
    ];

    public function readings()
    {
        return $this->hasMany(SensorData::class, 'sensorID', 'sensorID');
    }
}
