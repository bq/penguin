/*! bq/penguin - v0.0.5 - 2015-05-22 */
/* global define, module, require */

'use strict';

(function(factory, root) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery')); // Node
    } else {
        factory(root.$); // Browser global
    }
})
(function($) {

    function Alert() {}

    Alert.hide = function(event) {

        $(event.target).closest('[data-alert]').remove();

        // return this;
    };

    // jQuery Plugin definition
    var old = $.fn.tab;

    $.fn.alert = function() {

        return this.each(function() {

            $(this).find('[data-close="alert"]').on('click', Alert.hide);

        });

    };

    // No conflict
    $.fn.alert.noConflict = function() {

        $.fn.alert = old;

        return this;

    };

    $(document).on('ready', function() {

        $('[data-alert]').alert();

    });

}, window);

/* global define, module, require */

'use strict';

(function(factory, root) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery')); // Node
    } else {
        factory(root.$); // Browser global
    }
})
(function($) {

    function Dropdown(element) {

        this.init();
        this.$el = $(element);
    }

    Dropdown.prototype.toggle = function(event) {

        event.preventDefault();
        event.stopPropagation(); // Avoid dropdown to close itself when clicking it because of reset method

        var $link = $(event.target).closest('a');

        var $menu = $($link.attr('href')).closest('.dropdown');
        var $siblings = $link.closest('.dropdown').siblings('.dropdown').find('[data-dropdown]');

        this.settings.selectedClass = $menu.attr('class').split(' ')[0] + '--selected';
        this.settings.transitionClass = 'transition';


        $link.parent().toggleClass(this.settings.selectedClass);
        $link.parent().toggleClass(this.settings.transitionClass);

        // Close sibling dropdowns
        if ($siblings.length !== 0) {
            $siblings.closest('.' + this.settings.selectedClass).removeClass(this.settings.selectedClass);
            $siblings.closest('.' + this.settings.transitionClass).removeClass(this.settings.transitionClass);
            $siblings.closest('.dropdown').removeAttr('data-selected');
        }

        if (typeof $menu.attr('data-selected') === 'undefined') {
            $('html').on('click', Dropdown.reset);
        }

        if (typeof $menu.attr('data-selected') !== 'undefined') {
            $menu.removeAttr('data-selected');
        } else {
            $menu.attr('data-selected', '');
        }

        return this;

    };

    Dropdown.prototype.init = function() {

        this.settings = {};
        this.settings.selectedClass = '';

    };

    Dropdown.reset = function() {

        $('.dropdown[data-selected]:not([data-nocollapse])').removeAttr('data-selected');
        $('.dropdown:not([data-nocollapse]) [data-rel="dropdown"]').each(function() {
            var className = $(this).data('penguin.dropdown').settings.selectedClass;
            var transitionName = $(this).data('penguin.dropdown').settings.transitionClass;
            var dropdown = $(this).closest('.dropdown');

            dropdown.removeClass(className);
            dropdown.removeClass(transitionName);
        });
        $('html').off('click', Dropdown.reset);

    };

    // jQuery Plugin definition
    var old = $.fn.dropdown;

    $.fn.dropdown = function() {

        return this.each(function() {
            var $this = $(this),
                data = $this.data('penguin.dropdown');

            if (!data) {
                $this.data('penguin.dropdown', (data = new Dropdown(this)));
            }

            data.$el.on('click', data.toggle.bind(data));
        });

    };

    // No conflict
    $.fn.dropdown.noConflict = function() {

        $.fn.dropdown = old;

        return this;

    };

    $(document).on('ready', function() {

        $('[data-rel="dropdown"]').dropdown();

    });

}, window);

/* global define, module, require */

'use strict';

