websiteLevelVariablesRefresh = function() {

    //****************************************
    // Global variables for task assignment
    //****************************************
    mySessionStorage.set('task_id', 0);
    mySessionStorage.set('paper_list', []);
    mySessionStorage.set('curr_paper_id', 3);
    MAX_TASK_NUM = 2;
}


pageLevelVariablesRefresh = function() {
    //****************************************
    // Global variables for nevigation
    //****************************************
    currPage = "main";


    //****************************************
    // Global variables for sentence selection
    //****************************************
    highlight_color = 1;
    selection_type = null;
    ABSTRACT_SELECTION_TYPE1 = "abstractSelection1";
    METHOD_SELECTION_TYPE1 = "methodSelectionType1";
    METHOD_SELECTION_TYPE2 = "methodSelectionType2";
    ABSTRACT_HIGHLIGHT_COLOR1 = 1;
    METHOD_HIGHLIGHT_COLOR1 = 1;
    METHOD_HIGHLIGHT_COLOR2 = 2;
    METHOD_SELECTION_NUM_TYPE2 = 3;
    //ABSTRACT_INSTRUCTION_TYPE1 = "Please go to the abstact and click a sentence. It will be displayed here.<br /><br />";
    ABSTRACT_INSTRUCTION_TYPE1 = 'Please click "Start selection" to start. After selection, click "Confirm selection" to finish.'
    METHOD_INSTRUCTION_TYPE1 = 'Please click "Start selection" to start. After selection, click "Confirm selection" to finish.'
    customized_question_complete_status = [0]; //0 means "completed or allowed to go next"
                                               //1 means "have not started but required to start and complete"
                                               //2 means "started but not completed"


    //****************************************
    // Global variables for bar moving
    //****************************************    
    bar_status = "no_bar";
}


mySessionStorage = {
    set: function(item, value) {
        sessionStorage.setItem(item, JSON.stringify(value));
    },
    get: function(item) {
        return JSON.parse(sessionStorage.getItem(item));
    }
};

getPaperIdDisplay = function() {
    var id = mySessionStorage.get('task_id');
    return "Paper " + id;
}


reactivatePage = function() {
    var xOffset = window.pageXOffset;
    var yOffset = window.pageYOffset;
    location.href = "#";
    window.scrollTo(xOffset, yOffset);
}

httpGet = function(theUrl) {
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            return xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET", theUrl, false);
    xmlhttp.send();
    return xmlhttp.responseText;
}


// highlight = function() {
//     if (document.getElementById("selectedSentence").className.includes("highlightedSentence")) {
//         document.getElementById("selectedSentence").className = "sentence";
//         document.getElementById("highlightBox").style.display = "none";
//         document.getElementById("selectedSentence").id = "";
//     } else {
//         document.getElementById("selectedSentence").className = "highlightedSentence sentence";
//         document.getElementById("highlightBox").style.display = "none";
//         document.getElementById("selectedSentence").id = "";
//     }
// }

// highlightClosePopup = function() {
//     document.getElementById("highlightBox").style.display = "none";
//     document.getElementById("selectedSentence").id = "";
// }