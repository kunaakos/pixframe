'use strict';

var colorPicker = (function() {

  var _palette = null,
      _currentColor = null,
      _colorChangeCb = null,

  _init = function(palette) {
    _palette = palette;
    _colorSlices();
    $('.slice').click(function(){
      _currentColor = $(this).data('slice');
      console.log("set color: " + _currentColor);
      if (_colorChangeCb) _colorChangeCb(_currentColor);
    });
  },

  _setColorChangeCb = function(callback) {
    _colorChangeCb = callback;
  },

  _colorSlices = function() {
    var nrOfSlices = _palette.length - 1;
    for (var i = 0; i <= nrOfSlices; i++) {
      $('#palette>.slice.s'+i).attr('fill', _palette[i]);
    };
  }

  return {
    init: _init,
    setColorChangeCb: _setColorChangeCb,
    currentColor: _currentColor
  };

})();
