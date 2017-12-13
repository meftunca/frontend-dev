var ids = document.getElementsByClassName("mouse__");
Array.prototype.forEach.call(ids, function(item) {
    item.addEventListener("mouseover", function(e) {
        let id = this.id;
        let classQuery = document.querySelectorAll(".navbar .item");
        Array.prototype.forEach.call(classQuery, function(cls) {
            if (cls.classList.contains("active")) {
                cls.classList.remove("active");
            }
            if (cls.getAttribute("name") === id) {
                cls.classList.add("active");
            }
        });
    });
});
var hrf = document.querySelectorAll("[href^='#']:not([href^='#!'])");
Array.prototype.forEach.call(hrf, function(links) {
    links.addEventListener("click", function(e) {
        let val = this.getAttribute("href").replace("#", ""),
            linkY = e.pageY,
            targ = document.querySelector(".mouse__[id = '" + val + "']"),
            rectarg = targ.getBoundingClientRect(),
            targY = rectarg.top;
        console.log(performance.now());

        function scroll(y, duration) {
            var initialY =
                document.documentElement.scrollTop || document.body.scrollTop;
            var baseY = (initialY + y) * 0.5;
            var difference = initialY - baseY;
            var startTime = performance.now();

            function step() {
                var normalizedTime = (performance.now() - startTime) / duration;
                if (normalizedTime > 1) normalizedTime = 1;

                window.scrollTo(
                    0,
                    baseY + difference * Math.cos(normalizedTime * Math.PI)
                );
                if (normalizedTime < 1) window.requestAnimationFrame(step);
            }
            window.requestAnimationFrame(step);
        }
        scroll(targY, 1000);
        console.log(targY);
        document
            .querySelector(".navbar .nav-item")
            .querySelector(".active")
            .classList.remove("active");
        document
            .querySelector(".navbar .nav-item")
            .querySelector("a[href='#" + val + "']")
            .parentNode.classList.add("active");
        targY = 0;
        e.preventDefault();
    });
});
