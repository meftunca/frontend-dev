
$.tab = function () {

    var data = "data-toggle",href="data-href",id="data-id",group=".tab-group",toggle =".tab-item",content=".tab-content";
   $(group).show(function () {
       $(this).find(".tab-content").first().addClass("active");
       $(".tab-item:first").addClass("active");
   });


    $(toggle).click(function () {

        var dataHref = $(this).attr(href);

        $(" .tab-content[data-id="+dataHref+"]").siblings(".tab-content").removeClass("active");
        $(this).siblings(".tab-item").removeClass("active");
        $(this).addClass("active");
        $("["+id+"="+dataHref+"]").addClass("active");
     });

}
$.tab();
