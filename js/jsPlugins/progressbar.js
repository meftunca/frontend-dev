/**
 * Created by burak on 29.04.2017.
 */

$.progressbar = function() {
    var data = "data-progressbar=true",
        value = "aria-valuenow",
        min = "aria-valuemin",
        max = "aria-valuemax",
        mainClass = ".progress",
        subClass = ".progress-bar",
        loaders = "progressbar-loaders",
        time = "loader-time",
        loader = "loader-delay";

    $(".progress-bar").show(function() {
        var valueNow = $(this).attr(value);
        if (valueNow == 'undefined') {
            valueNow = $(this).css("width");

        }
        $(this).animate({
            width: valueNow
        }).text(valueNow)
    });




}
$.progressbar();
