app.directive('playerSeeker', function($interval, playerFactory) {
	var link = function($scope, elt, attrs) {
		var getPlayedPercentage = function() {
			var duration = playerFactory.getDuration();
			var currentTime = playerFactory.getCurrentTime();
			return Math.round((currentTime/duration) * 100);
		};

		$interval(function() {
			if (playerFactory.isInit()) {
				elt.val(getPlayedPercentage());
			} else {
				elt.val(0);
			}
		}, 500);
	};
	return {link: link};
});