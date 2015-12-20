FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render('main', {content: 'home'});
  }
});

FlowRouter.route('/register', {
  /*
  action: function() {
    BlazeLayout.render('main', {content: 'register'});
  }*/
  action: function() {
    ReactLayout.render(Register);
  }
});

FlowRouter.route('/h/:page', {
  action: function() {
    BlazeLayout.render('main', {content: 'home'});
  }
});

FlowRouter.route('/users/:username', {
  action: function() {
    BlazeLayout.render('main', {content: 'userProfile'});
  }
});

FlowRouter.route('/t/create', {
  action: function() {
    BlazeLayout.render('main', {content: 'tournamentCreate'});
  }
});

FlowRouter.route('/t/:slug/:tournamentId', {
  action: function() {
    BlazeLayout.render('main', {content: 'tournamentView'});
  }
});

FlowRouter.route('/t/:slug/:tournamentId/edit', {
  action: function() {
    BlazeLayout.render('main', {content: 'tournamentEdit'});
  }
})
