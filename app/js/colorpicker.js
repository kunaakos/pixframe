'use strict';

var colorPicker = (function() {
    
    var _palette = null,
        _currentColor = null,
        _colorChangeCb = null,

        _init = function(palette) {
            _palette = palette;
            _renderHTML();
            $('.slice').click(function(){
                _currentColor = $(this).index();
                console.log("set color: " + _currentColor);
                if (_colorChangeCb) _colorChangeCb(_currentColor);
            });
        },

        _setColorChangeCb = function(callback) {
            _colorChangeCb = callback;
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
                        "transform:rotate(" + degrees * (i - 1) + "deg);" +
                        "-webkit-transform:rotate(" + degrees * (i - 1) + "deg);" +
                        "border-color:" + _palette[i] + " transparent transparent transparent" +
                    "'></div>"
                );
            };
        }

    return {
        init: _init,
        setColorChangeCb: _setColorChangeCb,
        currentColor: _currentColor
    };

})();