//card toggle js libary

$.cardToggle_api = function() {

    $(".card-toggle").click(function functionName() {

        var id = $(this).attr("data-id"),
            href = $(".card-toggle-content[data-href=" + id + "]");

        href.toggleClass('show');
    });


}
$.cardToggle_api();
