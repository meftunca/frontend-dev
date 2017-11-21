//alert js
$.alert = function() {
    var alert = "data-alert",
        href = "data-href",
        id = "data-id",
        timer = "data-timer",
        position = "alert-position";
    $(".alert-toggle[data-alert=true]").click(function() {
        var alert_id = $(this).attr(href);
        //timer
        var a_timer = $(this).attr(timer);
        // position
        var a_pos = $(this).attr("alert-position");

        $("[data-id=" + alert_id + "]").addClass("active bounceIn  position " + a_pos);

        function hidden_alert() {
            $("[data-id=" + alert_id + "]").removeClass('active')

        }
        if (a_timer) {
            setTimeout(function() {
                hidden_alert();
            }, a_timer);
        } else {
            setTimeout(function() {
                hidden_alert();
            }, 1200);
        }
    });
    $(".alert-close").click(function() {
        $(this).parents(".alert").removeClass("active bounceIn  position ");
    });


}
$.alert();
