 /* by meftunca modal js creators
 * Date 19/04/2017
 * Time 00:14
 * devLoop@byMeftunca
 */

$.modal_api = function () {
    var group = "modal-group", toggle = ".modal-toggle", modal = ".modal",close=".close,.close *";
    var modalAttr = "data-type",toggleAttr="data-toggle";


    $(toggle).click(function () {
      var type = $(this).attr("data-toggle");
        $(".modal[data-type="+type+"]").addClass("show");
        $(".modal[data-type="+type+"]").find(close).click(function () {
            // $(".modal-content").addClass("modal-closed-effect");
            $(this).parents(modal).removeClass("show");
        });

     });

    // $(modal).removeClass("show");



    $(this).click(function (e) {

        if (!$(e.target).is( '.modal-content *'+','+toggle)) {
            $(modal).removeClass("show");
         }
    });

}
$(document).ready(function () {
    $.modal_api();
})
