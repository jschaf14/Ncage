// Saves options to chrome.storage
function save_options() {
    var imgReplaceProbability = document.getElementById('imgReplaceProb').value;

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
    }

    chrome.storage.sync.set({
        settings: {
            imageReplacement: {
                "imgReplaceProb": imgReplaceProbability,
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
  
//TODO: sync the settings page to reflect what is in the system storage:
//   // Restores settings state using the preferences
//   // stored in chrome.storage.
//   function restore_options() {
//     // Use default value color = 'red' and likesColor = true.
//     chrome.storage.sync.get({
//       favoriteColor: 'red',
//       likesColor: true
//     }, function(items) {
//       document.getElementById('color').value = items.favoriteColor;
//       document.getElementById('like').checked = items.likesColor;
//     });
//   }

// document.addEventListener('DOMContentLoaded', restore_options);
// listen for when the save button in settings is clicked.
document.getElementById('save').addEventListener('click', save_options);
