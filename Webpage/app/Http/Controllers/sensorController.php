<?php

namespace App\Http\Controllers;

use App\Models\sensor;
use App\Models\sensorData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

use function Laravel\Prompts\error;

class sensorController extends Controller
{

    public function addSensor(Request $request)
    {
        $request->validate([
            'sensor_name' => 'required|string',
            'sensor_location' => 'required|string',
            'ipaddress' => 'required|string',
            'x_axis' => 'required|string',
            'y_axis' => 'required|string',
        ]);

        if (Sensor::where('ipaddress', $request->ipaddress)->exists()) {
            return redirect()->back()->withErrors([
                'ipaddress' => 'The IP address is already in use.'
            ])->withInput();
        }

        $data = $request->all();

        $data['status'] = 'Offline';
        $data['isAlert'] = 0;

        Sensor::create($data);

        return redirect()->back()->with('success', 'Sensor added successfully.');
    }

    public function fetch()
    {
        return Sensor::all();
    }

    public function fetch_sensor_data()
    {
        $sensors = Sensor::with(['readings' => function ($query) {
            $query->orderBy('time', 'asc'); // Fetch all readings, ordered from oldest to newest
        }])->get();

        // Transform to match your desired structure
        $result = $sensors->map(function ($sensor) {
            return [
                'sensorID' => $sensor->sensorID,
                'sensor_name' => $sensor->sensor_name,
                'isAlert' => $sensor->isAlert,
                'readings' => $sensor->readings->map(function ($reading) {
                    return [
                        'time' => $reading->time,
                        'lpg_value' => $reading->lpg_value,
                        'co_value' => $reading->co_value,
                        'smoke_value' => $reading->smoke_value,
                        'fire_value' => $reading->fire_value,
                    ];
                }),
            ];
        });

        return response()->json($result);
    }

    // public function ping(Request $request)
    // {
    //     $sensorID = $request->input('sensorID');
    //     $ipAddress = $request->input('ipAddress');

        

    //     try {
    //         $espResponse = Http::timeout(5)->get("http://{$ipAddress}/handshake");

    //         if ($espResponse->ok() && $espResponse->body() === 'ready') {
    //             Sensor::where('sensorID', $sensorID)->update(['status' => 'Online']);
    //             return response()->json([
    //                 'success' => true,
    //                 'message' => 'Sensor Online'
    //             ]);
    //         } else {
    //             return response()->json([
    //                 'success' => false,
    //                 'message' => 'Sensor Unreachable!'
    //             ]);
    //         }
    //     } catch (\Exception $e) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Sensor is offline or unreachable.',
    //             'error' => $e->getMessage()
    //         ]);
    //     }
    // }

    public function heartbeat(Request $request)
    {
        $ipAddress = $request->input('ipAddress');

        $sensor = Sensor::where('ipaddress', $ipAddress)->first();

        if (!$sensor) {
            return response()->json(['success' => false, 'message' => 'Sensor not found'], 404);
        }

        $sensor->update([
            'last_seen' => now(),
            'status' => 'Online',
        ]);

        sensorData::create([
            'sensorID' => $sensor->sensorID,
            'lpg_value' => $request->input('LPG'),
            'co_value' => $request->input('CO'),
            'smoke_value' => $request->input('Smoke'),
            'fire_value' => $request->input('Fire'),
            'time' => now()->format('H:i:s'),
            'date' => now()->format('Y-m-d'),
        ]);

        return response()->json(['success' => true, 'message' => 'Heartbeat and readings saved']);
    }
}
