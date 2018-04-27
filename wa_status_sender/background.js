/* Regex-pattern to check URLs against. 
   It matches URLs like: http[s]://[...]stackoverflow.com[...] */
var tabToUrl = {};
var sourceUrl = 'https://web.whatsapp.com/';

/* When the browser-action button is clicked... */
chrome.browserAction.onClicked.addListener(function(tab) {
  /*chrome.browserAction.setPopuo({
    popup : "popup.html"
  });*/
  
  /*var someVar = {text: 'test', foo: 1, bar: false};
chrome.tabs.executeScript({
    code: '(' + function(params) {
        
        document.body.insertAdjacentHTML('beforeend',
            '<div style="all:unset; position:fixed; left:0; top:0; right:0; bottom:0;' +
                'background-color:rgba(0,255,0,0.3)">' + params.text + '</div>' +
                '<script>function test(){alert("hello")} test();</script>'
        );
        return {success: true, html: document.body.innerHTML};
    } + ')(' + JSON.stringify(someVar) + ');'
}, function(results) {
    console.log(results[0]);
});*/
});
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  tabToUrl[tabId] = tab.url;
  if(changeInfo.status=='complete'){
     console.log("loaded");
     chrome.tabs.executeScript(null, {
      file:"status.js"
    }, _=>{
      let e = chrome.runtime.lastError;
      if(e !== undefined){
      }
    });
  }
});
chrome.tabs.onRemoved.addListener(function(tabid, removed) {
   var targetUrl = tabToUrl[tabid];
   console.log(targetUrl," targetUrl");
   console.log(sourceUrl," sourceUrl");
   delete tabToUrl[tabid];
   //if(sourceUrl == targetUrl){
     chrome.storage.local.get(['url'], function(result) {
        console.log('Value currently is ' + result.url);
        var status = 'closed'
        var url = result.url;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
              console.log(this.responseText);
          }
        };
        xhttp.open("GET", url+"?status="+status, true);
        xhttp.send();
      });
  //  }
});