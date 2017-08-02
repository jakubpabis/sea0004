<?php namespace Searchit\Jobs\Components;

use Cms\Classes\ComponentBase;
use Searchit\Jobs\Models\Job;
use Searchit\Jobs\Models\Type;
use Searchit\Jobs\Models\Category;
use DB;
use Collection;

class JobsCategory extends ComponentBase
{

    public function componentDetails()
    {
        return [
            'name'        => 'Jobs Categories Component',
            'description' => 'No description provided yet...'
        ];
    }

    public function defineProperties()
    {
        return [
            'categorySlug' => [
            'title' => 'Category Slug',
            'type' => 'string',
            'default' => '{{ :category }}',
            ],
        ];
    }
    
    private $jobs;
    private $catsArr;

    public function onRun()
    {
        $this->jobs = new Job;

        $this->page['cats'] = $this->getCategories(Category::get());
        $this->page['types'] = Type::get();

        $this->page['jobsCount'] = $this->jobs->count();
        $this->page['jobs'] = $this->loadResults()->orderBy('date', 'desc')->paginate(20);
        $this->page['pagination'] = $this->page['jobs'];
    }

    public function loadResults()
    {
        $category = $this->property('categorySlug');
        return Job::whereHas('categories', function($query) use ($category) {
            $query->where('category_slug', 'LIKE', "%{$category}%");
        });
    }

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

}