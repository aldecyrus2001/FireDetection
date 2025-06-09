<?php

namespace App\Console\Commands;

use App\Models\Sensor;
use Carbon\Carbon;
use Illuminate\Console\Command;

class CheckSensorHeartbeat extends Command
{
    protected $signature = 'sensor:check-heartbeat';

    protected $description = 'Mark sensors offline if no heartbeat received';

    public function handle()
    {
        $threshold = Carbon::now()->subMinutes(1);
        $offlineSensors = Sensor::where('last_seen', '<', $threshold)
                                ->where('status', 'Online')
                                ->update(['status' => 'Offline']);

        $this->info("Marked $offlineSensors sensors offline.");
    }
}
