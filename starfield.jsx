/**
 * @jsx React.DOM
 */

var smallStarsCount = 150;
var mediumStarsCount = 50;
var largeStarsCount = 5;

function randomPos() {
 return Math.floor(Math.random() * (150 - 1)) + 1 + '%';
}

var Star = React.createClass({
  getInitialState: function() {
    return {
      left: randomPos(),
      top:  randomPos()
    };
  },

  render: function() {
    var starStyle = {
      left: this.state.left,
      top:  this.state.top
    }

    return (
      <div className={"★ " + this.props.size} style={starStyle} />
    );
  }
});

StarField = React.createClass({
    mixins: [ReactMeteor.Mixin],

    getMeteorState: function() {},

    render: function() {
      var starfieldClassName = !this.props.inTransit ? "starfield" : "starfield in-transit";

      return (
        <div className={starfieldClassName} >
          {_(smallStarsCount).times(function(n){
            return(<Star size="small" key={n} />);
          })}
          {_(mediumStarsCount).times(function(n){
            return(<Star size="medium" key={n} />);
          })}
          {_(largeStarsCount).times(function(n){
            return(<Star size="large" key={n} />);
          })}
        </div>
      );
    }
});

