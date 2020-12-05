strReplacement = true;
strReplaceProb = 0;

// Get the string replacement toggle from the options page
chrome.storage.sync.get('strReplacement', function(data) {
    strReplacement = data.strReplacement;
});

// get the probability that was set in the options page
chrome.storage.sync.get('strReplaceProb', function(data) {
    strReplaceProb = data.strReplaceProb;
});

// If string replacement is enabled in the options menu
if (strReplacement) {
    // wait till loaded
    window.onload = function () {
        stringReplace();
    }   
}


function stringReplace() {

    let replacements = [
        {
            "You're":   ["Your"],
            "you're":   ["your"],
            "Your":     ["You're"],
            "your":     ["you're"]
        },
        {
            "They're":  ["There", "Their"], 
            "they're":  ["there", "their"], 
            "There":    ["Their", "They're"],
            "there":    ["their", "they're"],
            "Their":    ["There", "They're"],
            "their":    ["there", "they're"],
        },
        {
            "and":      ["for", "or", "not"],
            "not":      ["and", "or", "for"]
        }
    ];

    // Return all text elements as text nodes
    var textnodes = nativeSelector(), _nodeValue;

    // Number of strings that have been replaced
    var count = 0;

    // Loop through each of the text nodes in the DOM
    for (var i = 0, len_i = textnodes.length; i < len_i; i++) {
        // Get the value at the current text node
        _nodeValue = textnodes[i].nodeValue;

        // Loop through each of the replacement groups
        for (var j = 0, len_j = replacements.length; j < len_j; j++) {
            
            // Loop through each item in the replacement group
            for (const [key, value] of Object.entries(replacements[j])) {

                // If the current text node has the key text in it somewhere...
                if (_nodeValue.includes(key)) {

                    // Determine which of the alternative replacement values to use (randomized by count value)
                    var val = value[(count % (value.length))];

                    // Use regex to replace text value and insert new text into the original node
                    textnodes[i].nodeValue = _nodeValue.replace(new RegExp(key, "g"), val);

                    // Increment the replacement counter
                    count++;
                    break;
                }
            }
        }
    }
}

function nativeSelector() {
    var elements = document.querySelectorAll("body, body *");
    var results = [];
    var child;
    for(var i = 0; i < elements.length; i++) {
        child = elements[i].childNodes[0];
        if(elements[i].hasChildNodes() && child.nodeType == 3) {
            results.push(child);
        }
    }
    return results;
}

