<?php namespace Searchit\Jobs\Components;

use Cms\Classes\ComponentBase;
use Lang;
use Redirect;

class LangCheck extends ComponentBase
{

    public function componentDetails()
    {
        return [
            'name'        => 'Language Component',
            'description' => 'No description provided yet...'
        ];
    }

    public function onRun() 
    {

    }

    public function onSearchRedirect()
    {
        $input = input('search-input');
        if(Lang::getLocale() == 'en') {
            $url = "/en/jobs?job-title=$input";
        } else {
            $url = "/nl/vacatures?job-title=$input";
        }
        return Redirect::to($url);
    }

}