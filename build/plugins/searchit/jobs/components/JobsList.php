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

    public $jobs;
    private $catsArr;
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

    private function prepareJobs()
    {
      $title = input('job-title');
      $type = input('job-type');
      $location = input('job-location');
      $category = input('job-category');
      $salaryMin = input('job-salary-min');
      $salaryMax = input('job-salary-max');

      $this->page['search'] = $title;
      $this->page['location'] = $location;

      foreach ($this->params as $param) {
        if(!empty(input($param))) {
          $this->parameters[$param] = input($param);
        }
      }

      $this->jobs = new Job;

      if(!empty($title)) {
        $this->jobs = $this->jobs->where('title', 'LIKE', "%{$title}%")->orWhere('summary', 'LIKE', "%{$title}%");
      }
      if(!empty($location)) {
        $this->jobs = $this->jobs->where('location', 'LIKE', "%{$location}%");
      }
      if(!empty($this->type)) {
        $this->jobs = $this->jobs->whereHas('types', function($query) use ($type) {
            $query->whereIn('id', $type);
        });
      }
      if(!empty($this->category)) {
        $this->jobs = $this->jobs->whereHas('categories', function($query) use ($category) {
          $query->whereIn('id', $category);
        });     
      }
      if(!empty($this->salaryMin)) {
        $this->jobs = $this->jobs->where('salary_min', '>=', $salaryMin);
      }
      if(!empty($this->salaryMax)) {
        $this->jobs = $this->jobs->where('salary_max', '<=', $salaryMax);
      }

      $this->page['jobsCount'] = $this->jobs->count();
      $this->page['jobs'] = $this->jobs->orderBy('date', 'desc')->paginate(20);
      $this->page['pagination'] = $this->page['jobs']->appends($this->parameters);
    }

    public function onRun()
    {
      $this->page['cats'] = $this->getCategories(Category::get());
      $this->page['types'] = Type::get();

      $this->prepareJobs();
    }

    protected function onFilterSearch()
    {
      $this->prepareJobs();
    }

}
