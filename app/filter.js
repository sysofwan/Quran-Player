app.filter('splitSeconds', function() {
	var padZeroes = function(num, length) {
		length = length || 2;
		var s = "00" + num;
		return s.substr(s.length - length);
	};
	
	return function(seconds) {
		var hour = Math.floor(seconds / (60 * 60));
		hour = padZeroes(hour, 1);
		var minute = Math.floor((seconds % (60 * 60)) / 60);
		minute = padZeroes(minute);
		var second = Math.floor(seconds % 60);
		second = padZeroes(second);
		return [hour, minute, second].join(':');
	};
});