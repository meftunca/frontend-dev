 $.fn.table=function () {
     this.find("th").on('click', function() {
         var table = $(this).parents('table').eq(0);
         var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()));
         this.asc = !this.asc;
         if (!this.asc) {
             rows = rows.reverse();
         }
         table.children('tbody').empty().html(rows);
     });

     function comparer(index) {
         return function(a, b) {
             var valA = getCellValue(a, index),
                 valB = getCellValue(b, index);
             return $.isNumeric(valA) && $.isNumeric(valB) ?
                 valA - valB : valA.localeCompare(valB);
         };
     }

     function getCellValue(row, index) {
         return $(row).children('td').eq(index).text();
     }

 };
$.fn.filter=function () {

    $('.data-table [data-search=true]').on('keyup', function() {
        var value = $(this).val();
        var patt = new RegExp(value, "i");

        $(this).parents(".data-table").find("tbody").find('tr').each(function() {
            if (!($(this).find('td').text().search(patt) >= 0)) {
                $(this).not('.myHead').hide();
            }
            if (($(this).find('td').text().search(patt) >= 0)) {
                $(this).show();
            }

        });


    });


};
$("table").filter();
 $("table").table();
