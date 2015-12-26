SideMenuLoginButtons = React.createClass({
  openLogin() {
    Session.set('showLogin', !Session.get('showLogin'));
  },

  setPageLogin() {
    this.props.setPage('login');
  },

  setPageRegister() {
    this.props.setPage('register');
  },

  render() {
    return (
      <div className="side-menu__login-btns">
        <a className="side-menu__login-btns__action" onClick={this.setPageLogin}>Login</a>
        <a className="side-menu__login-btns__action" onClick={this.setPageRegister}>Register</a>
      </div>
    );
  }
});
