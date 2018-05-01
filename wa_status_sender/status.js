var lastCall='';
setTimeout(function(){ 
  processStatus();
},5000);

function processStatus(){
  console.log("initial method to process");
  var scanStatus = isInScanStatus();
  console.log(scanStatus," scan status");
  if(scanStatus){
    console.log("It is in scanning");
    return;
  }
  var data = document.getElementById("side");
  if(data&&data.innerText.trim().startsWith("Phone Not Connected")){
      console.log("phone disconnected");
      callHook("disconnected");
      isConnected();
  }else{
      console.log("phone connected");
      callHook("connected");
      isDisConnected();
  }
}
function isDisConnected(){
  var disconnectionTimer = setInterval(function(){
    var data = document.getElementById("side");
    if(data!=null&&(data.innerText.trim().startsWith("Phone Not Connected")||data.innerText.trim().startsWith("Computer Not Connected"))){
      console.log("phone disconnected");
      callHook("disconnected");
      isConnected();
      clearInterval(disconnectionTimer);
    }
},5000);
}
function isConnected(){
  var connectionTimer = setInterval(function(){
    var data = document.getElementById("side");
    if(!(data!=null&&(data.innerText.trim().startsWith("Phone Not Connected")||data.innerText.trim().startsWith("Computer Not Connected")))){
      console.log("phone connected");
      callHook("connected");
      isDisConnected();
      clearInterval(connectionTimer);
    }
  },5000);
}
function isInScanStatus(){
  var allImages = document.getElementsByTagName("img");
    var images = [];
    for (var i = 0, len = allImages.length; i < len; ++i) {
        if (allImages[i].alt == 'Scan me!') {
            return true;
        }
    }
    return false;
}
function callHook(status){
  if(lastCall==status){
    console.log("same call");
    return;
  }
  lastCall = status;
  chrome.storage.local.get(['url'], function(result) {
    console.log('Value currently is ' + result.url);
    var url = result.url;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
      }
    };
    xhttp.open("GET", url+"?status="+status, true);
   // xhttp.setRequestHeader('Authorization','Basic ' + btoa("srikanth:12345678"));
    xhttp.send();
  });
}