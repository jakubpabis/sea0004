<?php namespace Searchit\Jobs\Components;

use Cms\Classes\ComponentBase;
use Input;
use Flash;
use Redirect;
use Request;
use Lang;
use Session;
use Log;
use Mail;
use Validator;
use Searchit\Jobs\Models\Job;
use System\Models\File as FileSys;
use \Anhskohbo\NoCaptcha\NoCaptcha;

class Form extends ComponentBase
{

    protected $api_key = 'XoslTEyE';
    protected $api_secret = 'ZZXRgDovPQvPfLjklPLBoTAl';
    //protected $endpoint = 'people/add_to_queue';

    public function componentDetails()
    {
        return [
            'name'        => 'Form Component',
            'description' => 'No description provided yet...'
        ];
    }

    public function onRun()
	{

        if(Session::has('referrer') && !empty(Session::has('referrer'))) {
            $this->page['theReferrer'] = Session::get('referrer');
        } else {
            if(preg_match('/gclid/i', Request::server('HTTP_REFERER')) or preg_match('/gclid/i', Request::server('REQUEST_URI'))) {
                Session::put('referrer', 'AdWords');
            } else {
                Session::put('referrer', Request::server('HTTP_REFERER'));
            }
            $this->page['theReferrer'] = Session::get('referrer');
        }

        $this->page['cvCaptcha'] = app('captcha')->display(['data-callback' => 'cvCaptchaCallback']);
        $this->page['appCaptcha'] = app('captcha')->display(['data-callback' => 'appCaptchaCallback']);
    }
    
    /**
     * 
     * Post request
     * 
     */
    protected function postRequest($request, $api_key, $api_secret, $json)
    {
        $hash = bin2hex(hash_hmac('sha1', $request.'/'.$api_key, $api_secret, true));
    
        $ch = curl_init('https://api.searchsoftware.nl/'.$request.'?api_key='.$api_key.'&signature='.$hash);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
        $response = curl_exec($ch);
        $response = json_decode($response);
    
        return $response;
    }
    
    /**
     * 
     * Add person to queue
     * 
     */
    protected function add_to_queue()
    {
    
        //$api_key = 'XXX';
        //$api_secret = 'XXX';
    
        $application_data = array(
            'name'          => Input::get('applicant-name'),
            'email'         => Input::get('applicant-email'),
            'date_of_birth' => Input::get('dob'),
            'gender'        => Input::get('gender'),
            'phone'         => Input::get('applicant-phone'),
    
            'custom_fields' => array(
                'referral_name'     => Input::get('referral-name'),
                'referral_email'    => Input::get('referral-email'),
            ),
    
            'location' => array(
                'line1'   => Input::get('applicant-street'),
                'line2'   => '',
                'line3'   => '',
                'zip'     => Input::get('applicant-zip'),
                'city'    => Input::get('applicant-city'),
                'state'   => '',
                'country' => Input::get('applicant-country'),
            ),
    
            'note' => array(
                'text' => Input::get('applicant-message'),
            ),

            'job' => array(
                'id' => Input::get('job-id')
            ),

            'sources' => array(
                array(
                    'parent_source_id' => Input::get('applicant-find'),
                    'name' => 'Applicant'
                )
            ),

        );

        if($application_data['location']['country'] === NULL) {
            unset($application_data['location']['country']);
        }
    
        $data['json'] = json_encode($application_data);
        
    
        if(Input::hasFile('applicant-cv') && Input::file('applicant-cv')->getSize() < (2097152)) { //can't be larger than 2 MB
            $file = new FileSys;
            $file->data = Input::file('applicant-cv');
            $file->save();
            $data['cv'] = '@'.Input::file('applicant-cv')->getRealPath();
        } else {
            throw new ValidationException('Oops!  Your file\'s size is to large.');
        }

        if(Input::hasFile('applicant-photo') && Input::file('applicant-photo')->getSize() < (2097152)) { //can't be larger than 2 MB
            $file = new FileSys;
            $file->data = Input::file('applicant-photo');
            $file->save();
            $data['profile_picture'] = '@'.Input::file('applicant-photo')->getRealPath();
        } else {
            throw new ValidationException('Oops!  Your file\'s size is to large.');
        }

        Log::info('CURL logging for form submition: '.$reply);
        Log::info('Candidate Name: '.Input::get('applicant-name').'; Source: '.Input::get('applicant-find'));

        $person_response = postRequest('people/add_to_queue', $this->api_key, $this->api_secret, $data);
    
    }

