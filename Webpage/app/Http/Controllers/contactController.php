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
           
        ]);

        if (contacts::where('phone', $request->phone)->exists()) {
            return redirect()->back()->withErrors([
                'phone' => 'Phone number is already registered.'
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
