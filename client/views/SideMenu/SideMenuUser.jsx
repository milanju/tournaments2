SideMenuUser = React.createClass({
  propTypes: {
    currentUser: React.PropTypes.object.isRequired
  },

  logout() {
    Meteor.logout();
  },

  render() {
    return (
      <div className="side-menu__user">
        <span className="side-menu__user__title">{this.props.currentUser.username}</span>
        <a href={"/users/" + this.props.currentUser.username} className="side-menu__user__action">Profile</a>
        <a href="" className="side-menu__user__action" onClick={this.logout}>Logout</a>
      </div>
    );
  }
});
