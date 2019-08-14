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
use Validation;
use ValidationException;
use Searchit\Jobs\Models\Job;
use System\Models\File as FileSys;
use \Anhskohbo\NoCaptcha\NoCaptcha;

class Form extends ComponentBase
{

    protected $api_key = 'XoslTEyE';
    protected $api_secret = 'ZZXRgDovPQvPfLjklPLBoTAl';

    public function componentDetails()
    {
        return [
            'name'        => 'Form Component',
            'description' => 'No description provided yet...'
        ];
    }

    public function onRun()
	{

        if(Session::has('referrer') && !empty(Session::get('referrer'))) {
            $this->page['theReferrer'] = Session::get('referrer');
        } else {
            if(preg_match('/gclid/i', Request::server('HTTP_REFERER')) || preg_match('/gclid/i', Request::server('REQUEST_URI'))) {
                Session::put('referrer', 'AdWords');
                $this->page['theReferrer'] = 'AdWords';
            } else {
                Session::put('referrer', Request::server('HTTP_REFERER'));
                $this->page['theReferrer'] = Request::server('HTTP_REFERER');
            }
        }
        $this->page['cvCaptcha'] = app('captcha')->display(['data-callback' => 'cvCaptchaCallback']);
        if(!empty($this->property('jobSlug'))) {
            $this->page['appCaptcha'] = app('captcha')->display(['data-callback' => 'appCaptchaCallback']);
        }
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
        Log::info('CURL logging for form submition: '.$response);
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
    
        $application_data = array(
            'name'          => Input::get('applicant-name'),
            'email'         => Input::get('applicant-email'),
            'date_of_birth' => Input::get('dob'),
            'gender'        => Input::get('gender'),
            'phone'         => Input::get('applicant-phone'),
    
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

        if(Input::get('referral-name') && Input::get('referral-email')) {
            $application_data['note']['text'] = Input::get('applicant-message').'<br/><hr/><br/>Referrer name: '.Input::get('referral-name').'<br/>Referrer email: '.Input::get('referral-email');
        }
    
        $data['json'] = json_encode($application_data);
        
        if (!function_exists('curl_file_create')) {
            function curl_file_create($filename, $mimetype = '', $postname = '') {
                return "@$filename;filename="
                    . ($postname ?: basename($filename))
                    . ($mimetype ? ";type=$mimetype" : '');
            }
        }
    
        if(Input::hasFile('applicant-cv')) {

            if(Input::file('applicant-cv')->getSize() < (2097152)) { //can't be larger than 2 MB
                $file = new FileSys;
                $file->data = Input::file('applicant-cv');
                $file->save();
            } else {
                throw new ValidationException('Oops!  Your file\'s size is to large.');
            }

            $uploaded_cv = Input::file('applicant-cv')->getRealPath();
            $cv_ext = Input::file('applicant-cv')->getMimeType();
            $cv_name = Input::file('applicant-cv')->getClientOriginalName();
            $data['cv'] = curl_file_create($uploaded_cv, $cv_ext, $cv_name);

        }

        if(Input::hasFile('applicant-photo')) {

            if(Input::file('applicant-photo')->getSize() < (2097152)) { //can't be larger than 2 MB
                $file = new FileSys;
                $file->data = Input::file('applicant-photo');
                $file->save();
            } else {
                throw new ValidationException('Oops!  Your file\'s size is to large.');
            }

            $uploaded_photo = Input::file('applicant-photo')->getRealPath();
            $photo_ext = Input::file('applicant-photo')->getMimeType();
            $photo_name = Input::file('applicant-photo')->getClientOriginalName();
            $data['files'] = curl_file_create($uploaded_photo, $photo_ext, $photo_name);

        }

        Log::info('Candidate Name: '.Input::get('applicant-name').'; Source: '.Input::get('applicant-find'));
        $person_response = $this->postRequest('people/add_to_queue', $this->api_key, $this->api_secret, $data);

        // echo '<pre>';
        // echo var_dump($person_response);
        // echo '</pre>';
        // exit;
    
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
                $this->add_to_queue();
            }

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
            );

            if(Input::get('job-id') != 188) {
                $form_data['job_link'] = Request::url();
            }

            if(Input::get('referral-name') && Input::get('referral-email')) {

                $form_data['referral_name'] = Input::get('referral-name');
                $form_data['referral_email'] = Input::get('referral-email');
                
                if(Lang::getLocale() == 'en') {
                    $this->sendMailR($form_data, 'You have referred your friend!', 'referral_en', $form_data['referral_email'], $form_data['referral_name']);
                } else {
                    $this->sendMailR($form_data, 'Je hebt naar je vriend verwezen!', 'referral_nl', $form_data['referral_email'], $form_data['referral_name']);
                }

            }

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
                    Flash::info('Thanks for uploading your resume at Search It Recruitment');
                } else {
                    $this->sendMail($form_data, 'Bedankt voor het uploaden van jouw cv bij Search It Recruitment', 'resume_nl');
                    Flash::info('Bedankt voor het uploaden van jouw cv bij Search It Recruitment');
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

    protected function sendMailR($inputs, $subject, $template, $email, $name)
    {
        Mail::send('searchit.jobs::mail.'.$template, $inputs, function($message) use ($inputs, $subject, $email, $name){

            $message->from('info@searchitrecruitment.com', 'Search It Recruitment');
            $message->to($email, $name);
            $message->subject($subject);

        });
    }

}