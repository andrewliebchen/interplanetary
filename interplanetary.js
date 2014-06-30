Messages = new Meteor.Collection('messages');

if (Meteor.isClient) {

  Session.setDefault('currentUserName', 'Anonymous');
  Session.setDefault('currentUserLocation', 'Earth');
  Session.setDefault('currentTime', Date.now());
  Session.setDefault('countdown', 10000);

  Meteor.startup(function() {
    // Check the time every second
    setInterval(function() {
      Session.set('currentTime', Date.now());
    }, 1000);
  });

  Template.messages.messages = function() {
    var viewDateTarget = Session.get('currentTime') - earthMarsLatency();
    return Messages.find({viewDate: {$lt: viewDateTarget}}, {sort: {time: -1}});
  };

  Template.messages.latency = function() {
    return earthMarsLatency();
  };

  Template.newMessage.events({
    'keydown #new_message' : function(event) {
      if(event.which == 13) {
        var $this = $(event.target);
        var message = $this.val();
        var viewDate = Date.now() + (earthMarsLatency() * 60000);

        if(message) {
          Messages.insert({
            message:    message,
            name:       Session.get('currentUserName'),
            postedDate: Date.now(),
            viewDate:   viewDate,
            location:   Session.get('currentUserLocation')
          });
        };

        $this.val('');
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
      Messages.insert({message: "Greetings from Earth!", name: "Jeff", postedDate: Date.now(), viewDate: Date.now(), location: "Earth"});
      Messages.insert({message: "Mars is so cold!", name: "Jon", postedDate: Date.now(), viewDate: Date.now(), location: "Mars"});
      Messages.insert({message: "We'll send up some warmer jackets, FWIW.", name: "Jennifer", postedDate: Date.now(), viewDate: Date.now(), location: "Earth"});
    }
  });
}
