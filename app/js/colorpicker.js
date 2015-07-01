'use strict';

var colorPicker = (function() {
    
    var _palette = [],

        _init = function(palette) {
            _palette = palette;
            _renderHTML();
            $('.slice').click(function(){
                var color = $(this).index();
                console.log(color);
            });
        },

        // spaghetti alert!
        _renderHTML = function() {
            var nrOfSlices = _palette.length;
            var degrees = 360 / (nrOfSlices - 1);
            $('.colorpicker').append(
                "<div class='slice' style='" + 
                "background-color:" + _palette[0] +
                "'></div>"
            );
            for (var i = 1; i < nrOfSlices; i++) {
                $('.colorpicker').append(
                    "<div class='slice' style='" +
                        "transform:rotate(" + degrees * (i - 1)  + "deg);" +
                        "border-color:" + _palette[i] + " transparent transparent transparent" +
                    "'></div>"
                );
            };
        }

    return {
        init: _init,
    };

})();