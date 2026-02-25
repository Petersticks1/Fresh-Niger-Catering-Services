/*--------------------- Copyright (c) 2021 -----------------------
[Master Javascript]

Template Name: Catering HTML Template 
Version: 1.0.0
Author: Kamleshyadav
Website: https://www.pixelnx.com/
Purchase: http://themeforest.net/user/kamleshyadav

-------------------------------------------------------------------*/
(function ($) {
    "use strict";
    /*-----------------------------------------------------
        Function  Start
    -----------------------------------------------------*/
    var control = {
        initialised: false,
        version: 1.0,
        init: function () {
            if (!this.initialised) {
                this.initialised = true;
            } else {
                return;
            }
            /*-----------------------------------------------------
                Function Calling
            -----------------------------------------------------*/
            this.searchBox();
            this.niceSlection();
            this.swiperSLiders();
            this.navMenu();
            this.focusText();
            this.siteLoader();
            this.bookingForm();
            this.topButton();
            this.popupVideo();

        },




        /*-----------------------------------------------------
            Fix Search Bar
        -----------------------------------------------------*/
        searchBox: function () {
            $('.search-btn').on("click", function () {
                $('.search-box').addClass('show');
            });
            $('.close-btn').on("click", function () {
                $('.search-box').removeClass('show');
            });
            $('.search-box').on("click", function () {
                $('.search-box').removeClass('show');
            });
            $(".search-bar-inner").on('click', function (e) {
                e.stopPropagation();
            });
        },

        /*-----------------------------------------------------
            Nice Select
        -----------------------------------------------------*/
        niceSlection: function () {
            if ($('.nice-selection').length > 0) {
                $(document).ready(function () {
                    $('.nice-selection').niceSelect();
                });
            }
        },

        /*-----------------------------------------------------
            Home Banner Slider
        -----------------------------------------------------*/
        swiperSLiders: function () {
            // Home banner
            $(document).ready(function () {
                new Swiper('.banner-slider', {
                    loop: false,
                    slidesPerView: 1,
                    spaceBetween: 0,
                    grabCursor: true,
                    autoplay: {
                        delay: 4000,
                        disableOnInteraction: false
                    },
                });
            });

            // Team slider
            $(document).ready(function () {
                new Swiper('.team-slider', {
                    pagination: {
                        el: '.pagination-team-swiper',
                        clickable: true,
                    },
                    paginationClickable: false,
                    direction: 'horizontal',
                    spaceBetween: 30,
                    nested: true,
                    slidesPerView: 4,
                    allowTouchMove: true,
                    breakpoints: {
                        0: {
                            slidesPerView: 1,
                        },
                        575: {
                            slidesPerView: 2,
                        },
                        767: {
                            slidesPerView: 2,
                        },
                        992: {
                            slidesPerView: 3,
                        },
                        1200: {
                            slidesPerView: 4,
                        },
                        1400: {
                            slidesPerView: 4,
                        },
                    },
                });
            });


            // Testimonial slider
            $(document).ready(function () {
                new Swiper('.testimonial-slider', {
                    pagination: {
                        el: '.pagination-testimonial-swiper',
                        clickable: true,
                    },
                    paginationClickable: false,
                    direction: 'horizontal',
                    spaceBetween: 30,
                    nested: true,
                    slidesPerView: 2,
                    allowTouchMove: true,
                    breakpoints: {
                        0: {
                            slidesPerView: 1,
                        },
                        575: {
                            slidesPerView: 1,
                        },
                        767: {
                            slidesPerView: 1,
                        },
                        992: {
                            slidesPerView: 1,
                        },
                        1200: {
                            slidesPerView: 2,
                        }
                    },
                });
            });
        },

        /*-----------------------------------------------------
                Fix Tour Video Popup
        ----------------------------------------------------*/
        popupVideo: function () {
            if ($(".popup-youtube").length > 0) {
                $(".popup-youtube").magnificPopup({
                    type: "iframe",
                });
            }
        },

        /*-----------------------------------------------------
            Fix Mobile Menu 
        -----------------------------------------------------*/
        navMenu: function () {
            /* Menu Toggle */
            $(".menu-btn").on('click', function (event) {
                $(".main-menu, .menu-btn").toggleClass("open-menu");
            });
            $("body").on('click', function () {
                $(".main-menu, .menu-btn").removeClass("open-menu");
            });
            $(".menu-btn, .main-menu").on('click', function (event) {
                event.stopPropagation();
            });

            /* Submenu */

            var w = window.innerWidth;
            if (w <= 1199) {
                $(".main-menu > ul > li").on('click', function (e) {
                    $('.main-menu > ul > li').not($(this)).closest('li').find('.sub-menu').slideUp();
                    $('.main-menu > ul > li').not($(this)).closest('li').removeClass('open');
                    $(this).closest('li').find('.sub-menu').slideToggle();
                    $(this).toggleClass("open");
                });
                $(".sub-menu").on('click', function (event) {
                    event.stopPropagation();
                });
            }

            /* Linking */
            $(function () {
                for (var a = window.location, counting = $(".main-menu > ul > li > a").filter(function () {
                    return this.href == a;
                }).addClass("active"); ;) {
                    if (!counting.is(".has-sub-menu")) break;
                    counting = counting.parent().addClass("active");
                }
                // Submenu
                for (var a = window.location, counting = $(".sub-menu a").filter(function () {
                    return this.href == a;
                }).parent().parent().parent().addClass("active"); ;) {
                    if (!counting.is(".has-sub-menu")) break;
                    counting = counting.parent().addClass("active");
                }
            });
        },

        /*-----------------------------------------------------
            Fix  On focus Placeholder
        -----------------------------------------------------*/
        focusText: function () {
            var place = '';
            $('input,textarea').focus(function () {
                place = $(this).attr('placeholder');
                $(this).attr('placeholder', '');
            }).blur(function () {
                $(this).attr('placeholder', place);
            });
        },


        /*-----------------------------------------------------
            Fix Go To Top Button
        -----------------------------------------------------*/
        topButton: function () {
            var scrollTop = $(".scroll-to-topp");
            $(window).on('scroll', function () {
                if ($(this).scrollTop() < 500) {
                    scrollTop.removeClass("active");
                } else {
                    scrollTop.addClass("active");
                }
            });
            $('.scroll-to-topp').click(function () {
                $("html, body").animate({
                    scrollTop: 0
                }, "slow");
                return false;
            });


            /** Scroll Down Banner **/
            $(function () {
                $('.scroll-down-section').click(function () {
                    $('html, body').animate({ scrollTop: $('#scroll-down-section').offset().top }, 'fast');
                    return false;
                });
            });

            /** Scroll Down Banner **/
            $(function () {
                $('.bookNow').click(function () {
                    $('html, body').animate({ scrollTop: $('#bookNow').offset().top }, 'fast');
                    return false;
                });
            });
        },

        /*-----------------------------------------------------
                Site Loader Js
        -----------------------------------------------------*/
        siteLoader: function () {
            jQuery(window).on("load", function () {
                var preLoader = $('.cat-preloader');
                preLoader.fadeToggle(500).fadeOut("slow");
            });

            /*-----------------------------------------------------
                Event Filter js
            -----------------------------------------------------*/
            $(function () {
                $('.cat-filter').mixItUp();
            });

            $('.popup-gallery').magnificPopup({
                type: 'image',
                gallery: {
                    enabled: true
                }
            });

        },


        /*-----------------------------------------------------
                Booking Form Submition
        -----------------------------------------------------*/

        bookingForm: function () {
            $('#bookingConfirm').on('click', function () {
                var cdate = $('#cus_date').val();
                var cevent = $('#cus_event').val();
                var cppl = $('#cus_ppl').val();
                var carea = $('#cus_area').val();
                var cname = $('#cus_name').val();
                var cnum = $('#cus_num').val();
                var cemail = $('#cus_email').val();
                var cename = $('#cus_event_name').val();
                var cnote = $('#cus_note').val();
                console.log(cdate + ' ' + cevent + ' ' + cppl + ' ' + carea + ' ' + cname + ' ' + cnum + ' ' + cemail + ' ' + cename + ' ' + cnote);
                $.ajax({
                    type: "POST",
                    url: "informative_booking.php",
                    data: {
                        'username': cname,
                        'userdate': cdate,
                        'usernum': cnum,
                        'uevent': cevent,
                        'uarea': carea,
                        'uemail': cemail,
                        'uppl': cppl,
                        'eventName': cename,
                        'note': cnote,
                    },
                    success: function (msg) {
                        console.log(msg);
                        var full_msg = msg.split("#");
                        if (full_msg[0] == '1') {
                            $('#cus_date').val("");
                            $('#cus_event').val("");
                            $('#cus_ppl').val("");
                            $('#cus_area').val("");
                            $('#cus_name').val("");
                            $('#cus_num').val("");
                            $('#cus_email').val("");
                            $('#cus_event_name').val("");
                            $('#cus_note').val("");
                            $('#err3').html(full_msg[1]);
                        } else {
                            $('#cus_date').val(cdate);
                            $('#cus_event').val(cevent);
                            $('#cus_ppl').val(cppl);
                            $('#cus_name').val(cname);
                            $('#cus_num').val(cnum);
                            $('#cus_email').val(cemail);
                            $('#cus_event_name').val(cename);
                            $('#cus_note').val(cnote);
                            $('#err3').html(full_msg[1]);
                        }
                    }
                });
            });
        },



    };

    control.init();

})(jQuery);;