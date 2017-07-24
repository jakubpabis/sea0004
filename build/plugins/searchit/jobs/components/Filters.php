<?php namespace Searchit\Jobs\Components;

use Cms\Classes\ComponentBase;
use Searchit\Jobs\Models\Job;

class Filters extends ComponentBase
{

    public function componentDetails()
    {
        return [
            'name'        => 'Filter Component',
            'description' => 'No description provided yet...'
        ];
    }

    /*
    *
    * Return categories column
    *
    */
    public function onFilterSearch()
    {

        if(App::getLocale() == 'en') {
            $this->page['jobUrl'] = "/en/job/";
        } else {
            $this->page['jobUrl'] = "/nl/vacature/";
        }

        $title = input('job-title');
        $type = input('job-type');
        $location = input('job-location');
        $category = input('job-category');
        $salaryMin = input('job-salary-min');
        $salaryMax = input('job-salary-max');

        $jobs = Job::where('title', 'LIKE', "%{$title}%");

        if(!empty($salaryMin)) {
            $jobs = $jobs->where('salary_min', '>=', $salaryMin);
        }
        if(!empty($salaryMax)) {
            $jobs = $jobs->where('salary_max', '<=', $salaryMax);
        }
        if(!empty($location)) {
            $jobs = $jobs->where('location', 'LIKE', "%{$location}%");
        }
        if(!empty($category)) {
            $jobs = $jobs->whereHas('categories', function($query) use ($category) {
                $query->where('category_name', 'LIKE', "%{$category}%");
            });
        }
        if(!empty($type)) {
            $jobs = $jobs->whereHas('types', function($query) use ($type) {
                $query->where('type_name', 'LIKE', "%{$type}%");
            });
        }

        $this->page['jobs'] = $jobs->orderBy('date', 'desc')->paginate(16);

        // if(!empty($salaryMin) && !empty($salaryMax)) {
        //     $this->page['jobs'] = Job::where('title', 'LIKE', "%{$title}%")
        //     ->where('location', 'LIKE', "%{$location}%")
        //     ->whereHas('categories', function($query) use ($category) {
        //         $query->where('category_name', 'LIKE', "%{$category}%");
        //     })
        //     ->whereHas('types', function($query) use ($type) {
        //         $query->where('type_name', 'LIKE', "%{$type}%");
        //     })
        //     ->where('salary_min', '>=', $salaryMin)
        //     ->where('salary_max', '<=', $salaryMax)
        //     ->orderBy('date', 'desc')
        //     ->paginate(16);
        // } elseif(!empty($salaryMin)) {
        //     $this->page['jobs'] = Job::where('title', 'LIKE', "%{$title}%")
        //     ->where('location', 'LIKE', "%{$location}%")
        //     ->whereHas('categories', function($query) use ($category) {
        //         $query->where('category_name', 'LIKE', "%{$category}%");
        //     })
        //     ->whereHas('types', function($query) use ($type) {
        //         $query->where('type_name', 'LIKE', "%{$type}%");
        //     })
        //     ->where('salary_min', '>=', $salaryMin)
        //     ->orderBy('date', 'desc')
        //     ->paginate(16);
        // } elseif(!empty($salaryMax)) {
        //     $this->page['jobs'] = Job::where('title', 'LIKE', "%{$title}%")
        //     ->where('location', 'LIKE', "%{$location}%")
        //     ->whereHas('categories', function($query) use ($category) {
        //         $query->where('category_name', 'LIKE', "%{$category}%");
        //     })
        //     ->whereHas('types', function($query) use ($type) {
        //         $query->where('type_name', 'LIKE', "%{$type}%");
        //     })
        //     ->where('salary_max', '<=', $salaryMax)
        //     ->orderBy('date', 'desc')
        //     ->paginate(16);
        // } else {
        //     $this->page['jobs'] = Job::where('title', 'LIKE', "%{$title}%")
        //     ->where('location', 'LIKE', "%{$location}%")
        //     ->whereHas('categories', function($query) use ($category) {
        //         $query->where('category_name', 'LIKE', "%{$category}%");
        //     })
        //     ->whereHas('types', function($query) use ($type) {
        //         $query->where('type_name', 'LIKE', "%{$type}%");
        //     })
        //     ->orderBy('date', 'desc')
        //     ->paginate(16);
        // }

    }

}
