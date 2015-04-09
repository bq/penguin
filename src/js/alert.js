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
