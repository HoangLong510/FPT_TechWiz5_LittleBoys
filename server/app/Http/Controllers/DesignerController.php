<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Storage;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\DB;
use App\Models\Meeting;

class DesignerController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', [
            'except' => [
                'getDesignerProjects',
                'getDesignerInfo',
                'getProject'
            ]
        ]);
    }

    // Create a new project
    public function createProject(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'categories' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        try {
            $user = auth()->user();

            $imagePath = null;
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imagePath = $image->store('images', 'public');
            }

            // Tạo dự án với tên danh mục
            $project = Project::create([
                'name' => $validatedData['name'],
                'description' => $validatedData['description'],
                'categories' => $validatedData['categories'],
                'user_id' => $user->id,
                'image' => $imagePath
            ]);

            return response()->json([
                'success' => true,
                'data' => $project
            ], 201);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'An error occurred while creating the project.',
                'error' => $e->getMessage()
            ], 500);
        }
    }



    // Update the specified project
    public function updateProject(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'categories' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        try {
            $user = auth()->user();
            $project = Project::find($id);

            if (!$project || $project->user_id !== $user->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Project not found or you do not have permission to update this project.'
                ], 404);
            }

            if ($request->hasFile('image')) {
                if ($project->image && Storage::exists('public/' . $project->image)) {
                    Storage::delete('public/' . $project->image);
                }

                $imagePath = $request->file('image')->store('images', 'public');
                $validatedData['image'] = $imagePath;
            }

            $project->update($validatedData);

            return response()->json([
                'success' => true,
                'data' => $project
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Error updating project: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'An error occurred while updating the project.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Get projects for the current design user
    public function getProjects(Request $request)
    {
        $search = $request->query('search', '');
        $page = $request->query('page', 1);
        $user = auth()->user();

        $projectsQuery = Project::where('user_id', $user->id)
            ->where(function ($query) use ($search) {
                if ($search) {
                    $query->where('name', 'like', '%' . $search . '%');
                }
            });

        // Phân trang
        $projects = $projectsQuery->paginate(10, ['*'], 'page', $page);

        $projects->getCollection()->transform(function ($project) {
            $project->image = $project->image ? asset('storage/' . $project->image) : null;
            return $project;
        });

        return response()->json([
            'success' => true,
            'data' => $projects->items(),
            'totalPages' => $projects->lastPage()
        ]);
    }

    public function getProject($id)
    {
        try {
            $projects = Project::where('user_id', $id)->get();  // Tìm dự án theo ID
            foreach ($projects as $project) {
                $project->image = $project->image? asset('storage/'. $project->image) : null;
            }
            return response()->json([
                'success' => true,
                'data' => $projects
            ], 200);
        } catch (\Exception $e) {
            \Log::error('Error fetching project detail: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch project detail.',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function deleteProject($id)
    {
        try {
            $user = auth()->user();
            $project = Project::where('id', $id)->where('user_id', $user->id)->first();

            if (!$project) {
                return response()->json([
                    'success' => false,
                    'message' => 'Project not found or you do not have permission to delete this project.'
                ], 404);
            }

            if ($project->image && Storage::exists('public/' . $project->image)) {
                Storage::delete('public/' . $project->image);
            }

            $project->delete();

            return response()->json([
                'success' => true,
                'message' => 'Project deleted successfully.'
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Error deleting project: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'An error occurred while deleting the project.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Lấy data truyền về design chart
    public function fetchDesignDataChart(Request $request)
    {
        $user = auth()->user();
        $projects = Project::where('user_id', $user->id)->get();

        $totalProjects = $projects->count();
        $completedProjects = $projects->where('status', 'completed')->count();
        $ongoingProjects = $projects->where('status', 'ongoing')->count();

        $data = [
            ['category' => 'Total Projects', 'value' => $totalProjects],
            ['category' => 'Completed Projects', 'value' => $completedProjects],
            ['category' => 'Ongoing Projects', 'value' => $ongoingProjects],
        ];

        return response()->json($data);
    }

    // Create meeting between user and designer
    public function createMeeting(Request $request)
    {
        $user = auth()->user();
        $request->validate([
            'date' => 'required|date',
            'message' => 'nullable|string|max:255',
            'designer_id' => 'required|exists:users,id',
        ]);

        $meeting = new Meeting();
        $meeting->user_id = $user->id;
        $meeting->designer_id = $request->designer_id;
        $meeting->scheduled_at = $request->date;
        $meeting->message = $request->message;

        $meeting->save();

        return response()->json([
            'success' => true,
            'message' => 'Meeting has been created successfully!',
            'data' => $meeting
        ], 201);
    }

    //project

    public function getDesignerInfo($userId)
    {
        try {
            $designer = User::where('id', $userId)->where('role', 'designer')->first();

            if (!$designer) {
                return response()->json([
                    'success' => false,
                    'message' => 'Designer not found or not a designer',
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $designer,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching designer info',
            ], 500);
        }
    }

    public function getDesignerProjects($userId)
    {
        try {
            $projects = Project::where('user_id', $userId)->get();

            return response()->json([
                'success' => true,
                'data' => $projects,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching projects',
            ], 500);
        }
    }
}