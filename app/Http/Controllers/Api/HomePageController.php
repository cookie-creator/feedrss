<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;

class HomePageController extends Controller
{
    function __construct()
    {

    }

    function index(Request $request)
    {
        return PostResource::collection(Post::orderBy('updated_at', 'desc')->limit(10)->get());
    }
}
