(function () {
    var view = function (el) {
        this.hide = function (delay) {
            if (!delay) {
                el.style.display = "none";
            } else {
                var effect = setTimeout(function () {
                    el.style.display = "none";
                }, delay);
                clearTimeout(effect)
            }
            return this;
        };
        this.show = function (delay) {
            if (!delay) {
                el.style.display = "block";
            } else {
                var effect = setTimeout(function () {
                    el.style.display = "block";
                }, delay)
                clearTimeout(effect)
            }
            return this;
        };
        this.toggle = function (delay) {
            if (window.getComputedStyle(el) === "none" || el.style.display === "none") {
                this.show(delay);
            } else {
                this.hide(delay);
            }
            return this;
        };
        return this;
    };
    var fade = function (el) {
        this.out = function (delay) {
            if (!delay) {
                delay = 400;
            }
            var h;
            if (!window.getComputedStyle(el).opacity) {
                h = 1;
            } else {
                h = window.getComputedStyle(el).opacity;
            }

            var effect = setInterval(function () {
                if (h < 0.1) {
                    el.style.opacity = 0;
                    window.clearInterval(effect);
                } else {
                    h -= 0.1;
                    el.style.opacity = h;
                }
            }, delay / 7);

            return this;
        };
        this.in = function (delay) {
            if (!delay) {
                delay = 400;
            }
            var h = 0;
            el.style.opacity = 0;
            var effect = setInterval(function () {
                h += 0.1;
                if (h > 1) {
                    window.clearInterval(effect)
                } else {
                    el.style.opacity = h;
                }
            }, delay / 7);
            return this;
        };
        this.toggle = function (delay) {
            if (window.getComputedStyle(el).opacity > 0) {
                this.out(delay);
            } else {
                this.in(delay);
            }
            return this;
        };
        return this;
    };
    var slide = function (el) {
        this.setup = function (delay) {
            var hg = el.offsetHeight;
            return el.style.cssText = "box-sizing:border-box;display:block;overflow:hidden; transition: transform 0.4s cubic-bezier(0, 1, 0.5, 1);";
        };
        this.effect = true;
        this.up = function (delay) {
            if (!delay) {
                delay = 400;
            }
            this.setup(delay);
            var padT = Number(window.getComputedStyle(el).paddingBottom.replace("px", ""));
            var padB = Number(window.getComputedStyle(el).paddingTop.replace("px", ""));
            var pad = padT + padB;
            var hg = el.offsetHeight - pad;
            var s = el.style;
            el.setAttribute("data-slide", "up");
            var effect = setInterval(function () {
                hg -= parseFloat(hg / delay) * 3;
                s.height = hg + "px";
                if (hg < 50) {
                    hg -= parseFloat(hg / delay) * 5;
                }
                if (hg <= pad) {
                    s.paddingTop = 0;
                    s.paddingBottom = 0;
                    s.color = "transparent";
                }
                if (hg < 2) {
                    s.height = 0;
                    window.clearInterval(effect);
                    setTimeout(function () {
                        s.borderWidth = "0";
                        setTimeout(function () {
                            s.cssText = "";
                            s.display = "none";
                        }, 1)
                    }, 1)
                }
            }, "fast");
            return this;
        };
        this.down = function (delay) {
            if (!delay) {
                delay = 400;
            }
            this.effect = false;
            this.setup(delay);
            var padT = Number(window.getComputedStyle(el).paddingBottom.replace("px", ""));
            var padB = Number(window.getComputedStyle(el).paddingTop.replace("px", ""));
            var hg = Number(window.getComputedStyle(el).height.replace("px", "")),
                h = 0;
            var pad = padT + padB;
            var s = el.style;
            s.height = 0;
            s.paddingTop = 0;
            s.paddingBottom = 0;
            s.color = "transparent";
            el.setAttribute("data-slide", "down");

            var effect = setInterval(function () {
                h += parseFloat(hg / delay) * 2;
                s.height = h + "px";
                if (h > pad) {
                    s.color = "";
                    s.paddingTop = "";
                    s.paddingBottom = "";
                }
                if (h >= hg) {
                    window.clearInterval(effect);
                    setTimeout(function () {
                        s.cssText = "";
                        s.display = "block";
                    }, 1)
                }
            }, "fast")
            return this;

        };
        this.toggle = function (delay) {
            this.setup(delay);
            if (el.getAttribute("data-slide") == "up" || el.hasAttribute("data-slide") == false) {
                this.down(delay);
            } else if (el.getAttribute("data-slide") == "down") {
                this.up(delay);
            }
            return this;
        };
        return this;
    };
    var rangeSlider = (function () {
        var range = document.querySelectorAll("input[type=range]");
        Array.prototype.forEach.call(range, function (el, i) {
            var overlay_cr = document.createElement("aside"),
                ovs = overlay_cr.style;
            overlay_cr.classList.add("range-overlay");
            el.parentNode.appendChild(overlay_cr);
            var change_range = function () {
                var el_v = el.value,
                    value_item = el.parentNode.querySelector(".range-value");
                function rangeOffset() {
                    var width = el.offsetWidth - 15;
                    var max = parseFloat(el.max);
                    var min = parseFloat(el.min);
                    var val = parseFloat(el.value);
                    var percent = (parseFloat(el.value) - min) / (max - min);
                    return (percent * width);
                }
                ovs.width = rangeOffset() + "px";

                value_item.innerHTML = el_v;
                value_item.style.left = rangeOffset() + "px";
            };
            change_range();
            el.addEventListener("click touch", change_range, false);
            el.addEventListener("change", change_range, false);
            //mouse
            el.addEventListener("mouseenter", change_range, false);
            el.addEventListener("mousemove", change_range, false);
            el.addEventListener("mousedown", change_range, false);
            el.addEventListener("mouseover", change_range, false);
            el.addEventListener("mouseout", change_range, false);

            //touch
            el.addEventListener("touchstart", change_range, false);
            el.addEventListener("touchend", change_range, false);
            el.addEventListener("touchcancel", change_range, false);
            el.addEventListener("touchmove", change_range, false);
        }
        );
    })();


    var dropdown = document.querySelectorAll(".dropdown .dropdown-toggle");
    Array.prototype.forEach.call(
        dropdown,
        function (el) {
            var menu = el.parentNode.querySelector(".dropdown-menu");

            el.addEventListener("click", function () {
                function toggles() {
                    if (menu.classList.contains("show")) {
                        menu.classList.add("out");
                        menu.classList.remove("show");
                        setTimeout(function () {
                            menu.classList.remove("out");
                        }, "400");
                    } else {
                        menu.classList.add("show");
                    }
                }

                function defaults() {
                    toggles();
                    document.addEventListener("click", function (event) {
                        var isClickInside = el.contains(event.target);
                        if (!isClickInside) {
                            if (menu.classList.contains("show")) {
                                menu.classList.add("out");
                                menu.classList.remove("show");
                                setTimeout(function () {
                                    menu.classList.remove("out");
                                }, "400");
                            }
                        }
                    }, false);
                }

                if (el.getAttribute("data-collapse") === "dropdown") {
                    if (window.innerWidth <= 769) {
                        slide(menu).toggle(100);
                    } else {
                        defaults();
                    }
                    window.addEventListener("resize", function () {
                        if (window.innerWidth >= 769) {
                            menu.removeAttribute("style");
                            defaults();
                        }

                    });
                } else {
                    defaults()
                }


            }, false);
        }
    );
    var collapse = document.querySelectorAll(".collapse-toggle[data-collapse]");
    Array.prototype.forEach.call(collapse, function (el, i) {
        var item_id = el.getAttribute("data-href");
        var menu = document.querySelector("[data-id='" + item_id + "']");
        el.onclick = function () {
            slide(menu).toggle()
        }
    });

    var accordion = document.querySelectorAll(".accordion-menu a.toggle");
    Array.prototype.forEach.call(accordion, function (el, i) {
        el.onclick = function () {
            el.classList.toggle("show");
            var menu = el.parentNode.querySelector(".accordion");
            menu.classList.toggle("show");
            slide(menu).toggle(150);
        }
    });

    var navbarCollapse = document.querySelectorAll(".collapse-toggle[data-collapse=navbar]");
    Array.prototype.forEach.call(navbarCollapse, function (el) {
        var id = el.getAttribute("data-href");
        var menu = document.querySelector(".navbar-collapse[data-id=" + id + "]");
        el.onclick = function () {
            menu.classList.toggle("show");
            slide(menu).toggle(200);
        }
    });
    var modal = document.querySelectorAll(".modal-toggle");
    Array.prototype.forEach.call(modal, function (el) {
        var toggleName = el.getAttribute("data-toggle");
        var modal_body = document.body.querySelector(".modal[data-type=" + toggleName + "]");
        var modal_content = modal_body.querySelector(".modal-content");
        var times = window.getComputedStyle(modal_content)['transitionDuration'];
        times = Number(times.replace("s", "")) * 1000;
        el.onclick = function (event) {
            modal_body.classList.add("show");
            modal_content.classList.add("in");
            var close = modal_content.querySelectorAll(".close");
            for (i in close) {
                close[i].onclick = function (event) {
                    modal_content.classList.add("out");
                    modal_content.classList.remove("in");
                    var effect = setTimeout(function () {
                        modal_body.classList.remove("show");
                        modal_content.classList.remove("out");
                    }, times)
                }
            }
        };
        document.addEventListener("click", function (event) {
            var isClickInside = el.contains(event.target);
            if (!isClickInside) {
                if (modal_body.classList.contains("show")) {
                    modal_content.classList.add("out");
                    modal_content.classList.remove("in");
                    setTimeout(function () {
                        modal_body.classList.remove("show");
                        modal_content.classList.remove("out");
                    }, times);
                }
            }
        });
        window.addEventListener("change", function () {
            var clone_mdl = document.body.querySelectorAll(".modal");
            Array.prototype.forEach.call(clone_mdl, function (el) {
                var cln = el.cloneNode(true);
                el.outerHTML = "";
                document.body.appendChild(cln);
            });
        });
    });
    var lightbox = document.querySelectorAll(".lightbox-link");
    Array.prototype.forEach.call(lightbox, function (el) {
        var url = el.getAttribute("data-href"),
            type = el.getAttribute("data-type"),
            lightbox = document.querySelector(".lightbox");
        content = document.querySelector(".lightbox-content");
        el.addEventListener("click", function () {
            lightbox.classList.add("show");
            var item = type === "image" ? "img" : "iframe";
            var create_item = document.createElement(item);
            create_item.src = url;
            create_item.classList.add("lightbox-item");
            document.querySelector(".lightbox-content").innerHTML = "";
            document.querySelector(".lightbox-content").appendChild(create_item);
            var close = document.querySelector(".lightbox-close");
            var duration = Number(window.getComputedStyle(close)["transitionDuration"].replace("s", "") * 1000);
            close.addEventListener("click", function () {
                lightbox.classList.remove("show");
                lightbox.classList.add("out");
                setTimeout(function () {
                    lightbox.classList.remove("out");
                }, duration);
                create_item.remove();
            });
        });

    });
    var sidebar = document.querySelectorAll(".sidebar-toggle");
    Array.prototype.forEach.call(sidebar, function (el) {
        var id = el.getAttribute("data-href");
        var content = document.querySelector(".sidebar[data-id=" + id + "]");
        el.onclick = function () {
            content.classList.toggle("show");
        }
        document.addEventListener("click", function (event) {
            var isClickInside = el.contains(event.target);
            if (!isClickInside) {
                if (content.classList.contains("show")) {
                    content.classList.remove("show");
                }
            }
        });
    });
    var selectbox = document.querySelectorAll(".dropdown-toggle[data-toggle=selectbox]");
    Array.prototype.forEach.call(selectbox, function (el) {
        var parent = el.parentNode,
            menu = el.parentNode.querySelector(".dropdown-menu[data-type=selectbox]"),
            name = menu.getAttribute("input-name"),
            val = menu.getAttribute("input-value");
        var input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = val;
        parent.parentNode.appendChild(input);
        var select_item = menu.querySelectorAll("[select-value]");
        for (i in select_item) {
            select_item[i].onclick = function () {
                val = this.getAttribute("select-value");
                el.innerHTML = val;
                input.setAttribute("value", val);
                el.setAttribute("input-value", val);
                input.setAttribute("value", val);

            };
        }

    });

    var tabs = document.querySelectorAll(".tab-group");
    Array.prototype.forEach.call(tabs, function (el, i) {
        var content = el.querySelector(".content-group"),
            tab_item = el.querySelector(".tab");
        tab_item.firstElementChild.classList.add("active");
        content.firstElementChild.classList.add("active");
        var item = el.querySelectorAll(".tab .tab-item");
        Array.prototype.forEach.call(item, function (el, i) {
            el.addEventListener("click", function () {
                var id = this.getAttribute("data-href");
                tab_item.querySelector(".active").classList.remove("active");
                document.querySelector(".tab-content.active").classList.remove("active");
                el.classList.add("active");
                document.querySelector(".tab-content[data-id=" + id + "]").classList.add("active");
            }, false);
        });

    });
    var popover = document.querySelectorAll(".popover-toggle");
    Array.prototype.forEach.call(popover, function (el) {
        var id = el.getAttribute("data-id");
        el.addEventListener("click", function () {
            el.parentNode.querySelector(".popover-content[data-href=" + id + "]").classList.toggle("show");
        }, false);
    });
    var cardJs = document.querySelectorAll(".card-toggle");
    Array.prototype.forEach.call(cardJs, function (el) {
        var id = el.getAttribute("data-id");
        el.addEventListener("click", function () {
            document.querySelector(".card-toggle-content[data-href=" + id + "]").classList.toggle("show");
        }, false)
    });
    var carousel = function (el) {

        var content = el.querySelector(".carousel-content"),
            count = content.childElementCount,
            responsive = JSON.parse(content.getAttribute("data-grid")),
            widths,
            d_widths = el.offsetWidth,
            c_widths = d_widths * count,
            autoplay = el.getAttribute("data-autoplay"),
            autoplay_timer = el.getAttribute("data-timer"),
            is_pagination = content.getAttribute("data-pagination"),
            config = {
                "lg": 1024,
                "md": 768,
                "sm": 667
            },
            step,
            pagination_content = el.querySelector(".carousel-pagination"),
            slide_item = content.querySelector(".slide-item");
        content.firstElementChild.classList.add("active");
        content.style.transition = "all 0.4s ease-in-out";
        this.autoplayEffect = null;

        index_settings = function () {
            var slides = content.querySelectorAll(".slide-item");
            for (i in slides) {
                slides[i].tabIndex = i;
            }
        };
        index_settings();
        size = function (widths) {
            var item_resize = el.querySelectorAll(".slide-item");
            Array.prototype.forEach.call(item_resize, function (item_size) {
                item_size.style.width = widths + "px";
            });
        };
        var responsive_grid = function () {
            if (responsive) {
                if (window.innerWidth >= config.lg) {
                    if (responsive.xl != undefined) {
                        itemCount = responsive.xl;
                        widths = Number(d_widths) / Number(responsive.xl);
                    } else {
                        widths = d_widths;
                    }
                } else if (window.innerWidth >= config.md) {
                    if (responsive.lg != undefined) {
                        itemCount = responsive.lg;
                        widths = Number(d_widths) / Number(responsive.lg);
                    } else {
                        widths = d_widths;
                    }
                } else if (window.innerWidth >= config.sm) {
                    if (responsive.md != undefined) {
                        itemCount = responsive.md;
                        widths = Number(d_widths) / Number(responsive.md);
                    } else {
                        widths = d_widths;
                    }
                } else if (window.innerWidth < config.sm) {
                    if (responsive.sm != undefined) {
                        itemCount = responsive.sm;
                        widths = Number(d_widths) / Number(responsive.sm);
                    } else {
                        widths = d_widths;
                    }
                } else {
                    widths = d_widths;
                }
            } else {
                widths = d_widths;
            }

            size(widths);
            c_widths = widths * content.lastElementChild.tabIndex;
            content.style.width = c_widths;

            return widths;
        };

        autoplay_ = function () {
            if (autoplay === "true") {
                var i = 0;
                var last_i = content.lastElementChild.tabIndex;
                this.autoplayEffect = setInterval(function () {
                    if (last_i > i) {
                        content.style.marginLeft = "-" + d_widths * i + "px";
                        content.children.item(i + 1).classList.add("active");
                        content.children.item(i).classList.remove("active");
                    } else {
                        content.lastElementChild.classList.remove("active");
                        content.firstElementChild.classList.add("active");
                        content.style.marginLeft = 0;
                        i = 0;
                    }
                    i++;
                }, Number(autoplay_timer));
            }
        };

        pagination = function () {
            if (is_pagination) {
                var pagination_item = el.querySelector(".carousel-pagination");
                for (var i = 0; i < count; i++) {
                    var p_item = document.createElement("a");
                    p_item.href = "#!";
                    p_item.classList.add("item");
                    p_item.tabIndex = i;
                    pagination_item.appendChild(p_item);
                }
            }
        };


        slider_next = function (el) {
            var content = el.querySelector(".carousel-content");
            var last_i = content.lastElementChild.tabIndex;
            var i = content.querySelector(".slide-item.active").tabIndex + 1;
            step = d_widths / responsive_grid();
            widths = d_widths / step;
            if (step > 1) {
                last_i = last_i - step + 1;
            }
            if (i <= last_i) {
                content.children.item(i).classList.add("active");
                content.children.item(i - 1).classList.remove("active");
                var ml_ = widths * i;
                content.style.marginLeft = "-" + ml_ + "px";

                i++;
            } else {
                i = 1;
                content.lastElementChild.classList.remove("active");
                content.firstElementChild.classList.add("active");
                content.style.marginLeft = 0;
            }
        };
        slider_prev = function () {
            var content = el.querySelector(".carousel-content");
            var last_i = content.lastElementChild.tabIndex;
            var i = content.querySelector(".slide-item.active").tabIndex;
            step = d_widths / responsive_grid();
            widths = d_widths / step;
            if (i >= 1) {
                content.children.item(i - 1).classList.add("active");
                content.children.item(i).classList.remove("active");
                i--;

                var ml_ = widths * i;
                content.style.marginLeft = "-" + ml_ + "px";

            } else {
                i = last_i;
                content.lastElementChild.classList.add("active");
                content.firstElementChild.classList.remove("active");
                if (step > 1) {
                    last_i = last_i - step + 1;
                }
                var ml_ = widths * (last_i - 1);
                content.style.marginLeft = "-" + ml_ + "px";
                i--;
            }

        };
        slider_direction = function (el) {
            var prev = el.querySelector(".carousel-prev-btn");
            var next = el.querySelector(".carousel-next-btn");
            if (el.contains(prev) && el.contains(next)) {
                prev.addEventListener("click", function () {
                    window.clearInterval(this.autoplayEffect);
                    slider_prev(el);
                }, false);

                next.addEventListener("click", function () {
                    window.clearInterval(this.autoplayEffect);
                    slider_next(el);
                }, false);
            }
            if (el.contains(pagination_content)) {
                pagination();

                var paginate = pagination_content.querySelectorAll(".item");
                Array.prototype.forEach.call(paginate, function (el) {
                    el.addEventListener("click", function () {
                        window.clearInterval(this.autoplayEffect);
                        var last_i = el.parentNode.lastChild.tabIndex,
                            i = el.tabIndex;
                        var ml_ = widths * i;
                        content.style.marginLeft = "-" + ml_ + "px";
                    }, false);
                });

            }


        };
        window.addEventListener("resize", function () {
            d_widths = el.offsetWidth;
            responsive_grid();
        }, false);
        if (c_widths > content.style.marginLeft) { }
        responsive_grid();
        slider_direction(el);
        autoplay_();
        return this;
    };

    var carousel_ = document.querySelectorAll(".carousel-slider");
    for (el of carousel_) {
        let id = el.getAttribute("id");
        carousel(el);
    }
    var alert = document.querySelectorAll(".alert-toggle");
    Array.prototype.forEach.call(alert, function (el) {
        var id = el.getAttribute("data-href"),
            content = document.querySelector(".alert[data-id=" + id + "]"),
            close = document.querySelector(".alert-close[data-href=" + id + "]"),
            position = el.getAttribute("alert-position");
        content.classList.add("position", position);

        el.addEventListener("click", function () {
            content.classList.add("active");
        }, false);

    });
    var alert_close = document.querySelectorAll(".alert-close");

    Array.prototype.forEach.call(alert_close, function (el) {
        el.addEventListener("click", function () {
            fade(el.parentNode).out(300)
            setTimeout(() => {
                el.parentNode.style.display = "none";
            }, 300);
        }, false);
    });
    var chip = document.querySelectorAll("[data-type=chip]");
    Array.prototype.forEach.call(chip, function (el) {
        el.addEventListener("keypress", function (e) {
            if (e.keyCode == 13) {
                var val = el.value;
                var chips = document.createElement("div"),
                    span = document.createElement("span"),
                    close = document.createElement("button");
                chips.classList.add("chip");
                span.classList.add("chip-name");
                span.innerHTML = val;
                close.classList.add("close", "icon", "icon-x");
                chips.appendChild(span);
                chips.appendChild(close);
                el.parentNode.appendChild(chips);
                close.addEventListener("click", function () {
                    close.parentNode.remove();
                }, false);
            }
        }, false);
    });
    var progress = document.querySelectorAll(".progress-bar");
    Array.prototype.forEach.call(progress, function (el) {
        el.style.transition = "all 0.4s ease-in-out";
        var wd = el.getAttribute("aria-valuenow"),
            text = el.getAttribute("aria-valuetext");
        el.style.width = wd;
        el.innerHTML = text;
    });
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
    /*waves effect*/
    ;
    (function (window) {
        'use strict';
        var Waves = Waves || {};
        var $$ = document.querySelectorAll.bind(document);
        // Find exact position of element
        function isWindow(obj) {
            return obj !== null && obj === obj.window;
        }

        function getWindow(elem) {
            return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
        }

        function offset(elem) {
            var docElem, win, box = {
                top: 0
                , left: 0
            }
                , doc = elem && elem.ownerDocument;
            docElem = doc.documentElement;
            if (typeof elem.getBoundingClientRect !== typeof undefined) {
                box = elem.getBoundingClientRect();
            }
            win = getWindow(doc);
            return {
                top: box.top + win.pageYOffset - docElem.clientTop
                , left: box.left + win.pageXOffset - docElem.clientLeft
            };
        }

        function convertStyle(obj) {
            var style = '';
            for (var a in obj) {
                if (obj.hasOwnProperty(a)) {
                    style += (a + ':' + obj[a] + ';');
                }
            }
            return style;
        }
        var Effect = {
            // Effect delay
            duration: 750
            , show: function (e, element) {
                // Disable right click
                if (e.button === 2) {
                    return false;
                }
                var el = element || this;
                // Create ripple
                var ripple = document.createElement('div');
                ripple.className = 'waves-ripple';
                el.appendChild(ripple);
                // Get click coordinate and element witdh
                var pos = offset(el);
                var relativeY = (e.pageY - pos.top);
                var relativeX = (e.pageX - pos.left);
                var scale = 'scale(' + ((el.clientWidth / 100) * 10) + ')';
                // Support for touch devices
                if ('touches' in e) {
                    relativeY = (e.touches[0].pageY - pos.top);
                    relativeX = (e.touches[0].pageX - pos.left);
                }
                // Attach data to element
                ripple.setAttribute('data-hold', Date.now());
                ripple.setAttribute('data-scale', scale);
                ripple.setAttribute('data-x', relativeX);
                ripple.setAttribute('data-y', relativeY);
                // Set ripple position
                var rippleStyle = {
                    'top': relativeY + 'px'
                    , 'left': relativeX + 'px'
                };
                ripple.className = ripple.className + ' waves-notransition';
                ripple.setAttribute('style', convertStyle(rippleStyle));
                ripple.className = ripple.className.replace('waves-notransition', '');
                // Scale the ripple
                rippleStyle['-webkit-transform'] = scale;
                rippleStyle['-moz-transform'] = scale;
                rippleStyle['-ms-transform'] = scale;
                rippleStyle['-o-transform'] = scale;
                rippleStyle.transform = scale;
                rippleStyle.opacity = '1';
                rippleStyle['-webkit-transition-duration'] = Effect.duration + 'ms';
                rippleStyle['-moz-transition-duration'] = Effect.duration + 'ms';
                rippleStyle['-o-transition-duration'] = Effect.duration + 'ms';
                rippleStyle['transition-duration'] = Effect.duration + 'ms';
                rippleStyle['-webkit-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
                rippleStyle['-moz-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
                rippleStyle['-o-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
                rippleStyle['transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
                ripple.setAttribute('style', convertStyle(rippleStyle));
            }
            , hide: function (e) {
                TouchHandler.touchup(e);
                var el = this;
                var width = el.clientWidth * 1.4;
                // Get first ripple
                var ripple = null;
                var ripples = el.getElementsByClassName('waves-ripple');
                if (ripples.length > 0) {
                    ripple = ripples[ripples.length - 1];
                }
                else {
                    return false;
                }
                var relativeX = ripple.getAttribute('data-x');
                var relativeY = ripple.getAttribute('data-y');
                var scale = ripple.getAttribute('data-scale');
                // Get delay beetween mousedown and mouse leave
                var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
                var delay = 350 - diff;
                if (delay < 0) {
                    delay = 0;
                }
                // Fade out ripple after delay
                setTimeout(function () {
                    var style = {
                        'top': relativeY + 'px'
                        , 'left': relativeX + 'px'
                        , 'opacity': '0', // Duration
                        '-webkit-transition-duration': Effect.duration + 'ms'
                        , '-moz-transition-duration': Effect.duration + 'ms'
                        , '-o-transition-duration': Effect.duration + 'ms'
                        , 'transition-duration': Effect.duration + 'ms'
                        , '-webkit-transform': scale
                        , '-moz-transform': scale
                        , '-ms-transform': scale
                        , '-o-transform': scale
                        , 'transform': scale
                        ,
                    };
                    ripple.setAttribute('style', convertStyle(style));
                    setTimeout(function () {
                        try {
                            el.removeChild(ripple);
                        }
                        catch (e) {
                            return false;
                        }
                    }, Effect.duration);
                }, delay);
            }, // Little hack to make <input> can perform waves effect
            wrapInput: function (elements) {
                for (var a = 0; a < elements.length; a++) {
                    var el = elements[a];
                    if (el.tagName.toLowerCase() === 'input') {
                        var parent = el.parentNode;
                        // If input already have parent just pass through
                        if (parent.tagName.toLowerCase() === 'i' && parent.className.indexOf('waves-effect') !== -1) {
                            continue;
                        }
                        // Put element class and style to the specified parent
                        var wrapper = document.createElement('i');
                        wrapper.className = el.className + ' waves-input-wrapper';
                        var elementStyle = el.getAttribute('style');
                        if (!elementStyle) {
                            elementStyle = '';
                        }
                        wrapper.setAttribute('style', elementStyle);
                        el.className = 'waves-button-input';
                        el.removeAttribute('style');
                        // Put element as child
                        parent.replaceChild(wrapper, el);
                        wrapper.appendChild(el);
                    }
                }
            }
        };
        /**
         * Disable mousedown event for 500ms during and after touch
         */
        var TouchHandler = {
            /* uses an integer rather than bool so there's no issues with
             * needing to clear timeouts if another touch event occurred
             * within the 500ms. Cannot mouseup between touchstart and
             * touchend, nor in the 500ms after touchend. */
            touches: 0
            , allowEvent: function (e) {
                var allow = true;
                if (e.type === 'touchstart') {
                    TouchHandler.touches += 1; //push
                }
                else if (e.type === 'touchend' || e.type === 'touchcancel') {
                    setTimeout(function () {
                        if (TouchHandler.touches > 0) {
                            TouchHandler.touches -= 1; //pop after 500ms
                        }
                    }, 500);
                }
                else if (e.type === 'mousedown' && TouchHandler.touches > 0) {
                    allow = false;
                }
                return allow;
            }
            , touchup: function (e) {
                TouchHandler.allowEvent(e);
            }
        };
        /**
         * Delegated click handler for .waves-effect element.
         * returns null when .waves-effect element not in "click tree"
         */
        function getWavesEffectElement(e) {
            if (TouchHandler.allowEvent(e) === false) {
                return null;
            }
            var element = null;
            var target = e.target || e.srcElement;
            while (target.parentElement !== null) {
                if (!(target instanceof SVGElement) && target.className.indexOf('waves-effect') !== -1) {
                    element = target;
                    break;
                }
                else if (target.classList.contains('waves-effect')) {
                    element = target;
                    break;
                }
                target = target.parentElement;
            }
            return element;
        }
        /**
         * Bubble the click and show effect if .waves-effect elem was found
         */
        function showEffect(e) {
            var element = getWavesEffectElement(e);
            if (element !== null) {
                Effect.show(e, element);
                if ('ontouchstart' in window) {
                    element.addEventListener('touchend', Effect.hide, false);
                    element.addEventListener('touchcancel', Effect.hide, false);
                }
                element.addEventListener('mouseup', Effect.hide, false);
                element.addEventListener('mouseleave', Effect.hide, false);
            }
        }
        Waves.displayEffect = function (options) {
            options = options || {};
            if ('duration' in options) {
                Effect.duration = options.duration;
            }
            Effect.wrapInput($$('.waves-effect'));
            if ('ontouchstart' in window) {
                document.body.addEventListener('touchstart', showEffect, false);
            }
            document.body.addEventListener('mousedown', showEffect, false);
        };

        Waves.attach = function (element) {
            if (element.tagName.toLowerCase() === 'input') {
                Effect.wrapInput([element]);
                element = element.parentElement;
            }
            if ('ontouchstart' in window) {
                element.addEventListener('touchstart', showEffect, false);
            }
            element.addEventListener('mousedown', showEffect, false);
        };
        window.Waves = Waves;
        document.addEventListener('DOMContentLoaded', function () {
            Waves.displayEffect();
        }, false);
    })(window);

})();