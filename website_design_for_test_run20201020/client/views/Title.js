Template.Title.onRendered(function() {
    var element = document.getElementById('title-banner');
    if (element.innerHTML == "") {
        element.innerHTML = getPaperIdDisplay();
    }
})