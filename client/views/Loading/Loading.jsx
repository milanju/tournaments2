Loading = React.createClass({
  componentWillLeave(done) {
    node = this.getDOMNode();
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
