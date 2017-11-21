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

    /**
     * @var string URL address of XML file to parse
     */
    protected $file = 'http://external.srch20.com/searchit/xml/jobs';

    /**
     * @var object of jobs
     */
    protected $jobs;

    /**
     * @var array of job IDs
     */
    protected $job_ids = [];

    /**
     * @var object of job categories pivot table
     */
    protected $jobSingleCatPivot;

    /**
     * @var object of job types pivot table
     */
    protected $jobSingleTypePivot;

    /*
    *
    * Runs when cron job is being activated
    *
    */
    public function onRun() 
    {
        $this->readFile();
    }

    /*
    *
    * Parsing XML and update, delete or add new job to database, alongside with proper categories and type
    *
    */
    protected function readFile() 
    {
        $xml = simplexml_load_file($this->file) or die("Error: Cannot create object");
        $vacancies = $xml->vacancy;
        $this->jobs = new Job;
        $this->jobs = $this->jobs->orderBy('id', 'desc')->get();
        $this->jobSingleCatPivot = DB::table('searchit_jobs_job_categories');
        $this->jobSingleTypePivot = DB::table('searchit_jobs_job_types');

        foreach($vacancies as $job) {
            array_push($this->job_ids, $job->id);
            $date = date("Y-m-d H:i:s", strtotime($job->publish_date));
            $slug = $this->slugify( $job->title.'-'.$job->id );
            $salary_min = preg_replace("/\./", "", $job->salary_fixed);
            $salary_max = preg_replace("/\./", "", $job->salary_bonus);
            $jobCategory = $job->categories->category;

            /*
            *
            * Run when job in XML is already in database and modification date is different than one in database.
            *
            */
            if($this->getJobCount('job_id', $job->id) !== 0) {
                if($this->getJobVal('job_id', $job->id, 'date') !== $date) {
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

                    foreach($jobCategory as $category) {
                        if($category['group'] == '#2 Skill Area' || $category['group'] == '#3 Skill IT') {
                            if($category == 'Sales' || $category == 'Recruitment') {
                                $cat = 'Recruitment and Sales';
                            } else {
                                $cat = $category;
                            }
                            $jobSingleCatID = Category::where('category_name', $cat)->pluck('id');
                            if($jobSingleCatID) {
                                $this->jobSingleCatPivot->where('job_id', $jobSingleID)->delete();
                                $this->jobSingleCatPivot->insert([ 'job_id' => $jobSingleID, 'category_id' => $jobSingleCatID ]);
                            }
                        }
                        if($category['group'] == '#1 Availability') {
                            $type = $category;
                            $jobSingleTypeRow = Type::where('type_name', $type)->first();
                            $jobSingleTypeID = $jobSingleTypeRow->id;
                            $this->jobSingleTypePivot->where('job_id', $jobSingleID)->update(['type_id' => $jobSingleTypeID ]);
                        }
                    }

                }
            } else {
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
                    if($category['group'] == '#2 Skill Area' || $category['group'] == '#3 Skill IT') {
                        if($category == 'Sales' || $category == 'Recruitment') {
                            $cat = 'Recruitment and Sales';
                        } else {
                            $cat = $category;
                        }
                        $jobSingleCatID = Category::where('category_name', $cat)->pluck('id');
                        if($jobSingleCatID) {
                            $this->jobSingleCatPivot->insert([ 'job_id' => $jobSingleID, 'category_id' => $jobSingleCatID ]);
                        }
                    }
                    if($category['group'] == '#1 Availability') {
                        $type = $category;
                        $jobSingleTypeRow = Type::where('type_name', $type)->first();
                        $jobSingleTypeID = $jobSingleTypeRow->id;
                        $this->jobSingleTypePivot->insert([ 'job_id' => $jobSingleID, 'type_id' => $jobSingleTypeID ]);
                    }
                }
            }


            // $jobSingleRow = Job::where('job_id', $job->id)->first();
            // $jobSingleID = $jobSingleRow->id;
            // foreach($jobCategory as $category)
            // {
            //     if($category['group'] == '#2 Skill Area' || $category['group'] == '#3 Skill IT') {
            //         if($category == 'Sales' || $category == 'Recruitment') {
            //             $cat = 'Recruitment and Sales';
            //         } else {
            //             $cat = $category;
            //         }
            //         $jobSingleCatID = Category::where('category_name', $cat)->pluck('id');
            //         if($jobSingleCatID) {
            //             $this->jobSingleCatPivot->where('job_id', $jobSingleID)->delete();
            //             $this->jobSingleCatPivot->insert([ 'job_id' => $jobSingleID, 'category_id' => $jobSingleCatID ]);
            //         }
            //     }
            // }

        }

        /*
        *
        * Check if job id from database is present in XML, if not, add "fulfilled" category to it.
        *
        */
        foreach($this->jobs as $job) {
            $jobSingleCatID = Category::where('category_slug', 'fulfilled')->pluck('id');
            $isJobFulfilled = DB::table('searchit_jobs_job_categories')->where('job_id', $job->id)->where('category_id', $jobSingleCatID)->count();
            
            if(!in_array($job->job_id, $this->job_ids) && $isJobFulfilled === 0) {
                DB::table('searchit_jobs_job_categories')->insert([ 'job_id' => $job->id, 'category_id' => $jobSingleCatID ]);
            }

            // if($isJobFulfilled !== 0) {
            //     $this->jobSingleCatPivot->where('job_id', $job->id)->delete(); 
            //     $this->jobSingleCatPivot->insert([ 'job_id' => $job->id, 'category_id' => $jobSingleCatID ]);
            // }
            // var_dump($isJobFulfilled);
        }

        $fulfilledJobs = DB::table('searchit_jobs_job_categories')->where('category_id', Category::where('category_slug', 'fulfilled')->pluck('id'))->get();
        $fulfilledCategory = Category::where('category_slug', 'fulfilled')->pluck('id');

        foreach($fulfilledJobs as $job) {
            DB::table('searchit_jobs_job_categories')->where('job_id', $job->job_id)->delete();
            DB::table('searchit_jobs_job_categories')->insert([ 'job_id' => $job->job_id, 'category_id' => $fulfilledCategory ]);
            DB::table('searchit_jobs_job_types')->where('job_id', $job->job_id)->delete();
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