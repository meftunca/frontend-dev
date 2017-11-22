/**
 * Created by burak on 22.04.2017.
 */
$.typing = function () {

 var count =0;
 var i = 0;
 var textArr = new Array;
 var text = $(".typing").text();
 var textLength = text.length;

 $(".typing").each(function () {
     textArr[i] = text;

 })

    function writting() {

     $(".typing").append(textArr[count].substr(i,1))
         i++;
        alert(textArr);
         if(i==textArr[count].length){
             i=0;
          }


        setInterval(writting,100)

    }

}

$.typing();

