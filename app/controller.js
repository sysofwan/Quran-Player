app.controller('MainController', function($scope, surahFactory, playerFactory) {
	var playReinit = false;

	var init = function() {
		$scope.surahs = surahFactory.getSurahs();
		$scope.reciters = surahFactory.getReciters();
		$scope.isPlaying = playerFactory.isPlaying();
		$scope.playingSurah = {};
		$scope.isInit = playerFactory.isInit();
		$scope.currReciter = $scope.reciters[0];
		$scope.reciters[0].iscurr = true;
		if ($scope.isInit) {
			initReciter();
			relaodSurah();
		}
	};

	var initReciter = function() {
		var currReciter = playerFactory.getReciter();
		for (var i = 0; i < $scope.reciters.length; i++) {
			if ($scope.reciters[i].name === currReciter.name) {
				$scope.reciters[i].iscurr = true;
				$scope.currReciter = $scope.reciters[i];
			} else {
				$scope.reciters[i].iscurr = false;
			}
		}
	};

	var relaodSurah = function() {
		if (playerFactory.isInit()) {
			$scope.playingSurah = $scope.surahs[playerFactory.getSurahNum() - 1];
		}
		else $scope.playingSurah = '';
	};

	$scope.isCurrReciter = function(reciter) {
		return reciter.name === $scope.currReciter.name;
	};

	$scope.initPlay = function(surahNum) {
		playerFactory.setSource(surahNum, $scope.currReciter);
		relaodSurah();
		$scope.isPlaying = true;
		$scope.isInit = true;
		playReinit = false;
	};
	$scope.play = function() {
		if (playReinit) {
			$scope.initPlay(playerFactory.getSurahNum());
		}
		if ($scope.isInit) {
			playerFactory.play();
			$scope.isPlaying = true;
		}
	};
	$scope.pause = function() {
		playerFactory.pause();
		$scope.isPlaying = false;
	};

	$scope.setReciter = function(reciter) {
		if (reciter.iscurr) return;
		$scope.currReciter.iscurr = false;
		reciter.iscurr = true;
		$scope.currReciter = reciter;
		playerFactory.setReciter(reciter);
	};

	$scope.seek = function() {
		if ($scope.isInit) {
			var duration = playerFactory.getDuration();
			var time = ($scope.seekTime/100) * duration;
			playerFactory.scrub(time);
		}
	};

	$scope.next = function() {
		playerFactory.next();
		relaodSurah();
	};
	$scope.prev = function() {
		playerFactory.prev();
		relaodSurah();
	};

	init();
});