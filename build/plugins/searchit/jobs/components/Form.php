<?php namespace Searchit\Jobs\Components;

use Cms\Classes\ComponentBase;
use Input;
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
            // $ftp_server = "173.236.146.18";
            // $ftp_username   = "admin_searchit";
            // $ftp_password   = "Uv9-JNe-LG2-rxD";
            // // setup of connection
            // $conn_id = ftp_connect($ftp_server) or die("could not connect to the server ;(");

            if(Input::file('applicant-cv')->getSize() < (2097152)) { //can't be larger than 2 MB
                // login
                // if (@ftp_login($conn_id, $ftp_username, $ftp_password)) {
                //   echo "conected as current user\n";
                // }
                // else {
                //   echo "could not connect as current user\n";
                // }
                $file = new FileSys;
                $file->data = Input::file('applicant-cv');
                $file->save();
                // $upload_file = Input::file('cv_file')->getRealPath();

                // $remote_file_path = "/storage/app/uploads/public/" . $upload_file;
                // $remote_file_path = "/uploads/public/";
                // Input::file('cv_file')->move($remote_file_path);
                // ftp_put($conn_id, $remote_file_path, $_FILES["cv_file"]["tmp_name"], FTP_BINARY);
                // ftp_close($conn_id);
                // echo "\n\nconnection closed \n\r file upload end with success! :D";
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
            'name' => Input::get('applicatn-name'),
            'email' => Input::get('applicatn-email'),
            'gender' => Input::get('applicatn-gender'),
            'address' => Input::get('applicatn-address'),
            'phone' => Input::get('applicatn-phone'),
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

        // initialise the curl request
        $request = curl_init();

        curl_setopt($request, CURLOPT_URL, $uri);
        curl_setopt($request, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($request, CURLOPT_POST, 1);
        curl_setopt($request, CURLOPT_POSTFIELDS, $data);

        $reply = curl_exec($request);
        // close the session
        curl_close($request);

        // dump($reply);

        // $newURL = 'https://www.searchitrecruitment.com/form-success-page/';
        // header('Location: ' . $newURL);
        return Redirect::to('upload-cv-success'); // ??????
        die();

    }

}