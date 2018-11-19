import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Notes = new Mongo.Collection('notes');


// Perform insert & remove via methods
Meteor.methods({
   'notes.insert'(text) {
       
        check(text, String);
        
        // Check if user is logged in
        if(!Meteor.userId()) {
            throw new Meteor.Error('not logged in');
        }
        
        Notes.insert({
            text:text,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username
        });
   },
   'notes.remove'(note) {
       check(note._id, String);
       
       if (note.owner !== Meteor.userId()) {
           throw new Meteor.Error('Can only remove your own notes');
       }
       Notes.remove(note._id);
   }
});