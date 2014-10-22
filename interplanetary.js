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
      var currentMessage = Messages.find({}).fetch();
      console.log(currentMessage.slice(1));
      if(moment() == currentMessage.createdAt) {
        return "Arrived!";
      } else {
        return "In transit";
      }
    }
  });

  Template.message.events({
    'click .send-message': function(){
      var now = moment();
      Messages.insert({
        message: "Hello world!",
        timestamp: now
      })
    }
  });
}

if (Meteor.isServer) {

}
