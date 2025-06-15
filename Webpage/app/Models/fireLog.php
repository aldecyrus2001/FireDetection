<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class fireLog extends Model
{
    use HasFactory;

    protected $table = 'firelog';
    protected $fillable = [
        'level'
    ];

    public function sensor()
    {
        return $this->belongsTo(Sensor::class, 'sensorID', 'sensorID');
    }
}
