/**
 * Created by burak on 29.04.2017.
 */

$.popovers = function () {
    var popover= "[data-popover=true]",id="data-id",href="data-href",linked = ".popover-toggle"+popover,content=".popover-content";

    $(linked).click(function () {
        var popId = $(this).attr(id);
        $(content+"[data-href="+popId+"]").toggleClass("show");
     });

}
$.popovers();
