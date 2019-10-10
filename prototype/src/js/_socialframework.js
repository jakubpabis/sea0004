$(window).on('load', function() {
	
	// window.fbAsyncInit = function() {
	// 	FB.init({
	// 		appId            : '382574281913074',
	// 		autoLogAppEvents : true,
	// 		xfbml            : true,
	// 		version          : 'v3.3'
	// 	});
	// };
	
	// (function(d, s, id){
	// 	var js, fjs = d.getElementsByTagName(s)[0];
	// 	if (d.getElementById(id)) {return;}
	// 	js = d.createElement(s); js.id = id;
	// 	js.src = "//connect.facebook.net/en_US/sdk.js";
	// 	fjs.parentNode.insertBefore(js, fjs);
	// }(document, 'script', 'facebook-jssdk'));


});

function addScript($src)
{
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = $src;
	head.appendChild(script);
}

function loadScript( url, callback ) {
	var script = document.createElement( "script" )
	script.type = "text/javascript";
	if(script.readyState) {  // only required for IE <9
		script.onreadystatechange = function() {
			if ( script.readyState === "loaded" || script.readyState === "complete" ) {
				script.onreadystatechange = null;
				callback();
			}
		};
	} else {  //Others
		script.onload = function() {
			callback();
		};
	}
  
	script.src = url;
	document.getElementsByTagName( "head" )[0].appendChild( script );
}

function afterFormOpen()
{
	addScript('https://www.google.com/recaptcha/api.js');
	loadScript('https://connect.facebook.net/en_US/sdk.js', function() {
		window.fbAsyncInit = function() {
			FB.init({
				appId            : '382574281913074',
				autoLogAppEvents : true,
				xfbml            : true,
				version          : 'v4.0'
			});
		};
		FB.getLoginStatus(function(response) {
			statusChangeCallback(response);
		});
		$('form').find('.title').append('<button class="fb" type="button" onclick="myFacebookLogin()">Facebook</button>').find('.d-none').removeClass('d-none');
	});
}

function myFacebookLogin() {

	FB.login(function(response) {
		if (response.status === 'connected') {
			FB.api('/me', {fields: 'name, email, birthday, gender, location, picture'}, function(response) {
				console.log(response);
				if(response['name']) {
					$('form').find('input[name="applicant-name"]').val(response['name']);
				}
				if(response['email']) {
					$('form').find('input[name="applicant-email"]').val(response['email']);
				}
				// $('form').find('input[name="applicant-photo"]').val(response['picture']['data']['url']);
				if(response['gender'] == 'male') {
					$('form').find('input[name="gender" value="male"]').prop('checked', true);
				} else if(response['gender'] == 'female') {
					$('form').find('input[name="gender" value="female"]').prop('checked', true);
				}
				if(response['location']['name']) {
					$('form').find('input[name="applicant-city"]').val(response['location']['name']);
				}
				if(response['birthday']) {
					var $bdayO = response['birthday'];
					var $bdayM = $bdayO.split('/');
					$bdayM = $bdayM[1]+'-'+$bdayM[0]+'-'+$bdayM[2];
					$('form').find('input[name="dob"]').val($bdayM);
				}
			});
		} else {
			console.log('User cancelled login or did not fully authorize.');
		}
	}, {scope: 'public_profile,email,user_gender,user_location,user_birthday'});

}