(function(factory, root) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery')); // Node
    } else {
        factory(root.$); // Browser global
    }
})
(function($) {

    var defaults = {
        show: false,
        backdrop: true,
        backdropClassName: 'modal--backdrop',
        closeable: true,
        classModifier: '',
        content: '',
        ajaxSettings: undefined,
        transitionDuration: 350 // css transition duration + 50 ms
    };

    function Modal(options, container) {

        options = options || {};

        this.visible = false;

        this.$container = container instanceof HTMLBodyElement || container === undefined ? $('body') : $(container);

        // Initialize
        this.init(options);

        // Render as DOM
        this.$el = this.render(this.settings);

        // Bind events
        this.bindEvents();

    }

    Modal.attr2Obj = function(string) {

        var start = (string ? string.indexOf('{') : -1),
            options = {};

        if (start !== -1) {
            try {
                /*jslint evil: true */
                options = (new Function('', 'var json = ' + string.substr(start) + '; return JSON.parse(JSON.stringify(json));'))();
            } catch (e) {}
        }

        return options;
    };

    Modal.prototype.render = function(settings) {

        var template = '<section class="modal modal--center ' + settings.backdropClassName + ' ' + settings.classModifier + '" role="dialog">';
        template += '<div class="modal__dialog">';
        template += '<div class="modal__dialog__content" data-region="modal-body">';
        template += settings.content;
        template += '</div>';
        template += '</div>';
        template += '</section>';

        return $(template);

    };

    Modal.prototype.init = function(options) {

        // Set default options values
        this.settings = {};
        this.settings.show = options.show || !defaults.show;
        this.settings.backdrop = options.backdrop || defaults.backdrop;
        this.settings.backdropClassName = this.settings.backdrop ? (options.backdropClassName || defaults.backdropClassName) : '';
        this.settings.closeable = options.closeable || defaults.closeable;
        this.settings.classModifier = options.classModifier || defaults.classModifier;
        this.settings.content = options.content || defaults.content;
        this.settings.ajaxSettings = options.ajaxSettings || defaults.ajaxSettings;
        this.settings.transitionDuration = options.transitionDuration || defaults.transitionDuration;
    };

    Modal.initAttr = function() {

        var target = $.isEmptyObject($(this).data('target')) ? 'body' : $(this).data('target'),
            options = Modal.attr2Obj($(this).data('modal')) || {};
        options.ajaxSettings = $.isEmptyObject(Modal.attr2Obj($(this).data('ajax'))) ? undefined : Modal.attr2Obj($(this).data('ajax'));

        var data = $(target).data('penguin.modal');

        if (data) {
            data['hide']();
        }

        $(target).data('penguin.modal', (data = new Modal(options, target)));
        data['show']();
    };

    Modal.prototype.request = function(ajaxSettings, callback) {

        ajaxSettings.success = callback;

        $.ajax(ajaxSettings);

    };

    Modal.prototype.show = function(event) {

        var ajaxSettings = this.settings.ajaxSettings;

        var transitionAdd = function() {
            $(this.$el)[0].offsetWidth // force reflow
            $(this.$el).addClass('transition');
        }.bind(this);

        if (!this.visible) {
            if (this.$container.selector !== 'body') {
                this.$container.addClass('modal-parent');
            } else {
                $(this.$el).addClass('modal--fullscreen');
            }

            if (ajaxSettings) {
                this.request(ajaxSettings, function(data) {

                    $(this.$el).find('[data-region="modal-body"]').append(data);
                    this.$container.append($(this.$el));
                    this.$container.trigger($.Event('modal:ajaxLoaded', {
                        relatedTarget: event ? event.target : this.$container
                    }), transitionAdd());

                }.bind(this));
            } else {
                this.$container.append(this.$el);
            }

            this.$container.trigger($.Event('modal:show', {
                relatedTarget: event ? event.target : this.$container
            }));

            this.visible = true;

            if (!ajaxSettings) {
                transitionAdd();
            }

        }

        return this;
    };

    Modal.prototype.hide = function(event) {

        if (this.visible) {

            var hideModal = function() {
                $(this.$el).remove();
                $(this.$el).off();

                this.$container.removeClass('modal-parent');
                this.$container.removeClass('modal--backdrop');

                this.$container.trigger($.Event('modal:hide', {
                    relatedTarget: event ? event.target : this.$container
                }));

                this.$container.data('penguin.modal', null);

                $(document).off('keyup');

                this.visible = false;
            }.bind(this);


            this.$el.one('penguinTransitionEnd', function() {
                hideModal();
            });
            this.$el.emulateTransitionEnd(this.settings.transitionDuration);
            this.$el.removeClass('transition');

        }

        return this;

    };

    Modal.prototype.bindEvents = function() {

        // Closeable from backdrop
        if (this.settings.closeable) {

            $(document).on('keyup', $.proxy(function(e) {
                if (e.keyCode == 27) { // esc
                    this.hide();
                }
            }, this));

            $(this.$el).on('click', this.hide.bind(this));

            $(this.$el).on('click', '.modal__dialog__content', function(event) {
                event.stopPropagation();
            });

            $(this.$el).on('click', '[data-close="modal"]', function(event) {
                event.stopPropagation();
            });
        }


        $(this.$el).on('click', '[data-close="modal"]', this.hide.bind(this));

        return this;

    };

    // jQuery Plugin definition
    var old = $.fn.modal;

    $.fn.modal = function(options, target) {

        return this.each(function() {

            var $this = $(this),
                container = target || this,
                data = $this.data('penguin.modal'),
                settings = $.extend({}, defaults, options || {}, typeof options === 'object' && options);

            if (data || options !== 'hide') {
                if (!data) {
                    $this.data('penguin.modal', (data = new Modal(settings, container)));
                } else if (typeof options === 'string') {
                    data[options]();
                } else {
                    data['hide']();
                    $this.data('penguin.modal', (data = new Modal(settings, container)));
                }
            }

        });

    };

    // No conflict
    $.fn.modal.noConflict = function() {

        $.fn.modal = old;

        return this;

    };

    // Set constructor
    $.fn.modal.Constructor = Modal;

    $.penguin = $.penguin || {};

    // Allow to create new Instances
    $.penguin.modal = function(options, container) {

        return new $.fn.modal.Constructor(options, container);

    };

    // Via attributes
    $(document).on('ready', function() {

        $('[data-rel="modal"]').on('click', Modal.initAttr);
        $('[data-rel="modal-init"]').each(Modal.initAttr);

    });

}, window);

