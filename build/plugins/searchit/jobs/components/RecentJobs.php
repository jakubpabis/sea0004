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
        $this->page['recent'] = $this->jobs->orderBy('date', 'desc')->paginate(12);

        if(Session::has('referrer')) {
            $this->page['theReferrer'] = Session::get('referrer');
        } else {
            if(preg_match('/gclid/i', Request::server('HTTP_REFERER')) or preg_match('/gclid/i', Request::server('REQUEST_URI'))) {
                Session::put('referrer', 'AdWords');
            } else {
                Session::put('referrer', Request::server('HTTP_REFERER'));
            }
            $this->page['theReferrer'] = Session::get('referrer');
        }

    }

}
