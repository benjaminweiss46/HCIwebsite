var con = document.documentElement.innerHTML

getText();
getHTML();

document.body.addEventListener('click', updateChat, true);

function updateChat() {
	console.log("update chat")
	var x = document.getElementsByClassName("z38b6 CnDs7d hPqowe");
	if (x.length !== 0) {
		console.log("got chat element");
		chrome.storage.sync.set({ 'chat': x[0].innerHTML});
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