var options = ["Yes", "No", "Maybe"];
var responses = [30, 41, 23];

document.addEventListener('DOMContentLoaded', initialViewing, false)
document.querySelector('#back').addEventListener('click', togglePage, false)
document.querySelector('#barGraph').addEventListener('click',
	function () { togglePage(); showBarGraph(); }, false)
document.querySelector('#pieGraph').addEventListener('click',
	function () { togglePage(); showPieGraph(); }, false)
document.querySelector('#lineGraph').addEventListener('click',
	function () { togglePage(); showRadarGraph(); }, false)


function initialViewing() {
	updatePopup();
	var x = document.getElementById("mainPage");
	var y = document.getElementById("graphPage");
	x.style.display = "block";
	y.style.display = "none";
}
function togglePage() {
	var x = document.getElementById("mainPage");
	var y = document.getElementById("graphPage");
	if (x.style.display === "none") {
		x.style.display = "block";
		y.style.display = "none";
	} else {
		x.style.display = "none";
		y.style.display = "block";
	}
}
let cData
function updatePopup() {
	chrome.storage.sync.get(['chat', 'chat'], function (data) {
		console.log("updating popup")
		// printing into chat box
		document.getElementById("c").innerHTML = data.chat;
		checkForCommonElements(data.chat);
	});
}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	console.log("got message")
	updatePopup();
	return true;
});

var chatWords = [];
var WordsPerMsg = [];
var uniqueWordsPerMsg = [];
var merged = [];

function onlyUnique(value, index, self) {
	return self.indexOf(value) === index;
}

function checkForCommonElements(chatText) {
	//cData.getElementsByClassName("oIy2qc")
	chatWords = []; //clear to get doubling
	wordsPerMsg = [];
	uniqueWordsPerMsg = [];
	merged = [];

	console.log(chatText)
	var chatTextSplit = chatText.split("data-message-text=\"")
	for (i = 1; i < chatTextSplit.length; i++) {
		chatWords.push(chatTextSplit[i].toLowerCase().split("\"")[0])
	}

	for (var j = 0; j < chatWords.length; j++) {
		wordsPerMsg.push(chatWords[j].replace(/[^a-zA-Z0-9 ]/g, '').split(" "));
	}

	for (var k = 0; k < wordsPerMsg.length; k++) {
		uniqueWordsPerMsg.push(wordsPerMsg[k].filter(onlyUnique));
	}

	merged = [].concat.apply([], uniqueWordsPerMsg);

	const letterFrequencies = merged
		.reduce((freqs, letter) => Object
			.assign(freqs, { [letter]: (freqs[letter] || 0) + 1 }), {});

	const letterFrequencyArr = Object
		.keys(letterFrequencies)
		.map(letter => ({ letter, frequency: letterFrequencies[letter] }));

	letterFrequencyArr.sort((a, b) => b.frequency - a.frequency || a.letter.localeCompare(b.letter));

	console.log("here");
	console.log(chatWords);
	console.log(wordsPerMsg);
	console.log(uniqueWordsPerMsg);
	console.log(merged);
	console.log(letterFrequencyArr);
}

var ctx = document.getElementById("canvas");

function showBarGraph() {
	if (window.myCharts != undefined) {
		window.myCharts.destroy()
	}
	window.myCharts = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: options,
			datasets: [{
				barPercentage: 1,
				label: '# of Students',
				data: responses,
				backgroundColor: ['rgba(255, 51, 51, 0.3)',
					'rgba(51, 51, 255, 0.3)',
					'rgba(51, 255, 51, 0.3)']
			}]
		}
	});
}

function showRadarGraph() {
	if (window.myCharts != undefined) {
		window.myCharts.destroy()
	}
	window.myCharts = new Chart(ctx, {
		type: 'radar',
		data: {
			labels: options,
			datasets: [{
				label: '# of Students',
				data: responses,
				backgroundColor: ['rgba(255, 51, 51, 0.3)',
					'rgba(51, 51, 255, 0.3)',
					'rgba(51, 255, 51, 0.3)']
			}]
		}
	});
}

function showPieGraph() {
	if (window.myCharts != undefined) {
		window.myCharts.destroy()
	}
	window.myCharts = new Chart(ctx, {
		type: 'pie',
		data: {
			labels: options,
			datasets: [{
				label: '# of Students',
				data: responses,
				backgroundColor: ['rgba(255, 51, 51, 0.3)',
					'rgba(51, 51, 255, 0.3)',
					'rgba(51, 255, 51, 0.3)']
			}]
		}
	});
}


