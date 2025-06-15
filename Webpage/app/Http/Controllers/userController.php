<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class userController extends Controller
{
    public function addUser(Request $request) {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string',
            'password' => 'required|string',
            'role' => 'required|string',
        ]);

        if(User::where('email', $request->email)->exists()){
            return redirect()->back()->withErrors([
                'email' => 'Email existed!.'
            ])->withInput();
        }
        

        $data = $request->all();
        $data['password'] = Hash::make($request->password);

        User::create($data);
        return redirect()->back()->with('success', 'User added successfully!');

    }

    public function fetch() {
        return User::all();
    }
}
