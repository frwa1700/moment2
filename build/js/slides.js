"use strict";var slideShow=function(){var e=function(e){var i=document.querySelectorAll("#slideshow .slide"),n=0;setInterval(function(){i[n].className="slide",n=(n+1)%i.length,i[n].className="slide showing"},e)};return{init:function(){document.getElementById("slideshow-div")&&e(3e3)}}}();slideShow.init();