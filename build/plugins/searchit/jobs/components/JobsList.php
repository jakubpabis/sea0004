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
    private $title;
    private $type;
    private $location;
    private $category;
    private $salaryMin;
    private $salaryMax;
    private $parameters = [];
    private $params = [
      'job-title',
      'job-type',
      'job-location',
      'job-category',
      'job-salary-min',
      'job-salary-max'
    ];

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

      $this->title = input('job-title');
      $this->type = input('job-type');
      $this->location = input('job-location');
      $this->category = input('job-category');
      $this->salaryMin = input('job-salary-min');
      $this->salaryMax = input('job-salary-max');

      $this->page['search'] = $this->title;

      foreach ($this->params as $param) {
        if(!empty(input($param))) {
          $this->parameters[$param] = input($param);
        }
	    }

      $this->jobs = new Job;

      if(!empty($this->location)) {
        $this->jobs = $this->jobs->where('location', 'LIKE', "%{$this->location}%");
      }
      if(!empty($this->title)) {
        $this->jobs = $this->jobs->where('title', 'LIKE', "%{$this->title}%")->orWhere('summary', 'LIKE', "%{$this->title}%");
      }
      if(!empty($this->type)) {
        $type = $this->type;
        $this->jobs = $this->jobs->whereHas('types', function($query) use ($type) {
            $query->where('type_slug', 'LIKE', "%{$type}%");
        });
      }
      if(!empty($this->category)) {
        $category = $this->category;
        $this->jobs = $this->jobs->whereHas('categories', function($query) use ($category) {
            $query->where('category_slug', 'LIKE', "%{$category}%");
        });   
        $this->page['category_display'] =  Category::where('category_slug', 'LIKE', "%{$category}%")->first();
      }
      if(!empty($this->salaryMin)) {
        $this->jobs = $this->jobs->where('salary_min', '>=', $this->salaryMin);
      }
      if(!empty($this->salaryMax)) {
        $this->jobs = $this->jobs->where('salary_max', '<=', $this->salaryMax);
      }

      $this->page['jobsCount'] = $this->jobs->count();
      $this->page['jobs'] = $this->jobs->orderBy('date', 'desc')->paginate(20);
      $this->page['pagination'] = $this->page['jobs']->appends($this->parameters);

    }

    public function onFilterSearch()
    {
      $this->title = input('job-title');
      $this->type = input('job-type');
      $this->location = input('job-location');
      $this->category = input('job-category');
      $this->salaryMin = input('job-salary-min');
      $this->salaryMax = input('job-salary-max');

      // dd($this->category);

      $this->page['search'] = $this->title;

      foreach ($this->params as $param) {
        if(!empty(input($param))) {
          $this->parameters[$param] = input($param);
        }
      }

      $this->jobs = new Job;

      if(!empty($this->location)) {
        $this->jobs = $this->jobs->where('location', 'LIKE', "%{$this->location}%");
      }
      if(!empty($this->title)) {
        $this->jobs = $this->jobs->where('title', 'LIKE', "%{$this->title}%")->orWhere('summary', 'LIKE', "%{$this->title}%");
      }
      if(!empty($this->type)) {
        $type = $this->type;
        $this->jobs = $this->jobs->whereHas('types', function($query) use ($type) {
            $query->where('type_slug', 'LIKE', "%{$type}%");
        });
      }
      if(!empty($this->category)) {
        $category = $this->category;
        $this->jobs = $this->jobs->whereHas('categories', function($query) use ($category) {
            $query->where('category_slug', 'LIKE', "%{$category}%");
        });    
        $this->page['category_display'] =  Category::where('category_slug', 'LIKE', "%{$category}%")->first();
      }
      if(!empty($this->salaryMin)) {
        $this->jobs = $this->jobs->where('salary_min', '>=', $this->salaryMin);
      }
      if(!empty($this->salaryMax)) {
        $this->jobs = $this->jobs->where('salary_max', '<=', $this->salaryMax);
      }

      $this->page['jobsCount'] = $this->jobs->count();
      $this->page['jobs'] = $this->jobs->orderBy('date', 'desc')->paginate(20);
      $this->page['pagination'] = $this->page['jobs']->appends($this->parameters);

    }

}
