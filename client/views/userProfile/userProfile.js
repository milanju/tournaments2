Template.userProfile.onCreated(function() {
  var instance = this;
  instance.user = new ReactiveVar();
  instance.autorun(function() {
    var username = FlowRouter.getParam('username');
    instance.subscribe('user', username);
    instance.user.set(Meteor.users.findOne({username: username}));
  });
});

Template.userProfile.helpers({
  user: function() {
    return Template.instance().user.get();
  }
});
