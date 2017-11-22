/**
 * Created by burak on 26.04.2017.
 */
/*select box items*/
 $.selectBox = function () {

var list_val=$(".dropdown-menu[data-type=selectbox] li[select-value]");

         list_val.click(function () {
             var select_toggle=$(this).parents(".dropdown-toggle[data-toggle=selectbox]") ,
                 select_item =$(this).parents(".dropdown-menu[data-type=selectbox]"),
                 event_Inputval =$(this).parents(".dropdown-toggle[input-value]"),
                 select_Inputname=$(this).parents(".dropdown-menu[data-type=selectbox]").attr("input-name");
             var values = $(this).attr("select-value");
             var query=$(this).parents("form").find("input[name="+select_Inputname+"]");
             $(this).parents(".dropdown-menu[data-type=selectbox]").attr("input-value",values);
              if(query.length < 1){
                    $(this).parents("form").append("<input type='hidden' name="+select_Inputname+" value="+values+">");
                }else{
                    query.attr("value",values);

                }
           $(this).parents(".dropdown-menu").siblings(".dropdown-toggle").text(values);



          });


}
$.selectBox()
