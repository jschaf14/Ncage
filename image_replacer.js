enableImgReplace = false;
imgReplaceProb = 0;
imgLib = [];

// asynchronously get the probability that was set in the options page
async function init() {
    var p = new Promise(function(resolve, reject){
        chrome.storage.sync.get("settings", function(data){
            if(data.settings != undefined){
                enableImgReplace = data.settings.imageReplacement.enableImgReplace;
                imgReplaceProb = data.settings.imageReplacement.imgReplaceProb;
                imgLib = data.settings.imageReplacement.imgLibrary;
                resolve();
            }else{
                console.log("Could not retrieve image replacement settings.");
                reject();
            }
        })
    });
    // wait for the data to load
    await p;
    // now that we have the data we need from storage, run the replacement rules.
    if(enableImgReplace){
        main();
    }    
}
// this is the entry point; init grabs the settings data from storage
init();

// wait till loaded
function main() {
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
    // if the category is "censored" apply the CSS rules. Otherwise do normal image replacement
    if(imgLib == "censored"){
        censorImage(image);
    }else{
        newSrc = getRandomImage();
        // this line uses CSS to keep the old size of the image (this is important if the original image doesn't have existing height and width attributes)
        // it scales and crops the replacement image to fit, and also sets the image content to be the replacement image
        image.setAttribute("style", `height:${image.height}px; width:${image.width}px; object-fit:cover; content:url(${newSrc});`);
        // also set the image src attribute for good measure (though it doesn't appear to be strictly necessary)
        image.src = newSrc;
    }
}

function censorImage(image){
    scan = true;
    element = image;
    while(scan){
        // if the current element doesn't have a parent node
        if(element.parentNode == undefined) {
            break;
        }
        element = element.parentNode;
        // find the parent div of this image
        if(element.nodeName.toLowerCase() == "div"){
            element.classList.add("censoredContainer");
            censoredText = document.createElement("DIV");
            censoredText.innerHTML = "CENSORED";
            censoredText.classList.add("censoredText");
            element.appendChild(censoredText);
            image.classList.add("censoredContent");
            scan = false;
        }
    }
}

function getRandomImage(){
    // pick a random image url from the list
    randIndex = Math.floor(Math.random() * imgLib.length);
    return imgLib[randIndex];
}

function shouldReplaceImg(){
    // generate a random number from 0 to 1
    rand = Math.random();
    // replace the image according to the probability set in the options page
    return rand <= imgReplaceProb;
}

