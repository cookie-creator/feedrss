<?php

namespace FeedrssFeeding;

use FeedrssFeeding\Contracts\PostInterface;

class Post implements PostInterface
{
    private $title;
    private $link;
    private $image;
    private $description;
    private $category;
    private $date;
    private $guid;

    /*
     * @param Object $post
     * */
    public function __construct()
    {

    }

    public function fill($post)
    {
        $this->title = $post['title'];
        $this->link = $post['link'];
        $this->description = $post['description'];
        $this->guid = $post['guid'];

        $this->category = $post['category'];
        $this->image = $post['image'];

        $this->date = $post['date'];
    }

    /**
    *
    */
    public function getTitle()
    {
        return $this->title;
    }

    public function getLink()
    {
        return $this->link;
    }

    public function getDescription()
    {
        return $this->description;
    }

    public function getDate()
    {
        return $this->date;
    }

    public function getGuid()
    {
        return $this->guid;
    }

    public function getImage()
    {
        return $this->image;
    }

    public function getCategories()
    {
        return $this->category;
    }
}
