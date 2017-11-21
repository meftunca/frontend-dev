
(function() {
    (function($, window) {
        var Chips, Classes, DATA_KEY, ENTER_KEYCODE, EVENT_KEY, Events, JQUERY_NO_CONFLICT, NAME, Selectors;
        NAME = 'chips';
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
            CHIPS: '.chips',
            CHIP: '.chip',
            CHIP_NAME: '.chip-name',
            INPUT: 'input',
            DELETE: '.close'
        };
        Classes = {
            FOCUS: 'focus'
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
                return $(this._element).find(Selectors.INPUT).prop('placeholder', this._options.placeholder);
            };

            Chips.prototype._addEventListeners = function() {
                $(this._element).on(Events.KEYDOWN_ADD, (function(_this) {
                    return function(event) {
                        var target;
                        target = event.target;
                        if (event.which === ENTER_KEYCODE) {
                            event.preventDefault();
                            _this.add($(target).val());
                            return $(target).val('');
                        }
                    };
                })(this));
                $(this._element).on(Events.CLICK, Selectors.DELETE, (function(_this) {
                    return function(event) {
                        var chip, chips, target;
                        target = event.target;
                        chips = target.closest(Selectors.CHIPS);
                        chip = target.closest(Selectors.CHIP);
                        event.stopPropagation();
                        _this.remove(chip);
                        return $(_this._element).find(Selectors.INPUT).focus();
                    };
                })(this));
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
                    return $(event.target).find(Selectors.INPUT).focus();
                });
            };

            Chips.prototype._renderChip = function(value) {
                var html;
                html = $.parseHTML(this._options.chip_template);
                $(html).find(Selectors.CHIP_NAME).text(value);
                return html;
            };

            Chips.prototype._isValid = function(value) {
                var exists;
                if (value === '') {
                    return;
                }
                exists = false;
                $(this._element).find(Selectors.CHIP).each(function() {
                    var chip_name;
                    chip_name = $(this).find(Selectors.CHIP_NAME).text();
                    if (chip_name.toLowerCase() === value.toLowerCase()) {
                        return exists = true;
                    }
                });
                return !exists;
            };

            Chips.defaults = function() {
                return {
                    chip_template: '<div class="chip">' + '<span class="chip-name"></span>' + '<button type="button" class="close">' + '<span>&times;</span></button></div> ',
                    input_template: '<input type="text" placeholder="">',
                    placeholder: '+Tag'
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
                    if (typeof config === 'string') {
                        return data[config].call(this);
                    }
                });
            };

            return Chips;

        })();
        $.fn[NAME] = Chips._jQueryPlugin;
        $.fn[NAME].Constructor = Chips;
        return $.fn[NAME].noConflict = function() {
            $.fn[NAME] = JQUERY_NO_CONFLICT;
            return Chips._jQueryPlugin;
        };
    })(window.jQuery, window);

}).call(this);