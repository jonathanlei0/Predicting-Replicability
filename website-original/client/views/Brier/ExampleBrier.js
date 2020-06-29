Template.ExampleBrier.helpers({
    tasks: function() {
        return exampleTaskList;
    }
});

Template.ExampleBrier.rendered = function() {
    $('html,body').scrollTop(0);
    log(workerId, 'Example');
};