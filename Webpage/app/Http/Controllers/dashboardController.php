<?php

namespace App\Http\Controllers;

use App\Models\Sensor;
use App\Models\User;
use Illuminate\Http\Request;

class dashboardController extends Controller
{
    public function fetch() {
        $totalUsers = User::count();
        $totalSensors = Sensor::count();
        $offlineSensor = Sensor::where('status', 'offline')->count();

        return response()->json([
            'users' => $totalUsers,
            'sensors' => $totalSensors,
            'offlineSensors' => $offlineSensor
        ]);
    }
}
