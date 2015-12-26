SideMenuRegister = React.createClass({
  componentDidEnter() {
    $(ReactDOM.findDOMNode(this)).css('left', '-200px');
    $(ReactDOM.findDOMNode(this)).velocity({
      translateX: "200px"
    }, {
      duration: 200,
      complete: function() {
      }
    });
  },

  componentWillLeave(done) {
    $(ReactDOM.findDOMNode(this)).velocity({
      translateX: "-200px"
    }, {
      duration: 200,
      complete: function() {
        done();
      }
    });
  },

  setPageNav() {
    this.props.setPage('nav');
  },

  handleSubmit(event) {
    event.preventDefault();
    var username = ReactDOM.findDOMNode(this.refs.username).value;
    var password = ReactDOM.findDOMNode(this.refs.password).value;
    var passwordConfirm = ReactDOM.findDOMNode(this.refs.passwordConfirm).value;

    if (password !== passwordConfirm) {
      ReactDOM.findDOMNode(this.refs.error).innerHTML = "Passwords do not match";
      return;
    }

    Accounts.createUser({
      username: username,
      password: password
    }, (err) => {
      if(err) {
        ReactDOM.findDOMNode(this.refs.error).innerHTML = err.reason;
      } else {
        this.props.setPage('nav');
      }
    });

  },

  render() {
    return (
      <div className="side-menu__register">
        <span className="glyphicon glyphicon-menu-left side-menu__back" onClick={this.setPageNav}></span>
        <form onSubmit={this.handleSubmit}>
          <input type="text" className="form-control side-menu__input" ref="username" placeholder="Username" />
          <input type="password" className="form-control side-menu__input" ref="password" placeholder="Password" />
          <input type="password" className="form-control side-menu__input" ref="passwordConfirm" placeholder="Confirm Password" />
          <button type="submit" className="side-menu__btn">Register</button>
        </form>
        <p className="error" ref="error"></p>
      </div>
    );
  }
});
