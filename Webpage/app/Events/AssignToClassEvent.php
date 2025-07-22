<?php
namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class AssignToClassEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public array $coordinates;

    public function __construct(array $coordinates)
    {
        $this->coordinates = $coordinates;
    }

    public function broadcastOn(): array
    {
        return [
            new Channel('public-alert'),
        ];
    }

    public function broadcastWith(): array
    {
        return [
            'coordinates' => $this->coordinates,
        ];
    }
}
