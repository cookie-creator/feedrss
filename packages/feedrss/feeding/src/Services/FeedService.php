<?php

namespace FeedrssFeeding\Services;

use App\Models\Image;
use App\Models\Post;
use FeedrssFeeding\Helpers\ImageUploadHelper;
use Illuminate\Support\Collection;

class FeedService
{
    private ImageUploadHelper $imageUploadHelper;

    public function __construct(ImageUploadHelper $imageUploadHelper)
    {
        $this->imageUploadHelper = $imageUploadHelper;
    }

    public function storePosts(Collection $feedPosts)
    {
        foreach ($feedPosts as $feedPost)
        {
            // checkUnique and check if we have description
            if ($this->checkUnique($feedPost->getGuid()) && $feedPost->getDescription() !== '')
            {
                // create Models/Post
                $post = new Post();

                $post->title = $feedPost->getTitle();
                $post->link = $feedPost->getLink();
                $post->description = $feedPost->getDescription();
                $post->guid = $feedPost->getGuid();

                $post->save();

                // Upload image, save it and attach to post
                $imageName = $this->uploadImage($feedPost->getImage());
                if ($imageName)
                {
                    $image = new Image();
                    $image->name = $image;
                }

                // Check new categories and attach to post
                $this->attachCategories($post, $feedPost->getCategories());
            }
        }
    }

    private function checkUnique($post)
    {
        return true;
    }

    private function storeCategories($categories)
    {
        return true;
    }

    /*
     * @param String $url
     * @return String imageName
     * */
    private function uploadImage($url)
    {
        return $this->imageUploadHelper->storeImage($url);
    }

    private function attachCategories(Post $post, Collection $categories)
    {
        return $post;
    }
}
