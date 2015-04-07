'use strict';

var app = (function(document, $) {
    var docElem = document.documentElement,
        
        _userAgentInit = function() {
            docElem.setAttribute('data-useragent', navigator.userAgent);
        },

        _bindEvents = function() {
            $('.matrix-cell').click(function() {
                $(this).toggleClass('on');
                
                // FIXTHIS
                pixels.set($(this).parent().index(), $(this).index(), $(this).hasClass('on'));
            });
        },
        
        _init = function() {
            _userAgentInit();
            _bindEvents();            
        },


        _displayPattern = function(pattern) {
            if (pattern) {
                $('.matrix-row').each(function(indexRow) {  
                    $(this).children('.matrix-cell').each(function(indexColumn){
                        $(this).toggleClass('on', Boolean(pattern[indexRow][indexColumn]));
                    });
                });
            };
        }

    return {
        init: _init,
        displayPattern: _displayPattern
    };

})(document, jQuery);

(function() {
    pixels.init(app.displayPattern);
    app.init();
})();
