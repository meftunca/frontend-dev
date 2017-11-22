(function($) {
  $.fn.accordion = function() {
    var accordion = ".accordion-menu",
      submenu = ".accordion",
      active = "show";

    $(this).click(function() {
      $(this).toggleClass("show");
      $(this)
        .siblings(submenu)
        .toggleClass("show")
        .slideToggle("slow");
    });
  };

  $.fn.alert = function() {
    var alert = "data-alert",
      href = "data-href",
      id = "data-id",
      timer = "data-timer",
      position = "alert-position";
    this.click(function() {
      var alert_id = $(this).attr(href);

      var a_timer = $(this).attr(timer);

      var a_pos = $(this).attr("alert-position");
      if (a_pos == undefined) a_pos = "";
      $("[data-id=" + alert_id + "]").addClass("active  position " + a_pos);

      if (a_timer) {
        setTimeout(function() {
          $("[data-id=" + alert_id + "]").toggleClass("active");
        }, a_timer);
      }
    });
    $(".alert-close").click(function() {
      var targets = $(this).parents(".alert");
      if (targets.data("alert")) {
        var a_pos = targets.attr("alert-position");
        if (a_pos == undefined) a_pos = "";
        targets.toggleClass("active position " + a_pos);
      } else {
        targets.slideUp("slow");
      }
    });
  };

  $.fn.fileput = function() {
    var main = $(".fileput"),
      input = $(".fileput input[type=file]");
    this.click(function() {
      var item = $(this)
        .parents(".fileput")
        .find("input")
        .filter("[type=file]");
      item.focus().trigger("click");
      main.find(".fileput-list").slideUp(350);
      item.change(function() {
        main.find(".fileput-list ul").html("");
        var names = [];
        for (var i = 0; i < $(this).get(0).files.length; ++i) {
          names.push($(this).get(0).files[i].name);
        }
        var count = names.length;
        for (var i = 0; i < count; i++) {
          main
            .find(".fileput-list")
            .find("ul")
            .append("<li><span>" + (i + 1) + ") </span>" + names[i] + "</li>");
        }
        main.find(".fileput-list").slideDown(350);
      });
    });
  };
  $.fn.collapse = function(param) {
    var collapse = "data-collapse",
      href = "data-href",
      id = "data-id";

    if (param == "default" || param == "") {
      var type = "default";
      $(this).click(function() {
        var idHref = $(this).attr("data-href");
        var content = $(".collapse[data-id=" + idHref + "]");
        var speed = content.attr("collapse-speed");
        Number(speed);
        if (speed === "undefined" || speed === "null") {
          speed = 500;
        } else {
          speed = 400;
        }
        content.slideToggle(350).toggleClass("show");
      });
    } else if (param == "navbar") {
      var type = "navbar";
      $("[data-collapse=navbar]").click(function() {
        var idHref = $(this).attr("data-href");
        var content = $(".navbar-collapse[data-id=" + idHref + "]");
        content.slideToggle(350).toggleClass("show");
      });
    }
  };
  $.fn.table = function() {
    this.find("th").on("click", function() {
      var table = $(this)
        .parents("table")
        .eq(0);
      var rows = table
        .find("tr:gt(0)")
        .toArray()
        .sort(comparer($(this).index()));
      this.asc = !this.asc;
      if (!this.asc) {
        rows = rows.reverse();
      }
      table
        .children("tbody")
        .empty()
        .html(rows);
    });

    function comparer(index) {
      return function(a, b) {
        var valA = getCellValue(a, index),
          valB = getCellValue(b, index);
        return $.isNumeric(valA) && $.isNumeric(valB)
          ? valA - valB
          : valA.localeCompare(valB);
      };
    }

    function getCellValue(row, index) {
      return $(row)
        .children("td")
        .eq(index)
        .text();
    }
  };
  $.fn.filterTable = function() {
    $(".data-table [data-search=true]").on("keyup", function() {
      var value = $(this).val();
      var patt = new RegExp(value, "i");

      $(this)
        .parents(".data-table")
        .find("tbody")
        .find("tr")
        .each(function() {
          if (
            !(
              $(this)
                .find("td")
                .text()
                .search(patt) >= 0
            )
          ) {
            $(this)
              .not(".myHead")
              .hide();
          }
          if (
            $(this)
              .find("td")
              .text()
              .search(patt) >= 0
          ) {
            $(this).show();
          }
        });
    });
  };
  $.fn.sidebar = function() {
    var type = ".sidebar[data-type=sidebar]",
      toggle = ".sidebar-toggle[data-toggle=sidebar]",
      id = "data-id",
      href = "data-href";

    this.click(function() {
      var n_id = $(this).attr(href);
      $(".sidebar[data-id = " + n_id + "]").toggleClass("show");
    });
  };

  $.fn.cardToggle = function() {
    this.click(function() {
      var id = $(this).attr("data-id"),
        href = $(".card-toggle-content[data-href=" + id + "]");

      href.toggleClass("show");
    });
  };

  $.fn.dropdown = function() {
    var dropdown = "dropdown",
      toggles = ".dropdown-toggle",
      menu = ".dropdown-menu",
      query = $(this)
        .parents("*")
        .hasClass("navbar"),
      query2 = $(this)
        .parents("*")
        .hasClass("sidebar");
    this.click(function(e) {
      var content = $(this).siblings(".dropdown-menu");
      if (
        $(".dropdown-toggle[data-collapse=dropdown]") &&
        window.innerWidth <= 768
      ) {
        content.slideToggle("fast");
      } else if (
        (window.innerWidth >= 768 && query == false) ||
        query2 == false
      ) {
        $(menu).removeClass("show");
        if (content.hasClass("show") == false) {
          if (content.hasClass("dropup")) {
            content.addClass("show");
          } else {
            content.addClass("show");
          }
        }
      }
    });
  };

  $.fn.modal = function() {
    var group = "modal-group",
      toggle = ".modal-toggle",
      modal = ".modal",
      close = ".close,.close *";
    var modalAttr = "data-type",
      toggleAttr = "data-toggle";

    this.click(function() {
      var type = $(this).attr("data-toggle");
      $(".modal[data-type=" + type + "]").addClass("show");
      $(".modal[data-type=" + type + "] .modal-content").addClass("in");
      $(".modal[data-type=" + type + "]")
        .find(close)
        .click(function() {
          $(this)
            .parents(modal)
            .children(".modal-content")
            .addClass("out")
            .animate(
              {
                opacity: 1,
                top: "-1000%"
              },
              500,
              function() {
                $(this)
                  .toggleClass("in out")
                  .parents(modal)
                  .removeClass("show")
                  .children(".modal-content")
                  .removeAttr("style");
              }
            );
          return false;
        });
    });
  };

  $.fn.selectBox = function() {
    this.click(function() {
      var select_toggle = $(this).parents(
          ".dropdown-toggle[data-toggle=selectbox]"
        ),
        select_item = $(this).parents(".dropdown-menu[data-type=selectbox]"),
        event_Inputval = $(this).parents(".dropdown-toggle[input-value]"),
        select_Inputname = $(this)
          .parents(".dropdown-menu[data-type=selectbox]")
          .attr("input-name");
      var values = $(this).attr("select-value");
      var query = $(this)
        .parents("form")
        .find("input[name=" + select_Inputname + "]");
      $(this)
        .parents(".dropdown-menu[data-type=selectbox]")
        .attr("input-value", values);
      if (query.length < 1) {
        $(this)
          .parents("form")
          .append(
            "<input type='hidden' name='" +
              select_Inputname +
              "' value='" +
              values +
              "'>"
          );
      } else {
        query.attr("value", values);
      }
      $(this)
        .parents(".dropdown-menu")
        .siblings(".dropdown-toggle")
        .text(values);
    });
  };

  $.fn.popover = function() {
    var popover = "[data-popover=true]",
      id = "data-id",
      href = "data-href",
      linked = ".popover-toggle" + popover,
      content = ".popover-content";

    this.click(function() {
      var popId = $(this).attr(id);
      $(content + "[data-href=" + popId + "]").toggleClass("show");
    });
  };

  $.fn.tab = function() {
    var data = "data-toggle",
      href = "data-href",
      id = "data-id",
      group = ".tab-group",
      toggle = ".tab-item",
      content = ".tab-content";
    $(group).show(function() {
      $(this)
        .find(".tab-content")
        .first()
        .addClass("active");
      $(".tab-item:first").addClass("active");
    });

    this.click(function() {
      var dataHref = $(this).attr(href);
      $(" .tab-content[data-id=" + dataHref + "]")
        .siblings(".tab-content")
        .removeClass("active");
      $(this)
        .siblings(".tab-item")
        .removeClass("active");
      $(this).addClass("active");
      $("[" + id + "=" + dataHref + "]").addClass("active");
    });
  };

  $.fn.progressbar = function() {
    var data = "data-progressbar=true",
      value = "aria-valuenow",
      min = "aria-valuemin",
      max = "aria-valuemax",
      mainClass = ".progress",
      subClass = ".progress-bar",
      loaders = "progressbar-loaders",
      time = "loader-time",
      loader = "loader-delay";

    this.show(function() {
      var valueNow = $(this).attr(value);
      if (valueNow == "undefined") {
        valueNow = $(this).css("width");
      }
      $(this)
        .animate({
          width: valueNow
        })
        .text(valueNow);
    });
  };
  $.fn.carousel = function() {
    var config = {
        lg: 1024,
        md: 768,
        sm: 667
      },
      responsive = {},
      main = this,
      widthGlobal = $(".carousel-slider").innerWidth(),
      content = main.find(".carousel-content"),
      item = content.find(".slide-item"),
      itemIndis = item.filter(".active").index(),
      itemCount = null,
      slideCount = item.length,
      nextButton = main.find(".carousel-next-btn"),
      prevButton = main.find(".carousel-prev-btn"),
      pagination = main.find(".carousel-pagination"),
      paginate = content.data("pagination"),
      autoplay = main.data("autoplay"),
      timer = main.data("autotimer"),
      widths = null;

    function windowResp_query() {
      if (window.innerWidth >= config.lg) {
        if (responsive.xl != undefined) {
          itemCount = responsive.xl;
          widths = Number(widthGlobal) / Number(responsive.xl);
          return widths;
        }
      } else if (window.innerWidth >= config.md) {
        if (responsive.lg != undefined) {
          itemCount = responsive.lg;
          widths = Number(widthGlobal) / Number(responsive.lg);
          return widths;
        }
      } else if (window.innerWidth >= config.sm) {
        if (responsive.md != undefined) {
          itemCount = responsive.md;
          widths = Number(widthGlobal) / Number(responsive.md);
          return widths;
        }
      } else if (window.innerWidth < config.sm) {
        if (responsive.sm != undefined) {
          itemCount = responsive.sm;
          widths = Number(widthGlobal) / Number(responsive.sm);
          return widths;
        }
      }
    }

    responsive = content.data("grid");

    function resp_reset() {
      if (responsive) {
        widthGlobal = main.innerWidth();
        windowResp_query();
        item.css({ width: widths });
        item
          .filter(":nth-child(" + (itemIndis + 1) + ")")
          .animate({ marginLeft: -widths * itemIndis }, "fast");
      } else {
        widths = main.innerWidth();
        content.find(".slide-item").css("width", widths);
      }
    }

    resp_reset();
    $(window).resize(function(e) {
      resp_reset();
    });

    nextButton.click(function() {
      content.finish();
      if (item.eq(slideCount - itemCount).hasClass("active")) {
        item.filter(":last-child").removeClass("active");
        content.animate(
          {
            marginLeft: 0
          },
          "fast"
        );
        item.filter(":first-child").addClass("active");
        autoplay_slider("stop");
      } else {
        content.animate(
          {
            marginLeft: "+=-" + widths
          },
          "slow"
        );
        item
          .filter(".active")
          .removeClass("active")
          .next(".slide-item")
          .addClass("active");
      }
    });
    prevButton.click(function() {
      content.finish();
      if (item.filter(":first-child").hasClass("active")) {
        content.animate(
          {
            marginLeft: 0
          },
          "fast"
        );
        item.filter(":last-child").addClass("active");
        autoplay_slider("stop");
      } else {
        content.animate(
          {
            marginLeft: "+=" + widths
          },
          "slow"
        );
        item
          .filter(".active")
          .removeClass("active")
          .prev(".slide-item")
          .addClass("active");
      }
    });
    if (paginate) {
      pagination.html("");
      itemCount = itemCount != null ? itemCount : 1;
      var paginate_item = slideCount / itemCount;
      for (var i = 0; i < paginate_item; i++) {
        pagination.append(
          "<div class='item' data-paginate-target='" + i + "'></div>"
        );
      }
      pagination.find(".item").click(function() {
        content.finish();

        var paginate_loc = itemIndis;
        var target = $(this).data("paginate-target");

        content.animate(
          {
            marginLeft: -(widthGlobal * target)
          },
          "slow"
        );
        item.filter(".active").removeClass("active");
        item.eq(target * itemCount).addClass("active");
      });
    }
    if ((autoplay = true)) {
      if ((timer = true)) {
        var speed = Number(timer);
      } else {
        speed = 3500;
      }

      function autoplay_slider(par) {
        if ((par = "stop")) {
          return false;
        } else {
          if (item.filter(":last-child").hasClass("active")) {
            item.filter(".active").removeClass("active");
            content.animate(
              {
                marginLeft: 0
              },
              "slow"
            );
            item.filter(":first-child").addClass("active");
          } else {
            item
              .filter(".active")
              .removeClass("active")
              .next(".slide-item")
              .addClass("active");
            indis = item.filter(".active").index();
            content.animate(
              {
                marginLeft: -widths * indis
              },
              "slow"
            );
          }
        }
      }

      function start_timer() {
        return setTimeout(autoplay_slider, speed / 2);
      }

      setInterval(start_timer, speed / 2);
    }
  };

  $.fn.lightbox = function() {
    var defaults = {
      plugin_name: "lightbox",
      version: "version 0.01",
      creator: "By Meftunca"
    };
    var contents = $(".lightbox"),
      targets = $(".lightbox-content"),
      articles = $(".lightbox-article"),
      activators = $(".lightbox-link"),
      delay = 500,
      close = contents.find(".lightbox-close"),
      typed = ["image", "video", "iframe"];

    function embed(type, data, par) {
      var embed;
      if (type == typed[0]) {
        embed = '<img class="img-embed" src="' + data + '" ' + par + " >";
      } else if (type == typed[1]) {
        embed =
          '<video class="img-embed"  src="' +
          data +
          '" ' +
          par +
          ' frameborder="0" gesture="media" allowfullscreen></video>';
      } else if (type == typed[2]) {
        embed =
          '<iframe src="' + data + '" class="img-embed" ' + par + " ></iframe>";
      }
      targets.html(embed);
    }

    function effect_closed() {
      function close_content() {
        $(".lightbox-content").removeClass("out");
      }

      function close_targets() {
        setTimeout(close_content, delay);
        contents.removeClass("out");
      }

      setTimeout(close_targets, delay + 100);
    }

    this.click(function(e) {
      var href = $(this).data("href"),
        type = $(this).data("type"),
        size = {};
      size = $(this).data("size");
      if ($.type(size) == "object") {
        if (size.width != null && size.width != undefined) {
          width = "width='" + size.width + "'";
        } else {
          width = "";
        }
        if (size.height != null && size.height != undefined) {
          height = "height='" + size.height + "'";
        } else {
          height = "";
        }
        size = width + height;
      } else {
        size = "class='img-embed'";
      }
      embed(type, href, size);

      contents.addClass("show");
      targets.addClass("show");
      e.preventDefault();
    });
    close.click(function() {
      targets2 = $(this).parents(".lightbox");
      targets2.toggleClass("show out");
      targets2.find(".lightbox-content").toggleClass("show out");

      effect_closed();
    });
    $(".lightbox ").click(function(e) {
      if (contents.hasClass("show")) {
        if (!$(e.target).is(".lightbox-content *")) {
          $(".lightbox,.lightbox-content")
            .removeClass("show out")
            .removeAttr("style");

          if (window.resize) {
            $(".lightbox,.lightbox-content")
              .removeClass("show out")
              .removeAttr("style");
          }
        }
      }
    });
  };

  $.fn.clear = function() {
    this.click(function(e) {
      if ($(".sidebar").hasClass("show")) {
        if (!$(e.target).is(".sidebar,.sidebar *,.sidebar-toggle")) {
          $(".sidebar").removeClass("show");
        }
      } else if ($(".modal").hasClass("show")) {
        if (!$(e.target).is(".modal-content *,.modal-toggle")) {
          $(".modal.show")
            .children(".modal-content")
            .addClass("out")
            .animate(
              {
                opacity: 1,
                top: "-1000%"
              },
              500,
              function() {
                $(this)
                  .toggleClass("in out")
                  .parents(".modal")
                  .removeClass("show")
                  .children(".modal-content")
                  .removeAttr("style");
              }
            );
        }
      }
    });
  };
})(jQuery);

