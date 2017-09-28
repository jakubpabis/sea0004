<?php namespace Searchit\Testimonials\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateSearchitTestimonialsTestimonials extends Migration
{
    public function up()
    {
        Schema::table('searchit_testimonials_testimonials', function($table)
        {
            $table->string('lang');
        });
    }
    
    public function down()
    {
        Schema::table('searchit_testimonials_testimonials', function($table)
        {
            $table->dropColumn('lang');
        });
    }
}
