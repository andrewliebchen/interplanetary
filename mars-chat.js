Messages = new Meteor.Collection('messages');

if (Meteor.isClient) {

  Session.setDefault('currentUserName', 'Anonymous');
  Session.setDefault('currentUserLocation', 'Earth');
  Session.setDefault('currentTime', Date.now());

  Meteor.startup(function () {
    setInterval(function () {
      Session.set('currentTime', Date.now());
    }, 1000);
  });

  Template.messages.messages = function() {
    return Messages.find({}, {sort: {time: -1}});
  };

  Template.messages.latency = function() {
    return earthMarsDistance();
  };

  Template.newMessage.events({
    'keydown #new_message' : function(event) {
      if(event.which == 13) {
        var message = $(event.target).val();
        var viewDate = Date.now() + (earthMarsDistance() * 1000);

        if(message) {
          Messages.insert({
            message:    message,
            name:       Session.get('currentUserName'),
            postedDate: Date.now(),
            viewDate:   viewDate,
            location:   Session.get('currentUserLocation')
          });
        }
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // Delete database
    // Messages.remove({});

    // Add some dummy info
    if(Messages.find().count() === 0) {
      Messages.insert({message: "Greetings from Earth!", name: "Jeff", postedDate: Date.now(), location: "Earth"});
      Messages.insert({message: "Mars is so cold!", name: "Jon", postedDate: Date.now(), location: "Mars"});
      Messages.insert({message: "We'll send up some warmer jackets, FWIW.", name: "Jennifer", postedDate: Date.now(), location: "Earth"});
    }
  });
}
