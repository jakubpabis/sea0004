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
				$('form').find('input[name="applicant-name"]').val(response['name']);
				$('form').find('input[name="applicant-email"]').val(response['email']);
				$('form').find('input[name="applicant-photo"]').val(response['data']['url']);
			});
			// FB.api('/me/picture',{"redirect": false, "height": 200, "width": 200, "type": "normal"}, function(response2){
			// 	$formCont.find('input[name="applicant-photo"]').val(response2['data']['url']);
			// });
		} else {
			console.log('User cancelled login or did not fully authorize.');
			// FB.login();
		}
	}, {scope: 'public_profile,email'});
	// FB.init({
	// 	appId            : '382574281913074',
	// 	autoLogAppEvents : true,
	// 	xfbml            : true,
	// 	version          : 'v3.3'
	// });
	// FB.login(function(response){
	// 	if (response.status === 'connected') {
	// 		console.log('Logged in.');
	// 		FB.api('/me', {fields: 'name, email, picture'}, function(response1){
	// 			$formCont.find('input[name="applicant-name"]').val(response1['name']);
	// 			$formCont.find('input[name="applicant-email"]').val(response1['email']);
	// 			$formCont.find('input[name="applicant-photo"]').val(response1['data']['url']);
	// 		});
	// 		// FB.api('/me/picture',{"redirect": false, "height": 200, "width": 200, "type": "normal"}, function(response2){
	// 		// 	$formCont.find('input[name="applicant-photo"]').val(response2['data']['url']);
	// 		// });
	// 	} else {
	// 		FB.login();
	// 	}
	// }, {scope: 'email'});
}