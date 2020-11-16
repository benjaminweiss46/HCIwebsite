document.addEventListener('DOMContentLoaded', function() {
	document.querySelector('button').addEventListener('click', onclick, false)
	function onclick() {
		chrome.tabs.query({currentWindow: true, active: true},
			function (tabs) {
				chrome.tabs.sendMessage(tabs[0].id, "hello")
			}
		)
	}
}, false)
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

