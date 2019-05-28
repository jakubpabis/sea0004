<?php namespace Searchit\Jobs\Components;

use Cms\Classes\ComponentBase;
use Searchit\Jobs\Models\Job;
use Searchit\Jobs\Models\Category;
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
        $fulfilledCategory = new Category;
        $fulfilledCategory = $fulfilledCategory->where('category_slug', 'fulfilled')->pluck('id');
        $this->jobs = $this->jobs->whereHas('categories', function($query) use ($fulfilledCategory) {
          $query->where('category_id', '!=', $fulfilledCategory);
        });
        $this->page['jobsCount'] = $this->jobs->count();
        $this->page['recent'] = $this->jobs->orderBy('date', 'desc')->select('title', 'slug')->take(12)->get();

    }

}
