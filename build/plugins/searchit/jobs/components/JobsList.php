<?php namespace Searchit\Jobs\Components;

use Cms\Classes\ComponentBase;
use Searchit\Jobs\Models\Job;
use Searchit\Jobs\Models\Type;
use Searchit\Jobs\Models\Category;

class JobsList extends ComponentBase
{

    public function componentDetails()
    {
        return [
            'name'        => 'Jobs List Component',
            'description' => 'No description provided yet...'
        ];
    }

    public $jobs;
    public $cats;
    public $types;
    public $pagination;

    public function onRun()
    {
      $this->page['cats'] = Category::get();
      $this->page['types'] = Type::get();

      $title = input('job-title');
      $type = input('job-type');
      $location = input('job-location');
      $category = input('job-category');
      $salaryMin = input('job-salary-min');
      $salaryMax = input('job-salary-max');

      $parameters = [];
      $params = [
	        'job-title',
	        'job-type',
	        'job-location',
	        'job-category',
	        'job-salary-min',
	        'job-salary-max'
	    ];
      foreach ($params as $param) {
        if(!empty(input($param))) {
          $parameters[$param] = input($param);
        }
	    }

      $this->jobs = new Job;

      if(!empty($title)) {
        $this->jobs = $this->jobs->where('summary', 'LIKE', "%{$title}%")->orWhere('title', 'LIKE', "%{$title}%");
      }
      if(!empty($type)) {
        $this->jobs = $this->jobs->whereHas('types', function($query) use ($type) {
            $query->where('type_slug', 'LIKE', "%{$type}%");
        });
      }
      if(!empty($location)) {
        $this->jobs = $this->jobs->where('location', 'LIKE', "%{$location}%");
      }
      if(!empty($category)) {
        $this->jobs = $this->jobs->whereHas('categories', function($query) use ($category) {
            $query->where('category_slug', 'LIKE', "%{$category}%");
        });   
        $this->page['category_display'] =  Category::where('category_slug', 'LIKE', "%{$category}%")->first();
      }
      if(!empty($salaryMin)) {
        $this->jobs = $this->jobs->where('salary_min', '>=', $salaryMin);
      }
      if(!empty($salaryMax)) {
        $this->jobs = $this->jobs->where('salary_max', '<=', $salaryMax);
      }

      $this->page['jobs'] = $this->jobs->orderBy('date', 'desc')->paginate(16);
      $this->page['pagination'] = $this->page['jobs']->appends($parameters);

    }

    public function onFilterSearch()
    {
        $title = input('job-title');
        $type = input('job-type');
        $location = input('job-location');
        $category = input('job-category');
        $salaryMin = input('job-salary-min');
        $salaryMax = input('job-salary-max');

        $parameters = [];
        $params = [
  	        'job-title',
  	        'job-type',
  	        'job-location',
  	        'job-category',
  	        'job-salary-min',
  	        'job-salary-max'
  	    ];
        foreach ($params as $param) {
        if(!empty(input($param))) {
          $parameters[$param] = input($param);
        }
      }

      $this->jobs = new Job;

      if(!empty($title)) {
        $this->jobs = $this->jobs->where('summary', 'LIKE', "%{$title}%")->orWhere('title', 'LIKE', "%{$title}%");
      }
      if(!empty($type)) {
        $this->jobs = $this->jobs->whereHas('types', function($query) use ($type) {
            $query->where('type_slug', 'LIKE', "%{$type}%");
        });
      }
      if(!empty($location)) {
        $this->jobs = $this->jobs->where('location', 'LIKE', "%{$location}%");
      }
      if(!empty($category)) {
        $this->jobs = $this->jobs->whereHas('categories', function($query) use ($category) {
            $query->where('category_slug', 'LIKE', "%{$category}%");
        });    
        $this->page['category_display'] =  Category::where('category_slug', 'LIKE', "%{$category}%")->first();
      }
      if(!empty($salaryMin)) {
        $this->jobs = $this->jobs->where('salary_min', '>=', $salaryMin);
      }
      if(!empty($salaryMax)) {
        $this->jobs = $this->jobs->where('salary_max', '<=', $salaryMax);
      }

      $this->page['jobs'] = $this->jobs->orderBy('date', 'desc')->paginate(16);
      $this->page['pagination'] = $this->page['jobs']->appends($parameters);

    }

}
