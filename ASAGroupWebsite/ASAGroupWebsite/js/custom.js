$(document).ready(function () {
    /***************** Navbar-Collapse ******************/
    $(".navbar-nav li a").click(function (event) {
        $(".navbar-collapse").collapse('hide');
    });

    $(window).scroll(function () {
        if ($(".navbar").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
        } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
        }
    });

    /***************** Page Scroll ******************/

    $(function () {
        $('a.page-scroll').bind('click', function (event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
    });

    /***************** Scroll Spy ******************/

    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    })

    /***************** Owl Carousel ******************/

    $("#owl-hero").owlCarousel({

        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true,
        transitionStyle: "fadeUp",
        autoPlay: true,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]

    });


    /***************** Full Width Slide ******************/

    var slideHeight = $(window).height();

    $('#owl-hero .item').css('height', slideHeight);

    $(window).resize(function () {
        $('#owl-hero .item').css('height', slideHeight);
    });
    /***************** Owl Carousel Testimonials ******************/

    $("#owl-testi").owlCarousel({

        navigation: false, // Show next and prev buttons
        paginationSpeed: 400,
        singleItem: true,
        transitionStyle: "backSlide",
        autoPlay: true

    });
    /***************** Countdown ******************/

    $('#fun-facts').bind('inview', function (event, visible, visiblePartX, visiblePartY) {
        if (visible) {
            $(this).find('.timer').each(function () {
                var $this = $(this);
                $({
                    Counter: 0
                }).animate({
                    Counter: $this.text()
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function () {
                        $this.text(Math.ceil(this.Counter));
                    }
                });
            });
            $(this).unbind('inview');
        }
    });
    /***************** Google Map ******************/

    //function initialize() {
    //    var mapCanvas = document.getElementById('map');
    //    var mapOptions = {
    //        center: new google.maps.LatLng(39.92757, -83.160207),
    //        zoom: 8,
    //        mapTypeId: google.maps.MapTypeId.ROADMAP
    //    }
    //    var map = new google.maps.Map(mapCanvas, mapOptions);
    //}

    //google.maps.event.addDomListener(window, 'load', initialize);

    /***************** Wow.js ******************/
    
    new WOW().init();
    
    /***************** Preloader ******************/
    
    var preloader = $('.preloader');
    $(window).load(function () {
        preloader.remove();
    });


    /***************** Submit message ******************/
    var form = $('#main-contact-form');
    var baseurl = location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/";
    form.submit(function (event) {
        event.preventDefault();
        var form_status = $('<div class="form_status"></div>');
        var username = $('#Name').val(); var userMailId = $('#Email').val(); var userPhoneNo = $('#PhoneNumber').val(); var userCmpyName = $('#Company').val();
        var userSubject = $('#Subject').val(); var userMessage = $('#Message').val();
        var details = { 'UserName': username, 'UserMailId': userMailId, 'UserPhoneNo': userPhoneNo, 'UserCmpyName': userCmpyName, 'UserSubject': userSubject, 'UserMessage': userMessage };
        $.ajax({
            type: "POST",
            url: baseurl + 'mailmanager/SendMail',
            data: JSON.stringify(details),
            async: true,
            contentType: "application/json;charset=utf-8",
            processData: true,
            beforeSend: function () {
                form.prepend(form_status.html('<p><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>').fadeIn());
            },
            success: function (data) {
                var result;
                if (data.toString().toLowerCase() == "success") {
                    result = "Mail sent.";
                    $('#Name').val(''); $('#Email').val(''); $('#PhoneNumber').val(''); $('#Company').val('');
                    $('#Subject').val(''); $('#Message').val('');
                }
                else {
                    result = "Some error occured. Please try again.";
                }
                form_status.html('<p class="text-success">' + result + '</p>').delay(3000).fadeOut();
            },
            error: function (xhr) {
            }
        });
    });
})