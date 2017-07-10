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

    private $segments = [];

    private function recursiveSegments($number)
    {
        if($number > 2) {
            $finalPath = $this->recursiveSegments($number-1) . '/' . Request::segment($number);
        } else {
            $finalPath = Request::segment($number);
        }
        return $finalPath;
    }

    private function makeBreadcrumbs() 
    {
        $path = URL::to('/') . '/' . Request::segment(1);

        for($i = 2; $i <= count(Request::segments()); $i++) {
            $finalPath = $this->recursiveSegments($i);
            $this->segments[] = [
                'name' => title_case(str_replace("-", " ", Request::segment($i))),
                'path' => $path . '/' . $finalPath
            ];
        }

        $this->page['segments'] = $this->segments;
        $this->page['baseUrl'] = $path;
    } 

    public function onRun() 
    {
        $this->makeBreadcrumbs();
    }

}