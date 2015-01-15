'use strict';

var app = (function(document, $) {
	var pattern = [0,0,0,0,0],
		docElem = document.documentElement,
		
		_userAgentInit = function() {
			docElem.setAttribute('data-useragent', navigator.userAgent);
		},

		_bindEvents = function() {
			$('.matrix-cell').click(function() {
				$(this).toggleClass('on');
				_readMatrix();
				_putPattern();
			});

			dweetio.listen_for('akos_pixelframe', function(dweet){
				pattern = _parseDweet([dweet]);
				_displayMatrix();

			});
		},
		
		_init = function() {
			_userAgentInit();
			_bindEvents();
			_getPattern(function(){
				_displayMatrix();
			});	
		},

		_parseDweet = function(dweet) {
			var dweet = dweet[0]; // Dweet is always an array of 1
			return JSON.parse(dweet.content.pattern);	
		},

		_getPattern = function(callback) {
			dweetio.get_latest_dweet_for('akos_pixelframe', function(err, dweet){
			    pattern = _parseDweet(dweet);
				if (callback) { callback(); }
			});
		},

		_putPattern = function(callback) {
			var patternJSON = { 'pattern' : JSON.stringify(pattern) };
			dweetio.dweet_for('akos_pixelframe', patternJSON, function(err, dweet){
			    if (callback) { callback(); }
			});

		},

		_displayMatrix = function() {
			$('.matrix-row').each(function(indexRow) {	
				var patternRow = pattern[indexRow];
				$(this).children('.matrix-cell').each(function(indexColumn){
					if (patternRow % 2) {
						$(this).addClass('on');
					} else {
						$(this).removeClass('on');
					}
					patternRow = patternRow >> 1;
				});
			});
		},

		_readMatrix = function() {
			$('.matrix-row').each(function(index) {
				var patternRow = 0;
				$(this).children('.matrix-cell').each(function(index){
					if ($(this).hasClass('on')) {
						patternRow += Math.pow(2, index); 
					}
				});
				pattern[index] = patternRow;
			});
		},
		
		_resizeCells = function(height, width) {

		};
	
	return {
		init: _init
	};

})(document, jQuery);

(function() {
	app.init();
})();
