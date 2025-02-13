<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use Laravel\Passport\Passport;
use App\Http\Controllers\VerificationController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\InvestmentController;
use App\Http\Controllers\FinancialGoalController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\IncomeController;
use App\Http\Controllers\UpcomingIncomeController;
use App\Http\Controllers\UpcomingExpenseController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\BudgetController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\UserReportController;
use App\Http\Controllers\DebtController;

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


Route::post('/investments', [InvestmentController::class, 'store']);
Route::get('/investments', [InvestmentController::class, 'index']);
Route::delete('/investments/{id}', [InvestmentController::class, 'destroy']);

Route::post('/financial-goals', [FinancialGoalController::class, 'store']);

Route::post('/income', [TransactionController::class, 'storeIncome']);
Route::post('/expense', [TransactionController::class, 'storeExpense']);


Route::post('/income-upcoming', [UpcomingIncomeController::class, 'store']);
Route::post('/expense-upcoming', [UpcomingExpenseController::class, 'store']);

Route::post('/accounts', [AccountController::class, 'store']);


Route::post('/budgets', [BudgetController::class, 'store']);
Route::get('/budgets', [BudgetController::class, 'index']);


Route::middleware('auth:api')->group(function () {
    Route::get('/reports/income', [ReportController::class, 'incomeReport']);
    Route::get('/reports/expenses', [ReportController::class, 'expenseReport']);
    Route::get('/reports/income-vs-expense', [ReportController::class, 'incomeVsExpense']);
    Route::get('/reports/upcoming-income', [ReportController::class, 'upcomingIncome']);
    Route::get('/reports/income-monthly', [ReportController::class, 'incomeMonthlyReport']);
    Route::get('/reports/expense-monthly', [ReportController::class, 'expenseMonthlyReport']);
    Route::get('/reports/transactions', [ReportController::class, 'accountTransactionReport']);
    Route::get('/reports/upcoming-expense', [ReportController::class, 'upcomingExpense']);
});


Route::middleware('auth:api')->group(function () {
    Route::get('/reports/users', [UserReportController::class, 'usersReport']);
});


Route::middleware('auth:api')->group(function () {
    Route::get('/debts', [DebtController::class, 'index']);
    Route::post('/debts', [DebtController::class, 'store']);
    Route::delete('/debts/{debt}', [DebtController::class, 'destroy']);
});




// Route::get('/email/verify/{id}', [VerificationController::class, 'verify'])->name('verification.verify');
// Route::post('/email/resend', [VerificationController::class, 'resend'])->middleware('auth:api');

// Route::middleware(['auth:api', 'verified'])->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::post('/password/email', [PasswordResetController::class, 'sendResetLink']);
// Route::post('/password/reset', [PasswordResetController::class, 'resetPassword']);

