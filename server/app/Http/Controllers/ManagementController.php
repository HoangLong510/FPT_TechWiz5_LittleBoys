<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class ManagementController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', [
            'except' => [

            ]
        ]);
    }

    public function getAccounts()
    {
        $user = auth()->user();
        $search = request('search');

        if ($user && $user->role === 'admin') {
            $accounts = User::where('fullname', 'LIKE', "%{$search}%")
                ->orWhere('email', 'LIKE', "%{$search}%")
                ->orWhere('phone', 'LIKE', "%{$search}%")
                ->orderBy('fullname', 'asc')
                ->get();
            return response()->json([
                'success' => true,
                'accounts' => $accounts
            ]);
        } else {
            return response()->json([
                'success' => false
            ]);
        }
    }
}
