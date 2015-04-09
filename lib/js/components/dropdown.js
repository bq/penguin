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


        $link.parent().toggleClass(this.settings.selectedClass);

        // Close sibling dropdowns
        if ($siblings.length !== 0) {
            $siblings.closest('.' + this.settings.selectedClass).removeClass(this.settings.selectedClass);
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
            var dropdown = $(this).closest('.dropdown');

            dropdown.removeClass(className);
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
