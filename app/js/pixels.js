'use strict';

var pixels = (function() {
    
    var _pattern = [],
        _palette = [],
        _patternChangeCb = null,

        source = new Firebase('https://pixframe.firebaseio.com/'),
        
        _init = function(callback) {
            _updateData(function(){
                if (callback) callback(_pattern, _palette);
            });
            
            // listens for pattern changes
            source.on('child_changed', function() {
                console.log('pattern changed');
                _getPattern(_patternChangeCb);
            });    
        },

        _setPatternChangeCb = function(callback) {
            _patternChangeCb = callback;
        },

        _updateData = function(callback) {
            source.once('value', function(data) {
                _pattern = data.val().pattern;
                _palette = data.val().palette;
                if (callback) {
                    callback();
                };
            });
        },

        // updates _pattern and palette values from firebase, passes them to callback if callback is specified
        _getPattern = function(callback) {
            _updateData(function() {
                if (callback) {
                    callback(_pattern, _palette);
                };
            })
        },

        _setPixel = function(row, col, val) {
            source.child('pattern/' + row + '/' + col).set(val);
        },

        _returnPattern = function() {
            if (_pattern !== []) {
                return _pattern;
            } else {
                return null;
            };
        },

        _returnPalette = function() {
            if (_palette !== []) {
                return _palette;
            } else {
                return null;
            };
        }


    return {
        init: _init,
        set: _setPixel,
        returnPalette: _returnPalette,
        returnPattern: _returnPattern,
        getPattern: _getPattern,
        setPatternChangeCb: _setPatternChangeCb
    };

})();