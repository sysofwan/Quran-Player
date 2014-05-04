app.factory('playerFactory', function() {
	var port = chrome.runtime.connect();
	return chrome.extension.getBackgroundPage().player;
});

app.factory('surahFactory', function() {

	var createReciter = function(id, name, path) {
		var reciter = {};
		reciter.name = name;
		reciter.path = path;
		reciter.id = id;
		reciter.iscurr = false;
		return reciter;
	};

	var createSurah = function(name, translation, number) {
		var surah = {};
		surah.name = name;
		surah.translation = translation;
		surah.number = number;
		return surah;
	};

	var surahs = [createSurah("Al-Fatihah", "The Opening", 1), 
				createSurah("Al-Baqarah", "The Cow", 2), 
				createSurah("Al-'Imran", "The Family of Amran", 3), 
				createSurah("An-Nisa'", "The Women", 4), 
				createSurah("Al-Ma'idah", "The Food", 5), 
				createSurah("Al-An'am", "The Cattle", 6), 
				createSurah("Al-A'raf", "The Elevated Places", 7), 
				createSurah("Al-Anfal", "Voluntary Gifts", 8), 
				createSurah("At-Taubah", "The Immunity", 9), 
				createSurah("Yunus", "Jonah", 10), 
				createSurah("Hud", "Hud", 11), 
				createSurah("Yusuf", "Joseph", 12), 
				createSurah("Ar-Ra'd", "The Thunder", 13), 
				createSurah("Ibrahim", "Abraham", 14), 
				createSurah("Al-Hijr", "The Rock", 15), 
				createSurah("An-Nahl", "The Bee", 16), 
				createSurah("Al-Isra'", "The Night Journey", 17), 
				createSurah("Al-Kahf", "The Cave", 18), 
				createSurah("Maryam", "Mary", 19), 
				createSurah("TaHa", "Ta Ha", 20), 
				createSurah("Al-Anbiya'(The", "The Prophets", 21), 
				createSurah("Al-Hajj", "The Pilgrimage", 22), 
				createSurah("Al-Mu'minun", "The Believers", 23), 
				createSurah("An-Nur", "The Light", 24), 
				createSurah("Al-Furqan", "The Discrimination", 25), 
				createSurah("Ash-Shu'ara'", "The Poets", 26), 
				createSurah("An-Naml", "The Naml", 27), 
				createSurah("Al-Qasas", "The Narrative", 28), 
				createSurah("Al-'Ankabut", "The Spider", 29), 
				createSurah("Ar-Rum", "The Romans", 30), 
				createSurah("Luqman", "Luqman", 31), 
				createSurah("As-Sajdah", "The Adoration", 32), 
				createSurah("Al-Ahzab", "The Allies", 33), 
				createSurah("Al-Saba'", "The Saba'", 34), 
				createSurah("Al-Fatir", "The Originator", 35), 
				createSurah("Ya Sin", "Ya Sin", 36), 
				createSurah("As-Saffat", "Those Ranging in Ranks", 37), 
				createSurah("Sad", "Sad", 38), 
				createSurah("Az-Zumar", "The Companies", 39), 
				createSurah("Al-Mu'min", "The Believer", 40), 
				createSurah("Ha", "Ha Mim", 41), 
				createSurah("Ash-Shura", "Counsel", 42), 
				createSurah("Az-Zukhruf", "Gold", 43), 
				createSurah("Ad-Dukhan", "The Drought", 44), 
				createSurah("Al-Jathiyah", "The Kneeling", 45), 
				createSurah("Al-Ahqaf", "The Sandhills", 46), 
				createSurah("Muhammad", "Muhammad", 47), 
				createSurah("Al-Fath", "The Victory", 48), 
				createSurah("Al-Hujurat", "The Apartments", 49), 
				createSurah("Qaf", "Qaf", 50), 
				createSurah("Ad-Dhariyat", "The Scatterers", 51), 
				createSurah("At-Tur", "The Mountain", 52), 
				createSurah("An-Najm", "The Star", 53), 
				createSurah("Al-Qamar", "The Moon", 54), 
				createSurah("Ar-Rahman", "The Beneficent", 55), 
				createSurah("Al-Waqi'ah", "The Event", 56), 
				createSurah("Al-Hadid", "Iron", 57), 
				createSurah("Al-Mujadilah", "The Pleading Woman", 58), 
				createSurah("Al-Hashr", "The Banishment", 59), 
				createSurah("Al-Mumtahanah", "The Examined One", 60), 
				createSurah("As-Saff", "The Ranks", 61), 
				createSurah("Al-Jumu'ah", "The Congregation", 62), 
				createSurah("Al-Munafiqun", "The Hypocrites", 63), 
				createSurah("At-Taghabun", "The Manifestation of Losses", 64), 
				createSurah("At-Talaq", "Divorce", 65), 
				createSurah("At-Tahrim", "The Prohibition", 66), 
				createSurah("Al-Mulk", "The Kingdom", 67), 
				createSurah("Al-Qalam", "The Pen", 68), 
				createSurah("Al-Haqqah", "The Sure Truth", 69), 
				createSurah("Al-Ma'arij", "The Ways of Ascent", 70), 
				createSurah("Nuh", "Noah", 71), 
				createSurah("Al-Jinn", "The Jinn", 72), 
				createSurah("Al-Muzzammil", "The One Covering Himself", 73), 
				createSurah("Al-Muddaththir", "The One Wrapping Himself", 74), 
				createSurah("Al-Qiyamah", "The Resurrection", 75), 
				createSurah("Al-Insan", "The Man", 76), 
				createSurah("Al-Mursalat", "Those Sent Forth", 77), 
				createSurah("An-Naba'", "The Announcement", 78), 
				createSurah("An-Nazi'at", "Those Who Yearn", 79), 
				createSurah("'Abasa", "He Frowned", 80), 
				createSurah("At-Takwir", "The Folding Up", 81), 
				createSurah("Al-Infitar", "The Cleaving", 82), 
				createSurah("At-Tatfif", "Default in Duty", 83), 
				createSurah("Al-Inshiqaq", "The Bursting Asunder", 84), 
				createSurah("Al-Buruj", "The Stars", 85), 
				createSurah("At-Tariq", "The Comer by Night", 86), 
				createSurah("Al-A'la", "The Most High", 87), 
				createSurah("Al-Ghashiyah", "The Overwhelming Event", 88), 
				createSurah("Al-Fajr", "The Daybreak", 89), 
				createSurah("Al-Balad", "The City", 90), 
				createSurah("Ash-Shams", "The Sun", 91), 
				createSurah("Al-Lail", "The Night", 92), 
				createSurah("Ad-Duha", "The Brightness of the", 93), 
				createSurah("Al-Inshirah", "The Expansion", 94), 
				createSurah("At-Tin", "The Fig", 95), 
				createSurah("Al-'Alaq", "The Clot", 96), 
				createSurah("Al-Qadr", "The Majesty", 97), 
				createSurah("Al-Bayyinah", "The Clear Evidence", 98), 
				createSurah("Al-Zilzal", "The Shaking", 99), 
				createSurah("Al-'Adiyat", "The Assaulters", 100), 
				createSurah("Al-Qari'ah", "The Calamity", 101), 
				createSurah("At-Takathur", "The Abundance of Wealth", 102), 
				createSurah("Al-'Asr", "The Time", 103), 
				createSurah("Al-Humazah", "The Slanderer", 104), 
				createSurah("Al-Fil", "The Elephant", 105), 
				createSurah("Al-Quraish", "The Quraish", 106), 
				createSurah("Al-Ma'un", "Acts of Kindness", 107), 
				createSurah("Al-Kauthar", "The Abundance of Good", 108), 
				createSurah("Al-Kafirun", "The Disbelievers", 110), 
				createSurah("An-Nasr", "The Help", 111), 
				createSurah("Al-Lahab", "The Flame", 112), 
				createSurah("Al-Ikhlas", "The Unity", 113), 
				createSurah("Al-Falaq", "The Dawn", 114), 
				createSurah("An-Nas", "The Men", 115)];

	var reciters = [createReciter(0, "Mishari Rashid al-`Afasy", "mishaari_raashid_al_3afaasee"),
					createReciter(1, "Muhammad Siddiq al-Minshawi", "muhammad_siddeeq_al-minshaawee"),
					createReciter(2, "Ahmed ibn Ali al-Ajmy", "ahmed_ibn_3ali_al-3ajamy"),
					createReciter(3, "Makkah 1424", "makkah_1424"),
					createReciter(4, "Mustafa al-`Azawi", "mustafa_al3azzawi"),
					createReciter(5, "Yasser ad-Dussary", "yasser_ad-dussary"),
					createReciter(6, "Saad al-Ghamdi", "sa3d_al-ghaamidi/complete"),
					createReciter(7, "Abdur-Rahman as-Sudais", "abdurrahmaan_as-sudays"),
					createReciter(8, "Mahmoud Khalil al-Husary", "mahmood_khaleel_al-husaree"),
					createReciter(9, "Sahl Yaaseen", "sahl_yaaseen"),
					createReciter(10, "Abdullaah Basfar", "abdullaah_basfar")];

	var factory = {};

	factory.getSurahs = function() {
		return surahs;
	};

	factory.getReciters = function() {
		return reciters;
	};

	return factory;
});