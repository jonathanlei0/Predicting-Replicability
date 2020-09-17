Template.Paper1Page1.onCreated(function() {
	currPage = 'Paper1Page1';

	var paperId = Math.floor(Math.random() * 25);
	mySessionStorage.set('curr_paper_id', paperId);

	var task_id = mySessionStorage.get('task_id');
	task_id += 1;
	mySessionStorage.set('task_id', task_id);

	var paper_list = mySessionStorage.get('paper_list');
	paper_list.push(paperId);
	mySessionStorage.set('paper_list', paper_list);
});

Template.Paper1Page1.onRendered(function() {
	var task_id = mySessionStorage.get('task_id');
	document.getElementById('Paper1Page1-title').innerHTML = getPaperIdDisplay()
	+" ("+task_id+"/"+MAX_TASK_NUM+")";

});
