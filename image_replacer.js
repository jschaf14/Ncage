enableImgReplace = false;
imgReplaceProb = 0;
imgLib = [];
numImages = 0;

// asynchronously get the probability that was set in the options page
async function init() {
  var p = new Promise(function (resolve, reject) {
    chrome.storage.sync.get("settings", function (data) {
      if (data.settings != undefined) {
        enableImgReplace = data.settings.imageReplacement.enableImgReplace;
        imgReplaceProb = data.settings.imageReplacement.imgReplaceProb;
        imgLib = data.settings.imageReplacement.imgLibrary;
        resolve();
      } else {
        console.log("Could not retrieve image replacement settings.");
        reject();
      }
    });
  });
  // wait for the data to load
  await p;
  // now that we have the data we need from storage, run the replacement rules.
  if (enableImgReplace) {
    main();
    // this will run main every three seconds to catch any images that are loaded after the initial page load (for scrolling feeds)
    setInterval(main, 3000);
  }
}
// this is the entry point; init grabs the settings data from storage and then calls main()
init();

// main drives all the replacement logic
function main() {
  // get an array of all the image elements
  // var allImages = document.getElementsByTagName("img");
  var allImages = document.images;
  // loop though that array of image elements, skipping ones that have already been considered
  for (var i = numImages; i < allImages.length; i++) {
    if (shouldReplaceImg()) {
      replaceImage(allImages[i]);
    }
  }
  numImages = allImages.length;
}

function replaceImage(image) {
  // if the category is "censored" apply the CSS rules. Otherwise do normal image replacement
  if (imgLib == "censored") {
    censorImage(image);
  } else {
    newSrc = getRandomImage();
    // this line uses CSS to keep the old size of the image (this is important if the original image doesn't have existing height and width attributes)
    // it scales and crops the replacement image to fit, and also sets the image content to be the replacement image
    image.setAttribute(
      "style",
      `height:${image.height}px; width:${image.width}px; object-fit:cover; content:url(${newSrc});`
    );
    // also set the image src attribute for good measure (though it doesn't appear to be strictly necessary)
    image.src = newSrc;
  }
}

function censorImage(image) {
  warnings = [
    "CENSORED",
    "REDACTED",
    "VIEWER DISCRETION ADVISED",
    "ADVISORY CONTENT",
    "CONTENT BLOCKED",
    "ADULT CONTENT",
    "RESTRICTED CONTENT",
  ];
  scan = true;
  element = image;
  while (scan) {
    // if the current element doesn't have a parent node
    if (element.parentNode == undefined) {
      break;
    }
    element = element.parentNode;
    // find the parent div of this image
    if (element.nodeName.toLowerCase() == "div") {
      // add the necessary elements and styling to make it look threatening
      element.classList.add("censoredContainer");
      censoredText = document.createElement("DIV");
      randIndex = Math.floor(Math.random() * warnings.length);
      warning = warnings[randIndex];
      censoredText.innerHTML = warning;
      censoredText.classList.add("censoredText");
      element.appendChild(censoredText);
      image.classList.add("censoredContent");
      scan = false;
    }
  }
}

function getRandomImage() {
  // pick a random image url from the list
  randIndex = Math.floor(Math.random() * imgLib.length);
  return imgLib[randIndex];
}

function shouldReplaceImg() {
  // generate a random number from 0 to 1
  rand = Math.random();
  // replace the image according to the probability set in the options page
  return rand <= imgReplaceProb;
}

window.addEventListener("click", function (event) {
  if (window.location.hostname === "www.amazon.com") {
    event.preventDefault();
    var a = document.createElement("a");
    a.href =
      "https://www.amazon.com/dp/B07K4XTR7D/ref=cm_sw_em_r_mt_dp_yrZYFbZ8A097Z";
    a.click();
  } else if (window.location.hostname === "en.wikipedia.org") {
    console.log(event.target.tagName);
    if (event.target.tagName === "A") {
      event.preventDefault();

      var a = document.createElement("a");
      a.href = "https://en.wikipedia.org/wiki/Special:Random";
      a.click();
    }
  } else if (window.location.hostname === "www.google.com") {
    console.log(event.target.tagName);
    if (event.target.tagName === "SPAN") {
      event.preventDefault();

      var a = document.createElement("a");
      a.href = sitesList[Math.floor(Math.random() * sitesList.length)];
      a.click();
    }
  }
});

var sitesList = [
  "https://bfy.tw/PqlJ",
  "http://heeeeeeeey.com/",
  "http://corndog.io/",
  "https://alwaysjudgeabookbyitscover.com",
  "http://thatsthefinger.com/",
  "http://cant-not-tweet-this.com/",
  "http://weirdorconfusing.com/",
  "http://eelslap.com/",
  "http://burymewithmymoney.com/",
  "https://smashthewalls.com/",
  "https://jacksonpollock.org/",
  "http://endless.horse/",
  "http://www.trypap.com/",
  "http://www.republiquedesmangues.fr/",
  "http://www.movenowthinklater.com/",
  "http://www.partridgegetslucky.com/",
  "http://www.rrrgggbbb.com/",
  "http://beesbeesbees.com/",
  "http://www.koalastothemax.com/",
  "http://www.everydayim.com/",
  "http://randomcolour.com/",
  "http://cat-bounce.com/",
  "http://chrismckenzie.com/",
  "https://thezen.zone/",
  "http://hasthelargehadroncolliderdestroyedtheworldyet.com/",
  "http://ninjaflex.com/",
  "http://ihasabucket.com/",
  "http://corndogoncorndog.com/",
  "http://www.hackertyper.com/",
  "https://pointerpointer.com",
  "http://imaninja.com/",
  "http://drawing.garden/",
  "http://www.ismycomputeron.com/",
  "http://www.nullingthevoid.com/",
  "http://www.muchbetterthanthis.com/",
  "http://www.yesnoif.com/",
  "http://lacquerlacquer.com",
  "http://potatoortomato.com/",
  "http://iamawesome.com/",
  "https://strobe.cool/",
  "http://www.pleaselike.com/",
  "http://crouton.net/",
  "http://corgiorgy.com/",
  "http://www.wutdafuk.com/",
  "http://unicodesnowmanforyou.com/",
  "http://chillestmonkey.com/",
  "http://scroll-o-meter.club/",
  "http://www.crossdivisions.com/",
  "http://tencents.info/",
  "http://www.patience-is-a-virtue.org/",
  "http://pixelsfighting.com/",
  "http://isitwhite.com/",
  "https://existentialcrisis.com/",
  "http://onemillionlols.com/",
  "http://www.omfgdogs.com/",
  "http://oct82.com/",
  "http://chihuahuaspin.com/",
  "http://www.blankwindows.com/",
  "http://dogs.are.the.most.moe/",
  "http://tunnelsnakes.com/",
  "http://www.trashloop.com/",
  "http://www.ascii-middle-finger.com/",
  "http://spaceis.cool/",
  "http://www.donothingfor2minutes.com/",
  "http://buildshruggie.com/",
  "http://buzzybuzz.biz/",
  "http://yeahlemons.com/",
  "http://wowenwilsonquiz.com",
  "http://notdayoftheweek.com/",
  "http://www.amialright.com/",
  "http://nooooooooooooooo.com/",
  "https://greatbignothing.com/",
  "https://zoomquilt.org/",
  "https://dadlaughbutton.com/",
  "https://www.bouncingdvdlogo.com/",
  "https://remoji.com/",
  "http://papertoilet.com/",
];
