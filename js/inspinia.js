/*
 *
 *   INSPINIA - Responsive Admin Theme
 *   version 2.6
 *
 */


$(document).ready(function () {


    // Add body-small class if window less than 768px
    if ($(this).width() < 769) {
        $('body').addClass('body-small')
    } else {
        $('body').removeClass('body-small')
    }

    // MetsiMenu
    $('#side-menu').metisMenu();

    // Collapse ibox function
    $('.collapse-link').on('click', function () {
        var ibox = $(this).closest('div.ibox');
        var button = $(this).find('i');
        var content = ibox.find('div.ibox__content');
        content.slideToggle(200);
        button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        ibox.toggleClass('').toggleClass('border-bottom');
        setTimeout(function () {
            ibox.resize();
            ibox.find('[id^=map-]').resize();
        }, 50);
    });

    // Close ibox function
    $('.close-link').on('click', function () {
        var content = $(this).closest('div.ibox');
        content.remove();
    });

    // Fullscreen ibox function
    $('.fullscreen-link').on('click', function () {
        var ibox = $(this).closest('div.ibox');
        var button = $(this).find('i');
        $('body').toggleClass('fullscreen-ibox__mode');
        button.toggleClass('fa-expand').toggleClass('fa-compress');
        ibox.toggleClass('fullscreen');
        setTimeout(function () {
            $(window).trigger('resize');
        }, 100);
    });

    // Close menu in canvas mode
    $('.close-canvas-menu').on('click', function () {
        $("body").toggleClass("mini-navbar");
        SmoothlyMenu();
    });

    // Run menu of canvas
    $('body.canvas-menu .sidebar-collapse').slimScroll({
        height: '100%',
        railOpacity: 0.9
    });

    // Open close right sidebar
    $('.right-sidebar-toggle').on('click', function () {
        $('#right-sidebar').toggleClass('sidebar-open');
    });

    // Initialize slimscroll for right sidebar
    $('.sidebar-container').slimScroll({
        height: '100%',
        railOpacity: 0.4,
        wheelStep: 10
    });

    // Open close small chat
    $('.open-small-chat').on('click', function () {
        $(this).children().toggleClass('fa-comments').toggleClass('fa-remove');
        $('.small-chat-box').toggleClass('active');
    });

    // Initialize slimscroll for small chat
    $('.small-chat-box .content').slimScroll({
        height: '234px',
        railOpacity: 0.4
    });

    // Small todo handler
    $('.check-link').on('click', function () {
        var button = $(this).find('i');
        var label = $(this).next('span');
        button.toggleClass('fa-check-square').toggleClass('fa-square-o');
        label.toggleClass('todo-list__label--completed');
        return false;
    });

    // Append config box / Only for demo purpose
    // Uncomment on server mode to enable XHR calls
    //    $.get("skin-config.html", function (data) {
    //        if (!$('body').hasClass('no-skin-config'))
    //            $('body').append(data);
    //    });

    // Minimalize menu
    $('.navbar-minimalize').on('click', function () {
        $("body").toggleClass("mini-navbar");
        SmoothlyMenu();

    });

    // Tooltips demo
    $('.tooltip-demo').tooltip({
        selector: "[data-toggle=tooltip]",
        container: "body"
    });


    // Full height of sidebar
    function fix_height() {
        var heightWithoutNavbar = $("body > #wrapper").height() - 31;
        $(".sidebard-panel").css("min-height", heightWithoutNavbar + "px");

        var navbarHeigh = $('nav.navbar-default').height();
        var wrapperHeigh = $('#page-wrapper').height();

        if (navbarHeigh > wrapperHeigh) {
            $('#page-wrapper').css("min-height", navbarHeigh + "px");
        }

        if (navbarHeigh < wrapperHeigh) {
            $('#page-wrapper').css("min-height", $(window).height() + "px");
        }

        if ($('body').hasClass('fixed-nav')) {
            if (navbarHeigh > wrapperHeigh) {
                $('#page-wrapper').css("min-height", navbarHeigh + "px");
            } else {
                $('#page-wrapper').css("min-height", $(window).height() - 30 + "px");
            }
        }

    }

    fix_height();

    // Fixed Sidebar
    $(window).bind("load", function () {
        if ($("body").hasClass('fixed-sidebar')) {
            $('.sidebar-collapse').slimScroll({
                height: '100%',
                railOpacity: 0.9
            });
        }
    });

    // Move right sidebar top after scroll
    $(window).scroll(function () {
        if ($(window).scrollTop() > 0 && !$('body').hasClass('fixed-nav')) {
            $('#right-sidebar').addClass('sidebar-top');
        } else {
            $('#right-sidebar').removeClass('sidebar-top');
        }
    });

    $(window).bind("load resize scroll", function () {
        if (!$("body").hasClass('body-small')) {
            fix_height();
        }
    });

    $("[data-toggle=popover]")
        .popover();

    // Add slimscroll to element
    $('.full-height-scroll').slimscroll({
        height: '100%'
    })
});


// Minimalize menu when screen is less than 768px
$(window).bind("resize", function () {
    if ($(this).width() < 769) {
        $('body').addClass('body-small')
    } else {
        $('body').removeClass('body-small')
    }
});

