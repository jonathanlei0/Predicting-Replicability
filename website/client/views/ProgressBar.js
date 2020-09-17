Template.ProgressBar.onRendered(function() {
    var task_id = mySessionStorage.get('task_id');
    var element = document.getElementById('progress-bar');
    var length = 0;
    if (currPage == 'Paper1Page1') {
    	length = Math.ceil((task_id-1)*40+13);
    } else if (currPage == 'Paper1Page2') {
    	length = Math.ceil((task_id-1)*40+26);
    } else if (currPage == 'Paper1Page3') {
    	length = Math.ceil((task_id-1)*40+40);
    } else if (currPage == 'Pair1Page1') {
    	length = 90;
    } else if (currPage == 'Pair1Page2') {
    	length = 100;
    } else {
        length = 100;
    }
    element.setAttribute('aria-valuenow', length.toString());
    element.style.width = length.toString()+"%";
})