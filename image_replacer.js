imgReplaceProb = 0;

// get the probability that was set in the options page
chrome.storage.sync.get('imgReplaceProb', function(data) {
    imgReplaceProb = data.imgReplaceProb;
});

// wait till loaded
window.onload = function () {
    // get an array of all the image elements
    // var allImages = document.getElementsByTagName("img");
    var allImages = document.images;
    // loop though that array of image elements
    for (var image of allImages) {
        if(shouldReplaceImg()) {
            replaceImage(image);
        }
    }
}

function replaceImage(image){
    // set the height and width of the new image to be the same as the old 
    // (this is important if the original image doesn't have existing height and width attributes)
    // the "object-fit:cover" line takes care of image resizing
    image.setAttribute("style", `height:${image.height}px; width:${image.width}px; object-fit:cover;`);
    // reset the image source
    newSrc = getRandomImage();
    image.src = newSrc;
    // some images have a "srcset" attribute instead of "src". Set both so it always works.
    image.srcset = newSrc;
}

function getRandomImage(){
    // pick a random image url from the list
    randIndex = Math.floor(Math.random() * ncageImages.length);
    return ncageImages[randIndex];
}

function shouldReplaceImg(){
    // generate a random number from 1 to 100
    rand = Math.floor(Math.random() * 100) + 1;
    // replace the image according to the probability set in the options page
    return rand <= imgReplaceProb;
}

