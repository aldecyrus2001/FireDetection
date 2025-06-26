<?php

use App\Http\Controllers\contactController;
use App\Http\Controllers\dashboardController;
use App\Http\Controllers\messageController;
use App\Http\Controllers\sensorController;
use App\Http\Controllers\userController;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('users', function () {
        return Inertia::render('user');
    })->name('users');
    Route::post('submit-user', [userController::class, 'addUser'])->name('submit-user');
    Route::get('fetch-users', [userController::class, 'fetch'])->name('fetch-users');

    Route::get('components', function () {
        return Inertia::render('sensors/components');
    })->name('components');
    Route::post('submit-sensor', [sensorController::class, 'addSensor'])->name('submit-sensor');
    Route::get('fetch-sensors', [sensorController::class, 'fetch'])->name('fetch-sensors');
    Route::get('fetch-readings', [sensorController::class, 'fetchReadings'])->name('fetch-readings');
    Route::get('fetch-threshold', [sensorController::class, 'fetchThreshold'])->name('fetch-threshold');
    Route::put('update-threshold', [sensorController::class, 'updateThreshold'])->name('update-threshold');
    Route::get('fetch-dashboards-widgets', [dashboardController::class, 'fetch'])->name('fetch-dashboards-widgets');
    // Route::get('ping-sensor', [sensorController::class, 'ping'])->name('ping-sensor');

    Route::get('readings', function () {
        return Inertia::render('readings');
    })->name('readings');
    Route::get('logs', function () {
        return Inertia::render('logs');
    })->name('logs');


    Route::get('contact-list', function () {
        return Inertia::render('contacts');
    })->name('contacts');
    Route::post('add-contact', [contactController::class, 'addContact'])->name('add-contact');
    Route::get('get-contacts', [contactController::class, 'fetchContacts'])->name('get-contacts');

    Route::get('message', function () {
        return Inertia::render('message');
    })->name('message');
    Route::get('get-messages', [messageController:: class, 'getMessages'])->name('get-messages');
    Route::post('add-message', [messageController::class, 'createMessage']) -> name('add-message');

    Route::post('sensor/data', [sensorController::class, 'fetch_sensor_data'])
        ->name('fetch.sensor.data');

    Broadcast::channel('public-alert', function() {
        return true;
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
