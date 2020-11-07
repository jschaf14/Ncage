// Saves options to chrome.storage
function save_options() {
    var imgReplaceProbability = document.getElementById('probability').value;
    chrome.storage.sync.set({
        imgReplaceProb: imgReplaceProbability    
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved!';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
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

document.addEventListener('DOMContentLoaded', restore_options);
// listen for when the save button in settings is clicked.
document.getElementById('save').addEventListener('click', save_options);