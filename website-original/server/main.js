import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    // code to run on server at startup
    if (States.findOne({})) {
    	States.update(
    		{ 'treatmentCount': { $exists: true } }, 
        	{ 'treatmentCount': [0, 0, 0, 0, 0] }
        );
    } else {
        States.insert({ 'treatmentCount': [0, 0, 0, 0, 0] });
    }
});