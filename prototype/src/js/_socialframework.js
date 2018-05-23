window.fbAsyncInit = function() {
	FB.init({
		appId      : '382574281913074',
		xfbml      : true,
		version    : 'v3.0'
	});
};

(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function myFacebookLogin() {
	FB.init({
		appId      : '382574281913074',
		xfbml      : true,
		version    : 'v3.0'
	});
	FB.login(function(response){
		if (response.status === 'connected') {
			console.log('Logged in.');
			FB.api('/me', {fields: 'name, email, location, gender'}, function(response1){
				$formCont.find('input[name="applicant-name"]').val(response1['name']);
				$formCont.find('input[name="applicant-email"]').val(response1['email']);
				$formCont.find('textarea[name="applicant-address"]').val(response1['location']);
				$formCont.find('input[name="applicant-gender"]').val(response1['gender']);
			});
			FB.api('/me/picture',{"redirect": false, "height": 200, "width": 200, "type": "normal"}, function(response2){
				$formCont.find('input[name="applicant-photo"]').val(response2['data']['url']);
			});
		} else {
			FB.login();
		}
	}, {scope: 'publish_actions'} );
}

function liAuth(){
	IN.User.authorize(function(){
		onLinkedInLoad();
	});
}

function OnLinkedInFrameworkLoad() {
	IN.Event.on(IN, "auth", onLinkedInLoad);
}
// Setup an event listener to make an API call once auth is complete
function onLinkedInLoad() {
	IN.API.Profile("me").result(getProfileData);
}
// Handle the successful return from the API call
function onSuccess(data) {
	console.log(data);
	$formCont.find('input[name="applicant-name"]').val(data['firstName']+' '+data['lastName']);
	$formCont.find('input[name="applicant-email"]').val(data['emailAddress']);
	$formCont.find('textarea[name="applicant-address"]').val(data['location']['name']);
	$formCont.find('input[name="applicant-photo"]').val(data['pictureUrl']);
}
// Handle an error response from the API call
function onError(error) {
	console.log(error);
}
// Use the API call wrapper to request the member's basic profile data
function getProfileData() {
	IN.API.Raw("/people/~:(first-name,last-name,picture-url,email-address,location)").result(onSuccess);
}