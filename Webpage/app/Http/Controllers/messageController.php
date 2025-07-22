<?php

namespace App\Http\Controllers;

use App\Models\message;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class messageController extends Controller
{
    public function createMessage(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
            'priority' => 'required|string',
        ]);

        $data = $request->all();

        message::create($data);

        return redirect()->back()->with('success', 'Message created successfully!');
    }

    public function getMessages()
    {
        return message::all();
    }

    public function updateMessage(Request $request, $messageID)
    {
        $request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
            'priority' => 'required|string',
        ]);

        $message = message::findOrFail($messageID);

        $message->title = $request->title;
        $message->content = $request->content;
        $message->priority = $request->priority;

        $message->save();

        return redirect()->back()->with('success', 'Message updated successfully!');
    }

    public function activateMessage($messageID)
    {
        $message = message::find($messageID);

        if (!$message) {
            throw ValidationException::withMessages([
                'message' => ['Message not found!']
            ]);
        }

        message::where('isActive', true)->update(['isActive' => false]);

        $message->isActive = true;
        $message->save();

        return redirect()->back()->with('success', 'Message activated successfully!');
    }
}
