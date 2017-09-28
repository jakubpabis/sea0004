<?php namespace Searchit\Testimonials\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateSearchitTestimonialsTestimonials2 extends Migration
{
    public function up()
    {
        Schema::table('searchit_testimonials_testimonials', function($table)
        {
            $table->string('lang', 255)->default('en')->change();
        });
    }
    
    public function down()
    {
        Schema::table('searchit_testimonials_testimonials', function($table)
        {
            $table->string('lang', 255)->default(null)->change();
        });
    }
}
