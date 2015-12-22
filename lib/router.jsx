FlowRouter.route('/', {
  /*
  action: function() {
    BlazeLayout.render('main', {content: 'home'});
  }
  */
  action: function() {
    ReactLayout.render(MainLayout, {content: <Home />});
  }
});

FlowRouter.route('/register', {
  /*
  action: function() {
    BlazeLayout.render('main', {content: 'register'});
  }
  */
  action: function() {
    ReactLayout.render(MainLayout, {content: <Register />});
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
  /*
  action: function() {
    BlazeLayout.render('main', {content: 'tournamentCreate'});
  }
  */
  action: function() {
    ReactLayout.render(MainLayout, {content: <TournamentCreate />})
  }
});

FlowRouter.route('/t/:slug/:tournamentId', {
  action: function() {
    BlazeLayout.render('main', {content: 'tournamentView'});
  }
});

FlowRouter.route('/t/:slug/:tournamentId/edit', {
  /*
  action: function() {
    BlazeLayout.render('main', {content: 'tournamentEdit'});
  }
  */
  action: function() {
    ReactLayout.render(MainLayout, {content: <TournamentEdit />});
  }
})
