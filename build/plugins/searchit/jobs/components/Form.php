<?php namespace Searchit\Jobs\Components;

use Cms\Classes\ComponentBase;
use Input;
use Flash;
use Redirect;
use System\Models\File as FileSys;

class Form extends ComponentBase
{

    public function componentDetails()
    {
        return [
            'name'        => 'Form Component',
            'description' => 'No description provided yet...'
        ];
    }

    /*
    *
    * Form submit script
    *
    */
    protected function onFormSubmit()
    {
        if(Input::hasFile('applicant-cv')) {

            if(Input::file('applicant-cv')->getSize() < (2097152)) { //can't be larger than 2 MB
                $file = new FileSys;
                $file->data = Input::file('applicant-cv');
                $file->save();
            } else {
                dump('Oops!  Your file\'s size is to large.');
            }
        }   
        /*
        | -------------------------------------------------------------------
        |   API settings
        | -------------------------------------------------------------------
        */
        $key = 'XoslTEyE';
        $secret = 'ZZXRgDovPQvPfLjklPLBoTAl';
        /*
        | -------------------------------------------------------------------
        |   Example
        | -------------------------------------------------------------------
        */
        if (!function_exists('curl_file_create')) {
            function curl_file_create($filename, $mimetype = '', $postname = '') {
                return "@$filename;filename="
                    . ($postname ?: basename($filename))
                    . ($mimetype ? ";type=$mimetype" : '');
            }
        }

        $endpoint = 'people/add_to_queue';
        $signature = bin2hex(hash_hmac('sha1', $endpoint.'/'.$key, $secret, true));
        // Set up the url
        $uri = "http://api.searchsoftware.nl/{$endpoint}?api_key={$key}&signature={$signature}";

        $application_data = array(
            'name' => Input::get('applicant-name'),
            'email' => Input::get('applicant-email'),
            'gender' => Input::get('applicant-gender'),
            'address' => Input::get('applicant-address'),
            'phone' => Input::get('applicant-phone'),
            'note' => array(
                'text' => Input::get('applicant-message')
            ),
            'job' => array(
                'id' => Input::get('job-id')
            ),
            'sources' => array(
                array(
                    'parent_source_id' => Input::get('applicant-find'),
                    'name' => 'Applicant'
                )
            )
        );

        if(Input::hasFile('applicant-cv')){
            $uploaded_file = Input::file('applicant-cv')->getRealPath();
            $file_ext = Input::file('applicant-cv')->getMimeType();
            $file_name = Input::file('applicant-cv')->getClientOriginalName();
            $file_cv = curl_file_create($uploaded_file, $file_ext, $file_name);
            $data = array(
                'json' => json_encode($application_data),
                'cv' => $file_cv
            );
        } else {
            $data = array(
                'json' => json_encode($application_data)
            );
        }

        //initialise the curl request
        $request = curl_init();

        curl_setopt($request, CURLOPT_URL, $uri);
        curl_setopt($request, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($request, CURLOPT_POST, 1);
        curl_setopt($request, CURLOPT_POSTFIELDS, $data);

        $reply = curl_exec($request);
        // close the session
        curl_close($request);

        if(Input::get('form_type') == 'application') {
            Flash::success('app');
        } else {
            Flash::success('cv');
        }
        
        return Redirect::back();
        die();
    }

}