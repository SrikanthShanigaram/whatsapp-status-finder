window.onload = function() {
  document.querySelector('#greeting').innerText =
    'Hello, World! It is ' + new Date();
    document.getElementById("myBtn").addEventListener("click", function(){
      document.getElementById("demo").innerHTML = "Hello World";
        /*var a = document.createElement('a');
        a.href = "https://example.com";
        a.target = "_blank";
        a.click();*/
      
        // ... or this will both work.
        console.log(window.open("https://example.com"),"sdfskdfj");
    });
    document.getElementById("test").addEventListener('click', () => {
    console.log("Popup DOM fully loaded and parsed");

    function modifyDOM() {
        //You can play with your DOM here or check URL against your regex
        console.log('Tab script:');
        console.log(document.body);
        return document.body.innerHTML;
    }

    //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
    chrome.tabs.executeScript({
        code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
    }, (results) => {
        //Here we have just the innerHTML and not DOM structure
        console.log('Popup script:');
        console.log(results[0]);
    });
});
};