/**
 * Created by burak on 23.04.2017.
 */

function echo(par) {
   document.writeln(par);

}
$.timer = function () {

         var name = $("[data-item = timer]").attr("timer-name"),
             time=$("[timer-name="+name+"]").attr("timer-time"),
             speed=$("[timer-name="+name+"]").attr("timer-speed");

         function go() {
        time = Number(time);
        speed = Number(speed);
        if(time>=0){
            $("[timer-name="+name+"]").attr("timer-time",time).html(time);
            time--;
        }
        else if(time=0){
            $("[timer-name="+name+"]").attr("timer-time").html(time)

        }


         }

    setInterval( go,speed)



 }
$.timer();

