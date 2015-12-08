Template.loginForm.events({
  'submit #login-form': function(event) {
    event.preventDefault();
    var username = event.target['login-username'].value;
    var password = event.target['login-password'].value;
    Meteor.loginWithPassword(username, password, function(err) {
      if (err) {
        $('#login-btn').tooltip({
          placement: 'bottom',
          trigger: 'manual'
        }).attr('title', err.reason)
        .tooltip('fixTitle')
        .tooltip('setContent')
        .tooltip('show');
        setTimeout(function() {
          $('#login-btn').tooltip('hide');
        }, 4000);
      }
    });
  },
  'click #logout-button': function() {
    Meteor.logout();
  }
});
