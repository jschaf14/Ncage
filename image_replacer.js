imgReplaceProb = 0;

// get the probability that was set in the options page
chrome.storage.sync.get('imgReplaceProb', function(data) {
    imgReplaceProb = data.imgReplaceProb;
});

function nativeSelector() {
    var elements = document.querySelectorAll("body, body *");
    var results = [];
    var child;
    for(var i = 0; i < elements.length; i++) {
        child = elements[i].childNodes[0];
        if(elements[i].hasChildNodes() && child.nodeType == 3) {
            results.push(child);
        }
    }
    return results;
}

// wait till loaded
window.onload = function () {

    // Return all text elements as text nodes
    var textnodes = nativeSelector(), _nodeValue;

    // Number of words that have been replaced
    var count = 0;

    // Find and replace all occurances of Your, You're, Their, They're, and There
    for (var i = 0, len = textnodes.length; i<len; i++){
        _nodeValue = textnodes[i].nodeValue;

        // Switch to replace cases of Your and You're
        switch(true) {
            // Replace You're with Your (case sensitivity)
            case _nodeValue.includes("you're"):
                textnodes[i].nodeValue = _nodeValue.replace(/you're/g, "your");
                count++;
                break;
            
            case _nodeValue.includes("You're"):
                textnodes[i].nodeValue = _nodeValue.replace(/You're/g, "Your");
                count++;
                break;

            // Replace Your with Your with You're
            case _nodeValue.includes("your"):
                textnodes[i].nodeValue = _nodeValue.replace(/your/g, "you're");
                count++;
                break;
            
            case _nodeValue.includes("Your"):
                textnodes[i].nodeValue = _nodeValue.replace(/Your/g,"You're");
                count++;
                break;
        }

        // New replacement word
        var replacement = "";

        // Switch to replace cases of Their, They're, and There
        switch(true){
            // Replace Their with They're or There (Lower)
            case _nodeValue.includes("their"):
                replacement = (count%2) ? "they're" : "there";
                textnodes[i].nodeValue = _nodeValue.replace(/their/g, replacement);
                count++;
                break;
            // (Upper)
            case _nodeValue.includes("Their"):
                replacement = (count%2) ? "They're" : "There";
                textnodes[i].nodeValue = _nodeValue.replace(/Their/g, replacement);
                count++;
                break;

            // Replace They're with Their or There (Lower)
            case _nodeValue.includes("they're"):
                replacement = (count%2) ? "their" : "there";
                textnodes[i].nodeValue = _nodeValue.replace(/they're/g, replacement);
                count++;
                break;
            // (Upper)
            case _nodeValue.includes("They're"):
                replacement = (count%2) ? "Their" : "There";
                textnodes[i].nodeValue = _nodeValue.replace(/They're/g, replacement);
                count++;
                break;

            // Replace There with Their or They're (Lower)
            case _nodeValue.includes("there"):
                replacement = (count%2) ? "their" : "they're";
                textnodes[i].nodeValue = _nodeValue.replace(/there/g, replacement);
                count++;
                break;
            // (Upper)
            case _nodeValue.includes("There"):
                replacement = (count%2) ? "Their" : "They're";
                textnodes[i].nodeValue = _nodeValue.replace(/There/g, replacement);
                count++;
                break;
        }
    }

    // get an array of all the image elements
    var allImages = document.getElementsByTagName("img");

    // loop though that array of image elements
    for (var image of allImages) {
        if(shouldReplaceImg()) {
            // reset the image source
            image.src = "https://www.gstatic.com/tv/thumb/persons/258/258_v9_bb.jpg"
        }
    }
}


function shouldReplaceImg(){
    // generate a random number from 1 to 100
    rand = Math.floor(Math.random() * 100) + 1;
    // replace the image according to the probability set in the options page
    return rand <= imgReplaceProb;
}

