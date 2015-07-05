'use strict';

var app = (function() {
    var docElem = document.documentElement,
        myColor = 0,
        
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

            $('.colorpicker-toggle').click(function(){
                $('body').toggleClass('show-colorpicker');
                $('body').removeClass('show-info');

            });
            $('.info-toggle').click(function(){
                $('body').toggleClass('show-info');
                $('body').removeClass('show-colorpicker');
            });
            $('.info-container').click(function(){
                $('body').removeClass('show-info');
            });
        },
        
        _init = function() {
            _userAgentInit();
            _bindEvents();
        },

        _displayPattern = function(pattern, palette) {
            $('.matrix-row').each(function(indexRow) {
                $(this).children('.matrix-cell').each(function(indexColumn){
                    $(this).css('background-color', palette[pattern[indexRow][indexColumn]]);
                    console.log('painted pixel');
                });
            });
        },

        _changeColor = function(newColor) {
                myColor = newColor;
                $('body').removeClass('show-colorpicker');

        }

    return {
        init: _init,
        displayPattern: _displayPattern,
        changeColor: _changeColor
    };

})();

(function() {

    pixels.init(function(pattern, palette) {
        colorPicker.init(palette);
        app.displayPattern(pattern, palette)
    });

    app.init();

    colorPicker.setColorChangeCb(app.changeColor);
    pixels.setPatternChangeCb(app.displayPattern);
})();
