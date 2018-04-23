document.getElementById("saveBtn").addEventListener("click", function(){
	var urlError = document.getElementById('urlError');
	var url = document.getElementById("url").value;
    var re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
	/*if (!re.test(url)) { 
    	urlError.style.display = 'block';
    	return false;
	}else{*/
		urlError.style.display = 'none';
		chrome.storage.local.set({'url': url}, function() {
          console.log('Value is set to ' + url);
        });
	//}
});
chrome.storage.local.get(['url'], function(result) {
          console.log('Value currently is ' + result.url);
          document.getElementById("url").value=result.url;
});