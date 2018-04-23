document.getElementById("saveBtn").addEventListener("click", function(){
	var urlError = document.getElementById('urlError');
	var urlSuccess = document.getElementById('urlSuccess');
	var url = document.getElementById("url").value;
	urlError.style.display = 'none';
	urlSuccess.style.display = 'none';
    var re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
	if (!re.test(url)) { 
    	urlError.style.display = 'block';
    	return false;
	}else{
		urlError.style.display = 'none';
		chrome.storage.local.set({'url': url}, function() {
          console.log('Value is set to ' + url);
        });
		urlSuccess.style.display = 'block';
	}
});
chrome.storage.local.get(['url'], function(result) {
          console.log('Value currently is ' + result.url);
          if(result.url!=undefined)
          document.getElementById("url").value=result.url;
});
var urlSuccess = document.getElementById('urlSuccess');
urlSuccess.style.display = 'none';