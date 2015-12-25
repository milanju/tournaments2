SideMenuLogin = React.createClass({
  setPageNav() {
    this.props.setPage('nav');
  },

  handleSubmit(event) {
    event.preventDefault();
    var username = ReactDOM.findDOMNode(this.refs.username).value;
    var password = ReactDOM.findDOMNode(this.refs.password).value;
    Meteor.loginWithPassword(username, password, (err) => {
      if (err) {
        ReactDOM.findDOMNode(this.refs.error).innerHTML = err.reason
      } else {
        this.props.setPage('nav');
      }
    });
  },

  render() {
    return (
      <div className="side-menu__login">
        <span className="glyphicon glyphicon-menu-left side-menu__back" onClick={this.setPageNav}></span>
        <form onSubmit={this.handleSubmit}>
          <input type="text" className="form-control side-menu__login__input" ref="username" placeholder="Username" />
          <input type="password" className="form-control side-menu__login__input" ref="password" placeholder="Password" />
          <button type="submit" className="side-menu__btn side-menu__btn--login">Login</button>
        </form>
        <p className="error" ref="error"></p>
      </div>
    );
  }
});
