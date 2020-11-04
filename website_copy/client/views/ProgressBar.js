Template.ProgressBar.onRendered(function() {
    var element = document.getElementById('progress-bar');
    var length = 0;
    
    var currPage = getCurrPage();

    if (currPage.includes('Paper1Page1')) {
        length = Math.ceil((glob.taskId - 1) * 40 + 13);
    } else if (currPage.includes('Paper1Page2')) {
        length = Math.ceil((glob.taskId - 1) * 40 + 26);
    } else if (currPage.includes('Paper1Page3')) {
        length = Math.ceil((glob.taskId - 1) * 40 + 40);
    } else if (currPage.includes('Pair1Page1')) {
        length = 90;
    } else if (currPage.includes('Pair1Page2')) {
        length = 100;
    } else {
        length = 100;
    }
    element.setAttribute('aria-valuenow', length.toString());
    element.style.width = length.toString() + "%";
})