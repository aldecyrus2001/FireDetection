<?php

namespace App\Console\Commands;

use App\Events\AssignToClassEvent;
use Illuminate\Console\Command;

class SystemNotifyMaintenanceCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:system-notify-maintenance';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $message = $this->ask('When should it happen?');
        event(new AssignToClassEvent(@$message));
    }
}
