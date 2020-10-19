import './global_helpers.js';
console.log('client_startup.js');


/*
A url example:
https://raven.eecs.harvard.edu/?assignmentId=35K3O9HUACQ7YKYSY9HY632UBKTFE8&hitId=3W9XHF7WGK8IH5A9ZDSPXIZKBDYTKG&workerId=AX8LP3MI6LWSJ&turkSubmitTo=https%3A%2F%2Fworkersandbox.mturk.com

http://localhost:3000/?assignmentId=35K3O9HUACQ7YKYSY9HY632UBKTFE8&hitId=3W9XHF7WGK8IH5A9ZDSPXIZKBDYTKG&workerId=AX8LP3MI6LWSJ&turkSubmitTo=https%3A%2F%2Fworkersandbox.mturk.com
*/

// Get Assignment attributes from Amazon Turk url
ParseUrl = function(path, name) {
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(path);
    if (results == null)
        return "";
    else
        return results[1];
};



websiteLevelVariablesSetup = function() {
    // Assignment attributes
    workerId = '';
    assignmentId = '';
    hitId = '';
    urls = '';
    url_tail = '';

    path = window.location.href;
    url_tail = path.substr(path.lastIndexOf("/"));
    if (!url_tail.includes("=")) {url_tail = ""};

    workerId = ParseUrl(path, 'workerId');
    assignmentId = ParseUrl(path, 'assignmentId');
    hitId = ParseUrl(path, 'hitId');
    if (workerId == "") workerId = "test_worker_" + Math.random().toString(10).substr(2, 1);
    if (assignmentId == "") assignmentId = "test_assignment_" + Math.random().toString(10).substr(2, 1);
    if (hitId == "") hitId = "test_hit_" + Math.random().toString(10).substr(2, 1);

    // mySessionStorage.set('workerId', workerId);
    // mySessionStorage.set('assignmentId', assignmentId);
    // mySessionStorage.set('hitId', hitId);


    // Database subscription
    if (Meteor.isClient) {
        clcPaperSubsHandle = Meteor.subscribe('paper');
        clcUserHistorySubsHandle = Meteor.subscribe('userHistory', workerId);
        clcHyperparameterSubsHandle = Meteor.subscribe('hyperparameter');
    }



    //****************************************
    // Global variables for task assignment
    //****************************************
    glob = {}
    glob.const = {}
    glob.const.maxTaskNum = 2;
    glob.currPaperExpIdList = [0, 1];
    glob.currPaperMd5IdList = ["initial_paper_md5_1", "initial_paper_md5_2"];;
    glob.currPaperTitleList = ["initial_paper_title_1", "initial_paper_title_2"];
    glob.taskId = 0;
    // glob.paperExpId = glob.currPaperExpIdList[0];
    // glob.paperMd5Id = glob.currPaperMd5IdList[0];
    // glob.paperTitle = glob.currPaperTitleList[0];
}


websiteLevelVariablesSetup();