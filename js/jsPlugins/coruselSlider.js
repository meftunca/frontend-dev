/**
 * Created by burak on 25.04.2017.
 */
(function ($) {
    $.fn.carousel = function () {
        var config = {
                "lg": 1024,
                "md": 768,
                "sm": 667
            },
            responsive = {},
            main = this,
            widthGlobal = $(".carousel-slider").innerWidth(),
            content = main.find(".carousel-content"),
            item = content.find(".slide-item"),
            itemIndis = item.filter(".active").index(),
            itemCount = null,
            slideCount = item.length,
            nextButton = main.find(".carousel-next-btn"),
            prevButton = main.find(".carousel-prev-btn"),
            pagination = main.find(".carousel-pagination"),
            paginate = content.data("pagination"),
            autoplay = main.data("autoplay"),
            timer = main.data("autotimer"),widths = null;

        //responsive settings


        function windowResp_query() {

            if (window.innerWidth >= config.lg) {
                if (responsive.xl != undefined) {
                    itemCount = responsive.xl;
                    widths = Number(widthGlobal) / Number(responsive.xl);
                    return widths;
                }
            } else if (window.innerWidth >= config.md) {
                if (responsive.lg != undefined) {
                    itemCount = responsive.lg;
                    widths = Number(widthGlobal) / Number(responsive.lg);
                    return widths;
                }
            } else if (window.innerWidth >= config.sm) {
                if (responsive.md != undefined) {
                    itemCount = responsive.md;
                    widths = Number(widthGlobal) / Number(responsive.md);
                    return widths;
                }
            } else if (window.innerWidth < config.sm) {
                if (responsive.sm != undefined) {
                    itemCount = responsive.sm;
                    widths = Number(widthGlobal) / Number(responsive.sm);
                    return widths;
                }
            }
            //return item.css("width", width);


        }

        responsive = content.data("grid");
        function resp_reset() {
            if (responsive) {
                widthGlobal = main.innerWidth();
                windowResp_query();
                item.css({"width": widths});
                item.filter(":nth-child(" + (itemIndis + 1) + ")").animate({marginLeft: -widths * (itemIndis)}, 'fast');

            } else {
                widths = main.innerWidth();
                content.find(".slide-item").css("width", widths);
            }
        }
        resp_reset();
        $(window).resize(function (e) {
            resp_reset();
        });

        //default settings
        nextButton.click(function () {
            content.finish();
            if (item.eq(slideCount - itemCount).hasClass("active")) {
                item.filter(":last-child").removeClass("active");
                content.animate({
                    marginLeft: 0
                }, 'fast');
                item.filter(":first-child").addClass("active");
                autoplay_slider("stop");

            } else {
                content.animate({
                    marginLeft: "+=-" + widths
                }, 'slow');
                item.filter(".active").removeClass("active").next(".slide-item").addClass("active");
            }

        });
        prevButton.click(function () {
            content.finish();
            if (item.filter(":first-child").hasClass("active")) {
                content.animate({
                    marginLeft: 0
                }, 'fast');
                item.filter(":last-child").addClass("active");
                autoplay_slider("stop");
            } else {
                content.animate({
                    marginLeft: "+=" + widths
                }, 'slow');
                item.filter(".active").removeClass("active").prev(".slide-item").addClass("active");
            }
        });
        if (paginate) {
            pagination.html("");
            itemCount = (itemCount != null) ? itemCount : 1;
            var paginate_item = slideCount / itemCount;
            for (var i = 0; i < paginate_item; i++) {
                pagination.append("<div class='item' data-paginate-target='" + i + "'></div>");
            }
            pagination.find(".item").click(function () {
                content.finish();

                var paginate_loc = itemIndis;
                var target = $(this).data("paginate-target");

                content.animate({
                    marginLeft: -(widthGlobal * target)
                }, 'slow');
                item.filter(".active").removeClass("active");
                item.eq(target * itemCount).addClass("active");

            });
        }
        if (autoplay = true) {
            if (timer = true) {
                var speed = Number(timer);
            } else {
                speed = 3500;
            }

            function autoplay_slider(par) {
                if (par = "stop") {
                    return false;
                } else {
                    if (item.filter(":last-child").hasClass("active")) {
                        item.filter(".active").removeClass("active");
                        content.animate({
                            marginLeft: 0
                        }, 'slow');
                        item.filter(":first-child").addClass("active");
                    } else {
                        item.filter(".active").removeClass("active").next(".slide-item").addClass("active");
                        indis = item.filter(".active").index();
                        content.animate({
                            marginLeft: -widths * indis
                        }, 'slow');


                    }
                }


            }


            function start_timer() {
                return setTimeout(autoplay_slider, speed / 2);
            }

            setInterval(start_timer, speed / 2);

        }
    };
}(jQuery));




