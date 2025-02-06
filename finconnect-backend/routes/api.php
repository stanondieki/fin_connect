<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use Laravel\Passport\Passport;
use App\Http\Controllers\VerificationController;
use App\Http\Controllers\PasswordResetController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return response()->json($request->user());
});





Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Route::get('/email/verify/{id}', [VerificationController::class, 'verify'])->name('verification.verify');
// Route::post('/email/resend', [VerificationController::class, 'resend'])->middleware('auth:api');

// Route::middleware(['auth:api', 'verified'])->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::post('/password/email', [PasswordResetController::class, 'sendResetLink']);
// Route::post('/password/reset', [PasswordResetController::class, 'resetPassword']);

