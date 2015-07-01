'use strict';

var pixels = (function(document, $) {
    
    var _pattern = [],
        _palette = [],

        source = new Firebase('https://pixframe.firebaseio.com/'),
        
        _init = function(callback) {
            // display initial pattern
            _getData(function(){
                callback();
            });
            
            // listens for pattern changes
            source.on('child_changed', function() {
                console.log('pattern changed');
                _getPattern(callback);
            });    
        },

        _getData = function(callback) {
            source.once('value', function(data) {
                _pattern = data.val().pattern;
                _palette = data.val().palette;
                if (callback) {
                    callback();
                };
            });
        },

        // updates _pattern values from firebase, passes them to callback if callback is specified
        _getPattern = function(callback) {
            _getData(function() {
                if (callback) {
                    callback();
                };
            })
        },

        _setPixel = function(row, col, val) {
            source.child('pattern/' + row + '/' + col).set(val);
        },

        _returnPattern = function() {
            return _pattern;
        },

        _returnPalette = function() {
            return _palette;
        }


    return {
        init: _init,
        set: _setPixel,
        returnPalette: _returnPalette,
        returnPattern: _returnPattern
    };

})(document);