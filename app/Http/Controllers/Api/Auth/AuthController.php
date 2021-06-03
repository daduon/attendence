<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;
use App\User;
class AuthController extends Controller
{
    public function register(Request $request){
        $request->validate([
            'name' => ['required'],
            'email' => ['required'],
            'password' => ['required','confirmed'],
            'password_confirmation' => ['required']
        ]);
        User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => \Hash::make($request['password'])
        ]);
        return response()->json(['smg'=>'Register successfully!']);
    }

    public function login(Request $request){
        $request->validate([
            'email' => 'required',
            'password' => 'required',
            'device_name' => 'required',
        ]);
    
        $user = User::where('email',$request['email'])->first();

        if (! $user || ! \Hash::make($request['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['incorrect.'],
            ]);
        }
        return $user->createToken($request['device_name'])->plainTextToken;
    }
}
