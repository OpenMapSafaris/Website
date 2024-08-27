(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);
$(document).ready(function() {
    let slideIndex = 0;
    
    $.getJSON('destinations.json', function(data) {
        // Add click event listeners to images
        $('.destination .row a').each(function(index) {
            $(this).click(function(event) {
                event.preventDefault();
                const destination = data[index];

                $('#slideshow').empty();

                // Populate slideshow with images
                destination.images.forEach(function(image, i) {
                    $('#slideshow').append('<img src="' + image + '" class="slide" alt="Attraction Image ' + (i + 1) + '">');
                });

                slideIndex = 0;
                showSlides(slideIndex);

                // Show the hover window
                $('.hover-window').removeClass('hidden');

                // Update the hover window with data from JSON
                $('#hover-name').text(destination.name);
                $('#hover-region').text(destination.region);
                $('#hover-attraction').text(destination.attraction);
                $('#hover-more-info').text(destination.more_info);
            });
        });
    });

    function showSlides(index) {
        const slides = $('.slide');
        slides.hide(); // Hide all slides
        slides.eq(index).show(); // Show the selected slide
    }

    $('#prev-slide').click(function() {
        slideIndex = (slideIndex > 0) ? slideIndex - 1 : $('.slide').length - 1;
        showSlides(slideIndex);
    });

    $('#next-slide').click(function() {
        slideIndex = (slideIndex < $('.slide').length - 1) ? slideIndex + 1 : 0;
        showSlides(slideIndex);
    });

    $("#hide").click(() => {
        $('.hover-window').addClass('hidden');
    });
});
