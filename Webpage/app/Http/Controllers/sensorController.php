<?php

namespace App\Http\Controllers;

use App\Events\AssignToClassEvent;
use App\Mail\AlertMail;
use App\Models\contacts;
use App\Models\sensor;
use App\Models\sensorData;
use App\Models\sensorThresholds;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Nette\Schema\Elements\Structure;
use Predis\Command\Redis\Json\JSONDEL;

use function Laravel\Prompts\error;

class sensorController extends Controller
{

    public function addSensor(Request $request)
    {
        $request->validate([
            'sensor_name' => 'required|string',
            'sensor_location' => 'required|string',
            'token' => 'required|string|max:255',
            'x_axis' => 'required|string',
            'y_axis' => 'required|string',
        ]);

        if (Sensor::where('token', $request->token)->exists()) {
            return redirect()->back()->withErrors([
                'token' => 'Sensor is already registered.'
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
    public function fetchReadings()
    {
        $readings = SensorData::with('sensor') // eager load sensor data
            ->orderBy('date', 'desc')
            ->limit(100) // optional limit
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'sensor_name' => $item->sensor->sensor_name ?? 'N/A',
                    'sensor_location' => $item->sensor->sensor_location ?? 'N/A',
                    'lpg_value' => $item->lpg_value,
                    'co_value' => $item->co_value,
                    'smoke_value' => $item->smoke_value,
                    'fire_value' => $item->fire_value,
                    'date' => $item->date . ' ' . $item->time,
                ];
            });

        return response()->json($readings);
    }

    public function fetchThreshold()
    {
        return sensorThresholds::find(1);
    }

    public function updateThreshold(Request $request)
    {
        $request->validate([
            'co_value' => 'required|numeric|min:0',
            'lpg_value' => 'required|numeric|min:0',
            'smoke_value' => 'required|numeric|min:0',
            'fire_value' => 'required|numeric|min:0',
        ]);

        $threshold = sensorThresholds::find(1);

        if (!$threshold) {
            return redirect()->back()->with('message', 'Threshold not found.');
        }

        $threshold->update([
            'co_value' => $request->co_value,
            'lpg_value' => $request->lpg_value,
            'smoke_value' => $request->smoke_value,
            'fire_value' => $request->fire_value,
        ]);

        return redirect()->back()->with('success', 'Threshold updated successfully.');
    }

    public function fetch_sensor_data()
    {
        $sensors = Sensor::with(['readings' => function ($query) {
            $query->orderBy('time', 'asc');
        }])->get();

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

    public function heartbeat(Request $request)
    {
        $token = $request->input('token');

        $sensor = Sensor::where('token', $token)->first();

        if (!$sensor) {
            return response()->json(['error' => false, 'message' => 'Sensor not found'], 404);
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

        $threshold = sensorThresholds::find(1);
        $LPG = $request->input('LPG');
        $CO = $request->input('CO');
        $Smoke = $request->input('Smoke');
        $Fire = $request->input('Fire');


        $level = 'Neutral';

        if ($LPG > ($threshold->lpg_value + 40) || $CO > ($threshold->co_value + 40) || $Smoke > ($threshold->smoke_value + 40) || $Fire == 1) {
            $level = "High";
        } elseif ($LPG > ($threshold->lpg_value + 10) || $CO > ($threshold->co_value + 10) || $Smoke > ($threshold->smoke_value + 10)) {
            $level = "Moderate";
        } elseif ($LPG >= $threshold->lpg_value || $CO >= $threshold->co_value || $Smoke >= $threshold->smoke_value) {
            $level = "Low";
        }

        $coordinate = [
            'sensor' => $sensor->sensor_name,
            'top' => (float) $sensor->x_axis,
            'left' => (float) $sensor->y_axis,
            'level' => $level
        ];

        $coordinates = Cache::get('active_coordinates', []);
        $coordinates = array_filter($coordinates, fn($coord) => $coord['sensor'] !== $sensor->name);
        $coordinates[] = $coordinate;
        Cache::put('active_coordinates', $coordinates, now()->addMinutes(5));


        if ($level !== 'Neutral') {
            if ($sensor->isAlert === false) {
                $sensor->update([
                    'isAlert' => true,
                ]);
            }
            Cache::put('active_coordinates', array_values($coordinates), now()->addMinutes(5));
            event(new AssignToClassEvent($coordinates));
            $key = 'last_email_sent_' . $sensor->sensorID;
            $lastEmailSent = Cache::get($key);

            $priorityContacts = [];

            if (!$lastEmailSent || now()->diffInMinutes($lastEmailSent) >= 5) {

                if ($level == "High") {
                    $priorityContacts = contacts::whereNotNull('email')->get();
                } else if ($level == "Moderate") {
                    $priorityContacts = contacts::whereNotNull('email')
                        ->whereIn('priority_level', ['Moderate', 'Low'])
                        ->get();
                } else {
                    $priorityContacts = contacts::whereNotNull('email')
                        ->where('priority_level', 'Low')
                        ->get();
                }

                foreach ($priorityContacts as $contact) {
                    Mail::to($contact->email)->send(
                        new AlertMail($sensor->sensor_name, $level, $LPG, $CO, $Smoke, $Fire)
                    );
                }
                
                Cache::put($key, now(), now()->addMinutes(5));
            }
        } else {
            if ($sensor->isAlert === true) {
                $sensor->update([
                    'isAlert' => false,
                ]);
            }
            $coordinates = Cache::get('active_coordinates', []);
            $coordinates = array_filter($coordinates, fn($coord) => $coord['sensor'] !== $sensor->sensor_name);
            Cache::put('active_coordinates', array_values($coordinates), now()->addMinutes(5));
            // Cache::forget('active_coordinates');
        }

        return response()->json(['success' => true, 'message' => 'Heartbeat and readings saved', 'Object' => $coordinate]);

        // Request Structure "POST"
        // URL = "http://127.0.0.1:8000/api/sensor/heartbeat"
        // Body: JSON
        // {
        //     "LPG" : 27.3,
        //     "CO" : 55,
        //     "Smoke" : 3.7,
        //     "Fire" : 0,
        //     "token" : "192.168.211.253"
        // }
    }
}
