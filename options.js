// Saves options to chrome.storage
function save_options() {
    var enableImageReplacement = document.getElementById('enableImageReplacement').checked;
    // retrieve the replacement percentage and convert it into a probability
    var imgReplaceProbability = document.getElementById('imgReplaceProb').value / 100;

    var imgLibOption = document.getElementById('imageLibrary').value;
    imgLib = [];
    // if you're adding a new image library, make sure to add it to options.html as well so options.js can see it
    switch(imgLibOption){
        case "nCage":
            imgLib = ncageImages;
            break;
        case "rubberDucks":
            imgLib = rubberDuckImages;
            break;
        case "animeGirls":
            imgLib = animeGirlImages;
            break;
        case "censored":
            imgLib = "censored";
            break;
    }

    // the settings for the extension are stored as a json object
    chrome.storage.sync.set({
        settings: {
            imageReplacement: {
                "enableImgReplace": enableImageReplacement,
                "imgReplaceProb": imgReplaceProbability,
                "imgLibraryName": imgLibOption,
                "imgLibrary": imgLib
            }
        }
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved!';
        setTimeout(function() {
            status.textContent = '';
        }, 3000);
    });
}
  
// TODO: sync the settings page to reflect what is in the system storage:
// Restores settings state using the preferences stored in chrome.storage.
function restore_options() {
    // these settings will populate the options page the first time it's loaded.
    // later accesses will use existing values in chrome storage
    defaultSettings = { 
        imageReplacement: {
            "enableImgReplace": true,
            "imgReplaceProb": .03,
            "imgLibraryName": "nCage",
            "imgLibrary": ncageImages
        }
    };
    console.log(defaultSettings);
    // todo: I might be able to set default options here as well
    chrome.storage.sync.get({"settings": defaultSettings}, function(data) {
        // console.log(data);
        document.getElementById("enableImageReplacement").checked = data.settings.imageReplacement.enableImgReplace;
        document.getElementById("imageLibrary").value = data.settings.imageReplacement.imgLibraryName;
        document.getElementById("imgReplaceProb").value = data.settings.imageReplacement.imgReplaceProb * 100;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
// listen for when the save button in settings is clicked.
document.getElementById('save').addEventListener('click', save_options);
