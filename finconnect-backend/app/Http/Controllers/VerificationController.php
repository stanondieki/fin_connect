<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Auth\Events\Verified;
use App\Models\User;

class VerificationController extends Controller
{
    // public function verify($id, Request $request)
    // {
    //     $user = User::findOrFail($id);

    //     if (!$user->hasVerifiedEmail()) {
    //         $user->markEmailAsVerified();
    //         event(new Verified($user));
    //     }

    //     return response()->json(['message' => 'Email successfully verified']);
    // }

    // public function resend(Request $request)
    // {
    //     if ($request->user()->hasVerifiedEmail()) {
    //         return response()->json(['message' => 'User already verified'], 400);
    //     }

    //     $request->user()->sendEmailVerificationNotification();
    //     return response()->json(['message' => 'Verification email resent']);
    // }
}
