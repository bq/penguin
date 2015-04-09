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
        closeable: false,
        classModifier: '',
        title: '',
        content: '',
        ajaxSettings: undefined,
        close: {
            text: 'close',
            className: 'icon icon--close'
        },
        buttons: undefined
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

    Modal.buttons = function(buttons) {

        var buttonsHtml = '';

        $.each(buttons, function() {

            if (this.url) {
                buttonsHtml += '<a href="' + this.url + '" class="' + this.className + '">' + this.text + '</a>';
            } else {
                buttonsHtml += '<button type="button" class="' + this.className + '" data-close="modal">' + this.text + '</button>';
            }

        });

        return buttonsHtml;

    };


    Modal.prototype.render = function(settings) {

        var template = '<section class="modal modal--center ' + settings.backdropClassName + ' ' + settings.classModifier + '" role="dialog">';
        template += '<div class="modal__dialog">';
        template += '<div class="modal__dialog__content">';

        if (this.settings.modalContent) {
            template += this.settings.modalContent;
        } else {
            template += '<div class="modal__header">';
            template += settings.title;
            template += settings.close;
            template += '</div>';
            template += '<div class="modal__body" data-region="modal-body">' + settings.content + '</div>';
            template += settings.buttonsHtml;
        }

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
        this.settings.close = options.close || defaults.close;
        this.settings.close = this.settings.close ? '<button type="button" title="' + this.settings.close.text + '" data-close="modal" class="modal__close"><i class="' + this.settings.close.className + '" aria-hidden="true"></i><span class="invisible">' + this.settings.close.text + '</span></button>' : '';
        this.settings.title = options.title || defaults.title;
        this.settings.title = this.settings.title ? '<h1 class="modal__header__title">' + this.settings.title + '</h1>' : '';
        this.settings.content = options.content || defaults.content;
        this.settings.ajaxSettings = options.ajaxSettings || defaults.ajaxSettings;
        this.settings.buttons = options.buttons || defaults.buttons;
        this.settings.buttonsHtml = this.settings.buttons ? '<div class="modal__footer"><div class="btn-group text-' + this.settings.buttons.align + '">' + Modal.buttons(this.settings.buttons.btn) + '</div></div>' : '';
        this.settings.modalContent = options.template;
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
                    }));
                }.bind(this));
            } else {
                this.$container.append(this.$el);
            }

            this.$container.trigger($.Event('modal:show', {
                relatedTarget: event ? event.target : this.$container
            }));

            this.visible = true;
        }


        return this;
    };

    Modal.prototype.hide = function(event) {

        if (this.visible) {
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
        }

        return this;

    };

    Modal.prototype.bindEvents = function() {
        // Closeable from backdrop
        if (this.settings.closeable) {

            $(this.$el).on('click', $.proxy(this.hide, this));

            $(document).on('keyup', $.proxy(function(e) {
                if (e.keyCode == 27) { // esc
                    this.hide();
                }
            }, this));

            $(this.$el).find('.modal__dialog__content').on('click', function(event) {
                event.stopPropagation();
            });
        }

        // Icon close event
        if (this.settings.close) {
            $(this.$el).find('[data-close="modal"]').on('click', $.proxy(this.hide, this));
        }

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
