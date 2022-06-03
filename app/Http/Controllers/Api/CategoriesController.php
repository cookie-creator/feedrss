<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\PostResource;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    public function __construct()
    {

    }

    public function index()
    {
        return CategoryResource::collection(Category::orderBy('title', 'asc')
            ->paginate($perPage = 50, $columns = ['*'], $pageName = 'categories'));
    }

    public function getPopularCategories(Request $request)
    {
        return CategoryResource::collection(Category::inRandomOrder()->limit(30)->get());
    }

    public function getCategory(Request $request)
    {
        return CategoryResource::collection(Category::where('slug', $request->slug)->get());
    }

    public function getCategoryPosts(Request $request)
    {
        return PostResource::collection(Category::where('slug', $request->slug)->first()->posts);
    }
}
