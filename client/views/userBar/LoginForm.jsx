LoginForm = React.createClass({
  handleSubmit(event) {
    event.preventDefault();
    var username = ReactDOM.findDOMNode(this.refs.username).value;
    var password = ReactDOM.findDOMNode(this.refs.password).value;
    Meteor.loginWithPassword(username, password, function(err) {
      if (err) {
        $('#login-btn').tooltip({
          placement: 'bottom',
          trigger: 'manual'
        }).attr('title', err.reason)
        .tooltip('fixTitle')
        .tooltip('setContent')
        .tooltip('show');
        setTimeout(function() {
          $('#login-btn').tooltip('hide');
        }, 4000);
      }
    });
  },

  render() {
    return(
      <form className="navbar-form navbar-right" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input type="text" placeholder="Usernames" ref="username" className="form-control"/>{' '}
          <input type="password" placeholder="Password" ref="password" className="form-control"/>{' '}
          <button type="submit" id="login-btn" className="btn btn-success">Sign in</button>{' '}
          <a href="/register" className="btn btn-info">Register</a>
        </div>
      </form>
    );
  }
});
