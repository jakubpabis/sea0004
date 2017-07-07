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

    private $path;
    private $segments = [];

    private function makeBreadcrumbs() 
    {
        $this->path = URL::to('/') . '/' . Request::segment(1);

        for($i = 2; $i <= count(Request::segments()); $i++) {
            $this->segments[] = [
                'name' => Request::segment($i),
                'path' => $this->path . '/' . Request::segment($i)
            ];
        }

        $this->page['segments'] = $this->segments;
        $this->page['baseUrl'] = $this->path;
    } 

    public function onRun() 
    {
        $this->makeBreadcrumbs();
    }

}