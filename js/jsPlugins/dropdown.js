/* by meftunca dropdown js creators
 * Date 19/04/2017
 * Time 00:14
 * devLoop@byMeftunca
 */

$.dropdown_api = function(e) {

    var dropdown = "dropdown",
        toggle = ".dropdown-toggle",
        menu = ".dropdown-menu";

    function dropdown_default() {
        $(toggle).click(function() {
            $(menu).removeClass("show");
            $(this).siblings(menu).toggleClass("show");
            return false;
        });

    }
    if ($(".dropdown-toggle[data-collapse=dropdown]")) {
        if (window.innerWidth <= 768) {

            $(toggle).click(function() {
                var content = $(this).siblings(".dropdown-menu");
                content.slideToggle(400).toggleClass('show');

            });
        } else {
            dropdown_default();
        }
    } else {
        dropdown_default();

    }

    $(this).click(function(e) {

        if (!$(e.target).is(".dropdown-menu")) {
            $(".dropdown-menu").removeClass("show");
        }
    });

}

$.dropdown_api();
