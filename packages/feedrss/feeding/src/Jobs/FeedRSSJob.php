<?php

namespace FeedrssFeeding\Jobs;

use FeedrssFeeding\Adapter\RSSAdapter\FeedAPI;
use FeedrssFeeding\Adapter\RSSAdapter\PostAdapter;
use FeedrssFeeding\Services\FeedService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class FeedRSSJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        info('FeedRss construct');
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        info('FeedRss handle');
    }
}
