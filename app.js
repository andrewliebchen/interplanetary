var testLatency = 5000;

Messages = new Meteor.Collection('messages');

if (Meteor.isClient) {
  UI.body.helpers({
    'latency': function() {
      return moment().add(earthMarsLatency(), 'minutes').calendar();
    },

    'travelTime': function() {
      return moment(earthMarsLatency(), 'minutes').format('m:ss');
    }
  });

  Template.message.helpers({
    'status': function() {

    }
  });

  Template.message.events({
    'click .send-message': function(){
      Meteor.call('sendMessage', 'Hello earth!');
    }
  });
}

if (Meteor.isServer) {
  Meteor.methods({
    'sendMessage': function(messageContent) {
      // latency = earthMarsLatency() * 60000;
      var latency = testLatency;

      Meteor.setTimeout(function(){
        Messages.insert({
          content: messageContent
        });
        console.log(messageContent);
      }, latency);
    }
  });
}
