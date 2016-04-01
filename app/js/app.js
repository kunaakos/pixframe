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
      $('.matrix-cell').mouseover(function(event) {
        if (event.buttons) {
           pixels.set($(this).parent().index(), $(this).index(), color);
        };
      });
      // click painting
      $('.matrix-cell').click(function(event) {
        pixels.set($(this).parent().index(), $(this).index(), color);
      });
      $('.mirroring-toggle').click(function(){
        $('.matrix-container').toggleClass('mirrored');
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
    pixels.init(app.displayPattern, app.changePalette);
    colorPicker.setColorChangeCb(app.changeColor);
  },

  _displayPattern = function(newPattern) {
    if (newPattern) {
      pattern = newPattern;
    }
    if (palette && pattern) {
      $('.matrix-row').each(function(indexRow) {
        $(this).children('.matrix-cell').each(function(indexColumn){
            $(this).css('background-color', palette[pattern[indexRow][indexColumn]]);
        });
      });
    }
  },

  _changePalette = function(newPalette) {
    if (newPalette) {
      palette = newPalette;
    }
    _displayPattern(); // redraw of the pattern is needed
    colorPicker.init(palette); // and color picker too
  },

  _changeColor = function(newColor) {
    color = newColor;
    $('body').removeClass('show-colorpicker');
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
