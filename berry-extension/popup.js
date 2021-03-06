var options;
var responses;
let barChart;
var horBar = false;
var doPie = false;
let pieChart;
let radChart;
var chatTextSplit = [];
var trimText = [];
let polarChart;
var chatWords = [];
var uniqueWordsPerMsg = [];
var merged = [];
var display = "";
var msgLen = 0;
var curStart = 0;
var ctxBar = document.getElementById("canvasBar");
var ctxPie = document.getElementById("canvasPie");
var ctxRad = document.getElementById("canvasRadial");
var ctxPolar = document.getElementById("canvasPolar");
document.addEventListener('DOMContentLoaded', initialViewing, false)
document.querySelector('#back').addEventListener('click', togglePage, false)
document.querySelector('#barGraph').addEventListener('click',
	function () { togglePage(); toggleGraph("bar");}, false)
document.querySelector('#pieGraph').addEventListener('click',
	function () { togglePage(); toggleGraph("pie");}, false)
document.querySelector('#radGraph').addEventListener('click',
	function () { togglePage(); toggleGraph("rad");}, false)
document.querySelector('#polarGraph').addEventListener('click',
	function () { togglePage(); toggleGraph("polar");}, false)
document.querySelector('#hor').addEventListener('click',
	function () { toggleBar();}, false)
document.querySelector('#donut').addEventListener('click',
	function () { togglePie();}, false)

	document.addEventListener('DOMContentLoaded', function() {
		document.getElementById("flush").addEventListener("click", flushHan);
	  });

function flushHan() {
	if (msgLen >= 1) {
		curStart = msgLen - 1;
	}
	// console.log("msgLen = " + msgLen);
	// console.log("curStart = " + curStart);
}
function initialViewing() {
	// document.getElementById("c").innerHTML = "hahahaha";
	curStart = 0;
	msgLen = 0;
	options = [];
	responses = [];
	chatTextSplit = [];
	trimText = [];
	chatWords = []; //clear to get doubling
	wordsPerMsg = [];
	uniqueWordsPerMsg = [];
	merged = [];
	updatePopup();
	createBarGraph();
	createPieGraph();
	createRadarGraph();
	createPolarGraph();
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
	var v = document.getElementById("polar");
	if (graphType === "bar") {
		x.style.display = "block";
		y.style.display = "none";
		z.style.display = "none";
		v.style.display = "none";
	}
	else if (graphType === "rad") {
		x.style.display = "none";
		y.style.display = "none";
		z.style.display = "block";
		v.style.display = "none";
	}
	else if (graphType === "pie") {
		x.style.display = "none";
		y.style.display = "block";
		z.style.display = "none";
		v.style.display = "none";
	}
	else if (graphType === "polar") {
		x.style.display = "none";
		y.style.display = "none";
		z.style.display = "none";
		v.style.display = "block";
	}
}
function toggleBar() {
	barChart.destroy();
	if (horBar == false) {
		createHorBarGraph();
		horBar = true;
		document.getElementById("hor").innerHTML = "Vertical";
	}
	else {
		createBarGraph();
		horBar = false;
		document.getElementById("hor").innerHTML = "Horizontal";
	}
}
function togglePie() {
	pieChart.destroy();
	if (doPie == false) {
		createDonutGraph();
		doPie = true;
		document.getElementById("donut").innerHTML = "Pie";
	}
	else {
		createPieGraph();
		doPie = false;
		document.getElementById("donut").innerHTML = "Donut";
	}
}

function updatePopup() {
	chrome.storage.sync.get(['chat', 'chat'], function (data) {
		// console.log("updating popup")
		// printing into chat box
//		if (data.chat !== undefined) {
			//document.getElementById("c").innerHTML = data.chat;
			checkForCommonElements(data.chat);
//		}
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

	if (curStart == msgLen - 1) {
		document.getElementById("flush").disabled = true;
		document.getElementById("flush").innerHTML = "Flushed."
	} else {
		document.getElementById("flush").disabled = false;
		document.getElementById("flush").innerHTML = "Flush!"
	}
	//cData.getElementsByClassName("oIy2qc")
	chatTextSplit = [];
	trimText = [];
	chatWords = []; //clear to get doubling
	wordsPerMsg = [];
	uniqueWordsPerMsg = [];
	merged = [];
	msgLen = 0;
	display = "";

	chatTextSplit = chatText.split("data-message-text=\"")
	msgLen = chatTextSplit.length;

	// console.log("chatTextSplit.length = " + chatTextSplit.length);
	// console.log("msgLen = " + msgLen);

	trimText = chatTextSplit.slice(curStart);

	for (var i = 1; i < trimText.length; i++) {
		chatWords.push(trimText[i].split("\"")[0])
	}

	// console.log("curStart = " + curStart);
	// console.log("msgLen = " + msgLen);

	// console.log(chatWords);

	for (var j = 0; j < chatWords.length; j++) {
		console.log("chatWords = " + chatWords[j]);
		display = display.concat(" - ");
		display = display.concat(chatWords[j]);
		display = display.concat("<br>");
		wordsPerMsg.push(chatWords[j].toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').split(" "));
	}

	document.getElementById("c").innerHTML = display;

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
	// console.log(barChart.data.datasets[0].data)
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
		polarChart.data.labels = options;
		polarChart.data.datasets[0].data = responses
		polarChart.update();
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

function createHorBarGraph() {
	barChart = new Chart(ctxBar, {
		type: 'horizontalBar',
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
        		xAxes: [{
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
		},
		options: {
			scale: {
				ticks: {
					min: 0
				}
			}
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
function createDonutGraph() {
	pieChart = new Chart(ctxPie, {
		type: 'doughnut',
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
function createPolarGraph() {
	polarChart = new Chart(ctxPolar, {
		type: 'polarArea',
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


