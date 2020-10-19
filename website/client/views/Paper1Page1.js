Template.Paper1Page1.onCreated(function() {
    console.log("Paper1Page1.js")

    glob.taskId += 1;
});

Template.Paper1Page1.onRendered(function() {
    document.getElementById('Paper1Page1-title').innerHTML = getPaperIdDisplay() +
        " (" + glob.taskId + "/" + glob.const.maxTaskNum + ")";
});