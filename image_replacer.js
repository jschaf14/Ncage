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

            // Determine aspect ratio
            let srcRatio = image.height/image.width;

            // Select random image from aspect ratio group
            // TODO: Change constant images to random images 
            switch (true) {
                // Ratio is less than 1:2
                case (srcRatio < 0.5):
                    image.src = "https://theplaylist.net/wp-content/uploads/2018/04/Nicolas-Cage.jpg";
                    setLandscape(image);
                    break;
                
                // Ratio is less than 1:1
                case (srcRatio < 1):
                    image.src =  "https://img.cinemablend.com/filter:scale/quill/6/c/d/9/7/0/6cd970a829bbffc50f904f956d82282a4161dd2d.jpg?mw=600";;    
                    setLandscape(image);
                    break;

                // Ratio is less than 2:1
                case (srcRatio < 1.5):
                    image.src = "https://www.gstatic.com/tv/thumb/persons/258/258_v9_bb.jpg";
                    setPortrait(image);
                    break;

                // Ratio is greater than 2:1
                default:
                    image.src = "https://www.interviewmagazine.com/wp-content/uploads/2020/10/Interview_digital_web_2020_sep_Nicolas_Cage_4.jpg";
                    setPortrait(image);
                    break;
            }
        }
    }
}


function shouldReplaceImg(){
    // generate a random number from 1 to 100
    rand = Math.floor(Math.random() * 100) + 1;
    // replace the image according to the probability set in the options page
    return rand < imgReplaceProb;
}

function setPortrait(image){
    // Set the width of the replacement image to the width of 
    // the original image and scale the height to maintain aspect
    image.style.height = 'auto';

    // Center vertically
    // let margin = (((image.height/image.width) * 100)-100)/2;
    // image.style.margin = '-' + margin + "% auto auto auto";
}

function setLandscape(image){
    // Set the height of the replacement image to the height of 
    // the original image and scale the width to maintain aspect
    image.style.width = 'auto';

    // Center horizontally
    // let margin = (((image.width/image.height) * 100)-100)/2;
    // image.style.margin = 'auto auto auto -' + margin + '%';
}