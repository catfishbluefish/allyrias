$(function() {
	"use strict";
	var topOffSet = 50; //variable for menu height
	var slideQty = $('#featured .item').length;
	var wHeight = $(window).height();
	var randSlide = Math.floor(Math.random()*slideQty);

	$('#featured .item').eq(randSlide).addClass('active');

	$('.fullheight').css('height', wHeight);

	//replace IMG inside carousels with a background image
	  $('#featured .item img').each(function() {
	    var imgSrc = $(this).attr('src');
	    $(this).parent().css({'background-image': 'url('+imgSrc+')'});
	    $(this).remove();
	  });

	  //adjust height of .fullheight elements on window resize
	  $(window).resize(function() {
	    wheight = $(window).height(); //get the height of the window
	    $('.fullheight').css('height', wheight); //set to window tallness
	  });

	//Activate ScrollSpy
	$('body').scrollspy({
		target: 'header .navbar',
		offset: topOffSet
	});

		  //Use smooth scrolling when clicking on navigation
	$('.navbar a[href*=#]:not([href=#])').click(function() {
	    if (location.pathname.replace(/^\//,'') ===
	      this.pathname.replace(/^\//,'') &&
	      location.hostname === this.hostname) {
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html,body').animate({
	          scrollTop: target.offset().top-topOffSet+2
	        }, 500);
	        return false;
	      } //target.length
	    } //click function
	  }); //smooth scrolling

	// Add inbody class to navbar
	var hash =  $(this).find('li.active a').attr('href');
		if(hash !== '#featured') {
			$('header nav').addClass('inbody');
		} else {
			$('header nav').removeClass('inbody');
		}

	$('.navbar-fixed-top').on('activate.bs.scrollspy', function() {
		var hash =  $(this).find('li.active a').attr('href');
		if(hash !== '#featured') {
			$('header nav').addClass('inbody');
		} else {
			$('header nav').removeClass('inbody');
		}
	});

	//Automatically generates slide indicators
	for(var i=0; i < slideQty; i++) {
		var insertText = '<li data-target="#featured" data-slide-to="' + i + '"';
		if (i == randSlide) {
			insertText += 'class="active"';
		}
		insertText += '></li>';
		$('#featured ol').append(insertText);
	}

	$('.carousel').carousel({
		pause:  false
	});

});