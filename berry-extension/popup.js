var options;
var responses;
let barChart;
let pieChart;
let radChart;
var chatWords = [];
var uniqueWordsPerMsg = [];
var merged = [];
var ctxBar = document.getElementById("canvasBar");
var ctxPie = document.getElementById("canvasPie");
var ctxRad = document.getElementById("canvasRadial");
document.addEventListener('DOMContentLoaded', initialViewing, false)
document.querySelector('#back').addEventListener('click', togglePage, false)
document.querySelector('#barGraph').addEventListener('click',
	function () { togglePage(); toggleGraph("bar");}, false)
document.querySelector('#pieGraph').addEventListener('click',
	function () { togglePage(); toggleGraph("pie");}, false)
document.querySelector('#radGraph').addEventListener('click',
	function () { togglePage(); toggleGraph("rad");}, false)


function initialViewing() {
	options = [];
	responses = [];
	updatePopup();
	createBarGraph();
	createPieGraph();
	createRadarGraph();
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
function toggleGraph(graphType) {
	var x = document.getElementById("bar");
	var y = document.getElementById("pie");
	var z = document.getElementById("radial");
	if (graphType === "bar") {
		x.style.display = "block";
		y.style.display = "none";
		z.style.display = "none";
	}
	else if (graphType === "rad") {
		x.style.display = "none";
		y.style.display = "none";
		z.style.display = "block";
	}
	else if (graphType === "pie") {
		x.style.display = "none";
		y.style.display = "block";
		z.style.display = "none";
	}
}

function updatePopup() {
	chrome.storage.sync.get(['chat', 'chat'], function (data) {
		console.log("updating popup")
		// printing into chat box
		document.getElementById("c").innerHTML = data.chat;
		checkForCommonElements(data.chat);
	});
	setTimeout(updatePopup, 3000)
}
/**
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	console.log("got message")
	updatePopup();
	return true;
});**/


function onlyUnique(value, index, self) {
	return self.indexOf(value) === index;
}
var newData = false;
function checkForCommonElements(chatText) {
	//cData.getElementsByClassName("oIy2qc")
	chatWords = []; //clear to get doubling
	wordsPerMsg = [];
	uniqueWordsPerMsg = [];
	merged = [];

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
	options = [];
	responses = [];
	console.log(barChart.data.datasets[0].data)
	for (i = 0; i < letterFrequencyArr.length; i++){
		if (letterFrequencyArr[i].frequency > 2) {
			newData = true;
			options.push(letterFrequencyArr[i].letter)
			responses.push(letterFrequencyArr[i].frequency)
			//options.push(letterFrequencyArr[i].frequency)
			//responses.push(letterFrequencyArr[i].letter)
		}
	}
	if (newData == true) {
		barChart.data.labels = options;
		barChart.data.datasets[0].data = responses
		barChart.update();
		pieChart.data.labels = options;
		pieChart.data.datasets[0].data = responses
		pieChart.update();
		radChart.data.labels = options;
		radChart.data.datasets[0].data = responses
		radChart.update();
	}
	//barChart.data.labels = options;
	//barChart.data.datasets[0].data = responses;
	//[e1,e2,..] where e = {letter: ,frequency: }, where letter = word
}


function createBarGraph() {
	barChart = new Chart(ctxBar, {
		type: 'bar',
		data: {
			labels: options,
			datasets: [{
				barPercentage: 1,
				label: '# of Students',
				data: responses,
				backgroundColor: [
					'rgba(255, 51, 51, 0.3)',
					'rgba(51, 51, 255, 0.3)',
					'rgba(51, 255, 51, 0.3)',
					'rgba(0,255,255, 0.3)',
					'rgba(255,0,255,0.3)',
					'rgba(128,0,0,0.3)',
					'rgba(255,255,0,0.3)']
			}]
		},
		options: {
    		scales: {
        		yAxes: [{
            		ticks: {
               			 beginAtZero: true
            		}
        		}]
    		}
		}
	});
}

function createRadarGraph() {
	radChart = new Chart(ctxRad, {
		type: 'radar',
		data: {
			labels: options,
			datasets: [{
				barPercentage: 0.5,
        		barThickness: 6,
        		maxBarThickness: 8,
        		minBarLength: 2,
				label: '# of Students',
				data: responses,
				backgroundColor: [
					'rgba(255, 51, 51, 0.3)',
					'rgba(51, 51, 255, 0.3)',
					'rgba(51, 255, 51, 0.3)',
					'rgba(0,255,255, 0.3)',
					'rgba(255,0,255,0.3)',
					'rgba(128,0,0,0.3)',
					'rgba(255,255,0,0.3)']
			}]
		}
	});

}

function createPieGraph() {
	pieChart = new Chart(ctxPie, {
		type: 'pie',
		data: {
			labels: options,
			datasets: [{
				label: '# of Students',
				data: responses,
				backgroundColor: [
					'rgba(255, 51, 51, 0.3)',
					'rgba(51, 51, 255, 0.3)',
					'rgba(51, 255, 51, 0.3)',
					'rgba(0,255,255, 0.3)',
					'rgba(255,0,255,0.3)',
					'rgba(128,0,0,0.3)',
					'rgba(255,255,0,0.3)']
			}]
		}
	});
}


