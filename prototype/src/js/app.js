'use strict';

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

/**
 * Parse url
 */
function urlParser($url)
{	
	//Create a new link with the url as its href:
    var a = $('<a>', {
        href: $url
    });

	var $result = {
		'protocol': a.prop('protocol'),
		'host': a.prop('hostname'),
		'path': a.prop('pathname'),
		'query': a.prop('search')
	};

	return $result;
}

/**
 * Get referrer address
 */
function getReferrer()
{
	var $url = document.referrer;

	if($url.length > 0) {

		// console.log(urlParser($url)['host']);
		// console.log(window.location.hostname);
		
		$host = urlParser($url)['host'];
		$list = [
			'bing',
			'facebook',
			'freelance',
			'github',
			'glassdoor',
			'google',
			'indeed',
			'instagram',
			'jobbird',
			'linkedin',
			'monsterboard',
			'stackoverflow',
			'twitter',
			'sea0004'
		];

		if($host !== window.location.hostname) {

			for(var $i = 0; $i < $list.length; $i++) {
				if( $host.match($list[$i]) !== null ) {
					console.log($list[$i] + ' yay!');
					$('#uploadCvModal, #jobFormModal').find('select[name="applicant-find"][value="'+$list[$i]+'"]').select();
					break;
				} else {
					$('#uploadCvModal, #jobFormModal').find('select[name="applicant-find"]').append($('<option>', {
						value: $host,
						text: $host
					})).val($host);
					break;
				}
			}
			
		}

	}

}

var $formCont;
$(document).ready(function() {
	if($('#jobFormModal').length) {
		$formCont = $('#uploadCvModal, #jobFormModal');
	} else {
		$formCont = $('#uploadCvModal');
	}
	getReferrer();
});