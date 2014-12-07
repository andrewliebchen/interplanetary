/**
 * @jsx React.DOM
 */

Messages = new Meteor.Collection('messages');

var testLatency = 5000;

// var CSSTransitionGroup = React.addons.CSSTransitionGroup;

var App = React.createClass({
  mixins: [Meteor.Mixin],

  getInitialState: function() {
    return {
      travelTime:  moment(earthMarsLatency(), 'minutes').format('m:ss'),
      arrivalTime: moment().add(earthMarsLatency(), 'minutes').calendar()
    };
  },

  render: function() {
    return (
      <div className="wrapper">
        <div className="headline">
          <h1 classNam="headline__main">Tweet from Mars</h1>
          <div className="headline__sub">
            <h2>Currently it takes {this.state.travelTime} for a message to travel between Mars and the Earth.</h2>
            <h2>If you send your tweet now, it will be posted on Twitter {this.state.arrivalTime}</h2>
          </div>
          <button className="headline__button">Log in with Twitter</button>
        </div>
        <CSSTransitionGroup transitionName="mars">
          <div className="mars" />
        </CSSTransitionGroup>
        <footer className="footer">
          <a>Huh?</a>
        </footer>
      </div>
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
