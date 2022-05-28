<?php

namespace FeedrssFeeding\Adapter\RSSAdapter;

use GuzzleHttp\Client;
use FeedrssFeeding\Adapter\RSSAdapter\FeedAdapter;

class FeedAPI
{
    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    public function getContent()
    {
        $res = $this->client->get(config('feed.url'));

        return $res->getBody()->getContents();
    }
}
