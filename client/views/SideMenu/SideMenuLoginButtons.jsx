SideMenuLoginButtons = React.createClass({
  openLogin() {
    Session.set('showLogin', !Session.get('showLogin'));
  },

  render() {
    return (
      <div className="side-menu__login">
        <a href="" className="side-menu__login__action" onClick={this.openLogin}>Login</a>
        <a href="" className="side-menu__login__action">Register</a>
      </div>
    );
  }
});
