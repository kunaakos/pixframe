'use strict';

var app = (function(document, $) {
    var docElem = document.documentElement,
        myColor = 2,
        
        _userAgentInit = function() {
            docElem.setAttribute('data-useragent', navigator.userAgent);
        },

        _bindEvents = function() {
            // fucky but works, need to read up on mouse events, fix for touch, etc
            // disable dragging
            $('.matrix-cell').bind('dragstart', function(){
                return false;
            });
            // drag painting
            $('.matrix-cell').mouseover(function(event) {
                if (event.buttons) {
                   pixels.set($(this).parent().index(), $(this).index(), myColor);
                };
            });
            // click painting
            $('.matrix-cell').click(function(event) {
                   pixels.set($(this).parent().index(), $(this).index(), myColor);
            });
        },
        
        _init = function() {
            _userAgentInit();
            _bindEvents();
        },

        _displayPattern = function() {
            var palette = pixels.returnPalette();
            var pattern = pixels.returnPattern();
            $('.matrix-row').each(function(indexRow) {
                $(this).children('.matrix-cell').each(function(indexColumn){
                    $(this).css('background-color', palette[pattern[indexRow][indexColumn]]);
                    console.log('painted pixel');
                });
            });
        },

        _changeColor = function(newColor) {
            if (newColor<16) {
                myColor = newColor
            };
        }

    return {
        init: _init,
        displayPattern: _displayPattern,
        changeColor: _changeColor
    };

})(document, jQuery);

(function() {
    pixels.init(app.displayPattern, colorPicker.init);
    app.init();
})();
