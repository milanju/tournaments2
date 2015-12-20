Register = React.createClass({
  handleSubmit(event) {
    event.preventDefault();
    var username = React.findDOMNode(this.refs.username).value;
    var password = React.findDOMNode(this.refs.password).value;
    var confirmPassword = React.findDOMNode(this.refs.confirmPassword).value;

    if (password !== confirmPassword) {
      React.findDOMNode(this.refs.error).innerHTML = "Passwords do not match";
      return;
    }

    Accounts.createUser({
      username: username,
      password: password
    }, (err) => {
      if(err) {
        console.log(err);
        React.findDOMNode(this.refs.error).innerHTML = err.reason;
      } else {
        FlowRouter.go('/');
      }
    });

  },

  render() {
    return (
      <div className="card card--medium">
        <div className="panel-heading">
          <div className="panel-title">Register</div>
        </div>
        <div className="panel-body">
          <form id="register-form" className="form-horizontal" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="register-username" className="col-sm-2 control-label">Username</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" ref="username" placeholder="Username" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="register-password" className="col-sm-2 control-label">Password</label>
              <div className="col-sm-10">
                <input type="password" className="form-control" ref="password" placeholder="Password" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="register-confirm-password" className="col-sm-2 control-label">Confirm</label>
              <div className="col-sm-10">
                <input type="password" className="form-control" ref="confirmPassword" placeholder="Password(again)" />
              </div>
            </div>
            <p className="error-msg" ref="error"></p>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn btn-primary">Register</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
});