$(document).ready(function () {
    $('#open_menu').on( "click", function () {
        $('#top_menu').addClass('menu--opened');
        $('html').css('overflow', 'hidden');
        $('#top_menu').siblings().css('opacity', '.4');
        $('body').bind('touchmove', function(e) {
            e.preventDefault()
        });
    });
    //
    $('#top_menu').siblings().on( "click", function () {
        $('.menu--opened').fadeOut().removeClass('menu--opened');
//        $('html').css('overflow', 'scroll');
//        $('body').unbind('touchmove');
    });    
    $('#top_menu .close').on( "click", function () {
        $('.menu--opened').fadeOut().removeClass('menu--opened');
        $('html').css('overflow', 'scroll');
        $('body').unbind('touchmove');
        $('#top_menu').siblings().css('opacity', '1');
    });    
 
});


// Local Storage functions
// Set proper body class and plugins based on user configuration
$(document).ready(function () {
    if (localStorageSupport()) {

        var collapse = localStorage.getItem("collapse_menu");
        var fixedsidebar = localStorage.getItem("fixedsidebar");
        var fixednavbar = localStorage.getItem("fixednavbar");
        var boxedlayout = localStorage.getItem("boxedlayout");
        var fixedfooter = localStorage.getItem("fixedfooter");

        var body = $('body');

        if (fixedsidebar == 'on') {
            body.addClass('fixed-sidebar');
            $('.sidebar-collapse').slimScroll({
                height: '100%',
                railOpacity: 0.9
            });
        }

        if (collapse == 'on') {
            if (body.hasClass('fixed-sidebar')) {
                if (!body.hasClass('body-small')) {
                    body.addClass('mini-navbar');
                }
            } else {
                if (!body.hasClass('body-small')) {
                    body.addClass('mini-navbar');
                }

            }
        }

        if (fixednavbar == 'on') {
            $(".navbar-static-top").removeClass('navbar-static-top').addClass('navbar-fixed-top');
            body.addClass('fixed-nav');
        }

        if (boxedlayout == 'on') {
            body.addClass('boxed-layout');
        }

        if (fixedfooter == 'on') {
            $(".footer").addClass('fixed');
        }
    }


});

// check if browser support HTML5 local storage
function localStorageSupport() {
    return (('localStorage' in window) && window['localStorage'] !== null)
}

//
//



// For demo purpose - animation css script
function animationHover(element, animation) {
    element = $(element);
    element.hover(
        function () {
            element.addClass('animated ' + animation);
        },
        function () {
            //wait for animation to finish before removing classes
            window.setTimeout(function () {
                element.removeClass('animated ' + animation);
            }, 2000);
        });
}

function SmoothlyMenu() {
    if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
        // Hide menu in order to smoothly turn on when maximize menu
        $('#side-menu').hide();
        // For smoothly turn on menu
        setTimeout(
            function () {
                $('#side-menu').fadeIn(400);
            }, 200);
    } else if ($('body').hasClass('fixed-sidebar')) {
        $('#side-menu').hide();
        setTimeout(
            function () {
                $('#side-menu').fadeIn(400);
            }, 100);
    } else {
        // Remove all inline style from jquery fadeIn function to reset menu state
        $('#side-menu').removeAttr('style');
    }
}

// Dragable panels
function WinMove() {
    var element = "[class*=col]";
    var handle = ".ibox__title";
    var connect = "[class*=col]";
    $(element).sortable({
            handle: handle,
            connectWith: connect,
            tolerance: 'pointer',
            forcePlaceholderSize: true,
            opacity: 0.8
        })
        .disableSelection();
}

//Particles
/* ---- particles.js config ---- */

//particlesJS("particles-js", {
//    "particles": {
//        "number": {
//            "value": 398,
//            "density": {
//                "enable": true,
//                "value_area": 1657.2100474277727
//            }
//        },
//        "color": {
//            "value": "#ffffff"
//        },
//        "shape": {
//            "type": "circle",
//            "stroke": {
//                "width": 0,
//                "color": "#000000"
//            },
//            "polygon": {
//                "nb_sides": 5
//            },
//            "image": {
//                "src": "img/github.svg",
//                "width": 100,
//                "height": 100
//            }
//        },
//        "opacity": {
//            "value": 0.5,
//            "random": false,
//            "anim": {
//                "enable": true,
//                "speed": 1,
//                "opacity_min": 0.1,
//                "sync": false
//            }
//        },
//        "size": {
//            "value": 3,
//            "random": true,
//            "anim": {
//                "enable": false,
//                "speed": 40,
//                "size_min": 0.1,
//                "sync": false
//            }
//        },
//        "line_linked": {
//            "enable": true,
//            "distance": 150,
//            "color": "#ffffff",
//            "opacity": 0.4,
//            "width": 1
//        },
//        "move": {
//            "enable": true,
//            "speed": 3,
//            "direction": "none",
//            "random": true,
//            "straight": false,
//            "out_mode": "out",
//            "bounce": false,
//            "attract": {
//                "enable": true,
//                "rotateX": 4329.212564336912,
//                "rotateY": 1200
//            }
//        }
//    },
//    "interactivity": {
//        "detect_on": "window",
//        "events": {
//            "onhover": {
//                "enable": true,
//                "mode": "grab"
//            },
//            "onclick": {
//                "enable": true,
//                "mode": "repulse"
//            },
//            "resize": true
//        },
//        "modes": {
//            "grab": {
//                "distance": 203.7962037962038,
//                "line_linked": {
//                    "opacity": 0.8418939375541366
//                }
//            },
//            "bubble": {
//                "distance": 400,
//                "size": 40,
//                "duration": 2,
//                "opacity": 8,
//                "speed": 3
//            },
//            "repulse": {
//                "distance": 200,
//                "duration": 0.4
//            },
//            "push": {
//                "particles_nb": 4
//            }
//        }
//    },
//    "retina_detect": true
//});