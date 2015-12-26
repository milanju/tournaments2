Loading = React.createClass({
  componentWillLeave(done) {
    node = ReactDOM.findDOMNode(this);
    $(node).velocity({opacity: 0}, {duration: 300, easing: 'easeIn', complete: function() {
      done();
    }});
  },

  render() {
    return (
      <div className="loading-splash">
        Loading....
      </div>
    );
  }
});
