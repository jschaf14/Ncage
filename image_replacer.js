imgReplaceProb = 0;

// get the probability that was set in the options page
async function init() {
    var p = new Promise(function(resolve, reject){
        chrome.storage.sync.get("imgReplaceProb", function(data){
            if(data.imgReplaceProb != undefined){
                imgReplaceProb = data.imgReplaceProb;
            }else{
                console.log("Could not retrieve image replacement probability.");
                reject();
            }
        })
    });

    await p;
    // now that we have the data we need from storage, run the replacement rules.
    main();
    
}
init();

// wait till loaded
function main() {
    console.log(`Image replace prob: ${imgReplaceProb}`);
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
    newSrc = getRandomImage();
    // this line uses CSS to keep the old size of the image (this is important if the original image doesn't have existing height and width attributes)
    // it scales and crops the replacement image to fit, and also sets the image content to be the replacement image
    image.setAttribute("style", `height:${image.height}px; width:${image.width}px; object-fit:cover; content:url(${newSrc});`);
    // also set the image src attribute for good measure (though it doesn't appear to be strictly necessary)
    image.src = newSrc;
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

