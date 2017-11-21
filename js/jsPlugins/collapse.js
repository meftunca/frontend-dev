/**
 * Collapse
 */


$.collapse = function() {
    var collapse = "data-collapse",
        href = "data-href",
        id = "data-id";
    var type = ["default", "navbar"];

    $("[data-collapse=" + type[0] + "]:not('.show')").click(function() {
        var idHref = $(this).attr("data-href");
        var content = $(".collapse[data-id=" + idHref + "]");
        var speed = content.attr("collapse-speed");
        Number(speed);
        if (speed === 'undefined' || speed === 'null') {
            speed = 500;
        }

        content.slideToggle(speed, function() {
            $(this).slideToggle(400).addClass("show");
        });

    });

    $("[data-collapse=" + type[1] + "]:not('.show')").click(function() {
        var idHref = $(this).attr("data-href");
        var content = $(".navbar-collapse[data-id=" + idHref + "]");
        content.slideToggle(400).toggleClass("show");

    });


}
$.collapse();