$(this).click(function(e) {
  if ($(".dropdown-menu").hasClass("show")) {
    if (
      !$(e.target).is(
        ".dropdown-toggle *,.dropdown-menu,.dropdown-toggle,.dropdown-menu *"
      )
    ) {
      if (
        $(".dropdown-menu")
          .parents()
          .hasClass("navbar") == true &&
        window.innerWidth <= 768
      ) {
        return true;
      } else {
        $(".dropdown-menu.show")
          .toggleClass("show out")
          .animate({ opacity: "toggle" }, 400, function() {
            $(this)
              .removeClass("out")
              .removeAttr("style");
          });
      }
      if (window.resize) {
        $(".dropdown-menu")
          .removeClass("show out")
          .removeAttr("style");
      }
    }
  }
});

(function($) {
  $.datePicker = {
    strings: {
      monthsFull: [
        "January",
        "Febraury",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      monthsShort: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      daysFull: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      daysShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
    },
    defaults: {
      limitCenturies: true,
      closeOnPick: true
    },
    utils: {
      firstDay: function(year, month) {
        return new Date(year, month, 1).getDay();
      },
      daysInMonth: function(year, month) {
        return new Date(year, ++month, 0).getDate();
      },
      buildDecadePicker: function(century, year) {
        var obj = $.datePicker,
          decades = $('<div class="decades"></div>'),
          firstDecade = Math.floor(century / 100) * 100 - 10,
          limit = $.datePicker.defaults.limitCenturies;

        var header =
          '<div class="row header">' +
          '<a href="#" class="prev' +
          (limit && firstDecade < 1900 ? " disabled" : "") +
          '"><span class="arrow"></span></a>' +
          '<a href="#" class="century" data-century="' +
          (firstDecade + 10) +
          '">' +
          (firstDecade + 1) +
          "-" +
          (firstDecade + 100) +
          "</a>" +
          '<a href="#" class="next' +
          (limit && firstDecade == 1990 ? " disabled" : "") +
          '"><span class="arrow"></span></a>' +
          "</div>";
        decades.append(header);

        var n = 0;
        var type = "";
        var num = 0;
        for (var i = 0; i < 3; i++) {
          var row = $('<div class="row"></div>');
          for (var j = 0; j < 4; j++) {
            n = j + i * 4;
            type = n == 0 ? " grayed prev" : n == 11 ? " grayed next" : "";
            num = firstDecade + n * 10;
            if (limit && (num < 1900 || num > 2090)) {
              var item = $(
                '<a href="" class="cell large double decade blank">&nbsp;</a>'
              );
              row.append(item);
              continue;
            }
            if (year >= num && year <= num + 9) {
              type += " selected";
            }
            var item = $(
              '<a href="#" data-year="' +
                num +
                '" class="cell large double decade' +
                type +
                '"><span>' +
                num +
                "- " +
                (num + 9) +
                "</span></a>"
            );
            row.append(item);
          }
          decades.append(row);
        }
        return decades;
      },
      buildYearPicker: function(decade, year) {
        var obj = $.datePicker,
          years = $('<div class="years"></div>'),
          firstYear = Math.floor(decade / 10) * 10 - 1,
          limit = $.datePicker.defaults.limitCenturies;

        var header =
          '<div class="row header">' +
          '<a href="#" class="prev' +
          (limit && firstYear == 1899 ? " disabled" : "") +
          '"><span class="arrow"></span></a>' +
          '<a href="#" class="decade" data-decade="' +
          (firstYear + 1) +
          '">' +
          (firstYear + 1) +
          "-" +
          (firstYear + 10) +
          "</a>" +
          '<a href="#" class="next' +
          (limit && firstYear == 2089 ? " disabled" : "") +
          '"><span class="arrow"></span></a>' +
          "</div>";
        years.append(header);

        var n = 0;
        var type = "";
        var num = 0;
        for (var i = 0; i < 3; i++) {
          var row = $('<div class="row"></div>');
          for (var j = 0; j < 4; j++) {
            n = j + i * 4;
            type = n == 0 ? " grayed prev" : n == 11 ? " grayed next" : "";
            num = firstYear + n;
            if (limit && (num < 1900 || num > 2099)) {
              var item = $(
                '<a href="" class="cell large year blank">&nbsp;</a>'
              );
              row.append(item);
              continue;
            }
            if (num == year) {
              type += " selected";
            }
            var item = $(
              '<a href="#" data-year="' +
                num +
                '" class="cell large year' +
                type +
                '">' +
                num +
                "</a>"
            );
            row.append(item);
          }
          years.append(row);
        }
        return years;
      },
      buildMonthPicker: function(year, month) {
        var obj = $.datePicker,
          months = $('<div class="months"></div>'),
          limit = $.datePicker.defaults.limitCenturies;

        var header =
          '<div class="row header">' +
          '<a href="#" class="prev' +
          (limit && year == 1900 ? " disabled" : "") +
          '"><span class="arrow"></span></a>' +
          '<a href="#" class="year" data-year="' +
          year +
          '">' +
          year +
          "</a>" +
          '<a href="#" class="next' +
          (limit && year == 2099 ? " disabled" : "") +
          '"><span class="arrow"></span></a>' +
          "</div>";
        months.append(header);

        var n = 0;
        var type = "";
        for (var i = 0; i < 3; i++) {
          var row = $('<div class="row"></div>');
          for (var j = 0; j < 4; j++) {
            n = j + i * 4;
            type = "";
            if (n == month) {
              type += " selected";
            }
            var item = $(
              '<a href="#" data-year="' +
                year +
                '" data-month="' +
                n +
                '" class="cell large month' +
                type +
                '">' +
                obj.strings.monthsShort[n] +
                "</a>"
            );
            row.append(item);
          }
          months.append(row);
        }
        return months;
      },
      buildCalendar: function(year, month, selected) {
        var obj = $.datePicker,
          calendar = $('<div class="calendar"></div>'),
          date = new Date(),
          year = year || date.getFullYear(),
          month = month >= 0 ? month : date.getMonth(),
          temp = new Date(year, month, 1),
          limit = $.datePicker.defaults.limitCenturies;
        temp.setDate(temp.getDate() - 1);
        var lastPrev = temp.getDate(),
          lastCur = this.daysInMonth(year, month),
          offset = this.firstDay(year, month),
          numbering = 1 - offset;
        if (offset == 0) {
          numbering -= 7;
        }

        var header =
          '<div class="row header">' +
          '<a href="#" class="prev' +
          (limit && year == 1900 && month == 0 ? " disabled" : "") +
          '"><span class="arrow"></span></a>' +
          '<a href="#" class="month" data-year="' +
          year +
          '" data-month="' +
          month +
          '">' +
          obj.strings.monthsFull[month] +
          " " +
          year +
          "</a>" +
          '<a href="#" class="next' +
          (limit && year == 2099 && month == 11 ? " disabled" : "") +
          '"><span class="arrow"></span></a>' +
          "</div>";
        calendar.append(header);

        var days = $('<div class="row days"></div>');
        for (var w = 0; w < 7; w++) {
          days.append(
            '<div class="cell">' + obj.strings.daysShort[w] + "</div>"
          );
        }
        calendar.append(days);

        for (var w = 0; w < 6; w++) {
          var week = $('<div class="row week"></div>');
          for (var d = 0; d < 7; d++) {
            var num =
                numbering <= 0
                  ? lastPrev + numbering
                  : numbering > lastCur ? numbering - lastCur : numbering,
              type =
                numbering <= 0
                  ? " grayed prev"
                  : numbering > lastCur ? " grayed next" : "";
            if (
              limit &&
              ((year == 1900 && month == 0 && numbering < 1) ||
                (year == 2099 && month == 11 && numbering > lastCur))
            ) {
              week.append('<a href="#" class="cell day blank">&nbsp;</a>');
              numbering++;
              continue;
            }
            if (
              num == date.getDate() &&
              month == date.getMonth() &&
              year == date.getFullYear() &&
              numbering < lastCur
            ) {
              type += " today";
            }
            if (
              numbering == selected.getDate() &&
              month == selected.getMonth() &&
              year == selected.getFullYear()
            ) {
              type += " selected";
            }
            week.append(
              '<a href="#" class="cell day' + type + '">' + num + "</a>"
            );
            numbering++;
          }
          calendar.append(week);
        }
        return calendar;
      },
      pad: function(num, size) {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
      }
    },
    show: function(options) {
      var opts = $.extend(true, {}, $.datePicker.defaults, options);
      var datePicker = null,
        date = new Date();

      if (opts.element) {
        if (typeof opts.element == "string") {
          opts.element = $(opts.element);
        }
        var parts = opts.element.val().match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
        if (parts && parts.length == 4) {
          date = new Date(parts[3], parts[2] - 1, parts[1]);
        }
      }
      var selected = {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        decade: date.getFullYear()
      };
      var calendar = $.datePicker.utils.buildCalendar(
          selected.year,
          selected.month,
          date
        ),
        months = $.datePicker.utils.buildMonthPicker(
          selected.year,
          selected.month
        ),
        years = $.datePicker.utils.buildYearPicker(
          selected.year,
          selected.year
        ),
        decades = $.datePicker.utils.buildDecadePicker(
          selected.year,
          selected.year
        ),
        datePicker = $(
          '<div class="datepicker"><span class="tip"></span></div>'
        );

      datePicker.append(calendar);
      datePicker.append(months);
      datePicker.append(years);
      datePicker.append(decades);
      $.datePicker.hide(true);

      if (opts.element) {
        var offset = opts.element.offset();

        datePicker.css({
          left: offset.left + "px",
          top: offset.top + opts.element.outerHeight(true) + 15 + "px"
        });
      }

      datePicker.hide();
      $("body").append(datePicker);
      datePicker.fadeIn(150);

      datePicker.on("click", ".calendar .day", function(e) {
        e.preventDefault();
        var el = $(this),
          calendar = el.closest(".calendar");
        if (el.hasClass("blank")) {
          return;
        }

        calendar.find(".selected").removeClass("selected");
        el.addClass("selected");

        selected.day = parseInt(el.text()) || 1;
        date.setDate(selected.day);
        date.setMonth(selected.month);
        date.setYear(selected.year);
        var formatted =
          $.datePicker.utils.pad(date.getDate(), 2) +
          "/" +
          $.datePicker.utils.pad(date.getMonth() + 1, 2) +
          "/" +
          date.getFullYear();
        $(opts.element).val(formatted);
        if (opts.closeOnPick) {
          $.datePicker.hide();
        }
      });
      datePicker.on("click", ".calendar .month", function(e) {
        e.preventDefault();
        var el = $(this),
          calendar = el.closest(".calendar"),
          months = datePicker.children(".months"),
          picker = $.datePicker.utils.buildMonthPicker(
            selected.year,
            selected.month
          );

        months.replaceWith(picker);
        months = picker;

        calendar.fadeOut(150, function() {
          months.fadeIn(150);
        });
      });
      datePicker.on("click", ".calendar .prev", function(e) {
        e.preventDefault();
        var el = $(this),
          calendar = el.closest(".calendar"),
          current = calendar.find(".month"),
          month = current.data("month"),
          year = current.data("year");
        if (el.hasClass("disabled")) {
          return;
        }

        month = month - 1;
        if (month < 0) {
          month = 11;
          year--;
        }

        selected.month = month;
        selected.year = year;

        replacement = $.datePicker.utils.buildCalendar(year, month, date);
        replacement.hide();
        calendar.after(replacement);
        calendar.fadeOut(150, function() {
          calendar.detach();
          replacement.fadeIn(150);
        });
      });
      datePicker.on("click", ".calendar .next", function(e) {
        e.preventDefault();
        var el = $(this),
          calendar = el.closest(".calendar"),
          current = calendar.find(".month"),
          month = current.data("month"),
          year = current.data("year");
        if (el.hasClass("disabled")) {
          return;
        }

        month = month + 1;
        if (month > 11) {
          month = 0;
          year++;
        }

        selected.month = month;
        selected.year = year;

        replacement = $.datePicker.utils.buildCalendar(year, month, date);
        replacement.hide();
        calendar.after(replacement);
        calendar.fadeOut(150, function() {
          calendar.detach();
          replacement.fadeIn(150);
        });
      });

      datePicker.on("click", ".months .month", function(e) {
        e.preventDefault();
        var el = $(this),
          months = el.closest(".months"),
          month = el.data("month"),
          year = el.data("year"),
          calendar = datePicker.children(".calendar"),
          replacement = null;
        if (el.hasClass("blank")) {
          return;
        }
        months.find(".selected").removeClass("selected");
        el.addClass("selected");

        selected.month = month;

        replacement = $.datePicker.utils.buildCalendar(year, month, date);
        replacement.hide();
        calendar.replaceWith(replacement);

        months.fadeOut(150, function() {
          replacement.fadeIn(150);
        });
      });
      datePicker.on("click", ".months .prev", function(e) {
        e.preventDefault();
        var el = $(this),
          months = el.closest(".months"),
          current = months.find(".year"),
          year = current.data("year");
        if (el.hasClass("disabled")) {
          return;
        }

        year -= 1;

        selected.year = year;

        replacement = $.datePicker.utils.buildMonthPicker(year, selected.month);
        replacement.hide();
        months.after(replacement);
        months.fadeOut(150, function() {
          months.detach();
          replacement.fadeIn(150);
        });
      });
      datePicker.on("click", ".months .next", function(e) {
        e.preventDefault();
        var el = $(this),
          months = el.closest(".months"),
          current = months.find(".year"),
          year = current.data("year");
        if (el.hasClass("disabled")) {
          return;
        }

        year += 1;

        selected.year = year;

        replacement = $.datePicker.utils.buildMonthPicker(year, selected.month);
        replacement.hide();
        months.after(replacement);
        months.fadeOut(150, function() {
          months.detach();
          replacement.fadeIn(150);
        });
      });
      datePicker.on("click", ".months .year", function(e) {
        e.preventDefault();
        var el = $(this),
          months = el.closest(".months"),
          years = datePicker.children(".years"),
          picker = $.datePicker.utils.buildYearPicker(
            selected.decade,
            selected.year
          );

        years.replaceWith(picker);
        years = picker;

        months.fadeOut(150, function() {
          years.fadeIn(150);
        });
      });

      datePicker.on("click", ".years .year", function(e) {
        e.preventDefault();
        var el = $(this),
          years = el.closest(".years"),
          year = el.data("year"),
          months = datePicker.children(".months"),
          replacement = null;
        if (el.hasClass("blank")) {
          return;
        } else if (el.hasClass("next") || el.hasClass("prev")) {
          return;
        }
        years.find(".selected").removeClass("selected");
        el.addClass("selected");

        selected.year = year;
        selected.decade = year;

        replacement = $.datePicker.utils.buildMonthPicker(year, selected.month);
        replacement.hide();
        months.replaceWith(replacement);

        years.fadeOut(150, function() {
          replacement.fadeIn(150);
        });
      });
      datePicker.on("click", ".years .prev", function(e) {
        e.preventDefault();
        var el = $(this),
          years = el.closest(".years"),
          current = years.find(".decade"),
          decade = current.data("decade");
        if (el.hasClass("disabled")) {
          return;
        }

        decade -= 10;

        selected.decade = decade;

        replacement = $.datePicker.utils.buildYearPicker(decade, selected.year);
        replacement.hide();
        years.after(replacement);
        years.fadeOut(150, function() {
          years.detach();
          replacement.fadeIn(150);
        });
      });
      datePicker.on("click", ".years .next", function(e) {
        e.preventDefault();
        var el = $(this),
          years = el.closest(".years"),
          current = years.find(".decade"),
          decade = current.data("decade");
        if (el.hasClass("disabled")) {
          return;
        }

        decade += 10;

        selected.decade = decade;

        replacement = $.datePicker.utils.buildYearPicker(decade, selected.year);
        replacement.hide();
        years.after(replacement);
        years.fadeOut(150, function() {
          years.detach();
          replacement.fadeIn(150);
        });
      });
      datePicker.on("click", ".years .decade", function(e) {
        e.preventDefault();
        var el = $(this),
          years = el.closest(".years"),
          decades = datePicker.children(".decades");

        years.fadeOut(150, function() {
          decades.fadeIn(150);
        });
      });

      datePicker.on("click", ".decades .decade", function(e) {
        e.preventDefault();
        var el = $(this),
          decade = el.data("year"),
          decades = el.closest(".decades"),
          years = datePicker.children(".years"),
          replacement = null;
        if (el.hasClass("blank")) {
          return;
        } else if (el.hasClass("next") || el.hasClass("prev")) {
          return;
        }
        decades.find(".selected").removeClass("selected");
        el.addClass("selected");

        replacement = $.datePicker.utils.buildYearPicker(decade, selected.year);
        replacement.hide();
        years.replaceWith(replacement);

        decades.fadeOut(150, function() {
          replacement.fadeIn(150);
        });
      });
      datePicker.on("click", ".decades .prev", function(e) {
        e.preventDefault();
        var el = $(this),
          decades = el.closest(".decades"),
          current = decades.find(".century"),
          century = current.data("century");
        if (el.hasClass("disabled")) {
          return;
        }

        century -= 100;

        replacement = $.datePicker.utils.buildDecadePicker(
          century,
          selected.decade
        );
        replacement.hide();
        decades.after(replacement);
        decades.fadeOut(150, function() {
          decades.detach();
          replacement.fadeIn(150);
        });
      });
      datePicker.on("click", ".decades .next", function(e) {
        e.preventDefault();
        var el = $(this),
          decades = el.closest(".decades"),
          current = decades.find(".century"),
          century = current.data("century");
        if (el.hasClass("disabled")) {
          return;
        }

        century += 100;

        replacement = $.datePicker.utils.buildDecadePicker(
          century,
          selected.decade
        );
        replacement.hide();
        decades.after(replacement);
        decades.fadeOut(150, function() {
          decades.detach();
          replacement.fadeIn(150);
        });
      });
      datePicker.on("click", ".decades .century", function(e) {
        e.preventDefault();
      });
      $(document).on("mouseup", function(e) {
        if (!datePicker.is(e.target) && datePicker.has(e.target).length === 0) {
          $(document).off("mouseup");
          $.datePicker.hide();
        }
      });
    },
    hide: function(force) {
      var force = force || false,
        el = $(".datepicker");
      if (force) {
        el.remove();
      } else {
        el.fadeOut(150, el.remove);
      }
    }
  };

  $.fn.datePicker = function(options) {
    if (!this.length) {
      return this;
    }
    var opts = $.extend(true, {}, $.datePicker.defaults, options);
    this.each(function() {
      var el = $(this),
        parent = el.parent(),
        button = parent.find("[data-toggle=datepicker]");
      if (!button.length) {
        el.on("click", function() {
          $.datePicker.show({
            element: el
          });
        });
      } else {
        button.on("click", function(e) {
          e.preventDefault();
          if ($(".datepicker:visible").length) {
            $.datePicker.hide();
          } else {
            $.datePicker.show({
              element: el
            });
          }
        });
      }
    });
    return this;
  };

  $("[data-select=datepicker]").each(function() {
    var el = $(this);
    el.datePicker();
  });
})(jQuery);

(function() {
  (function($, window) {
    var Chips,
      Classes,
      DATA_KEY,
      ENTER_KEYCODE,
      EVENT_KEY,
      Events,
      JQUERY_NO_CONFLICT,
      NAME,
      Selectors;
    NAME = "chips";
    DATA_KEY = NAME;
    JQUERY_NO_CONFLICT = $.fn[NAME];
    EVENT_KEY = "." + DATA_KEY;
    ENTER_KEYCODE = 13;
    Events = {
      CLICK: "click" + EVENT_KEY,
      FOCUSIN: "focusin" + EVENT_KEY,
      FOCUSOUT: "focusout" + EVENT_KEY,
      KEYDOWN_ADD: "keydown.add" + EVENT_KEY,
      CHIP_ADD: "chips.add",
      CHIP_REMOVE: "chips.remove"
    };
    Selectors = {
      CHIPS: ".chips",
      CHIP: ".chip",
      CHIP_NAME: ".chip-name",
      INPUT: "input",
      DELETE: ".close"
    };
    Classes = {
      FOCUS: "focus"
    };
    Chips = (function() {
      function Chips(_element, _options) {
        this._element = _element;
        this._options = _options;
        this._init();
        this._addEventListeners();
      }

      Chips.prototype.add = function(value) {
        var addEvent, chipHtml;
        if (!this._isValid(value)) {
          return;
        }
        chipHtml = this._renderChip(value);
        $(chipHtml).insertBefore($(this._element).find(Selectors.INPUT));
        addEvent = $.Event(Events.CHIP_ADD, []);
        return $(this._element).trigger(addEvent);
      };

      Chips.prototype.remove = function(chip) {
        var removeEvent;
        chip.remove();
        removeEvent = $.Event(Events.CHIP_REMOVE);
        return $(this._element).trigger(removeEvent);
      };

      Chips.prototype._init = function() {
        $(this._element).append(this._options.input_template);
        return this._setPlaceholder();
      };

      Chips.prototype._setPlaceholder = function() {
        return $(this._element)
          .find(Selectors.INPUT)
          .prop("placeholder", this._options.placeholder);
      };

      Chips.prototype._addEventListeners = function() {
        $(this._element).on(
          Events.KEYDOWN_ADD,
          (function(_this) {
            return function(event) {
              var target;
              target = event.target;
              if (event.which === ENTER_KEYCODE) {
                event.preventDefault();
                _this.add($(target).val());
                return $(target).val("");
              }
            };
          })(this)
        );
        $(this._element).on(
          Events.CLICK,
          Selectors.DELETE,
          (function(_this) {
            return function(event) {
              var chip, chips, target;
              target = event.target;
              chips = target.closest(Selectors.CHIPS);
              chip = target.closest(Selectors.CHIP);
              event.stopPropagation();
              _this.remove(chip);
              return $(_this._element)
                .find(Selectors.INPUT)
                .focus();
            };
          })(this)
        );
        $(this._element).on(Events.FOCUSIN, function(event) {
          var currentChips;
          currentChips = $(event.target).closest(Selectors.CHIPS);
          return currentChips.addClass(Classes.FOCUS);
        });
        $(this._element).on(Events.FOCUSOUT, function(event) {
          var currentChips;
          currentChips = $(event.target).closest(Selectors.CHIPS);
          return currentChips.removeClass(Classes.FOCUS);
        });
        return $(this._element).on(Events.CLICK, function(event) {
          return $(event.target)
            .find(Selectors.INPUT)
            .focus();
        });
      };

      Chips.prototype._renderChip = function(value) {
        var html;
        html = $.parseHTML(this._options.chip_template);
        $(html)
          .find(Selectors.CHIP_NAME)
          .text(value);
        return html;
      };

      Chips.prototype._isValid = function(value) {
        var exists;
        if (value === "") {
          return;
        }
        exists = false;
        $(this._element)
          .find(Selectors.CHIP)
          .each(function() {
            var chip_name;
            chip_name = $(this)
              .find(Selectors.CHIP_NAME)
              .text();
            if (chip_name.toLowerCase() === value.toLowerCase()) {
              return (exists = true);
            }
          });
        return !exists;
      };

      Chips.defaults = function() {
        return {
          chip_template:
            '<div class="chip">' +
            '<span class="chip-name"></span>' +
            '<button type="button" class="close">' +
            "<span>&times;</span></button></div> ",
          input_template: '<input type="text" placeholder="">',
          placeholder: "+Tag"
        };
      };

      Chips._jQueryPlugin = function(config) {
        return this.each(function() {
          var data, options;
          data = $(this).data(DATA_KEY);
          options = $.extend({}, Chips.defaults(), config);
          if (!data) {
            data = new Chips(this, options);
            $(this).data(DATA_KEY, data);
          }
          if (typeof config === "string") {
            return data[config].call(this);
          }
        });
      };

      return Chips;
    })();
    $.fn[NAME] = Chips._jQueryPlugin;
    $.fn[NAME].Constructor = Chips;
    return ($.fn[NAME].noConflict = function() {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Chips._jQueryPlugin;
    });
  })(window.jQuery, window);
}.call(this));
$(function(e) {
  $("input[type=range]").wrap("<div class='range'></div>");
  var i = 1;

  $(".range").each(function() {
    var n = this.getElementsByTagName("input")[0].value;
    var x =
      n / 100 * (this.getElementsByTagName("input")[0].offsetWidth - 8) - 12;
    this.id = "range" + i;
    if (this.getElementsByTagName("input")[0].value == 0) {
      this.className = "range";
    } else {
      this.className = "range rangeM";
    }
    this.innerHTML +=
      "<style>#" +
      this.id +
      " input[type=range]::-webkit-slider-runnable-track {background:linear-gradient(to right, #e91e63 0%, #e91e63 " +
      n +
      "%, #e91e63 " +
      n +
      "%)} #" +
      this.id +
      ":hover input[type=range]:before{content:'" +
      n +
      "'!important;left: " +
      x +
      "px;} #" +
      this.id +
      ":hover input[type=range]:after{left: " +
      x +
      "px}</style>";
    i++;
  });

  $("input[type=range]").on("input", function() {
    var a = this.value;
    var p = a / 100 * (this.offsetWidth - 8) - 12;
    if (a == 0) {
      this.parentNode.className = "range";
    } else {
      this.parentNode.className = "range rangeM";
    }
    this.parentNode.getElementsByTagName("style")[0].innerHTML +=
      "#" +
      this.parentNode.id +
      " input[type=range]::-webkit-slider-runnable-track {background:linear-gradient(to right, #3f51b5 0%, #3f51b5 " +
      a +
      "%, #515151 " +
      a +
      "%)} #" +
      this.parentNode.id +
      ":hover input[type=range]:before{content:'" +
      a +
      "'!important;left: " +
      p +
      "px;} #" +
      this.parentNode.id +
      ":hover input[type=range]:after{left: " +
      p +
      "px}";
  });
});
(function(window) {
  "use strict";
  var Waves = Waves || {};
  var $$ = document.querySelectorAll.bind(document);

  function isWindow(obj) {
    return obj !== null && obj === obj.window;
  }

  function getWindow(elem) {
    return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
  }

  function offset(elem) {
    var docElem,
      win,
      box = {
        top: 0,
        left: 0
      },
      doc = elem && elem.ownerDocument;
    docElem = doc.documentElement;
    if (typeof elem.getBoundingClientRect !== typeof undefined) {
      box = elem.getBoundingClientRect();
    }
    win = getWindow(doc);
    return {
      top: box.top + win.pageYOffset - docElem.clientTop,
      left: box.left + win.pageXOffset - docElem.clientLeft
    };
  }

  function convertStyle(obj) {
    var style = "";
    for (var a in obj) {
      if (obj.hasOwnProperty(a)) {
        style += a + ":" + obj[a] + ";";
      }
    }
    return style;
  }

  var Effect = {
    duration: 750,
    show: function(e, element) {
      if (e.button === 2) {
        return false;
      }
      var el = element || this;
      var ripple = document.createElement("div");
      ripple.className = "waves-ripple";
      el.appendChild(ripple);
      var pos = offset(el);
      var relativeY = e.pageY - pos.top;
      var relativeX = e.pageX - pos.left;
      var scale = "scale(" + el.clientWidth / 100 * 10 + ")";

      if ("touches" in e) {
        relativeY = e.touches[0].pageY - pos.top;
        relativeX = e.touches[0].pageX - pos.left;
      }

      ripple.setAttribute("data-hold", Date.now());
      ripple.setAttribute("data-scale", scale);
      ripple.setAttribute("data-x", relativeX);
      ripple.setAttribute("data-y", relativeY);

      var rippleStyle = {
        top: relativeY + "px",
        left: relativeX + "px"
      };
      ripple.className = ripple.className + " waves-notransition";
      ripple.setAttribute("style", convertStyle(rippleStyle));
      ripple.className = ripple.className.replace("waves-notransition", "");

      rippleStyle["-webkit-transform"] = scale;
      rippleStyle["-moz-transform"] = scale;
      rippleStyle["-ms-transform"] = scale;
      rippleStyle["-o-transform"] = scale;
      rippleStyle.transform = scale;
      rippleStyle.opacity = "1";
      rippleStyle["-webkit-transition-duration"] = Effect.duration + "ms";
      rippleStyle["-moz-transition-duration"] = Effect.duration + "ms";
      rippleStyle["-o-transition-duration"] = Effect.duration + "ms";
      rippleStyle["transition-duration"] = Effect.duration + "ms";
      rippleStyle["-webkit-transition-timing-function"] =
        "cubic-bezier(0.250, 0.460, 0.450, 0.940)";
      rippleStyle["-moz-transition-timing-function"] =
        "cubic-bezier(0.250, 0.460, 0.450, 0.940)";
      rippleStyle["-o-transition-timing-function"] =
        "cubic-bezier(0.250, 0.460, 0.450, 0.940)";
      rippleStyle["transition-timing-function"] =
        "cubic-bezier(0.250, 0.460, 0.450, 0.940)";
      ripple.setAttribute("style", convertStyle(rippleStyle));
    },
    hide: function(e) {
      TouchHandler.touchup(e);
      var el = this;
      var width = el.clientWidth * 1.4;
      var ripple = null;
      var ripples = el.getElementsByClassName("waves-ripple");
      if (ripples.length > 0) {
        ripple = ripples[ripples.length - 1];
      } else {
        return false;
      }
      var relativeX = ripple.getAttribute("data-x");
      var relativeY = ripple.getAttribute("data-y");
      var scale = ripple.getAttribute("data-scale");

      var diff = Date.now() - Number(ripple.getAttribute("data-hold"));
      var delay = 350 - diff;
      if (delay < 0) {
        delay = 0;
      }

      setTimeout(function() {
        var style = {
          top: relativeY + "px",
          left: relativeX + "px",
          opacity: "0",
          "-webkit-transition-duration": Effect.duration + "ms",
          "-moz-transition-duration": Effect.duration + "ms",
          "-o-transition-duration": Effect.duration + "ms",
          "transition-duration": Effect.duration + "ms",
          "-webkit-transform": scale,
          "-moz-transform": scale,
          "-ms-transform": scale,
          "-o-transform": scale,
          transform: scale
        };
        ripple.setAttribute("style", convertStyle(style));
        setTimeout(function() {
          try {
            el.removeChild(ripple);
          } catch (e) {
            return false;
          }
        }, Effect.duration);
      }, delay);
    },
    wrapInput: function(elements) {
      for (var a = 0; a < elements.length; a++) {
        var el = elements[a];
        if (el.tagName.toLowerCase() === "input") {
          var parent = el.parentNode;

          if (
            parent.tagName.toLowerCase() === "i" &&
            parent.className.indexOf("waves-effect") !== -1
          ) {
            continue;
          }
          var wrapper = document.createElement("i");
          wrapper.className = el.className + " waves-input-wrapper";
          var elementStyle = el.getAttribute("style");
          if (!elementStyle) {
            elementStyle = "";
          }
          wrapper.setAttribute("style", elementStyle);
          el.className = "waves-button-input";
          el.removeAttribute("style");
          parent.replaceChild(wrapper, el);
          wrapper.appendChild(el);
        }
      }
    }
  };

  var TouchHandler = {
    touches: 0,
    allowEvent: function(e) {
      var allow = true;
      if (e.type === "touchstart") {
        TouchHandler.touches += 1;
      } else if (e.type === "touchend" || e.type === "touchcancel") {
        setTimeout(function() {
          if (TouchHandler.touches > 0) {
            TouchHandler.touches -= 1;
          }
        }, 500);
      } else if (e.type === "mousedown" && TouchHandler.touches > 0) {
        allow = false;
      }
      return allow;
    },
    touchup: function(e) {
      TouchHandler.allowEvent(e);
    }
  };

  function getWavesEffectElement(e) {
    if (TouchHandler.allowEvent(e) === false) {
      return null;
    }
    var element = null;
    var target = e.target || e.srcElement;
    while (target.parentElement !== null) {
      if (
        !(target instanceof SVGElement) &&
        target.className.indexOf("waves-effect") !== -1
      ) {
        element = target;
        break;
      } else if (target.classList.contains("waves-effect")) {
        element = target;
        break;
      }
      target = target.parentElement;
    }
    return element;
  }

  function showEffect(e) {
    var element = getWavesEffectElement(e);
    if (element !== null) {
      Effect.show(e, element);
      if ("ontouchstart" in window) {
        element.addEventListener("touchend", Effect.hide, false);
        element.addEventListener("touchcancel", Effect.hide, false);
      }
      element.addEventListener("mouseup", Effect.hide, false);
      element.addEventListener("mouseleave", Effect.hide, false);
    }
  }

  Waves.displayEffect = function(options) {
    options = options || {};
    if ("duration" in options) {
      Effect.duration = options.duration;
    }

    Effect.wrapInput($$(".waves-effect"));
    if ("ontouchstart" in window) {
      document.body.addEventListener("touchstart", showEffect, false);
    }
    document.body.addEventListener("mousedown", showEffect, false);
  };

  Waves.attach = function(element) {
    if (element.tagName.toLowerCase() === "input") {
      Effect.wrapInput([element]);
      element = element.parentElement;
    }
    if ("ontouchstart" in window) {
      element.addEventListener("touchstart", showEffect, false);
    }
    element.addEventListener("mousedown", showEffect, false);
  };
  window.Waves = Waves;
  document.addEventListener(
    "DOMContentLoaded",
    function() {
      Waves.displayEffect();
    },
    false
  );
})(window);
$(document).ready(function() {
  $(".toggle").accordion();
  $(".alert-toggle[data-alert=true]").alert();
  $(".collapse-toggle").collapse("navbar");
  $(".collapse-toggle").collapse("default");
  $(".sidebar-toggle").sidebar();
  $(".card-toggle").cardToggle();
  $(".dropdown-toggle").dropdown();
  $(".modal-toggle").modal();
  $(".dropdown-menu[data-type=selectbox] li[select-value]").selectBox();
  $(".popover-toggle").popover();
  $(".tab-item").tab();
  $(".progress-bar").progressbar();
  $(this).clear();
  $(".lightbox-link").lightbox();
  $(".fileput .fileput-btn").fileput();
  $(
    ".btn:not(.btn-white),.navbar:not(.white) .nav-item>.item,.nav-item > .item.dropdown .dropdown-toggle "
  )
    .not(".dropdown-menu,.dropdown-menu .item,.dropdown")
    .addClass("waves-effect waves-light");
  $(".navbar.white .nav-item>.item:not(.dropdown) ,.btn-white").addClass(
    "waves-effect waves-ripple waves-teal"
  );
  $("pre").addClass("scrolspy");
  $(window).resize(function() {
    $(".dropdown-menu")
      .removeClass("show out")
      .hide();
  });
      var urls = document.querySelectorAll("[data-img-url]");
      Array.prototype.forEach.call(urls, function(el, i) {
        var url = urls[i].getAttribute("data-img-url");
        urls[i].style.backgroundImage = "url(" + url + ")";
        urls[i].removeAttribute("data-img-url");
      });
      var selector_carousel = document.querySelectorAll(".carousel-slider");
      Array.prototype.forEach.call(selector_carousel, function(el, i) {
        var selectors = selector_carousel[i].id;
        $(el).carousel();
      });
});
