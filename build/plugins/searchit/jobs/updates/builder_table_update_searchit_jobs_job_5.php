<?php namespace Searchit\Jobs\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateSearchitJobsJob5 extends Migration
{
    public function up()
    {
        Schema::table('searchit_jobs_job', function($table)
        {
            $table->string('recruiter')->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('searchit_jobs_job', function($table)
        {
            $table->dropColumn('recruiter');
        });
    }
}
