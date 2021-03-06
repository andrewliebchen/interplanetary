/**
 * @jsx React.DOM
 */

Messages = new Meteor.Collection('messages');

var testLatency = 5000;

// var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var App = React.createClass({
  mixins: [ReactMeteor.Mixin],

  getMeteorState: function() {
    return {
      travelTime: moment(earthMarsLatency(), 'minutes').format('m:ss'),
      arrivalTime: moment().add(earthMarsLatency(), 'minutes').calendar(),
      showTwitterPost: null,
      inTransit: null
    };
  },

  handleTwitterLogin: function() {
    this.setState({showTwitterPost: !this.state.showTwitterPost});
  },

  handleTwitterPost: function() {
    this.setState({inTransit: !this.state.inTransit});
  },

  render: function() {
    return (
      <div className="wrapper">
        <div className="headline">
          <h1 classNam="headline__main">Tweet from Mars</h1>
          {!this.state.showTwitterPost ?
            <div>
              <div className="headline__sub">
                <h2>Currently it takes {this.state.travelTime} for a message to travel between Mars and the Earth.</h2>
                <h2>If you send your tweet now, it will be posted on Twitter {this.state.arrivalTime}</h2>
              </div>
              <button className="headline__button" onClick={this.handleTwitterLogin}>Log in with Twitter</button>
            </div>
          : null}
        </div>
        {this.state.showTwitterPost ?
          <TwitterPost
            arrivalTime={this.state.arrivalTime}
            inTransit={this.state.inTransit}
            handleTwitterPost={this.handleTwitterPost} />
        : null}
        {!this.state.inTransit ?
          <div className="mars" />
        : null}
        <footer className="footer">
          <a>Huh?</a>
        </footer>
        <StarField inTransit={this.state.inTransit} />
      </div>
    );
  }
});

var TwitterPost = React.createClass({
  render: function() {
    return (
      <div className={this.props.inTransit ? 'twitter-post in-transit' : 'twitter-post'}>
        <header className="twitter-post__header">
          {!this.props.inTransit ?
            <h3>What's happening on Mars @andrewliebchen?</h3>
          :
            <h3>Your tweet arrives in...</h3>
          }
        </header>
        {!this.props.inTransit ?
          <div>
            <textarea className="twitter-post__message"
              defaultValue="This tweet was sent from Mars 15 minutes ago! #TweetFromMars" />
            <footer className="twitter-post__footer">
              <p className="twitter-post__notice">Your Tweet will be posted at {this.props.arrivalTime}</p>
              <button className="twitter-post__button" onClick={this.props.handleTwitterPost}>
                Transmit!
              </button>
            </footer>
          </div>
        :
          <div className="twitter-post__countdown">
            15
            <span className="twitter-post__colon">:</span>
            00
          </div>
        }
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
