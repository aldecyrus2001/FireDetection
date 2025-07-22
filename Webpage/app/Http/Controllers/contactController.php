<?php

namespace App\Http\Controllers;

use App\Models\contacts;
use Illuminate\Http\Request;

class contactController extends Controller
{
    public function addContact(Request $request) {
    
        $request->validate([
           'name' => 'required|string',
           'phone' => 'required|string',
           'priority_level' => 'required|string',
           'email' => 'required|email',
           
        ]);

        if (contacts::where('phone', $request->phone)->exists()) {
            return redirect()->back()->withErrors([
                'phone' => 'Phone number is already registered.'
            ])->withInput();
        }

        if (contacts::where('email', $request->email)->exists()) {
            return redirect()->back()->withErrors([
                'email' => 'Email address is already registered.'
            ])->withInput();
        }

        $data = $request->all();

        contacts::create($data);
        return redirect()->back()->with('success', 'Contact added successfully.');
    }

    public function fetchContacts() {
        return contacts::all();
    }
}
