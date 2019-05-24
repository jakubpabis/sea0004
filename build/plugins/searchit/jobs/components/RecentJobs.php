<?php namespace Searchit\Jobs\Components;

use Cms\Classes\ComponentBase;
use Searchit\Jobs\Models\Job;
use Session;
use Request;

class RecentJobs extends ComponentBase
{

    public function componentDetails()
    {
        return [
            'name'        => 'Recent Jobs Component',
            'description' => 'No description provided yet...'
        ];
    }

    private $jobs;

    public function onRun()
    {

        $this->jobs = new Job;
        $this->page['recent'] = $this->jobs->orderBy('date', 'desc')->select('title', 'slug')->take(12)->get();

    }

}
