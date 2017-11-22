
$.fn.fileput= function () {
    var main = $(".fileput"),
        input = $(".fileput input[type=file]") ;

    this.click(function (e) {
        var item = $(this).parents(".fileput").find("input[type=file]");
        item.trigger('click');
        main.find(".fileput-list").slideUp(350);
         item.change(function () {
             main.find(".fileput-list ul").html("");
            var names = [];
            for (var i = 0; i < $(this).get(0).files.length; ++i) {
                names.push($(this).get(0).files[i].name);
            }
            var count = names.length;
            for(var i = 0; i<count; i++){
                main.find(".fileput-list").find("ul").append("<li><span>"+(i+1)+") </span>"+names[i]+"</li>");
            }
            main.find(".fileput-list").slideDown(350);
        });
    e.preventDefault();
    });
};
$(".fileput .fileput-btn").fileput();
