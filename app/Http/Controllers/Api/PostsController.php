<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;

class PostsController extends Controller
{
    public function index()
    {
        return PostResource::collection(Post::latest()
            ->paginate($perPage = 10, $columns = ['*'], $pageName = 'posts'));
    }

    public function getPost(Request $request)
    {
        return PostResource::collection(Post::where('slug', $request->slug)->get());
    }

    public function getNewPosts(Request $request)
    {
        return PostResource::collection(Post::latest()->limit(10)->get());
    }

    public function getPopularPosts(Request $request)
    {
        return PostResource::collection(Post::inRandomOrder()->limit(3)->get());
    }

    public function getLikePosts(Request $request)
    {
        return PostResource::collection(Post::inRandomOrder()->limit(6)->get());
    }
}
