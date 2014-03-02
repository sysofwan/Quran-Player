var player = (function() {
	var rootUrl = 'http://download.quranicaudio.com/quran/';
	var isSet = false;
	var currReciter;
	var currSurahNum;
	var audioElt = document.createElement('audio');
	audioElt.setAttribute('autoplay', 'autoplay');

	var padZeroes = function(num) {
		var s = "00" + num;
		return s.substr(s.length-3);
	};

	var generateUrl = function(surahNum, reciterId) {
		var surahCode = padZeroes(surahNum);
		return rootUrl + reciterId + '/' + surahCode + '.mp3';
	};

	var setSource = function(surahNum, reciter) {
		stop();
		currReciter = reciter;
		currSurahNum = surahNum;
		var url = generateUrl(surahNum, reciter.path);
		audioElt.src = url;
		isSet = true;
	};

	var play = function() {
		if (isSet) {
			audioElt.play();
		}
	};

	var pause = function() {
		if (isSet) {
			audioElt.pause();
		}
	};

	var stop = function() {
		isSet = false;
		pause();
		audioElt.src = '';
	};

	var next = function() {
		if (isSet && currSurahNum < 115) {
			setSource(currSurahNum + 1, currReciter);
		}
	};

	var prev = function() {
		if (isSet && currSurahNum > 1) {
			setSource(currSurahNum - 1, currReciter);
		}
	};

	var setReciter = function(reciter) {
		var paused = audioElt.paused;
		if (isSet) {
			setSource(currSurahNum, reciter);
			if (paused) {
				pause();
			}
		}
	};

	audioElt.addEventListener('ended', function() {
		next();
	});

	return {
		stop: stop,
		play: play,
		pause: pause,
		setSource: setSource,
		getDuration: function() {
			return audioElt.duration;
		},
		getCurrentTime: function() {
			return audioElt.currentTime;
		},
		getSurahNum: function() {
			return currSurahNum;
		},
		getReciter: function() {
			return currReciter;
		},
		isPlaying: function() {
			return !audioElt.paused;
		},
		isPaused: function() {
			return audioElt.paused;
		},
		isInit: function() {
			return isSet;
		},
		scrub: function(time) {
			audioElt.currentTime = time;
		},
		setReciter: setReciter,
		next: next,
		prev: prev
	};
})();