var player = (function() {
	var RECITER_KEY = 'prev.reciter.id';
	var rootUrl = 'http://download.quranicaudio.com/quran/';
	var isSet = false;
	var currReciter = store.get(RECITER_KEY);
	console.log(store.get(RECITER_KEY)); 
	var currSurahNum;
	var onChange = [];
	var onLoadstart = [];

	var audioElt = new Audio();
	audioElt.setAttribute('autoplay', 'autoplay');

	chrome.runtime.onConnect.addListener(function(port) {
		port.onDisconnect.addListener(function() {
			onChange = [];
			onLoadstart = [];
		});
	});

	var callCallbacks = function(callbacks) {
		for (var i = 0; i < callbacks.length; ++i) {
			callbacks[i]();
		}
	};

	var padZeroes = function(num) {
		var s = "00" + num;
		return s.substr(s.length-3);
	};

	var generateUrl = function(surahNum, reciterId) {
		var surahCode = padZeroes(surahNum);
		return rootUrl + reciterId + '/' + surahCode + '.mp3';
	};

	var sourceCallback = function() {
		isSet = true;
		callCallbacks(onChange);
		audioElt.removeEventListener('playing', sourceCallback);
	};

	var setSource = function(surahNum, reciter) {
		stop();
		currReciter = reciter;
		currSurahNum = surahNum;
		var url = generateUrl(surahNum, reciter.path);
		audioElt.src = url;
		callCallbacks(onLoadstart);
		audioElt.addEventListener('playing', sourceCallback);
	};

	var play = function() {
		if (isSet) {
			audioElt.play();
			callCallbacks(onChange);
		}
	};

	var pause = function() {
		if (isSet) {
			audioElt.pause();
			callCallbacks(onChange);
		}
	};

	var stop = function() {
		isSet = false;
		audioElt.pause();
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
		store.set(RECITER_KEY, reciter);
		console.log(store.get(RECITER_KEY));
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
		play: play,
		pause: pause,
		setSource: setSource,
		getDuration: function() {
			return Math.round(audioElt.duration);
		},
		getCurrentTime: function() {
			return Math.round(audioElt.currentTime);
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
		onChange: function(callback) {
			onChange.push(callback);
		},
		onLoadstart: function(callback) {
			onLoadstart.push(callback);
		},
		getBuffered: function() {
			return audioElt.buffered;
		},
		getPlayedPercentage: function() {
			if (isSet) {
				return Math.round((audioElt.currentTime/audioElt.duration) * 100);
			}
			return 0;
		},
		setReciter: setReciter,
		next: next,
		prev: prev
	};
}());