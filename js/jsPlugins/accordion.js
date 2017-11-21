/**
 * Created by burak on 20.04.2017.
 */
$.accordion = function() {
    var toggle = ".nested.toggle",
        accordion = ".accordion-menu",
        submenu = ".nested.accordion",
        active = "show";

    $(toggle).click(function() {
        $(this).siblings(submenu).toggleClass("show");

    });


}
$.accordion();
