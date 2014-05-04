app.directive('playerSeeker', function($interval, playerFactory) {
	var link = function($scope, elt, attrs) {

		var update = function() {
			elt.val(playerFactory.getPlayedPercentage());
		};
		update();
		$interval(update, 500);
	};
	return {link: link};
});

app.directive('bufferedTime', function($interval, playerFactory) {
	var link = function($scope, elt, attrs) {
		var getBufferedPercentage = function() {
			var bufferedTime = playerFactory.getBuffered().end(0);
			var duration = playerFactory.getDuration();
			return Math.round((bufferedTime/duration) * 100);
		};

		var update = function() {
			if (playerFactory.isInit()) {
				elt.css('width', getBufferedPercentage() + '%');
			} else {
				elt.css('width', 0);
			}
		};
		update();
		$interval(update, 500);
	};
	return {link : link};
});