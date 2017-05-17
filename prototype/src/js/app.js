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

function openSearch($el) 
{
	$el.classList.add('active');
	document.getElementById('search-field-general').classList.add('active');
	setTimeout(function() {
		document.getElementById('search-field-general-input').focus();
	}, 500);
}

function hideSearch() 
{
	document.getElementById('search-field-general').classList.remove('active');
	document.getElementsByClassName('search-btn')[0].classList.remove('active');
}