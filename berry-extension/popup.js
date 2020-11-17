var tempVote

var options;
var votes;

function initialData() {
	for (var i = 0; i < 5; i++) {

	}
}

var options = ["Yes","No","Maybe"];
var responses = [30, 41, 23];

document.addEventListener('DOMContentLoaded',initialViewing,false)
document.querySelector('#back').addEventListener('click', togglePage, false)
document.querySelector('#barGraph').addEventListener('click', 
	function() { togglePage(); showBarGraph();}, false)
document.querySelector('#pieGraph').addEventListener('click', 
	function() { togglePage(); showPieGraph();}, false)
document.querySelector('#lineGraph').addEventListener('click', 
	function() { togglePage(); showRadarGraph();}, false)


function initialViewing() {
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
    chrome.storage.sync.get(['chat','chat'], function (data) {
    	console.log("updating popup")
        document.getElementById("c").innerHTML = data.chat;
        checkForCommonElements(data.chat);
    });
}    
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log("got message")
	updatePopup();
	return true;
});
var chatWords = [];
function checkForCommonElements(chatText) {
	//cData.getElementsByClassName("oIy2qc")
	chatWords = []; //clear to get doubling
	console.log(chatText)
	var chatTextSplit = chatText.split("data-message-text=\"")
	for (i=1; i < chatTextSplit.length; i++) {
		chatWords.push(chatTextSplit[i].split("\"")[0])
	}
	console.log(chatWords)
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


