<?php

namespace App\Http\Controllers;

use App\Models\message;
use Illuminate\Http\Request;

class messageController extends Controller
{
    public function createMessage(Request $request) {
        $request -> validate([
            'title' => 'required|string',
            'content' => 'required|string',
            'priority' => 'required|string',
        ]);

        $data = $request->all();

        message::create($data);

        return redirect()->back()->with('success', 'Message created successfully!');
    }

    public function getMessages() {
        return message::all();
    }
}
