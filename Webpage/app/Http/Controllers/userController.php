<?php

namespace App\Http\Controllers;

use App\Events\AssignToClassEvent;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class userController extends Controller
{
    public function addUser(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string',
            'password' => 'required|string',
            'role' => 'required|string',
        ]);

        if (User::where('email', $request->email)->exists()) {
            return redirect()->back()->withErrors([
                'email' => 'Email existed!.'
            ])->withInput();
        }


        $data = $request->all();
        $data['password'] = Hash::make($request->password);

        User::create($data);
        return redirect()->back()->with('success', 'User added successfully!');
    }

<<<<<<< HEAD
    public function updateUser(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'role' => 'required|string',
        ]);

        $user = User::findOrFail($id);

        if ($user->email !== $request->email && User::where('email', $request->email)->exists()) {
            return response()->json([
                'email' => ['The email has already been taken.']
            ], 422);
        }

        $user->name = $request->name;
        $user->email = $request->email;
        $user->role = $request->role;

        $user->save();

        return redirect()->back()->with('success', 'User Updated successfully!');
    }

    public function deleteUser($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'User not found.'], 404);
        }

        $user->delete();

        return redirect()->back()->with('success', 'User deleted successfully!');
    }

    public function fetch()
    {
        event(new AssignToClassEvent('Fetched User'));
=======
    public function fetch()
    {
>>>>>>> 2c8d97afb56158ff6fd4ae7f733c0d3965bb1202
        return User::all();
    }

    public function updateUser(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $id,
        ]);

        $user = User::findOrFail($id);

        $user->name = $request->name;
        $user->email = $request->email;

        $user->save();

        return redirect()->back()->with('success', 'User added successfully!');
    }

    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return redirect()->back()->with('success', 'User deleted successfully!');
    }
}
