import { Template } from 'meteor/templating';
import { Notes } from '../lib/collections.js';
import { Accounts } from 'meteor/accounts-base';

// Accounts config
Accounts.ui.config({
    passwordSignupFields:'USERNAME_ONLY'
});

import './main.html';

Template.body.helpers({
    
    notes() {
        return Notes.find({});
    }
    
    // notes:[
    //     {text: 'My Note 1'},
    //     {text: 'My Note 2'},
    //     {text: 'My Note 3'}
    // ]
});

Template.add.events({
    'submit .add-form': function() {
        event.preventDefault();
        
        // Get input value
        const target = event.target;
        const text = target.text.value;
        
        // Insert note into collection
        Meteor.call('notes.insert', text);
        
        // Notes.insert({
        //     text:text,
        //     createdAt: new Date(),
        //     owner: Meteor.userId(),
        //     username: Meteor.user().username
        // });
        
        // Clear form
        target.text.value = '';
        
        // Close modal
        $('#addModal').modal('close');
        
        return false;
    }
});

Template.note.events({
    'click .delete-note': function() {
        // Notes.remove(this._id);
        Meteor.call('notes.remove', this);
        return false;
    }
})