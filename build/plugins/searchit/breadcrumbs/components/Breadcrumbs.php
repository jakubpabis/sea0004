<?php namespace Searchit\Breadcrumbs\Components;

use Cms\Classes\ComponentBase;
use Searchit\Jobs\Models\Job;
use Searchit\Jobs\Models\Category;
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
    private $catParent = 0;

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

        if($this->property('categorySlug')) {
            $cat = Category::where('category_slug', $this->property('categorySlug'))->first();
            if($cat->parent != 0){
                $this->catParent = $cat->parent;
            }
        }

        for($i = 2; $i <= count(Request::segments()); $i++) {
            $finalPath = $this->recursiveSegments($i);
            // Check if page is job detail page in both languages
            if(Request::segment($i) == 'job') {
                $this->segments[] = [
                    'name' => 'Jobs',
                    'path' => $path . '/jobs'
                ];

                $slug = $this->property('jobSlug');
                $cat1 = Category::whereHas('jobs', function($query) use ($slug) {
                    $query->where('slug', $slug);
                })->where('parent', 0)->first();
                $cat1Name = $cat1->category_name;
                $cat1Slug = $cat1->category_slug;
                $this->segments[] = [
                    'name' => $cat1Name,
                    'path' => $path . '/jobs/' . $cat1Slug
                ];

                $cat2 = Category::whereHas('jobs', function($query) use ($slug) {
                    $query->where('slug', $slug);
                })->where('parent', $cat1->id)->first();
                if($cat2) {
                    $cat2Name = $cat2->category_name;
                    $cat2Slug = $cat2->category_slug;
                    $this->segments[] = [
                        'name' => $cat2Name,
                        'path' => $path . '/jobs/' . $cat2Slug
                    ];
                }
                $this->segments[] = [
                    'name' => Job::where('slug', $slug)->first()->title,
                    'path' => $path . '/' . $finalPath
                ];
                break;
            } elseif(Request::segment($i) == 'vacature') {
                $this->segments[] = [
                    'name' => 'Vacatures',
                    'path' => $path . '/vacatures'
                ];

                $slug = $this->property('jobSlug');
                $cat1 = Category::whereHas('jobs', function($query) use ($slug) {
                    $query->where('slug', $slug);
                })->where('parent', 0)->first();
                $cat1Name = $cat1->category_name;
                $cat1Slug = $cat1->category_slug;
                $this->segments[] = [
                    'name' => $cat1Name,
                    'path' => $path . '/vacatures/' . $cat1Slug
                ];
                
                $cat2 = Category::whereHas('jobs', function($query) use ($slug) {
                    $query->where('slug', $slug);
                })->where('parent', $cat1->id)->first();
                if($cat2) {
                    $cat2Name = $cat2->category_name;
                    $cat2Slug = $cat2->category_slug;
                    $this->segments[] = [
                        'name' => $cat2Name,
                        'path' => $path . '/vacatures/' . $cat2Slug
                    ];
                }
                $this->segments[] = [
                    'name' => Job::where('slug', $slug)->first()->title,
                    'path' => $path . '/' . $finalPath
                ];
                break;
            } elseif(Request::segment($i) == 'jobs' && $this->catParent != 0) {
                $cat = Category::where('id', $this->catParent)->first();
                $catName = $cat->category_name;
                $catSlug = $cat->category_slug;
                $this->segments[] = [
                    'name' => 'Jobs',
                    'path' => $path . '/jobs'
                ];
                $this->segments[] = [
                    'name' => $catName,
                    'path' => $path . '/jobs/' . $catSlug
                ];
            } elseif(Request::segment($i) == 'vacatures' && $this->catParent != 0) {
                $cat = Category::where('id', $this->catParent)->first();
                $catName = $cat->category_name;
                $catSlug = $cat->category_slug;
                $this->segments[] = [
                    'name' => 'Vacatures',
                    'path' => $path . '/vacatures'
                ];
                $this->segments[] = [
                    'name' => $catName,
                    'path' => $path . '/vacatures/' . $catSlug
                ];
            } else {
                $this->segments[] = [
                    'name' => title_case(str_replace("-", " ", Request::segment($i))),
                    'path' => $path . '/' . $finalPath
                ];
            }
        }

        $this->page['segments'] = $this->segments;
        $this->page['baseUrl'] = $path;
    } 

    public function onRun() 
    {
        $this->makeBreadcrumbs();
    }

}