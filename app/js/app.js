'use strict';

var app = (function() {
  var docElem = document.documentElement,
      color = 0,
      palette = null,
      pattern = null,

  _userAgentInit = function() {
      docElem.setAttribute('data-useragent', navigator.userAgent);
  },

  _bindEvents = function() {
      // fucky but works, need to read up on mouse events, fix for touch, etc
      // disable dragging
      $('.matrix-cell').bind('dragstart', function(){
          $(this).trigger('click');
          // return false;
      });
      // drag painting
      $('.c').mouseover(function(event) {
        if (event.buttons) {
           pixels.set($(this).data('r'), $(this).data('c'), color);
        };
      });
      // click painting
      $('.c').click(function(event) {
        pixels.set($(this).data('r'), $(this).data('c'), color);
      });
      $('.mirroring-toggle').click(function(){
        $('#matrix').toggleClass('mirrored');
      });
      $('.colorpicker-toggle').click(function(){
          $('#display').toggleClass('show-colorpicker');
          $('#display').removeClass('show-info');
      });
      $('.info-toggle').click(function(){
          $('#display').toggleClass('show-info');
          $('#display').removeClass('show-colorpicker');
      });
      $('.info-ct').click(function(){
          $('#display').removeClass('show-info');
      });
  },

  _init = function() {
    _userAgentInit();
    _bindEvents();
    pixels.init(app.displayPattern, app.changePalette);
    colorPicker.setColorChangeCb(app.changeColor);
  },

  _displayPattern = function(newPattern) {
    if (newPattern) {
      pattern = newPattern;
    }
    if (palette && pattern) {
      $('.c').each(function(){
        var row = $(this).data('r');
        var col = $(this).data('c');
        $(this).attr('fill', palette[pattern[row][col]]);
      })
    }
  },

  _changePalette = function(newPalette) {
    if (newPalette) {
      palette = newPalette;
    }
    _displayPattern();
    colorPicker.init(palette);
  },

  _changeColor = function(newColor) {
    color = newColor;
    $('#display').removeClass('show-colorpicker');
    $('.colorpicker-toggle .icon .color .paths').css('fill', palette[newColor]);
    if (newColor == 0) {
      $('.colorpicker-toggle .switcher').addClass('switch');
    } else {
      $('.colorpicker-toggle .switcher').removeClass('switch');
    }
  }

  return {
      init: _init,
      displayPattern: _displayPattern,
      changePalette: _changePalette,
      changeColor: _changeColor
  };

})();

(function() {
    app.init();
})();
