Messages = new Meteor.Collection('messages');

if (Meteor.isClient) {

  Session.setDefault('currentUserName', 'Anonymous');
  Session.setDefault('currentUserLocation', 'Earth');

  Template.messages.messages = function() {
    return Messages.find({}, {sort: {time: -1}});
  };

  Template.messages.distance = function() {
    return distance();
  };

  Template.newMessage.events({
    'keydown #new_message' : function(event) {
      if(event.which == 13) {
        var message = $(event.target).val();

        if(message) {
          Message.insert({
            message:  message,
            name:     Session.get('currentUserName'),
            date:     Date.now(),
            location: Session.get('currentUserLocation')
          });
        }
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // Add some dummy info
    if(Messages.find().count() === 0) {
      Messages.insert({message: "Greetings from Earth!", name: "Jeff", date: Date.now(), location: "Earth"});
      Messages.insert({message: "Mars is so cold!", name: "Jon", date: Date.now(), location: "Mars"});
      Messages.insert({message: "We'll send up some warmer jackets, FWIW.", name: "Jennifer", date: Date.now(), location: "Earth"});
    }
  });
}
