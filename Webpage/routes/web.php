<?php

use App\Http\Controllers\sensorController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('users', function() {
        return Inertia::render('user');
    })->name('users');

    Route::get('components', function() {return Inertia::render('sensors/components');}) -> name('components');
    Route::post('submit-sensor', [sensorController::class, 'addSensor']) -> name('submit-sensor');
    Route::get('fetch-sensors', [sensorController::class, 'fetch']) -> name('fetch-sensors');
    // Route::get('ping-sensor', [sensorController::class, 'ping'])->name('ping-sensor');

    
    Route::get('logs', function() {return Inertia::render('logs');}) -> name('logs');

    Route::get('contact-list', function() {return Inertia::render('contacts');}) -> name('contacts');

    Route::get('message', function() {return Inertia::render('message');}) -> name('message');
    
    Route::post('sensor/data',[sensorController::class, 'fetch_sensor_data'])
    ->name('fetch.sensor.data');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
