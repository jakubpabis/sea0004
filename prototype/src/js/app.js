'use strict';

//-------------------- Load some deferred styles --------------------//
var loadDeferredStyles = function() 
{
	var addStylesNode = document.getElementById('deferred-styles');
	var replacement = document.createElement('div');
	replacement.innerHTML = addStylesNode.textContent;
	document.body.appendChild(replacement);
	addStylesNode.parentElement.removeChild(addStylesNode);
}
var raf = requestAnimationFrame || mozRequestAnimationFrame ||
    webkitRequestAnimationFrame || msRequestAnimationFrame;
if (raf) raf(function() { window.setTimeout(loadDeferredStyles, 0); });
else window.addEventListener('load', loadDeferredStyles);
//-------------------- /Load some deferred styles --------------------//

function hasClass(el, cls) 
{
	return el.className && new RegExp("(\\s|^)" + cls + "(\\s|$)").test(el.className);
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
	if(!hasClass($el, 'active')) {
		$el.classList.add('active');
		document.getElementsByTagName('body')[0].classList.add('menu-active');
		document.getElementsByTagName('html')[0].classList.add('menu-active');
		document.getElementById('wrapper').classList.add('menu-active');
		setTimeout(function() {
			document.querySelectorAll('*:not(.menu)').forEach(function(elem) {
				elem.addEventListener('click', hideMenu);
			});
		}, 300);
	} else {
		$el.classList.remove('active');
		document.getElementsByTagName('body')[0].classList.remove('menu-active');
		document.getElementsByTagName('html')[0].classList.remove('menu-active');
		document.getElementById('wrapper').classList.remove('menu-active');
	}
}

function hideMenu() 
{
	document.getElementById('menu-btn').classList.remove('active');
	document.getElementsByTagName('body')[0].classList.remove('menu-active');
	document.getElementsByTagName('html')[0].classList.remove('menu-active');
	document.getElementById('wrapper').classList.remove('menu-active');
	document.querySelectorAll('*:not(.menu)').forEach(function(elem) {
		elem.removeEventListener('click', hideMenu);
	});
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

function initJobMap()
{
	var job_map = document.getElementById('job_map');
	var map = new google.maps.Map(job_map, {
		center: {lat: 52.3702157, lng: 4.8951679},
		zoom: 11,
		scrollwheel: false,
		draggable: true,
		mapTypeControl: false,
		scaleControl: false,
		streetViewControl: false
	});
	var marker = new google.maps.Marker({
		map: map,
		position: new google.maps.LatLng(52.3702157,4.8951679)
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

function initContactMap()
{
	var contact_map = document.getElementById('contact_map');
	var map = new google.maps.Map(contact_map, {
		center: {lat: 52.3214278, lng: 4.876879},
		zoom: 14,
		scrollwheel: false,
		draggable: true,
		mapTypeControl: false,
		scaleControl: true,
		streetViewControl: true
	});
	var image = {
	url: 'assets/img/logo-pin.png',
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
		position: new google.maps.LatLng(52.3214278,4.876879),
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

loadCarousel();

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
