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
