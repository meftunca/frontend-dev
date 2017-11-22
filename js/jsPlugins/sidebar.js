$.sidebar_api = function() {

    var type = '.sidebar[data-type=sidebar]',
        toggle = '.sidebar-toggle[data-toggle=sidebar]',
        id = 'data-id',
        href = 'data-href';

    $(toggle).click(function() {

        var n_id = $(this).attr(href);
        $('.sidebar[data-id = ' + n_id + ']').toggleClass('show');
    });
    $(this).click(function(e) {

        if (!$(e.target).is(".sidebar,.sidebar *,.sidebar-toggle")) {
            $(".sidebar").removeClass("show");
        }
    });
}
$.sidebar_api();
