'use strict';

var pixels = (function(document, $) {
    
    var _matrixValues = [
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0]
        ],

        source = new Firebase('https://pixframe.firebaseio.com/'),        
        
        _init = function(callback) {
            _get(callback);
            
            source.on('child_changed', function() {
                console.log('pattern changed');
                _get(callback);
            });    
        },

        _get = function(callback) {
            if (callback) {
                source.once('value', function(data) {
                    _matrixValues = data.val();
                    callback(_matrixValues);
                })
            };
        },

        _set = function(row, col, val) {
            source.child(row + '/' + col).set(val);
        }

    return {
        init: _init,
        set: _set,
    };

})(document);