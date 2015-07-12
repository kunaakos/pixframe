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
    var nrOfSlices = _palette.length -1;
    var degrees = 360 / (nrOfSlices);
    $('.colorpicker').empty();
    $('.colorpicker').append(
      "<div class='slice' style='" +
            "background-color:" + _palette[0] +
      "'></div>"
    );
    for (var i = 1; i <= nrOfSlices; i++) {
      $('.colorpicker').append(
        "<div class='slice' style='" +
        "transform:rotate(" + (degrees * (i - 1) + 105) + "deg) skewX(55deg);" +
        "-ms-transform:rotate(" + (degrees * (i - 1) + 105) + "deg) skewX(55deg);" +
        "-webkit-transform:rotate(" + (degrees * (i - 1) + 105) + "deg) skewX(55deg);" +
        "background-color:" + _palette[i] + ";" +
        "z-index:"+ (100 - i) +
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
