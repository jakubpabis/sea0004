'use strict';

// Smartsupp Live Chat script
var _smartsupp = _smartsupp || {};
_smartsupp.key = 'f32f591b82ffa879c325ae96ca021013ef7a7d64';
_smartsupp.gaKey = 'UA-6319827-2';
window.smartsupp||(function(d) {
	var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
	s=d.getElementsByTagName('script')[0];c=d.createElement('script');
	c.type='text/javascript';c.charset='utf-8';c.async=true;
	c.src='//www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
})(document);

window.fbAsyncInit = function() {
	FB.init({
		appId      : '382574281913074',
		xfbml      : true,
		version    : 'v2.5'
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
		version    : 'v2.5'
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

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookieMessage()
{
	if(getCookie('cookieConfirm') !== 'yes') {
		document.getElementById('cookieMessage').classList.add('show');
	}
}

function cookieAgree()
{
	setCookie('cookieConfirm', 'yes', 365);
	document.getElementById('cookieMessage').classList.remove('show');
}

function hasClass(el, cls) 
{
	return el.className && new RegExp("(\\s|^)" + cls + "(\\s|$)").test(el.className);
}

function jobsLoadingIndicator()
{
	var loader = document.getElementsByClassName('job-listing__list-container')[0];
	if(hasClass(loader, 'loading')) {
		loader.classList.remove('loading');
	} else {
		loader.classList.add('loading');
	}
}

function openSearch($el) 
{
	$el.classList.add('active');
	document.getElementById('search-field-general').classList.add('active');
	document.getElementById('header-social-links').classList.add('active');
	setTimeout(function() {
		document.getElementById('search-field-general-input').focus();
	}, 500);
}

function openFilters($el) 
{
	$el.parentNode.classList.toggle('active');
}

function hideSearch() 
{
	document.getElementById('search-field-general').classList.remove('active');
	document.getElementById('header-social-links').classList.remove('active');
	document.getElementsByClassName('search-btn')[0].classList.remove('active');
}

function showLang($el, event) 
{
	if(window.innerWidth <= 760 && !hasClass($el, 'active')) {
		event.preventDefault();
		$el.classList.add('active');
	} else if(window.innerWidth <= 760 && hasClass($el, 'active')) {
		event.preventDefault();
		$el.classList.remove('active');
	}
}

function showMenu($el) 
{
	if(hasClass($el, 'active')) {
		hideMenu();
	} else {
		$el.classList.add('active');
		document.getElementsByTagName('body')[0].classList.add('menu-active');
		document.getElementsByTagName('html')[0].classList.add('menu-active');
		document.getElementById('wrapper').classList.add('menu-active');
		setTimeout(function() {
			document.getElementById('wrapper').insertAdjacentHTML('afterend', '<div id="menuCloserButton"></div>');
			document.getElementById('menuCloserButton').addEventListener('click', hideMenu);
		}, 300);
	}
}

function hideMenu() 
{
	var elem = document.getElementById('menuCloserButton');
	document.getElementById('menu-btn').classList.remove('active');
	document.getElementsByTagName('body')[0].classList.remove('menu-active');
	document.getElementsByTagName('html')[0].classList.remove('menu-active');
	document.getElementById('wrapper').classList.remove('menu-active');
	elem.parentNode.removeChild(elem);
}

function showSubMenu($el)
{
	if(hasClass($el.nextElementSibling, 'active')) {
		$el.classList.remove('active');
		$el.nextElementSibling.classList.remove('active');
	} else {
		$el.classList.add('active');
		$el.nextElementSibling.classList.add('active');
	}
}

function checkboxLabel($el) 
{
	if($el.getElementsByTagName('input')[0].checked === true) {
		$el.classList.remove('active');
		$el.getElementsByTagName('input')[0].checked = false;
	} else {
		$el.classList.add('active');
		$el.getElementsByTagName('input')[0].checked = true;
	}
}

function siemaAutoplay($time, $siema, $carousel) 
{
	var timer = setInterval(function() {
		$siema.next();
	}, $time);
	$carousel.addEventListener('mouseenter', function() {
		clearInterval(timer);
	});
	$carousel.addEventListener('mouseleave', function() {
		timer = setInterval(function() {
			$siema.next();
		}, $time);
	});
}

function loadCarousel() 
{
	var siema = document.getElementById('siema-carousel');
	if(siema) {
		const mySiema = new Siema({
			selector: '#siema-carousel',
			duration: 500,
			easing: 'ease',
			perPage: 1,
			startIndex: 0,
			draggable: true,
			threshold: 20,
			loop: true
		});
		document.getElementById('siema-prev').addEventListener('click', function() {
			mySiema.prev()
		});
		document.getElementById('siema-next').addEventListener('click', function() {
			mySiema.next()
		});
		siemaAutoplay(5000, mySiema, siema);
	}
}

function loadClientsCarousel() 
{
	var siema = document.getElementById('siema-carousel-clients');
	if(siema) {
		const mySiema = new Siema({
			selector: '#siema-carousel-clients',
			duration: 500,
			easing: 'ease',
			perPage: 1,
			startIndex: 0,
			draggable: true,
			threshold: 20,
			loop: true
		});
		document.getElementById('siema-prev-clients').addEventListener('click', function() {
			mySiema.prev()
		});
		document.getElementById('siema-next-clients').addEventListener('click', function() {
			mySiema.next()
		});
		// siemaAutoplay(5000, mySiema, siema);
	}
}

function loadCandidatesCarousel() 
{
	var siema = document.getElementById('siema-carousel-candidates');
	if(siema) {
		const mySiema = new Siema({
			selector: '#siema-carousel-candidates',
			duration: 500,
			easing: 'ease',
			perPage: 1,
			startIndex: 0,
			draggable: true,
			threshold: 20,
			loop: true
		});
		document.getElementById('siema-prev-candidates').addEventListener('click', function() {
			mySiema.prev()
		});
		document.getElementById('siema-next-candidates').addEventListener('click', function() {
			mySiema.next()
		});
		// siemaAutoplay(5000, mySiema, siema);
	}
}

function showForm()
{
	document.getElementById('jobFormModal').style.display = 'flex';
	setTimeout(function() {
		document.getElementById('jobFormModal').classList.add('active');
		document.getElementsByTagName('html')[0].classList.add('modal-open');
	}, 50);
}

function hideForm() 
{
	document.getElementById('jobFormModal').classList.remove('active');
	document.getElementsByTagName('html')[0].classList.remove('modal-open');
	setTimeout(function() {
		document.getElementById('jobFormModal').style.display = 'none';
	}, 500);
}

function showCVForm()
{
	document.getElementById('uploadCvModal').style.display = 'flex';
	setTimeout(function() {
		document.getElementById('uploadCvModal').classList.add('active');
		document.getElementsByTagName('html')[0].classList.add('modal-open');
	}, 50);
}

function hideCVForm() 
{
	document.getElementById('uploadCvModal').classList.remove('active');
	document.getElementsByTagName('html')[0].classList.remove('modal-open');
	setTimeout(function() {
		document.getElementById('uploadCvModal').style.display = 'none';
	}, 500);
}

function showFilterForm()
{
	document.getElementById('filterModal').style.display = 'block';
	setTimeout(function() {
		document.getElementById('filterModal').classList.add('active');
		document.getElementsByTagName('html')[0].classList.add('modal-open');
	}, 50);
}

function hideFilterForm() 
{
	document.getElementById('filterModal').classList.remove('active');
	document.getElementsByTagName('html')[0].classList.remove('modal-open');
	setTimeout(function() {
		document.getElementById('filterModal').style.display = 'none';
	}, 500);
}

function getFileName($input, $el)
{
	$text = $input.value;
	document.getElementById($el).innerHTML = $text.split('\\')[2];
}

function initContactMap()
{
	var contact_map = document.getElementById('contact_map');
	var map = new google.maps.Map(contact_map, {
		center: {lat: 52.3214064, lng: 4.8788931},
		zoom: 14,
		scrollwheel: false,
		draggable: true,
		mapTypeControl: false,
		scaleControl: true,
		streetViewControl: true
	});
	var pathArray = location.href.split( '/' );
	var protocol = pathArray[0];
	var host = pathArray[2];
	var $url = protocol + '//' + host;
	var image = {
		url: $url+'/themes/searchit/assets/img/logo-pin.png',
		// This marker is 20 pixels wide by 32 pixels high.
		size: new google.maps.Size(160, 200),
		// The origin for this image is (0, 0).
		origin: new google.maps.Point(0, 0),
		// The anchor for this image is the base of the flagpole at (0, 32).
		anchor: new google.maps.Point(40, 100),
		scaledSize: new google.maps.Size(80, 100)
	};
	var marker = new google.maps.Marker({
		map: map,
		position: new google.maps.LatLng(52.3214064,4.8788931),
		icon: image
	});
	map.set('styles', 
		[
			{
				"featureType": "administrative",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#444444"
					}
				]
			},
			{
				"featureType": "landscape",
				"elementType": "all",
				"stylers": [
					{
						"color": "#f2f2f2"
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "all",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "all",
				"stylers": [
					{
						"saturation": -100
					},
					{
						"lightness": 45
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "all",
				"stylers": [
					{
						"visibility": "simplified"
					}
				]
			},
			{
				"featureType": "road.arterial",
				"elementType": "labels.icon",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "transit",
				"elementType": "all",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "all",
				"stylers": [
					{
						"color": "#7f8ec1"
					},
					{
						"visibility": "on"
					}
				]
			}
		]
	);
}

function cvFormOpen() 
{
	if(window.location.hash === '#uploadcv') {
		showCVForm();
	}
}

function searchbarText()
{
	var $text = [
		"CTO ",
		"Technical Teamlead",
		"PHP Developer",
		"Java Developer",
		"JavaScript Developer",
		"Front-End Developer",
		"Scrum Master",
		"Agile Coach",
		"Python Developer",
		"Scala Developer",
		".NET Developer",
		"Tester",
		"DevOps Engineer",
		"Solution Architect",
		"QA Engineer",
		"Product Owner",
		"Lead Developer",
		"Online Marketeer",
		"SEO Specialist",
		"SEA Specialist",
		"Recruitment Consultant",
		"Test Automation Consultant",
		"Data Scientist",
		"Android Developer",
		"iOS Developer",
		"Mobile Solution Architect",
		"Sitecore Developer",
		"Hybris Developer",
		"Talent Sourcer",
		"Game Developer",
		"Digital Consultant",
		"Digital Analytics Consultant"
	];
	var $box = document.getElementById('searchboxtextchange');
	if($box) {
		var $rand = $text[Math.floor(Math.random() * $text.length)];
		$box.placeholder = '';
		for(var j = 0; j < $rand.length; j++) {
			setTimeout(function(j) {
				if($box === document.activeElement) {
					return false;
				} else {
					$box.placeholder = $box.placeholder + $rand.charAt(j);
				}
			}, j * 75, j);
		}
	}
}

cvFormOpen();
loadCarousel();
loadClientsCarousel();
loadCandidatesCarousel();
checkCookieMessage();
searchbarText();

var searchbarTyping = setInterval(function(){ searchbarText() }, 3500);

function stopTyping() {
	document.getElementById('searchboxtextchange').placeholder = '';
	clearInterval(searchbarTyping);
	searchbarTyping = null;
	document.getElementById('searchboxtextchange').placeholder = '';
	document.getElementById('searchboxtextchange').placeholder = document.getElementById('placeholdertext').textContent;
}

function startTyping() {
	clearInterval(searchbarTyping);
	searchbarText();
	searchbarTyping = null;
	searchbarTyping = setInterval(function(){ searchbarText() }, 3500);
}

// Trigger close form modal window when click on overlay
if(document.getElementById('jobFormModal')) {
	document.getElementById('jobFormModal').addEventListener('click', function(e) {
		if (e.target === document.getElementById('jobFormModal')) {
			hideForm();
		}
	}, false);
}

if(document.getElementById('uploadCvModal')) {
	document.getElementById('uploadCvModal').addEventListener('click', function(e) {
		if (e.target === document.getElementById('uploadCvModal')) {
			hideCVForm();
		}
	}, false);
}

var $formCont;
$(document).ready(function() {
	if($('#jobFormModal').length) {
		$formCont = $('#uploadCvModal, #jobFormModal');
	} else {
		$formCont = $('#uploadCvModal');
	}
	console.log(document.referrer);
});