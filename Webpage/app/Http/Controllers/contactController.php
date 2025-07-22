<?php

namespace App\Http\Controllers;

use App\Models\contacts;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class contactController extends Controller
{
    public function addContact(Request $request)
    {

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

    public function fetchContacts()
    {
        return contacts::all();
    }

    public function updateContact(Request $request, $contactID)
    {
        $request->validate([
            'name' => 'required|string',
            'phone' => 'required|string',
            'priority_level' => 'required|string',
            'email' => 'required|email',

        ]);

        $contact = contacts::findOrFail($contactID);

        if ($contact->phone !== $request->phone && contacts::where('phone', $request->phone)->exists()) {
            throw ValidationException::withMessages([
                'phone' => ['The phone number has already been registered.']
            ]);
        }

        $contact->name = $request->name;
        $contact->phone = $request->phone;
        $contact->priority_level = $request->priority_level;
        $contact->email = $request->email;

        $contact->save();

        return redirect()->back()->with('success', 'Contact updated successfully!');
    }

    public function deleteContact($contactID) {
        $contact = contacts::find($contactID);

        if(!$contact) {
            throw ValidationException::withMessages([
                'contact' => ['Contact not found!']
            ]);
        }

        $contact->delete();

        return redirect()->back()->with('success', 'Contact delete successfully!');
    }
}
