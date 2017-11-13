function setCookie(e,t,n){var i=new Date;i.setTime(i.getTime()+24*n*60*60*1e3);var s="expires="+i.toUTCString();document.cookie=e+"="+t+";"+s+";path=/"}function getCookie(e){for(var t=e+"=",n=decodeURIComponent(document.cookie),i=n.split(";"),s=0;s<i.length;s++){for(var r=i[s];" "==r.charAt(0);)r=r.substring(1);if(0==r.indexOf(t))return r.substring(t.length,r.length)}return""}function checkCookieMessage(){"yes"!==getCookie("cookieConfirm")&&document.getElementById("cookieMessage").classList.add("show")}function cookieAgree(){setCookie("cookieConfirm","yes",365),document.getElementById("cookieMessage").classList.remove("show")}function hasClass(e,t){return e.className&&new RegExp("(\\s|^)"+t+"(\\s|$)").test(e.className)}function jobsLoadingIndicator(){var e=document.getElementsByClassName("job-listing__list-container")[0];hasClass(e,"loading")?e.classList.remove("loading"):e.classList.add("loading")}function openSearch(e){e.classList.add("active"),document.getElementById("search-field-general").classList.add("active"),document.getElementById("header-social-links").classList.add("active"),setTimeout(function(){document.getElementById("search-field-general-input").focus()},500)}function openFilters(e){e.parentNode.classList.toggle("active")}function hideSearch(){document.getElementById("search-field-general").classList.remove("active"),document.getElementById("header-social-links").classList.remove("active"),document.getElementsByClassName("search-btn")[0].classList.remove("active")}function showLang(e,t){window.innerWidth<=760&&!hasClass(e,"active")?(t.preventDefault(),e.classList.add("active")):window.innerWidth<=760&&hasClass(e,"active")&&(t.preventDefault(),e.classList.remove("active"))}function showMenu(e){hasClass(e,"active")?hideMenu():(e.classList.add("active"),document.getElementsByTagName("body")[0].classList.add("menu-active"),document.getElementsByTagName("html")[0].classList.add("menu-active"),document.getElementById("wrapper").classList.add("menu-active"),setTimeout(function(){document.getElementById("wrapper").insertAdjacentHTML("afterend",'<div id="menuCloserButton"></div>'),document.getElementById("menuCloserButton").addEventListener("click",hideMenu)},300))}function hideMenu(){var e=document.getElementById("menuCloserButton");document.getElementById("menu-btn").classList.remove("active"),document.getElementsByTagName("body")[0].classList.remove("menu-active"),document.getElementsByTagName("html")[0].classList.remove("menu-active"),document.getElementById("wrapper").classList.remove("menu-active"),e.parentNode.removeChild(e)}function showSubMenu(e){hasClass(e.nextElementSibling,"active")?(e.classList.remove("active"),e.nextElementSibling.classList.remove("active")):(e.classList.add("active"),e.nextElementSibling.classList.add("active"))}function checkboxLabel(e){e.getElementsByTagName("input")[0].checked===!0?(e.classList.remove("active"),e.getElementsByTagName("input")[0].checked=!1):(e.classList.add("active"),e.getElementsByTagName("input")[0].checked=!0)}function siemaAutoplay(e,t,n){var i=setInterval(function(){t.next()},e);n.addEventListener("mouseenter",function(){clearInterval(i)}),n.addEventListener("mouseleave",function(){i=setInterval(function(){t.next()},e)})}function loadCarousel(){var e=document.getElementById("siema-carousel");if(e){const t=new Siema({selector:"#siema-carousel",duration:500,easing:"ease",perPage:1,startIndex:0,draggable:!0,threshold:20,loop:!0});document.getElementById("siema-prev").addEventListener("click",function(){t.prev()}),document.getElementById("siema-next").addEventListener("click",function(){t.next()}),siemaAutoplay(5e3,t,e)}}function loadClientsCarousel(){var e=document.getElementById("siema-carousel-clients");if(e){const t=new Siema({selector:"#siema-carousel-clients",duration:500,easing:"ease",perPage:1,startIndex:0,draggable:!0,threshold:20,loop:!0});document.getElementById("siema-prev-clients").addEventListener("click",function(){t.prev()}),document.getElementById("siema-next-clients").addEventListener("click",function(){t.next()})}}function loadCandidatesCarousel(){var e=document.getElementById("siema-carousel-candidates");if(e){const t=new Siema({selector:"#siema-carousel-candidates",duration:500,easing:"ease",perPage:1,startIndex:0,draggable:!0,threshold:20,loop:!0});document.getElementById("siema-prev-candidates").addEventListener("click",function(){t.prev()}),document.getElementById("siema-next-candidates").addEventListener("click",function(){t.next()})}}function showForm(){document.getElementById("jobFormModal").style.display="flex",setTimeout(function(){document.getElementById("jobFormModal").classList.add("active"),document.getElementsByTagName("html")[0].classList.add("modal-open")},50)}function hideForm(){document.getElementById("jobFormModal").classList.remove("active"),document.getElementsByTagName("html")[0].classList.remove("modal-open"),setTimeout(function(){document.getElementById("jobFormModal").style.display="none"},500)}function showCVForm(){document.getElementById("uploadCvModal").style.display="flex",setTimeout(function(){document.getElementById("uploadCvModal").classList.add("active"),document.getElementsByTagName("html")[0].classList.add("modal-open")},50)}function hideCVForm(){document.getElementById("uploadCvModal").classList.remove("active"),document.getElementsByTagName("html")[0].classList.remove("modal-open"),setTimeout(function(){document.getElementById("uploadCvModal").style.display="none"},500)}function showFilterForm(){document.getElementById("filterModal").style.display="block",setTimeout(function(){document.getElementById("filterModal").classList.add("active"),document.getElementsByTagName("html")[0].classList.add("modal-open")},50)}function hideFilterForm(){document.getElementById("filterModal").classList.remove("active"),document.getElementsByTagName("html")[0].classList.remove("modal-open"),setTimeout(function(){document.getElementById("filterModal").style.display="none"},500)}function getFileName(e,t){$text=e.value,document.getElementById(t).innerHTML=$text.split("\\")[2]}function initContactMap(){{var e=document.getElementById("contact_map"),t=new google.maps.Map(e,{center:{lat:52.3214064,lng:4.8788931},zoom:14,scrollwheel:!1,draggable:!0,mapTypeControl:!1,scaleControl:!0,streetViewControl:!0}),n=location.href.split("/"),i=n[0],s=n[2],r=i+"//"+s,o={url:r+"/themes/searchit/assets/img/logo-pin.png",size:new google.maps.Size(160,200),origin:new google.maps.Point(0,0),anchor:new google.maps.Point(40,100),scaledSize:new google.maps.Size(80,100)};new google.maps.Marker({map:t,position:new google.maps.LatLng(52.3214064,4.8788931),icon:o})}t.set("styles",[{featureType:"administrative",elementType:"labels.text.fill",stylers:[{color:"#444444"}]},{featureType:"landscape",elementType:"all",stylers:[{color:"#f2f2f2"}]},{featureType:"poi",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"all",stylers:[{saturation:-100},{lightness:45}]},{featureType:"road.highway",elementType:"all",stylers:[{visibility:"simplified"}]},{featureType:"road.arterial",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"transit",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"all",stylers:[{color:"#7f8ec1"},{visibility:"on"}]}])}function cvFormOpen(){"#uploadcv"===window.location.hash&&showCVForm()}function searchbarText(){var e=["CTO ","Technical Teamlead","PHP Developer","Java Developer","JavaScript Developer","Front-End Developer","Scrum Master","Agile Coach","Python Developer","Scala Developer",".NET Developer","Tester","DevOps Engineer","Solution Architect","QA Engineer","Product Owner","Lead Developer","Online Marketeer","SEO Specialist","SEA Specialist","Recruitment Consultant","Test Automation Consultant","Data Scientist","Android Developer","iOS Developer","Mobile Solution Architect","Sitecore Developer","Hybris Developer","Talent Sourcer","Game Developer","Digital Consultant","Digital Analytics Consultant"],t=document.getElementById("searchboxtextchange"),n=e[Math.floor(Math.random()*e.length)];t.placeholder="";for(var i=0;i<n.length;i++)setTimeout(function(e){t.placeholder=t.placeholder+n.charAt(e)},75*i,i);setInterval(function(){var t=document.getElementById("searchboxtextchange"),n=e[Math.floor(Math.random()*e.length)];t.placeholder="";for(var i=0;i<n.length;i++)setTimeout(function(e){t.placeholder=t.placeholder+n.charAt(e)},75*i,i)},3500)}!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("Siema",[],t):"object"==typeof exports?exports.Siema=t():e.Siema=t()}(this,function(){return function(e){function t(i){if(n[i])return n[i].exports;var s=n[i]={i:i,l:!1,exports:{}};return e[i].call(s.exports,s,s.exports,t),s.l=!0,s.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=function(){function e(t){var i=this;n(this,e),this.config=e.mergeSettings(t),this.selector="string"==typeof this.config.selector?document.querySelector(this.config.selector):this.config.selector,this.selectorWidth=this.selector.offsetWidth,this.innerElements=[].slice.call(this.selector.children),this.currentSlide=this.config.startIndex,this.transformProperty=e.webkitOrNot(),["resizeHandler","touchstartHandler","touchendHandler","touchmoveHandler","mousedownHandler","mouseupHandler","mouseleaveHandler","mousemoveHandler"].forEach(function(e){i[e]=i[e].bind(i)}),this.init()}return s(e,[{key:"init",value:function(){if(window.addEventListener("resize",this.resizeHandler),this.config.draggable&&(this.pointerDown=!1,this.drag={startX:0,endX:0,startY:0,letItGo:null},this.selector.addEventListener("touchstart",this.touchstartHandler,{passive:!0}),this.selector.addEventListener("touchend",this.touchendHandler),this.selector.addEventListener("touchmove",this.touchmoveHandler,{passive:!0}),this.selector.addEventListener("mousedown",this.mousedownHandler),this.selector.addEventListener("mouseup",this.mouseupHandler),this.selector.addEventListener("mouseleave",this.mouseleaveHandler),this.selector.addEventListener("mousemove",this.mousemoveHandler)),null===this.selector)throw new Error("Something wrong with your selector 😭");this.resolveSlidesNumber(),this.selector.style.overflow="hidden",this.sliderFrame=document.createElement("div"),this.sliderFrame.style.width=this.selectorWidth/this.perPage*this.innerElements.length+"px",this.sliderFrame.style.webkitTransition="all "+this.config.duration+"ms "+this.config.easing,this.sliderFrame.style.transition="all "+this.config.duration+"ms "+this.config.easing,this.config.draggable&&(this.selector.style.cursor="-webkit-grab");for(var e=document.createDocumentFragment(),t=0;t<this.innerElements.length;t++){var n=document.createElement("div");n.style.cssFloat="left",n.style.float="left",n.style.width=100/this.innerElements.length+"%",n.appendChild(this.innerElements[t]),e.appendChild(n)}this.sliderFrame.appendChild(e),this.selector.innerHTML="",this.selector.appendChild(this.sliderFrame),this.slideToCurrent(),this.config.onInit.call(this)}},{key:"resolveSlidesNumber",value:function(){if("number"==typeof this.config.perPage)this.perPage=this.config.perPage;else if("object"===i(this.config.perPage)){this.perPage=1;for(var e in this.config.perPage)window.innerWidth>=e&&(this.perPage=this.config.perPage[e])}}},{key:"prev",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments[1];if(!(this.innerElements.length<=this.perPage)){var n=this.currentSlide;this.currentSlide=0===this.currentSlide&&this.config.loop?this.innerElements.length-this.perPage:Math.max(this.currentSlide-e,0),n!==this.currentSlide&&(this.slideToCurrent(),this.config.onChange.call(this),t&&t.call(this))}}},{key:"next",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments[1];if(!(this.innerElements.length<=this.perPage)){var n=this.currentSlide;this.currentSlide=this.currentSlide===this.innerElements.length-this.perPage&&this.config.loop?0:Math.min(this.currentSlide+e,this.innerElements.length-this.perPage),n!==this.currentSlide&&(this.slideToCurrent(),this.config.onChange.call(this),t&&t.call(this))}}},{key:"goTo",value:function(e,t){if(!(this.innerElements.length<=this.perPage)){var n=this.currentSlide;this.currentSlide=Math.min(Math.max(e,0),this.innerElements.length-this.perPage),n!==this.currentSlide&&(this.slideToCurrent(),this.config.onChange.call(this),t&&t.call(this))}}},{key:"slideToCurrent",value:function(){this.sliderFrame.style[this.transformProperty]="translate3d(-"+this.currentSlide*(this.selectorWidth/this.perPage)+"px, 0, 0)"}},{key:"updateAfterDrag",value:function(){var e=this.drag.endX-this.drag.startX,t=Math.abs(e),n=Math.ceil(t/(this.selectorWidth/this.perPage));e>0&&t>this.config.threshold&&this.innerElements.length>this.perPage?this.prev(n):0>e&&t>this.config.threshold&&this.innerElements.length>this.perPage&&this.next(n),this.slideToCurrent()}},{key:"resizeHandler",value:function(){this.resolveSlidesNumber(),this.selectorWidth=this.selector.offsetWidth,this.sliderFrame.style.width=this.selectorWidth/this.perPage*this.innerElements.length+"px",this.slideToCurrent()}},{key:"clearDrag",value:function(){this.drag={startX:0,endX:0,startY:0,letItGo:null}}},{key:"touchstartHandler",value:function(e){e.stopPropagation(),this.pointerDown=!0,this.drag.startX=e.touches[0].pageX,this.drag.startY=e.touches[0].pageY}},{key:"touchendHandler",value:function(e){e.stopPropagation(),this.pointerDown=!1,this.sliderFrame.style.webkitTransition="all "+this.config.duration+"ms "+this.config.easing,this.sliderFrame.style.transition="all "+this.config.duration+"ms "+this.config.easing,this.drag.endX&&this.updateAfterDrag(),this.clearDrag()}},{key:"touchmoveHandler",value:function(e){e.stopPropagation(),null===this.drag.letItGo&&(this.drag.letItGo=Math.abs(this.drag.startY-e.touches[0].pageY)<Math.abs(this.drag.startX-e.touches[0].pageX)),this.pointerDown&&this.drag.letItGo&&(this.drag.endX=e.touches[0].pageX,this.sliderFrame.style.webkitTransition="all 0ms "+this.config.easing,this.sliderFrame.style.transition="all 0ms "+this.config.easing,this.sliderFrame.style[this.transformProperty]="translate3d("+-1*(this.currentSlide*(this.selectorWidth/this.perPage)+(this.drag.startX-this.drag.endX))+"px, 0, 0)")}},{key:"mousedownHandler",value:function(e){e.preventDefault(),e.stopPropagation(),this.pointerDown=!0,this.drag.startX=e.pageX}},{key:"mouseupHandler",value:function(e){e.stopPropagation(),this.pointerDown=!1,this.selector.style.cursor="-webkit-grab",this.sliderFrame.style.webkitTransition="all "+this.config.duration+"ms "+this.config.easing,this.sliderFrame.style.transition="all "+this.config.duration+"ms "+this.config.easing,this.drag.endX&&this.updateAfterDrag(),this.clearDrag()}},{key:"mousemoveHandler",value:function(e){e.preventDefault(),this.pointerDown&&(this.drag.endX=e.pageX,this.selector.style.cursor="-webkit-grabbing",this.sliderFrame.style.webkitTransition="all 0ms "+this.config.easing,this.sliderFrame.style.transition="all 0ms "+this.config.easing,this.sliderFrame.style[this.transformProperty]="translate3d("+-1*(this.currentSlide*(this.selectorWidth/this.perPage)+(this.drag.startX-this.drag.endX))+"px, 0, 0)")}},{key:"mouseleaveHandler",value:function(e){this.pointerDown&&(this.pointerDown=!1,this.selector.style.cursor="-webkit-grab",this.drag.endX=e.pageX,this.sliderFrame.style.webkitTransition="all "+this.config.duration+"ms "+this.config.easing,this.sliderFrame.style.transition="all "+this.config.duration+"ms "+this.config.easing,this.updateAfterDrag(),this.clearDrag())}},{key:"updateFrame",value:function(){this.sliderFrame=document.createElement("div"),this.sliderFrame.style.width=this.selectorWidth/this.perPage*this.innerElements.length+"px",this.sliderFrame.style.webkitTransition="all "+this.config.duration+"ms "+this.config.easing,this.sliderFrame.style.transition="all "+this.config.duration+"ms "+this.config.easing,this.config.draggable&&(this.selector.style.cursor="-webkit-grab");for(var e=document.createDocumentFragment(),t=0;t<this.innerElements.length;t++){var n=document.createElement("div");n.style.cssFloat="left",n.style.float="left",n.style.width=100/this.innerElements.length+"%",n.appendChild(this.innerElements[t]),e.appendChild(n)}this.sliderFrame.appendChild(e),this.selector.innerHTML="",this.selector.appendChild(this.sliderFrame),this.slideToCurrent()}},{key:"remove",value:function(e,t){if(0>e||e>=this.innerElements.length)throw new Error("Item to remove doesn't exist 😭");this.innerElements.splice(e,1),this.currentSlide=e<=this.currentSlide?this.currentSlide-1:this.currentSlide,this.updateFrame(),t&&t.call(this)}},{key:"insert",value:function(e,t,n){if(0>t||t>this.innerElements.length+1)throw new Error("Unable to inset it at this index 😭");if(-1!==this.innerElements.indexOf(e))throw new Error("The same item in a carousel? Really? Nope 😭");this.innerElements.splice(t,0,e),this.currentSlide=t<=this.currentSlide?this.currentSlide+1:this.currentSlide,this.updateFrame(),n&&n.call(this)}},{key:"prepend",value:function(e,t){this.insert(e,0),t&&t.call(this)}},{key:"append",value:function(e,t){this.insert(e,this.innerElements.length+1),t&&t.call(this)}},{key:"destroy",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments[1];if(window.removeEventListener("resize",this.resizeHandler),this.selector.style.cursor="auto",this.selector.removeEventListener("touchstart",this.touchstartHandler),this.selector.removeEventListener("touchend",this.touchendHandler),this.selector.removeEventListener("touchmove",this.touchmoveHandler),this.selector.removeEventListener("mousedown",this.mousedownHandler),this.selector.removeEventListener("mouseup",this.mouseupHandler),this.selector.removeEventListener("mouseleave",this.mouseleaveHandler),this.selector.removeEventListener("mousemove",this.mousemoveHandler),e){for(var n=document.createDocumentFragment(),i=0;i<this.innerElements.length;i++)n.appendChild(this.innerElements[i]);this.selector.innerHTML="",this.selector.appendChild(n),this.selector.removeAttribute("style")}t&&t.call(this)}}],[{key:"mergeSettings",value:function(e){var t={selector:".siema",duration:200,easing:"ease-out",perPage:1,startIndex:0,draggable:!0,threshold:20,loop:!1,onInit:function(){},onChange:function(){}},n=e;for(var i in n)t[i]=n[i];return t}},{key:"webkitOrNot",value:function(){var e=document.documentElement.style;return"string"==typeof e.transform?"transform":"WebkitTransform"}}]),e}();t.default=r,e.exports=t.default}])});var _smartsupp=_smartsupp||{};_smartsupp.key="f32f591b82ffa879c325ae96ca021013ef7a7d64",_smartsupp.gaKey="UA-6319827-2",window.smartsupp||function(e){var t,n,i=smartsupp=function(){i._.push(arguments)};i._=[],t=e.getElementsByTagName("script")[0],n=e.createElement("script"),n.type="text/javascript",n.charset="utf-8",n.async=!0,n.src="//www.smartsuppchat.com/loader.js?",t.parentNode.insertBefore(n,t)}(document),cvFormOpen(),loadCarousel(),loadClientsCarousel(),loadCandidatesCarousel(),checkCookieMessage(),searchbarText(),document.getElementById("jobFormModal")&&document.getElementById("jobFormModal").addEventListener("click",function(e){e.target===document.getElementById("jobFormModal")&&hideForm()},!1),document.getElementById("uploadCvModal")&&document.getElementById("uploadCvModal").addEventListener("click",function(e){e.target===document.getElementById("uploadCvModal")&&hideCVForm()},!1);