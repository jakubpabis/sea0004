<?php namespace Searchit\Testimonials\Components;

use Cms\Classes\ComponentBase;
use Searchit\Testimonials\Models\Testimonials;
use Lang;

class Featured extends ComponentBase
{

    public function componentDetails()
    {
        return [
            'name'        => 'Featured Testimonials Component',
            'description' => 'No description provided yet...'
        ];
    }

    protected $testimonials;

    public function onRun() 
    {
        $this->testimonials = Testimonials::where('featured', 1);
        
        if(Lang::getLocale() == 'en') {
            $this->testimonials = $this->testimonials->where('lang', 'en');
        } else {
            $this->testimonials = $this->testimonials->where('lang', 'nl');
        }
        
        $this->page['testimonials'] = $this->testimonials->get();
    }

}