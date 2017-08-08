<?php namespace Searchit\Jobs\Components;

use Cms\Classes\ComponentBase;
use Searchit\Jobs\Models\Job;
use Searchit\Jobs\Models\Type;
use Searchit\Jobs\Models\Category;
use DB;
use Collection;

class JobsList extends ComponentBase
{

    public function componentDetails()
    {
        return [
            'name'        => 'Jobs List Component',
            'description' => 'No description provided yet...'
        ];
    }

    private $jobs;
    private $catsArr;

    private function getCategories($array)
    {
      $this->catsArr = $array;
      foreach($array as $cat) {
        if($cat->parent != 0) {
          $category = $this->catsArr->where('id', $cat->parent)->first();
          if($category['children']) {
            $category['children'] = array_prepend($category['children'], $cat);
          } else {
            $category['children'] = [$cat]; 
          }
        }
      }
      return $this->catsArr->where('parent', 0)->all();
    }

    public function onRun()
    {
      $this->page['cats'] = $this->getCategories(Category::get());
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

      $this->page['jobsCount'] = $this->jobs->count();
      $this->page['jobs'] = $this->jobs->orderBy('date', 'desc')->paginate(20);
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

      $this->page['jobsCount'] = $this->jobs->count();
      $this->page['jobs'] = $this->jobs->orderBy('date', 'desc')->paginate(20);
      $this->page['pagination'] = $this->page['jobs']->appends($parameters);

    }

}
