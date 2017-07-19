<?php namespace Searchit\Jobs\Components;

use Cms\Classes\ComponentBase;
use Searchit\Jobs\Models\Job;
use Searchit\Jobs\Models\Category;
use Searchit\Jobs\Models\Type;
use Illuminate\Support\Facades\DB;

class Cronjob extends ComponentBase
{

    public function componentDetails()
    {
        return [
            'name'        => 'Cronjob Component',
            'description' => 'No description provided yet...'
        ];
    }

    public function onRun() 
    {
        $this->readFile();
    }

    public $vacancy;

    protected function readFile() 
    {
        $file = 'http://external.srch20.com/searchit/xml/jobs';
        $xml = simplexml_load_file($file) or die("Error: Cannot create object");
        $vacancies = $xml->vacancy;
        $jobs = Job::orderBy('id', 'desc')->get();
        $job_ids = [];

        foreach($vacancies as $job)
        {
            array_push($job_ids, $job->id);
            $date = date("Y-m-d H:i:s", strtotime($job->publish_date));
            $slug = $this->slugify( $job->title.'-'.$job->id );
            $salary_min = preg_replace("/\./", "", $job->salary_fixed);
            $salary_max = preg_replace("/\./", "", $job->salary_bonus);

            $jobSingleCatPivot = DB::table('searchit_jobs_job_categories');
            $jobSingleTypePivot = DB::table('searchit_jobs_job_types');

            $jobCategory = $job->categories->category;

            /*
            *
            * Run when job in XML is already in database and modification date is different than one in database.
            *
            */
            if($this->getJobCount('job_id', $job->id) !== 0)
            {
                if($this->getJobVal('job_id', $job->id, 'date') !== $date)
                {
                    Job::where('job_id', $job->id)->update(
                        [
                            'title'         => $job->title,
                            'summary'       => $job->description,
                            'date'          => $date,
                            'salary_min'    => $salary_min,
                            'salary_max'    => $salary_max,
                            'location'      => $job->address,
                            'lat'           => $job->lat,
                            'lng'           => $job->lng,
                            'slug'          => $slug,
                        ]
                    );
                    $jobSingleRow = Job::where('job_id', $job->id)->first();
                    $jobSingleID = $jobSingleRow->id;

                    foreach($jobCategory as $category)
                    {
                        if($category['group'] == '#2 Skill Area')
                        {
                            if($category == 'Sales' || $category == 'Recruitment')
                            {
                                $cat = 'Recruitment and Sales';
                            } 
                            else 
                            {
                                $cat = $category;
                            }
                            $jobSingleCatRow = Category::where('category_name', $cat)->first();
                            // $jobSingleCatAllRow = Category::where('category_slug', 'all-jobs')->first();
                            $jobSingleCatID = $jobSingleCatRow->id;
                            // $jobSingleCatAllID = $jobSingleCatAllRow->id;
                            $jobSingleCatPivot->where('job_id', $jobSingleID)->delete();
                            $jobSingleCatPivot->insert([ 'job_id' => $jobSingleID, 'category_id' => $jobSingleCatID ]);
                            // $jobSingleCatPivot->insert([ 'job_id' => $jobSingleID, 'category_id' => $jobSingleCatAllID ]);
                        }
                        if($category['group'] == '#1 Availability')
                        {
                            $type = $category;
                            $jobSingleTypeRow = Type::where('type_name', $type)->first();
                            $jobSingleTypeID = $jobSingleTypeRow->id;
                            $jobSingleTypePivot->where('job_id', $jobSingleID)->update(['type_id' => $jobSingleTypeID ]);
                        }
                    }

                }
            } 
            else 
            {
                Job::insertGetId(
                    [
                        'job_id'        => $job->id,
                        'title'         => $job->title,
                        'summary'       => $job->description,
                        'date'          => $date,
                        'salary_min'    => $salary_min,
                        'salary_max'    => $salary_max,
                        'location'      => $job->address,
                        'lat'           => $job->lat,
                        'lng'           => $job->lng,
                        'slug'          => $slug,
                    ]
                );
                $jobSingleRow = Job::where('job_id', $job->id)->first();
                $jobSingleID = $jobSingleRow->id;

                foreach($jobCategory as $category)
                {
                    if($category['group'] == '#2 Skill Area')
                    {
                        if($category == 'Sales' || $category == 'Recruitment')
                        {
                            $cat = 'Recruitment and Sales';
                        } 
                        else 
                        {
                            $cat = $category;
                        }
                        $jobSingleCatRow = Category::where('category_name', $cat)->first();
                        // $jobSingleCatAllRow = Category::where('category_slug', 'all-jobs')->first();
                        $jobSingleCatID = $jobSingleCatRow->id;
                        // $jobSingleCatAllID = $jobSingleCatAllRow->id;
                        $jobSingleCatPivot->insert([ 'job_id' => $jobSingleID, 'category_id' => $jobSingleCatID ]);
                        // $jobSingleCatPivot->insert([ 'job_id' => $jobSingleID, 'category_id' => $jobSingleCatAllID ]);
                    }
                    if($category['group'] == '#1 Availability')
                    {
                        $type = $category;
                        $jobSingleTypeRow = Type::where('type_name', $type)->first();
                        $jobSingleTypeID = $jobSingleTypeRow->id;
                        $jobSingleTypePivot->insert([ 'job_id' => $jobSingleID, 'type_id' => $jobSingleTypeID ]);
                    }
                }
            }

        }

        /*
        *
        * Check if job id from database is present in XML, if not, add "fulfilled" category to it.
        *
        */
        foreach($jobs as $job) {
            $jobSingleCatPivot = DB::table('searchit_jobs_job_categories');
            $jobSingleCatID = Category::where('category_slug', 'fulfilled')->pluck('id');
            $jobSingleCatIDAll = Category::where('category_slug', 'all-jobs')->pluck('id');
            $isJobFulfilled = $jobSingleCatPivot->where('job_id', $job->id)->where('category_id', $jobSingleCatID)->count();
            if(!in_array($job->job_id, $job_ids) && $isJobFulfilled === 0) {
                $jobSingleCatPivot->insert([ 'job_id' => $job->id, 'category_id' => $jobSingleCatID ]);
            }
            var_dump($isJobFulfilled);
        }

        /*
        *
        * Check if job with id X is in category "all-jobs", if not, add it.
        *
        */
        // foreach($jobs as $job) {
        //     $jobSingleCatPivot = DB::table('searchit_jobs_job_categories');
        //     $jobSingleCatID = Category::where('category_slug', 'fulfilled')->pluck('id');
        //     $jobSingleCatIDAll = Category::where('category_slug', 'all-jobs')->pluck('id');
        //     $isJobAll = $jobSingleCatPivot->where('job_id', $job->id)->where('category_id', $jobSingleCatIDAll)->count();
        //     if($isJobAll === 0) {
        //         $jobSingleCatPivot->insert([ 'job_id' => $job->id, 'category_id' => $jobSingleCatIDAll ]);
        //     }
        //     var_dump($isJobAll);
        // }

    }

    /*
    *
    * Return the number of rows founded
    *
    */
    protected function getJobCount($key, $value)
    {
        return Job::where($key, $value)->count();
    }

    /*
    *
    * Return the value from a table row
    *
    */
    protected function getJobVal($key, $value, $pluck)
    {
        return Job::where($key, $value)->pluck($pluck);
    }

    /*
    *
    * Make valid slug from a string
    *
    */
    protected function slugify($text)
    {
        // replace non letter or digits by -
        $text = preg_replace('~[^\pL\d]+~u', '-', $text);

        // transliterate
        $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);

        // remove unwanted characters
        $text = preg_replace('~[^-\w]+~', '', $text);

        // trim
        $text = trim($text, '-');

        // remove duplicate -
        $text = preg_replace('~-+~', '-', $text);

        // lowercase
        $text = strtolower($text);

        if (empty($text)) {
            return 'n-a';
        }

        return $text;
    }

}