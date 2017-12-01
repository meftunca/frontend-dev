var datepicker = (function () {
    var date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth(),
        day = date.getDate(),
        month_count = 12,
        months_short = [],
        months_long = [],
        day_count,
        days = [],
        week_day_count = 7,
        week_day = [],
        lastday = function (y, m) {
            return new Date(y, m + 1, 0).getDate();
        };

    function getArrayMonths() {
        for (var i = 0; i < month_count; i++) {
            var objDate = new Date(year, i, 10),
                locale = navigator.language,
                month_l = objDate.toLocaleString(locale, {
                    month: "long"
                }),
                month_s = objDate.toLocaleString(locale, {
                    month: "short"
                });
            months_long.push(month_l);
            months_short.push(month_s);
        }
        return false;
    }

    function getArrayday() {
        days = [];
        week_day = [];
        for (var i = 0; i <= day_count; i++) {
            var objDate = new Date(year, month, i),
                locale = navigator.language,
                day_l = objDate.toLocaleString(locale, {
                    day: "numeric"
                }),
                weekDay = objDate.toLocaleString(locale, {
                    weekday: "short"
                });
            days.push(day_l);
            week_day.push(weekDay);
        }
    }

    function week_day_name() {
        for (var i = 0; i < week_day_count; i++) {
            var objDate = new Date(year, month, i),
                locale = navigator.language,
                weekDay = objDate.toLocaleString(locale, {
                    weekday: "short"
                });
            week_day.push(weekDay);
        }
    }

    var setup = function (par = null) {
        if (par == null) {
            par = document;
            return par;
        }
        day_count = lastday(year, month);
        getArrayMonths();
        getArrayday();
        var day_c_parent_head = par.querySelector(".datepicker-body-head");
        var day_c_parent_day = par.querySelector(".datepicker-body-content");
        for (i in week_day) {
            if (i - 1 < 6) {
                var day_c = document.createElement("h6");
                day_c.classList.add("datepicker-days");
                day_c.innerHTML = week_day[i];
                day_c_parent_head.appendChild(day_c);
            } else {
                break;
            }
        }
        for (i in days) {
            var day_c = document.createElement("div");
            day_c.classList.add("datepicker-days");
            day_c.href = "#!";
            day_c.innerHTML = days[i];
            day_c.tabIndex = days[i];

            day_c_parent_day.appendChild(day_c);
            if (i == day) {
                day_c.classList.add("active");
            }
            var x = 1;
            if (i < days[x]) {
                day_c.classList.add("date-gray");
            }

            day_c.addEventListener("click", function () {
                this.parentNode.querySelector(".datepicker-days.active")
                    .classList.remove("active");
                this.classList.add("active");
                day = this.tabIndex;
                par.classList.remove("active");
                par.querySelector(".date-summary").innerHTML = day + " " + months_long[month] + " " + year;
                par.parentNode.querySelector("input[type=hidden]").value = day + "-" + months_long[month] + "-" + year;
            },
                false
            );

            x++;
        }
        if (days.length < 35) {
            for (var a = 1; a <= 35 - days.length; a++) {
                var day_c = document.createElement("span");
                day_c.classList.add("datepicker-days", "date-gray");
                day_c.innerHTML = a;
                day_c_parent_day.appendChild(day_c);
            }
        }
        var head_summary = par.querySelector("a.date-summary");
        head_summary.innerHTML = day + " " + months_long[month] + " " + year;
        return this;
    };
    window.addEventListener("load", function () {
        setup();
    }, true);

    function clears(par = null) {
        if (par == null) {
            par = document.querySelector(".datepicker")
        }
        var day = par.querySelectorAll(".datepicker-days");
        for (i in day) {
            day[i].outerHTML = "";
        }
    }

    function input_val(params) {
        return (params.value = day + "-" + month + "-" + year);
    }

    var datepicker = document.querySelectorAll(".datepicker-toggle");
    Array.prototype.forEach.call(datepicker, function (el) {
        var that = el;
        var datepicker_create = document.createElement("div");
        datepicker_create.classList.add("datepicker");
        datepicker_create.setAttribute("data-input-name", that.getAttribute("data-name"));
        var input_cr = document.createElement("input");
        input_cr.type = "hidden";
        input_cr.name = that.getAttribute("data-name");

        el.addEventListener("click", function (e) {
            datepicker_create.classList.toggle("active");
            datepicker_create.style.left = that.offsetLeft + "px";
            datepicker_create.style.top = that.offsetTop + that.offsetHeight + 10 + "px";
        }, false);

        el.parentNode.appendChild(datepicker_create);
        el.parentNode.appendChild(input_cr);
        input_val(input_cr);

        datepicker_create.innerHTML =
            '<span class="tip"></span><div class="datepicker-head"><a href="#!" class="prev-date">&#8651;</a><a class="date-summary"></a><a href="#!" class="next-date">&#8652;</a></div><div class="datepicker-body"><div class="datepicker-body-head"></div><div class="datepicker-body-content"></div></div>';
        el = datepicker_create;
        setup(el);
        var prev_date = el.querySelectorAll(".prev-date");
        Array.prototype.forEach.call(
            prev_date,
            function (prev) {
                prev.addEventListener(
                    "click",
                    function () {
                        if (month < 1) {
                            month = 11;
                            year -= 1;
                        } else {
                            month -= 1;
                        }
                        clears(el);
                        day_count = lastday(year, month);
                        setup(el);
                    }, false);
            }
        );

        var next_date = el.querySelectorAll(".next-date");
        Array.prototype.forEach.call(next_date, function (next) {
            next.addEventListener(
                "click",
                function () {
                    if (month > 10) {
                        month = 0;
                        year += 1;
                    } else {
                        month += 1;
                    }
                    clears(el);
                    day_count = lastday(year, month);
                    setup(el);
                }, false);
        });
        var menu = el.querySelectorAll("a.date-summary");
        Array.prototype.forEach.call(menu, function (summary) {
            summary.addEventListener("click",
                function () {
                    var c_menu = document.createElement("div");
                    c_menu.classList.add("datepicker-menu");
                    var dpicker = el;
                    dpicker.appendChild(c_menu);
                    c_menu.classList.add("active");
                    for (let i = year - 6; i <= year + 5; i++) {
                        var item = document.createElement("aside");
                        item.classList.add("datepicker-years");
                        item.tabIndex = i;
                        item.innerHTML = i;
                        if (year == i) {
                            item.classList.add("active");
                        }
                        c_menu.appendChild(item);
                    }

                    var d_years = el.querySelectorAll(".datepicker-years");
                    Array.prototype.forEach.call(d_years, function (el_year) {
                        el_year.addEventListener("click", function () {
                            year = this.tabIndex;
                            el_year.parentNode.innerHTML = "";
                            input_val(summary);

                            for (i in months_long) {
                                if (i < 12) {
                                    var item = document.createElement("aside");
                                    item.classList.add("datepicker-months");
                                    item.tabIndex = i;
                                    item.innerHTML = months_long[i];
                                    c_menu.appendChild(item);
                                    if (month == i) {
                                        item.classList.add("active");
                                    }
                                }

                            }
                            var d_months = el.querySelectorAll(".datepicker-months");
                            Array.prototype.forEach.call(d_months, function (i) {
                                i.addEventListener("click", function (el_month) {
                                    c_menu.classList.remove("active");
                                    month = this.tabIndex;
                                    summary.innerHTML = day + " " + months_long[month] + " " + year;
                                    el.classList.remove("active");
                                    el.parentNode.querySelector("input[type=hidden]").value = summary.innerHTML.replace(" ", "-");
                                }, true);
                            });
                        });
                    });
                },
                true
            );
        });
    });
})();