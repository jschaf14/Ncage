imgReplaceProb = 0;

// get the probability that was set in the options page
chrome.storage.sync.get('imgReplaceProb', function(data) {
    imgReplaceProb = data.imgReplaceProb;
});


// wait till loaded
window.onload = function () {
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
    return rand < imgReplaceProb;
}

