/* Regex-pattern to check URLs against. 
   It matches URLs like: http[s]://[...]stackoverflow.com[...] */
var urlRegex = /^file:\/\/\/:?/;



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
  if(changeInfo.status=='complete'){
    chrome.tabs.executeScript(null,
                       {file:"status.js"});
     console.log("loaded");
  }
});