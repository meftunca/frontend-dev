/**
 * Created by burak on 23.04.2017.
 */

function hex(){
    var dates = new Date();
    var hour=dates.getHours(),
        minute = dates.getMinutes(),
        second = dates.getSeconds();
    hour = hour <= 9 ? '0' + hour : hour;
    minute = minute <= 9 ? '0' + minute : minute;
    second = second <= 9 ? '0' + second : second;
    document.body.style.backgroundColor="#"+hour+String(minute)+second;
    document.getElementById("time").innerHTML = hour + " : " + minute + " : " + second;
    document.getElementById("color").innerHTML = "#" + hour + minute + second;

}
hex();
setInterval(hex, 1000);
