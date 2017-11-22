
(function ($) {

    $.fn.lightbox = function () {

        var defaults = {
            "plugin_name": "lightbox",
            "version": "version 0.01",
            "creator": "By Meftunca"
        };
        var contents = $(".lightbox"),
            targets = $(".lightbox-content"),
            articles = $(".lightbox-article"),
            activators = $('.lightbox-link'),
            delay = 500,
            close = contents.find(".lightbox-close"),
            typed = ["image","video","iframe"];

// effect
        function embed(type,data,par){
            var embed;
            if(type == typed[0]){

                embed = '<img class="img-embed" src="'+data+'" '+par+' >';
            }else  if(type == typed[1]){
                embed = '<video class="img-embed"  src="'+data+'" '+par+' frameborder="0" gesture="media" allowfullscreen></video>';
            }else  if(type == typed[2]){
                embed = '<iframe src="'+data+'" class="img-embed" '+par+' ></iframe>';
            }
            targets.html(embed);

        }
        function effect_closed() {
            function close_content(){
                $(".lightbox-content").removeClass("out");
            }
            function close_targets() {
                setTimeout(close_content,delay);
                contents.removeClass("out");
            }
            setTimeout(close_targets,delay+100);
        }
        this.click(function (e) {
            var href = $(this).data("href"),type = $(this).data("type"),size = {};
            size = $(this).data("size");
             if ($.type(size) == "object") {
                if(size.width!=null && size.width != undefined){
                    width = "width='"+size.width+"'";
                }else{
                    width = "";
                }
                if(size.height!=null && size.height != undefined){
                    height = "height='"+size.height+"'";
                }else{
                    height="";
                }
                size = width + height;
             } else{
                size = "class='img-embed'";
            }
            embed(type,href,size);

            contents.addClass("show");
            targets.addClass("show");
            e.preventDefault();
        });
        close.click(function () {
            targets2 = $(this).parents(".lightbox");
            targets2.toggleClass("show out");
            targets2.find(".lightbox-content").toggleClass("show out");

            effect_closed();
        });
        $(".lightbox ").click(function(e) {
            if(contents.hasClass("show")){
                if (!$(e.target).is(".lightbox-content *")) {
                    $(".lightbox,.lightbox-content").removeClass("show out").removeAttr('style');

                    if (window.resize) {
                        $(".lightbox,.lightbox-content").removeClass("show out").removeAttr('style');
                    }

                }
            }
        });

    }

})(JQuery);
$(".lightbox-link").lightbox();
