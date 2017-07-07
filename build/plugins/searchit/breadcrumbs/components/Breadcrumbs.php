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
        $this->path = $this->url . '/' . Request::segment(1);

        for($i = 2; $i <= count(Request::segments()); $i++) {
            $this->segments[] = [
                'name' => Request::segment($i),
                'path' => $this->path . '/' . Request::segment($i)
            ];
        }

        // $this->segments = [
        //     ['name' => 'some1', 'path' => 'something1'],
        //     ['name' => 'some2', 'path' => 'something2'],
        // ];

        $this->page['segments'] = $this->segments;
        $this->page['url'] = $this->path;
    } 

    public function onRun() 
    {
        $this->makeBreadcrumbs();
    }

}