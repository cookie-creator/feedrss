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

Route::middleware('Auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {

    Route::post('login', 'App\Http\Controllers\AuthController@login');
    Route::post('logout', 'App\Http\Controllers\AuthController@logout');
    Route::post('refresh', 'App\Http\Controllers\AuthController@refresh');
    Route::post('me', 'App\Http\Controllers\AuthController@me');

    Route::resource('posts', \App\Http\Controllers\Api\Auth\PostsController::class);
    Route::resource('categories', \App\Http\Controllers\Api\Auth\CategoriesController::class);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

//Route::resource('posts', \App\Http\Controllers\Api\PostsController::class);
//Route::resource('categories', \App\Http\Controllers\Api\CategoriesController::class);
//Route::resource('categories.posts', \App\Http\Controllers\Api\CategoriesPostController::class);

Route::get('/posts', [\App\Http\Controllers\Api\PostsController::class, 'index']);
Route::get('/posts/new', [\App\Http\Controllers\Api\PostsController::class, 'getNewPosts']);
Route::get('/posts/popular', [\App\Http\Controllers\Api\PostsController::class, 'getPopularPosts']);
Route::get('/posts/like', [\App\Http\Controllers\Api\PostsController::class, 'getLikePosts']);
Route::get('/post/{slug}', [\App\Http\Controllers\Api\PostsController::class, 'getPost']);


Route::get('/categories', [\App\Http\Controllers\Api\CategoriesController::class, 'index']);
Route::get('/categories/popular', [\App\Http\Controllers\Api\CategoriesController::class, 'getPopularCategories']);
Route::get('/category/{slug}', [\App\Http\Controllers\Api\CategoriesController::class, 'getCategory']);
Route::get('/category/{slug}/posts', [\App\Http\Controllers\Api\CategoriesController::class, 'getCategoryPosts']);
