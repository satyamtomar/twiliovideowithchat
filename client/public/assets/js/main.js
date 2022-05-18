

// admin sidebar js

$(document).ready(function () {
	$(".sidebar-mb-toggle-btn").click(function () {
		$(".sidebar-wrapper").toggleClass("d-block");
		$("body").toggleClass("no-scroll");
	});
});
// sticky header js start

$(window).scroll(function () {
	var scroll = $(window).scrollTop();

	if (scroll >= 1) {
		$(".navigation").addClass("headersticky");
	} else {
		$(".navigation").removeClass("headersticky");
	}
});


//our experts owl-careousal js start

$('.our-experts-owl').owlCarousel({
	loop: false,
	margin: 15,
	autoplay: true,
	autoplayTimeout: 5000,
	autoplayHoverPause: true,
	responsiveClass: true,
	responsive: {
		0: {
			items: 1,
			nav: true,
			dots: false,
		},
		600: {
			items: 3,
			nav: true,
			dots: false,
		},
		1000: {
			items: 5,
			nav: true,
			dots: false,
			loop: false
		}
	}
});

//top legal expert owl-careousal js start

$('.top-legal-owl').owlCarousel({
	loop: false,
	margin: 0,
	autoplay: true,
	autoplayTimeout: 5000,
	autoplayHoverPause: true,
	responsiveClass: true,
	responsive: {
		0: {
			items: 1,
			nav: true,
			dots: false,
		},
		600: {
			items: 3,
			nav: true,
			dots: false,
		},
		1000: {
			items: 4,
			nav: true,
			dots: false,
		}
	}
});

//feature client owl-careousal js start

$('.client-feature-owl').owlCarousel({
	loop: false,
	margin: 0,
	dots:true,
	autoplay: true,
	autoplayTimeout: 5000,
	autoplayHoverPause: true,
	responsiveClass: true,
	responsive: {
		0: {
			items: 1,
			nav: false
		},
		600: {
			items: 1,
			nav: true
		},
		1000: {
			items: 1,
			nav: true
		}
	}
});

//practice Area owl-careousal js start

$('.pratice-area-owl').owlCarousel({
	loop: false,
	margin: 30,
	dots:false,
	nav:true,
	autoplay: true,
	autoplayTimeout: 5000,
	autoplayHoverPause: true,
	responsiveClass: true,
	responsive: {
		0: {
			items: 1,
			nav:false
		},
		600: {
			items: 3
		},
		1000: {
			items:5
		}
	}
});

// Star animation css


var star = $(".star");

$(this).star.click(function() {
	if (star.hasClass("starred")) {
		star.removeClass("starred");
		star.addClass("unstarred");
	} else if (star.hasClass("unstarred")) {
		star.removeClass("unstarred");
		star.addClass("starred");
	} else {
		star.addClass("starred");
	}
	});