    /*
    *
    * Form submit script
    *
    */
    protected function onFormSubmit()
    {

        $rules = [
			'applicant-name'	    => 'required|min:3',
			'applicant-email'		=> 'required|email',
			'g-recaptcha-response'  => 'required|captcha'
        ];
        $validator = Validator::make(Input::all(), $rules);

        if($validator->fails()){
            $messages = $validator->messages();
            foreach ($messages->all() as $message) {
                Flash::error($message);
            }
		} else {

            if(env('APP_ENV') !== 'dev') {

                // if(Input::hasFile('applicant-cv')) {

                //     if(Input::file('applicant-cv')->getSize() < (2097152)) { //can't be larger than 2 MB
                //         $file = new FileSys;
                //         $file->data = Input::file('applicant-cv');
                //         $file->save();
                //     } else {
                //         throw new ValidationException('Oops!  Your file\'s size is to large.');
                //     }

                // }
                
                // if (!function_exists('curl_file_create')) {
                //     function curl_file_create($filename, $mimetype = '', $postname = '') {
                //         return "@$filename;filename="
                //             . ($postname ?: basename($filename))
                //             . ($mimetype ? ";type=$mimetype" : '');
                //     }
                // }

                // //$signature = bin2hex(hash_hmac('sha1', $this->endpoint.'/'.$this->key, $this->secret, true));
                // //$uri = "http://api.searchsoftware.nl/{$this->endpoint}?api_key={$this->key}&signature={$signature}";
                // // Set up the url

                // $application_data = array(
                //     'name' => Input::get('applicant-name'),
                //     'email' => Input::get('applicant-email'),
                //     'gender' => Input::get('gender'),
                //     'birthdate' => Input::get('dob'),
                //     'location' => array(
                //         'line1' => Input::get('applicant-street'),
                //         'city' => Input::get('applicant-city'),
                //         'zip' => Input::get('applicant-zip'), 
                //         'country' => Input::get('applicant-country'),
                //     ),
                //     'phone' => Input::get('applicant-phone'),
                //     'note' => array(
                //         'text' => Input::get('applicant-message')
                //     ),
                //     'job' => array(
                //         'id' => Input::get('job-id')
                //     ),
                //     'sources' => array(
                //         array(
                //             'parent_source_id' => Input::get('applicant-find'),
                //             'name' => 'Applicant'
                //         )
                //     )
                // );

                // if($application_data['location']['country'] === NULL) {
                //     unset($application_data['location']['country']);
                // }

                // //var_dump($application_data);

                // if(Input::hasFile('applicant-cv')){
                //     $uploaded_file = Input::file('applicant-cv')->getRealPath();
                //     $file_ext = Input::file('applicant-cv')->getMimeType();
                //     $file_name = Input::file('applicant-cv')->getClientOriginalName();
                //     $file_cv = curl_file_create($uploaded_file, $file_ext, $file_name);
                //     $data = array(
                //         'json' => json_encode($application_data),
                //         'cv' => $file_cv
                //     );
                // } else {
                //     $data = array(
                //         'json' => json_encode($application_data)
                //     );
                // }

                // //initialise the curl request
                // $request = curl_init();

                // curl_setopt($request, CURLOPT_URL, $uri);
                // curl_setopt($request, CURLOPT_RETURNTRANSFER, 1);
                // curl_setopt($request, CURLOPT_POST, 1);
                // curl_setopt($request, CURLOPT_POSTFIELDS, $data);

                // $reply = curl_exec($request);
                // Log::info('CURL logging for form submition: '.$reply);
                // Log::info('Candidate Name: '.Input::get('applicant-name').'; Source: '.Input::get('applicant-find'));
                // // close the session
                // curl_close($request);

                $this->add_to_queue();

                $form_data = array(
                    'name' => Input::get('applicant-name'),
                    'email' => Input::get('applicant-email'),
                    'location' => array(
                        'line1' => Input::get('applicant-street'),
                        'city' => Input::get('applicant-city'),
                        'zip' => Input::get('applicant-zip'), 
                        'country' => Input::get('applicant-country'),
                    ),
                    'phone' => Input::get('applicant-phone'),
                    'gender' => Input::get('gender'),
                    'birthdate' => Input::get('dob'),
                    'note' => array(
                        'text' => Input::get('applicant-message')
                    ),
                    'sources' => array(
                        array(
                            'parent_source_id' => Input::get('applicant-find'),
                            'name' => 'Applicant'
                        )
                    ),
                    'job_title' => Job::where('job_id', Input::get('job-id'))->value('title'),
                    'job_link' => Request::url()
                );

                if(Input::get('form_type') == 'application') {
                    
                    if(Lang::getLocale() == 'en') {
                        $this->sendMail($form_data, 'Thanks for applying for a job at Search It Recruitment', 'application_en');
                        Flash::success('Thanks for applying for a job at Search It Recruitment');
                    } else {
                        $this->sendMail($form_data, 'Bedankt voor solliciteren bij Search It Recruitment', 'application_nl');
                        Flash::success('Bedankt voor solliciteren bij Search It Recruitment');
                    }

                } else {
                    
                    if(Lang::getLocale() == 'en') {
                        $this->sendMail($form_data, 'Thanks for uploading your resume at Search It Recruitment', 'resume_en');
                        Flash::success('Thanks for uploading your resume at Search It Recruitment');
                    } else {
                        $this->sendMail($form_data, 'Bedankt voor het uploaden van jouw cv bij Search It Recruitment', 'resume_nl');
                        Flash::success('Bedankt voor het uploaden van jouw cv bij Search It Recruitment');
                    }

                }

            } else {

                if(Input::get('form_type') == 'application') {
                    Flash::success('app');
                } else {
                    Flash::success('cv');
                }

            }

        }
        
        return Redirect::back();
        die();
    }

    protected function sendMail($inputs, $subject, $template)
    {
        Mail::send('searchit.jobs::mail.'.$template, $inputs, function($message) use ($inputs, $subject){

            $message->from('info@searchitrecruitment.com', 'Search It Recruitment');
            $message->to($inputs['email'], $inputs['name']);
            $message->subject($subject);

        });
    }

}