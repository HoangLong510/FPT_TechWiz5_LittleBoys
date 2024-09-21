<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', [
            'except' => [
                'getProject',
                'getProjectDetail'
            ]
        ]);
    }

    public function getProject(Request $request)
    {
        // Lấy dữ liệu từ body request thay vì query string
        $search = $request->input('search', '');

        // Tìm kiếm dự án theo tên
        $projects = Project::when($search, function ($query, $search) {
            $query->where('name', 'like', '%' . $search . '%');
        })->get();

        // Cập nhật đường dẫn hình ảnh cho dự án
        $projects->transform(function ($project) {
            $project->image = $project->image ? asset('storage/' . $project->image) : null;
            return $project;
        });

        // Trường hợp không tìm thấy dự án
        if ($projects->isEmpty()) {
            return response()->json([
                'success' => true,
                'message' => 'No projects found.',
                'data' => []
            ]);
        }

        // Trả về kết quả dự án
        return response()->json([
            'success' => true,
            'data' => $projects
        ]);
    }

    public function getProjectDetail($id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json([
                'success' => false,
                'message' => 'Project not found.',
            ], 404);
        }

        $project->image = $project->image ? asset('storage/' . $project->image) : null;

        return response()->json([
            'success' => true,
            'data' => $project,
        ]);
    }
}
