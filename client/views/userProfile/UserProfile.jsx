UserProfile = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    var data = {};
    var username = FlowRouter.getParam('username');
    var handle = Meteor.subscribe('user', username);


    if (handle.ready()) {
      data.user = Meteor.users.findOne({username: username});
    }

    return data;
  },

  render() {
    return (
      <div className="container">
        <div className="card card--medium">
          {this.data.user ? this.data.user.username : 'Loading...'}
        </div>
      </div>
    );
  }
});
