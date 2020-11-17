var con = document.documentElement.innerHTML

getText();
getHTML();

//document.body.addEventListener('click', updateChat, true);

const interval = setInterval( function() {
	updateChat();
}, 2000);
function updateChat() {
	console.log("update chat")
	var x = document.getElementsByClassName("z38b6 CnDs7d hPqowe");
	if (x.length !== 0) { //the div is found
		if (x[0].childElementCount !== 0) { //elements in chat exist
			chrome.storage.sync.set({'chat': x[0].innerHTML});
			chrome.runtime.sendMessage({d: true}); //data updated
			console.log("Sending Message")
		}
	}
}



function getText(){
    return document.body.innerText
}
function getHTML(){
    return document.body.outerHTML
}
//console.log(getText());             //Gives you all the text on the page
//console.log(getHTML());  
console.log("Hello google meets");  

//chrome.storage.sync.set({ 'dataValue1': 'Some data 1.' });
//chrome.storage.sync.set({ 'dataValue2': 'Some data 2.' });