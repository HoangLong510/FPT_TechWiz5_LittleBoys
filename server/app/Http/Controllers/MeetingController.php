<?php

namespace App\Http\Controllers;

use App\Models\Meeting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class MeetingController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', [
            'except' => [

            ]
        ]);
    }

    // Lấy danh sách cuộc hẹn
    public function index()
    {
        $user = auth::user();

        // Kiểm tra xem user có phải là designer
        if ($user->role !== 'designer') {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized access. Only designers can view meetings.'
            ], 403);
        }

        // Lấy các cuộc hẹn liên quan đến designer
        $meetings = DB::table('meetings')
            ->join('users', 'user_id', '=', 'users.id')
            ->select('meetings.*', 'users.fullname as user_fullname')
            ->where('meetings.designer_id', $user->id)
            ->get();

        if ($meetings->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'No meetings found for this designer.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $meetings
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,confirmed,canceled', // Validation cho status
        ]);

        // Tìm cuộc hẹn theo id
        $meeting = Meeting::findOrFail($id);

        // Cập nhật trạng thái của cuộc hẹn và kiểm tra kết quả
        try {
            $meeting->update(['status' => $request->status]);

            return response()->json([
                'success' => true,
                'message' => 'Trạng thái cuộc hẹn đã được cập nhật.',
                'data' => $meeting
            ]);
        } catch (\Exception $e) {
            // Ghi log nếu có lỗi xảy ra
            \Log::error('Error updating meeting status: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to update meeting status.'
            ], 500);
        }
    }
}
