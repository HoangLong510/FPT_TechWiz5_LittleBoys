<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Brand; 

class ManagementController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', [
            'except' => [

            ]
        ]);
    }

    // Account management
    public function getAccounts()
    {
        $user = auth()->user();
        $search = request('search');


        if ($user && $user->role === 'admin') {
            $count = User::where('fullname', 'LIKE', "%{$search}%")
                ->orWhere('email', 'LIKE', "%{$search}%")
                ->orWhere('phone', 'LIKE', "%{$search}%")
                ->count();

            $perPage = 5;
            $totalPage = ceil($count / $perPage);
            $page = request('page');
            $offset = ($page - 1) * $perPage;

            $accounts = User::where('fullname', 'LIKE', "%{$search}%")
                ->orWhere('email', 'LIKE', "%{$search}%")
                ->orWhere('phone', 'LIKE', "%{$search}%")
                ->orderBy('fullname', 'asc')
                ->orderBy('role', 'asc')
                ->skip($offset)
                ->take($perPage)
                ->get();
            return response()->json([
                'success' => true,
                'accounts' => $accounts,
                'totalPage' => $totalPage
            ], 200);
        } else {
            return response()->json([
                'success' => false
            ], 400);
        }
    }

    public function getAccountDetail($id)
    {
        $user = auth()->user();

        if ($user && $user->role === 'admin') {
            $account = User::where('id', $id)->first();
            if ($account) {
                return response()->json([
                    'success' => true,
                    'account' => $account
                ], 200);
            } else {
                return response()->json([
                    'success' => false
                ], 400);
            }
        } else {
            return response()->json([
                'success' => false
            ], 400);
        }
    }

    public function updateAccountRole()
    {
        $error = [];
        $user = auth()->user();
        $id = request('id');
        $role = request('role');

        if (!$user || $user->role !== 'admin') {
            $msg = new \stdClass();
            $msg->vi = "Bạn không thể thực hiện hành động này!";
            $msg->en = "You cannot perform this action!!";
            array_push($error, $msg);
        } else {
            $account = User::where("id", $id)->first();
            if (!$account) {
                $msg = new \stdClass();
                $msg->vi = "Không tìm thấy tài khoản!";
                $msg->en = "Account not found!";
                array_push($error, $msg);
            } else {
                if ($account->email === "admin") {
                    $msg = new \stdClass();
                    $msg->vi = "Bạn không thể cập nhật vai trò cho tài khoản quản trị!";
                    $msg->en = "You cannot update admin account role!";
                    array_push($error, $msg);
                }
            }
        }

        if (count($error) > 0) {
            return response()->json([
                "success" => false,
                "message" => $error
            ], 400);
        } else {
            User::where("id", $id)->update([
                "role" => $role
            ]);
            $msg = new \stdClass();
            $msg->en = "Role update successfully!";
            $msg->vi = "Cập nhật vai trò thành công!";
            return response()->json([
                "success" => true,
                "message" => [$msg]
            ], 200);
        }
    }

    function lockAccount($id)
    {
        $error = [];
        $user = auth()->user();

        if (!$user || $user->role !== 'admin') {
            $msg = new \stdClass();
            $msg->vi = "Bạn không thể thực hiện hành động này!";
            $msg->en = "You cannot perform this action!!";
            array_push($error, $msg);
        } else {
            $account = User::where("id", $id)->first();
            if (!$account) {
                $msg = new \stdClass();
                $msg->vi = "Không tìm thấy tài khoản!";
                $msg->en = "Account not found!";
                array_push($error, $msg);
            } else {
                if ($account->email === "admin") {
                    $msg = new \stdClass();
                    $msg->vi = "Bạn không thể khóa tài khoản quản trị!";
                    $msg->en = "You cannot lock admin account!";
                    array_push($error, $msg);
                } else {
                    if ($user->id == $id) {
                        $msg = new \stdClass();
                        $msg->vi = "Bạn không thể khóa chính bạn!";
                        $msg->en = "You cannot lock your own account!";
                        array_push($error, $msg);
                    }
                }
            }
        }

        if (count($error) > 0) {
            return response()->json([
                "success" => false,
                "message" => $error
            ], 400);
        } else {
            User::where("id", $id)->update([
                "active" => 0
            ]);
            $msg = new \stdClass();
            $msg->en = "Account locked successfully!";
            $msg->vi = "Khóa tài khoản thành công!";
            return response()->json([
                "success" => true,
                "message" => [$msg]
            ], 200);
        }
    }

    function unlockAccount($id)
    {
        $error = [];
        $user = auth()->user();
        if (!$user || $user->role !== 'admin') {
            $msg = new \stdClass();
            $msg->vi = "Bạn không thể thực hiện hành động này!";
            $msg->en = "You cannot perform this action!!";
            array_push($error, $msg);
        }

        if (count($error) > 0) {
            return response()->json([
                "success" => false,
                "message" => $error
            ], 400);
        } else {
            User::where("id", $id)->update([
                "active" => 1
            ]);
            $msg = new \stdClass();
            $msg->en = "Account unlocked successfully!";
            $msg->vi = "Mở khóa tài khoản thành công!";
            return response()->json([
                "success" => true,
                "message" => [$msg]
            ], 200);
        }
    }

    // Brand management
    public function createBrand(Request $request)
{
    $validatedData = $request->validate([
        'name' => 'required|string|max:255',
    ]);

    try {
        $brand = Brand::create($validatedData);

        return response()->json([
            'success' => true,
            'data' => $brand
        ], 201);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'An error occurred while creating the brand.',
            'error' => $e->getMessage()
        ], 500);
    }
}

public function getBrands(Request $request)
{
    $search = $request->query('search', '');
    $page = $request->query('page', 1);

    $brands = Brand::where('name', 'like', '%' . $search . '%')
                    ->paginate(10, ['*'], 'page', $page);

    return response()->json([
        'brands' => $brands->items(),
        'totalPages' => $brands->lastPage()
    ]);
}

    public function getBrandDetail($id)
    {
        $brand = Brand::find($id);

        if ($brand) {
            return response()->json([
                'success' => true,
                'brand' => $brand
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Brand not found.'
            ], 404);
        }
    }

    public function updateBrand(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $brand = Brand::find($id);

        if ($brand) {
            $brand->update($validatedData);
            return response()->json([
                'success' => true,
                'data' => $brand
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Brand not found.'
            ], 404);
        }
    }

    public function deleteBrand($id)
    {
        $brand = Brand::find($id);

        if ($brand) {
            $brand->delete();
            return response()->json([
                'success' => true,
                'message' => 'Brand deleted successfully.'
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Brand not found.'
            ], 404);
        }
    }
}
