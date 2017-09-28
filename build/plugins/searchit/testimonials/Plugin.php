<?php namespace Searchit\Testimonials;

use System\Classes\PluginBase;

class Plugin extends PluginBase
{
    public function registerComponents()
    {
        return [
            'Searchit\Testimonials\Components\Featured' => 'featuredTestimonials',
            'Searchit\Testimonials\Components\Listing' => 'listingTestimonials',
        ];
    }

    public function registerSettings()
    {
    }
}
