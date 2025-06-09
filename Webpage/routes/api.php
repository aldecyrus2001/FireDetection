<?php

use App\Http\Controllers\sensorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('sensor/heartbeat', [sensorController::class, 'heartbeat'])
        ->name('heartbeat');
