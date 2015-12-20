UserBar = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      currentUser: Meteor.user()
    };
  },

  render() {
    if (this.data.currentUser) {
      return <UserInfo user={this.data.currentUser}/>;
    } else {
      return <LoginForm />;
    }
  }
});
