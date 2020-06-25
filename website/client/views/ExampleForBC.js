Template.ExampleForBC.helpers({
    tasks: function() {
        return exampleTaskList;
    }
});

Template.ExampleForBC.rendered = function() {
    $('html,body').scrollTop(0);
    log(workerId, 'Example');
};