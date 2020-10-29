// wait till loaded
window.onload = function () {
    // get an array of all the image elements
    var allImages = document.getElementsByTagName("img");

    // loop though that array of image elements
    for (var image of allImages) {

        // make a random 1 or 0
        var yesOrNo = Math.floor(Math.random() * 2);

        if (yesOrNo == 1) {
            // reset the image source
            image.src = "https://www.gstatic.com/tv/thumb/persons/258/258_v9_bb.jpg"
        }
    }
}
