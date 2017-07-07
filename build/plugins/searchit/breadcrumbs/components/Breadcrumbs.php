<?php namespace Searchit\Breadcrumbs\Components;

use Cms\Classes\ComponentBase;
use Request;
use URL;

class Breadcrumbs extends ComponentBase
{

    public function componentDetails()
    {
        return [
            'name'        => 'Breadcrumbs Component',
            'description' => 'No description provided yet...'
        ];
    }

    private $url;
    private $path;
    private $segments = [];

    private function makeBreadcrumbs() 
    {
        $this->url = URL::to('/');
        $this->path = Request::path();

        for($i = 2; $i <= count(Request::segments()); $i++) {
            $this->segments[] = [
                'name' => Request::segment($i),
                'path' => Request::segment($i)
            ];
        }

        // $this->segments = [
        //     ['name' => 'some1', 'path' => 'something1'],
        //     ['name' => 'some2', 'path' => 'something2'],
        // ];

        $this->page['segments'] = $this->segments;
        $this->page['url'] = $this->url;
    } 

    public function onRun() 
    {
        $this->makeBreadcrumbs();
    }

}