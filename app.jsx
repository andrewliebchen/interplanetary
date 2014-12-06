/**
 * @jsx React.DOM
 */

var testLatency = 5000;

Messages = new Meteor.Collection('messages');

// if (Meteor.isClient) {
//   UI.body.helpers({
//     'latency': function() {
//       return moment().add(earthMarsLatency(), 'minutes').calendar();
//     },

//     'travelTime': function() {
//       return moment(earthMarsLatency(), 'minutes').format('m:ss');
//     }
//   });
// }

var App = React.createClass({
  mixins: [Meteor.Mixin],

  getMeteorState: function() {},

  render: function() {
    return (
      <div>Hello, world</div>
    );
  }
});

// Render the JSX
if (Meteor.isClient) {
  Meteor.startup(function() {
    React.renderComponent(
      <App />,
      document.getElementById('content')
    );
  });
}

if (Meteor.isServer) {
  Meteor.methods({
    'sendMessage': function(messageContent) {
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
