//alert('berry is active')
chrome.runtime.onMessage.addListener(function (request) {
	alert(request) //button was clicked
})