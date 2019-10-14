<?php namespace Searchit\Jobs\Components;

use Cms\Classes\ComponentBase;
use Searchit\Jobs\Models\Job;
use Searchit\Team\Models\Team;

class Recruiter extends ComponentBase
{

    public function componentDetails()
    {
        return [
            'name'        => 'Recruiter Component',
            'description' => 'No description provided yet...'
        ];
    }

    /**
     *
     * Getting recruiter for the job
     *
     */
    protected function getRecruiter($slug)
    {
        $job = new Job;
        $recruiter = $job->where('slug', $slug)->pluck('recruiter')[0];
        if($recruiter) {
            $team = new Team;
            $person = $team->where('name', 'LIKE', "{$recruiter}%")->first();
            $this->page['person'] = $person;
        }
    }

    /**
     *
     * Functions to run on page init
     *
     */
    public function onRun()
    {
        $this->getRecruiter($this->property('jobSlug'));
    }

}