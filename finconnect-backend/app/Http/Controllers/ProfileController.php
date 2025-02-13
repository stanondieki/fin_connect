<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class ProfileController extends Controller
{
    public function update(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'dob' => 'required|date',
            'address' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
            'oldPassword' => 'nullable|string|min:6',
            'newPassword' => 'nullable|string|min:6|confirmed',
        ]);

        // Update user details
        $user->update([
            'first_name' => $validated['firstName'],
            'last_name' => $validated['lastName'],
            'phone' => $validated['phone'],
            'email' => $validated['email'],
            'dob' => $validated['dob'],
            'address' => $validated['address'] ?? $user->address,
            'country' => $validated['country'] ?? $user->country,
        ]);

        // Handle password change
        if ($request->filled('oldPassword') && $request->filled('newPassword')) {
            if (!Hash::check($request->oldPassword, $user->password)) {
                return response()->json(['message' => 'Old password is incorrect'], 400);
            }
            $user->update([
                'password' => Hash::make($request->newPassword),
            ]);
        }

        return response()->json(['message' => 'Profile updated successfully', 'user' => $user]);
    }
}

