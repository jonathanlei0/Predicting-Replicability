Template.ExampleForWager.helpers({
    tasks: function() {
        return exampleTaskList;
    }
});

Template.ExampleForWager.rendered = function() {
    $('html,body').scrollTop(0);
    log(workerId, 'Example');
};