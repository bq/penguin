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
        spinnerClass: 'spinner__element--circle',
        text: 'Loading...',
        show: false,
        backdrop: true,
        backdropClassName: 'spinner--backdrop'
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

    };

    Spinner.prototype.show = function(event) {

        if (!this.visible) {
            if (this.$container.selector !== 'body') {
                this.$container.addClass('spinner-parent');
            } else {
                this.$el.addClass('spinner--fullscreen');
            }

            this.$container.append(this.$el);

            this.$container.trigger($.Event('spinner:show', {
                relatedTarget: event ? event.target : this.$container
            }));

            this.$container.data('penguin.modal', null);

            this.visible = true;
        }

        return this;

    };

    Spinner.prototype.hide = function(event) {

        if (this.visible) {
            this.$el.remove();

            this.$container.removeClass('spinner-parent');
            this.$container.removeClass('spinner--backdrop');

            this.$container.trigger($.Event('spinner:hide', {
                relatedTarget: event ? event.target : this.$container
            }));

            this.$container.removeData('penguin.spinner');

            this.visible = false;
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
