UserInfo = React.createClass({
  logout() {
    Meteor.logout();
  },

  render() {
    return (
      <div className="nav navbar-nav navbar-right">
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
            aria-haspopup="true" aria-expanded="false">
            {this.props.user.username}
            <span className="caret"></span>
          </a>
            <ul className="dropdown-menu">
              <li>
                <a href={"/users/" + this.props.user.username}>Profile</a>
                <a href="" onClick={this.logout}>Logout</a>
              </li>
            </ul>
        </li>
      </div>
    );
  }
});
