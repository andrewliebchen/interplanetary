// Messages = new Meteor.Collection('messages');

if (Meteor.isClient) {

  Session.setDefault('currentTime', Date.now());

  Meteor.startup(function() {
    // Do something every second
    setInterval(function() {
      Session.set('currentTime', Date.now());
      // var travelDistance = 1- (Session.get('currentTime') - Session.get('triggerTime')) / (Session.get('triggerTime') - Session.get('arrivalTime'));
      // $('.marker').css('left', travelDistance + '%');
    }, 1000);
  });

  UI.body.latency = function() {
    return earthMarsLatency('m');
  };

  Template.distance.events({
    'click .distance' : function(event, template) {
      // var currentTime = Session.get('currentTime');
      // Session.setDefault('triggerTime', currentTime);
      // Session.setDefault('currentLatency', earthMarsLatency());
      // Session.setDefault('arrivalTime', currentTime + earthMarsLatency());

      var latency = earthMarsLatency('s');
      // $('.marker').css('animation-duration', latency + 's');
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {

  });
}