/* global define, module, require */

'use strict';

(function(factory, root) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery')); // Node
    } else {
        factory(root.$); // Browser global
    }
})


(function($) {

    $('body').one('penguinTransitionEnd', function(event) {
        console.log('terminó un transition');
    });

    var defaults = {
        spinnerClass: 'spinner__element--circle',
        text: 'Loading...',
        show: false,
        backdrop: true,
        backdropClassName: 'spinner--backdrop',
        transitionDuration: 350 // css transition duration + 50 ms
    };

    function Spinner(options, container) {

        options = options || {};
        this.visible = false;
        this.$container = container instanceof HTMLBodyElement ? $('body') : $(container);

        // Initialize
        this.init(options);

        // Render as DOM
        this.$el = this.render(this.settings);

    }

    Spinner.prototype.render = function(settings) {

        return $('<div class="spinner ' + settings.backdropClassName + '"> ' + settings.spinnerContent + ' </div>');
    };


    Spinner.prototype.init = function(options) {

        // Set default options values
        this.settings = {};
        this.settings.show = options.show || !defaults.show;
        this.settings.text = options.text || defaults.text;
        this.settings.backdrop = options.backdrop || !defaults.backdrop;
        this.settings.backdropClassName = this.settings.backdrop ? (options.backdropClassName || defaults.backdropClassName) : '';
        this.settings.spinnerClass = options.spinnerClass || defaults.spinnerClass;
        this.settings.spinnerContent = options.template || '<div class="spinner__element ' + this.settings.spinnerClass + '">' + this.settings.text + '</div>';
        this.settings.transitionDuration = options.transitionDuration || defaults.transitionDuration;

    };

    Spinner.prototype.show = function(event) {

        var transitionAdd = function() {
            $(this.$el)[0].offsetWidth // force reflow
            $(this.$el).addClass('transition');
        }.bind(this);

        if (!this.visible) {
            if (this.$container.selector !== 'body') {
                this.$container.addClass('spinner-parent');
            } else {
                this.$el.addClass('spinner--fullscreen');
            }

            this.$container.append(this.$el);

            this.$container.trigger($.Event('spinner:show', {
                relatedTarget: event ? event.target : this.$container
            }), transitionAdd());

            this.$container.data('penguin.modal', null);

            this.visible = true;
        }

        return this;

    };

    Spinner.prototype.hide = function(event) {

        if (this.visible) {

            var hideSpinner = function() {
                this.$el.remove();
                this.$el.off();

                this.$container.removeClass('spinner-parent');
                this.$container.removeClass('spinner--backdrop');

                this.$container.trigger($.Event('spinner:hide', {
                    relatedTarget: event ? event.target : this.$container
                }));

                this.$container.removeData('penguin.spinner');

                this.visible = false;
            }.bind(this);


            this.$el.one('penguinTransitionEnd', function() {
                hideSpinner();
            });
            this.$el.emulateTransitionEnd(this.settings.transitionDuration);
            this.$el.removeClass('transition');

        }

        return this;

    };

    // jQuery Plugin definition
    var old = $.fn.spinner;

    $.fn.spinner = function(options, target) {

        return this.each(function() {
            var $this = $(this),
                container = target || this,
                data = $this.data('penguin.spinner'),
                settings = $.extend({}, defaults, options || {}, typeof options === 'object' && options);

            if (!data) {
                $this.data('penguin.spinner', (data = new Spinner(settings, container)));
            }
            if (typeof options === 'string') {
                data[options](); // spinner.show(target);
            } else if (settings.show) {
                data.show();
            }
        });

    };

    // No conflict
    $.fn.spinner.noConflict = function() {

        $.fn.spinner = old;

        return this;

    };

    // Set constructor
    $.fn.spinner.Constructor = Spinner;

    $.penguin = $.penguin || {};

    // Allow to create new Instances
    $.penguin.spinner = function(options, container) {

        return new $.fn.spinner.Constructor(options, container);

    };

}, window);

