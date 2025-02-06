<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class PasswordResetController extends Controller
{
    // public function sendResetLink(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'email' => 'required|email|exists:users,email',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json($validator->errors(), 422);
    //     }

    //     $status = Password::sendResetLink($request->only('email'));

    //     return $status === Password::RESET_LINK_SENT
    //         ? response()->json(['message' => 'Reset link sent to your email.'])
    //         : response()->json(['message' => 'Error sending reset link.'], 500);
    // }

    // public function resetPassword(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'email' => 'required|email|exists:users,email',
    //         'token' => 'required',
    //         'password' => 'required|string|min:8|confirmed',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json($validator->errors(), 422);
    //     }

    //     $status = Password::reset(
    //         $request->only('email', 'password', 'password_confirmation', 'token'),
    //         function ($user, $password) {
    //             $user->forceFill([
    //                 'password' => Hash::make($password),
    //             ])->save();
    //         }
    //     );

    //     return $status === Password::PASSWORD_RESET
    //         ? response()->json(['message' => 'Password successfully reset.'])
    //         : response()->json(['message' => 'Invalid token or email.'], 400);
    // }
}

