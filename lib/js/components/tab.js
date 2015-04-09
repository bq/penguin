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
