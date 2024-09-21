<?php

namespace App\Http\Controllers;

use App\Models\Meeting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MeetingController extends Controller
{
    // Lấy danh sách các cuộc hẹn của designer hiện tại
    public function index()
    {
        $user = Auth::user();

        // Kiểm tra xem user có phải là designer không
        if ($user->role !== 'designer') {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized access. Only designers can view meetings.'
            ], 403);
        }

        // Lấy tất cả các cuộc hẹn liên quan đến designer
        $meetings = Meeting::where('designer_id', $user->id)
            ->with('user') // Lấy thông tin của người dùng đặt hẹn
            ->get();

        return response()->json([
            'success' => true,
            'data' => $meetings
        ]);
    }

    // Tạo cuộc hẹn mới
    public function store(Request $request)
    {
        $request->validate([
            'designer_id' => 'required|exists:users,id',
            'scheduled_at' => 'required|date',
            'message' => 'nullable|string',
        ]);

        // Tạo cuộc hẹn mới
        $meeting = Meeting::create([
            'user_id' => Auth::id(),
            'designer_id' => $request->designer_id,
            'scheduled_at' => $request->scheduled_at,
            'message' => $request->message,
            'status' => 'pending', // Mặc định là trạng thái "pending"
        ]);

        return response()->json([
            'success' => true,
            'data' => $meeting,
            'message' => 'Cuộc hẹn đã được tạo thành công.'
        ], 201);
    }

    // Cập nhật trạng thái cuộc hẹn
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,confirmed,canceled',
        ]);

        $meeting = Meeting::findOrFail($id);

        // Kiểm tra quyền sở hữu của designer đối với cuộc hẹn
        if (Auth::id() !== $meeting->designer_id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized access. You cannot update this meeting.'
            ], 403);
        }

        // Cập nhật trạng thái cuộc hẹn
        $meeting->update(['status' => $request->status]);

        return response()->json([
            'success' => true,
            'message' => 'Trạng thái cuộc hẹn đã được cập nhật.',
            'data' => $meeting
        ]);
    }

    // Xóa cuộc hẹn
    public function destroy($id)
    {
        $meeting = Meeting::findOrFail($id);

        // Kiểm tra quyền sở hữu của designer đối với cuộc hẹn
        if (Auth::id() !== $meeting->designer_id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized access. You cannot delete this meeting.'
            ], 403);
        }

        $meeting->delete();

        return response()->json([
            'success' => true,
            'message' => 'Cuộc hẹn đã được xóa thành công.'
        ]);
    }
}
