<?php namespace Searchit\Breadcrumbs;

use System\Classes\PluginBase;

class Plugin extends PluginBase
{
    public function registerComponents()
    {
    	return [
    		'Searchit\Breadcrumbs\Components\Breadcrumbs' => 'breadcrumbs'
    	];
    }

    public function registerSettings()
    {
    }
}
