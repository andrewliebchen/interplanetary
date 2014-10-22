if (Meteor.isClient) {

  Session.setDefault('currentTime', Date.now());

  UI.body.helpers({
    'latency': function() {
      return moment().add(earthMarsLatency(), 'minutes').calendar();
    },

    'travelTime': function() {
      return moment(earthMarsLatency(), 'minutes').format('m:ss');
    }
  });
}

if (Meteor.isServer) {

}