/* global define, module, require */

'use strict';

(function(factory, root) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery')); // Node
    } else {
        factory(root.$); // Browser global
    }
})
(function($) {

    function Tab(container) {
        this.$el = $(container);
    }

    var settings = {
        classLink: 'tab__block__link',
        classContentTab: 'tab__content__item',
        classItem: 'tab__block__item',
        classItemSelected: 'tab__block__item--selected',
        classContentTabSelected: 'tab__content__item--selected'
    };

    Tab.prototype.toggle = function(event) {

        var $link,
            $contentTab;

        if (event.type !== undefined) {
            event.preventDefault();
            $link = $(event.currentTarget);
            $contentTab = $($link.attr('href'));
        } else {
            $link = $(event).closest('[data-tab]').find('a[href*=' + event.replace('#', '') + ']');
            $contentTab = $($link.attr('href').replace('/', ''));
        }
        var $item = $link.parent();

        if (!$item.hasClass(settings.classItemSelected)) {

            $item.toggleClass(settings.classItemSelected).siblings('.' + settings.classItem).removeClass(settings.classItemSelected);
            $contentTab.toggleClass(settings.classContentTabSelected).siblings('.' + settings.classContentTab).removeClass(settings.classContentTabSelected);

            this.$el.trigger($.Event('tab:toggle', {
                relatedTarget: event ? $link.get(0) : this.$el
            }));
        }

        return this;
    };

    // jQuery Plugin definition
    var old = $.fn.tab;

    $.fn.tab = function() {

        var $this = $(this),
            data = $this.data('penguin.tab');

        if (!data) {
            $this.data('penguin.tab', (data = new Tab(this)));
        }

        data.$el.find('.' + settings.classLink).each(function() {
            $(this).on('click', data.toggle.bind(data));
        });
    };

    // No conflict
    $.fn.tab.noConflict = function() {

        $.fn.tab = old;

        return this;

    };

    $(document).on('ready', function() {

        $('[data-tab]').tab();

    });

}, window);

/* global define, module, require */

'use strict';

(function(factory, root) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery')); // Node
    } else {
        factory(root.$); // Browser global
    }
})
(function($) {

    var transitionEnd = function() {

        var el = document.createElement('transition')

        var transEndEventNames = {
            WebkitTransition: 'webkitTransitionEnd',
            MozTransition: 'transitionend',
            OTransition: 'oTransitionEnd otransitionend',
            transition: 'transitionend'
        }

        for (var name in transEndEventNames) {
            if (el.style[name] !== undefined) {
                return {
                    end: transEndEventNames[name]
                }
            }
        }

    }

    // http://blog.alexmaccaw.com/css-transitions
    $.fn.emulateTransitionEnd = function(duration) {

        var called = false,
            $el = $(this);

        $el.one('penguinTransitionEnd', function() {
            called = true;
        });

        var callback = function() {
            if (!called) {
                $($el).trigger('penguinTransitionEnd');
            };
        };

        setTimeout(callback, duration);

        return this
    };

    $(function() {
        $.support.transition = transitionEnd()

        if (!$.support.transition) return

        $.event.special.penguinTransitionEnd = {
            bindType: $.support.transition.end,
            delegateType: $.support.transition.end,
            handle: function(e) {
                if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
            }
        }
    });

}, window);
