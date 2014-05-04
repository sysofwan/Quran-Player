app.controller('MainController', function($scope, surahFactory, playerFactory, $interval) {

	var init = function() {
		$scope.time = {};
		$scope.playingSurah = {};
		$scope.surahs = surahFactory.getSurahs();
		$scope.reciters = surahFactory.getReciters();
		$scope.seekTime = playerFactory.getPlayedPercentage();
		$scope.currReciter = $scope.reciters[0];
		$scope.loadingSurah = false;
		$scope.reciters[0].iscurr = true;
		$scope.time.currentTime = 0;
		$scope.time.duration = 0;

		reloadCondition();
		reloadReciter();
		relaodSurah();
	};

	playerFactory.onChange(function() {
		reloadCondition();
		relaodSurah();
	});

	playerFactory.onLoadstart(function() {
		$scope.loadingSurah = true;
	});

	$interval(function() {
		if (playerFactory.isInit()) {
			$scope.time.currentTime = playerFactory.getCurrentTime();
		}
		else {
			$scope.time.currentTime = 0;
		}
	}, 1000);


	var reloadReciter = function() {
		var currReciter = playerFactory.getReciter();
		if (currReciter) {
			changeReciter(currReciter);
		}
	};

	var changeReciter = function(reciter) {
		if (reciter.id != $scope.currReciter.id) {
			$scope.currReciter.iscurr = false;
			$scope.currReciter = $scope.reciters[reciter.id];
			$scope.currReciter.iscurr = true;
		}
	};

	var relaodSurah = function() {
		if (playerFactory.isInit()) {
			$scope.playingSurah = $scope.surahs[playerFactory.getSurahNum() - 1];
			$scope.time.currentTime = playerFactory.getCurrentTime();
			$scope.time.duration = playerFactory.getDuration();
		}
		else $scope.playingSurah = {};
	};

	var reloadCondition = function() {
		$scope.isInit = playerFactory.isInit();
		$scope.isPlaying = playerFactory.isPlaying();
		$scope.loadingSurah = false;
	};

	$scope.initPlay = function(surahNum) {
		playerFactory.setSource(surahNum, $scope.currReciter);
	};

	$scope.setReciter = function(reciter) {
		if (reciter.iscurr) return;
		else {
			playerFactory.setReciter(reciter);
			changeReciter(reciter);
		}
	};

	$scope.seek = function() {
		if ($scope.isInit) {
			var duration = playerFactory.getDuration();
			var time = ($scope.seekTime/100) * duration;
			playerFactory.scrub(time);
		}
	};

	$scope.play = playerFactory.play;
	$scope.pause = playerFactory.pause;
	$scope.next = playerFactory.next;
	$scope.prev = playerFactory.prev;

	init();
});