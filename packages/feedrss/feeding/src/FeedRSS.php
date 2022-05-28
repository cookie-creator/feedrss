<?php

namespace FeedrssFeeding;

use FeedrssFeeding\Adapter\RSSAdapter\FeedAPI;
use FeedrssFeeding\Adapter\RSSAdapter\PostAdapter;
use FeedrssFeeding\Helpers\ImageUploadHelper;
use FeedrssFeeding\Jobs\FeedRSSJob;
use FeedrssFeeding\Repositories\FeedRepository;
use FeedrssFeeding\Services\FeedService;
use GuzzleHttp\Client;

class FeedRSS
{
    public static function start()
    {
        $feed = new FeedAPI(new Client());
        $service = new FeedService(new ImageUploadHelper(), new FeedRepository());

        $content = $feed->getContent();

        $adapter = new PostAdapter($content);

        $posts = $adapter->getPosts();

        $service->storePosts($posts);
    }

    public static function job()
    {
        FeedRSSJob::dispatch();
    }
}
