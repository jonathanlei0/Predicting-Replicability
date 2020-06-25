//Meteor.subscribe('workers');
//Meteor.subscribe('realTasks');
//Meteor.subscribe('answers');

const setSize = 5;

var tasklist = [
    { num: '1', question: "1. Will Donald J. Trump tweet anything about welfare or jobs this week?"},
    { num: '2', question: "2. Will Stephen Curry make more than five 3-pointers in a single basketball game between Jan 3th and Jan 8th, 2018?"},
    { num: '3', question: "3. Will the gold price be higher than 1270 USD/oz all the time between Jan 3th and Jan 5th, 2018?" },
    { num: '4', question: "4. Will ‘Star Wars: The Last Jedi’ have ‘Rotten Tomatoes’ score dropped below 90% by the end of  this week?" },
    { num: '5', question: "5. Will the city of Boston (MA) snow this week?" },
    { num: '6', question: "6. Will the highest stock price of Apple Inc between Jan 3th and Jan 8th, 2018 reach 175 USD?" },
    { num: '7', question: "7. Will any of  N. Korea,  S. Korea, Japan and China be mentioned specifically in the FOREIGN POLICY COLUMN of the White House website (https://www.whitehouse.gov) this week?" },
    { num: '8', question: "8. Will the official music video of Ed Sheeran’s song ‘Perfect’ on Youtube reach 450 million views by the end of this week?" },
    { num: '9', question: "9. Will Georgia win the 2017-18 College Football Playoff National Championship?" },
    { num: '10', question: "10. Will the lowest price of Bitcoin between Jan 3rd and Jan 8th, 2018 drop below 11000 USD?" },
    { num: '11', question: "11. Will G-eazy’s song ‘No limit’ be one of the top 5 songs on the weekly Hot 100 of Billboard at the end of this week?" },
    { num: '12', question: "12. Will Houston Rocket drop to the 3rd in NBA western conference by Jan 8th, 2018?" },
    { num: '13', question: "13. Will GitHub forks of Baidu's Apollo autonomous driving software (https://github.com/ApolloAuto/apollo) reach 2000 by the end of Jan 8th, 2018?" },
    { num: '14', question: "14. Will the US threaten / announce to take any kind of military actions in Iran or N. Korea this week?" },
    { num: '15', question: "15. Will the daily closing spot price of Brent crude oil (USD per barrel) be more than 68 USD on this Friday according to US EIA?" }
];

function pressedSubmit(event, instance, val) {
    var setNum = instance.setNum.get();
    var form = document.getElementById('taskForm');
    var val = form.checkValidity();
    if (!val) {
        return false;
    }

    var taskID = -1;
    var fcast = -1;
    var s = -1;

    var i = 0;
    for (i = 1; i <= setSize; i++) {
        s = (i + (setNum-1)*setSize).toString();
        fcast = parseFloat(document.getElementById('pred' + s + 'Box').value).toFixed(3);
        taskID = (setNum - 1) * setSize + i;
        Answers.insert({ "workerID": workerId, "assignmentId": assignmentId, "taskID": taskID, "forecast": fcast, "treatment": treatment, "timestamp": Date.now()});
    }

    //Fetch next five forecast questions
    if (setNum <= 2) {
    	instance.setNum.set(setNum+1);
        document.getElementById('taskForm').reset();
        event.preventDefault();
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        if (setNum ==2 ) {document.getElementById('submit').innerHTML = "Finish"};
    } else {
        Router.go('end');
    }
}

Template.RealTaskBrier.created = function() {
    this.setNum = new ReactiveVar(1);
};

Template.RealTaskBrier.helpers({
    tasks: function() {
        var setNum = Template.instance().setNum.get();
        var start = (setNum - 1) * setSize;
        return tasklist.slice(start, start + setSize);
    },
    setNum: function() {
        return Template.instance().setNum.get();
    }
});

Template.RealTaskBrier.rendered = function() {
    $('html,body').scrollTop(0);
    treatment = '1';
    sessionStorage.setItem('treatment', '1');
    log(workerId, 'RealTask');
};

Template.RealTaskBrier.events = {
    'click #submit': function(event, instance) {
        pressedSubmit(event, instance);
    }
};