<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Carbon\Carbon;

class UserReportController extends Controller
{
    public function usersReport()
    {
        $totalUsers = User::count();
        $activeUsers = User::where('status', 'active')->count();
        $usersPerMonth = User::selectRaw('MONTH(created_at) as month, COUNT(*) as total')
            ->groupBy('month')
            ->get();

        return response()->json([
            'total_users' => $totalUsers,
            'active_users' => $activeUsers,
            'users_per_month' => $usersPerMonth,
        ]);
    }
}
