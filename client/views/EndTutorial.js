Template.EndTutorial.helpers({
    totalPoints: function() {
        return totalPoints;
    },
    eventsPerRound: function () {
        return eventsPerRound;
    }
});

Template.EndTutorial.rendered=function(){
	$('html,body').scrollTop(0);
	log(workerId, 'EndTutorial');
};
