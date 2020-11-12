imgReplaceProb = 0;

// get the probability that was set in the options page
chrome.storage.sync.get('imgReplaceProb', function(data) {
    imgReplaceProb = data.imgReplaceProb;
});


// wait till loaded
window.onload = function () {
    // get an array of all the image elements
    // var allImages = document.getElementsByTagName("img");
    var allImages = document.images
    // loop though that array of image elements
    for (var image of allImages) {
        if(shouldReplaceImg()) {
            replaceImage(image)
        }
    }
}

function replaceImage(image){
    // reset the image source
    image.src = "https://www.gstatic.com/tv/thumb/persons/258/258_v9_bb.jpg";
    // some images have a "srcset" attribute instead of "src". Set both so it always works.
    image.srcset = "https://www.gstatic.com/tv/thumb/persons/258/258_v9_bb.jpg";
    // set the height and width of the new image to be the same as the old 
    // (this is important if the original image doesn't have existing height and width attributes)
    image.setAttribute("height", image.height);
    image.setAttribute("width", image.width);
    // this line takes care of image resizing
    image.setAttribute("style", "object-fit:cover;");
}

function shouldReplaceImg(){
    // generate a random number from 1 to 100
    rand = Math.floor(Math.random() * 100) + 1;
    // replace the image according to the probability set in the options page
    return rand < imgReplaceProb;
}

