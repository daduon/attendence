<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register','Api\Auth\Authcontroller@register');
Route::post('/login','Api\Auth\Authcontroller@login');
// route grade
Route::get('/grade','GradeController@index');
Route::post('/add-grade','GradeController@store');
Route::get('/edit-grade/{id}','GradeController@edit');
Route::post('/update-grade/{id}','GradeController@update');
Route::delete('/delete-grade/{id}','GradeController@destroy');
// route teacher
Route::get('/teacher','TeacherController@index');
Route::get('/get-grade','TeacherController@create');
Route::post('/add-teacher','TeacherController@store');
Route::delete('/delete-teacher/{id}','TeacherController@destroy');
Route::post('/update-teacher/{id}','TeacherController@update');
Route::get('/edit-teacher/{id}','TeacherController@edit');
// route student
Route::get('/student','StudentController@index');
Route::get('/get-grade','StudentController@create');
Route::post('/add-student','StudentController@store');
Route::delete('/delete-student/{id}','StudentController@destroy');
Route::get('/edit-student/{id}','StudentController@edit');
Route::post('/update-student/{id}','StudentController@update');
// route attendence
Route::get('/get-student','AttendenceController@index');
Route::post('/add-atten-student','AttendenceController@store');
// route attend
Route::get('/get-attend','AttendenceController@getAttend');