FlowRouter.route('/', {
  /*
  action: function() {
    BlazeLayout.render('main', {content: 'home'});
  }
  */
  action() {
    ReactLayout.render(MainLayout, {content: <Home />});
  }
});

FlowRouter.route('/register', {
  /*
  action: function() {
    BlazeLayout.render('main', {content: 'register'});
  }
  */
  action() {
    ReactLayout.render(MainLayout, {content: <Register />});
  }
});

FlowRouter.route('/h/:page', {
  /*
  action: function() {
    BlazeLayout.render('main', {content: 'home'});
  }
  */
  action() {
    ReactLayout.render(MainLayout, {content: <Home />});
  }
});

FlowRouter.route('/users/:username', {
  /*
  action: function() {
    BlazeLayout.render('main', {content: 'userProfile'});
  }
  */
  action() {
    ReactLayout.render(MainLayout, {content: <UserProfile />});
  }
});

FlowRouter.route('/t/create', {
  /*
  action: function() {
    BlazeLayout.render('main', {content: 'tournamentCreate'});
  }
  */
  action() {
    ReactLayout.render(MainLayout, {content: <TournamentCreate />})
  }
});

FlowRouter.route('/t/:slug/:tournamentId', {
  /*
  action() {
    BlazeLayout.render('main', {content: 'tournamentView'});
  }
  */
  action() {
    ReactLayout.render(MainLayout, {content: <TournamentView />});
  }
});

FlowRouter.route('/t/:slug/:tournamentId/edit', {
  /*
  action: function() {
    BlazeLayout.render('main', {content: 'tournamentEdit'});
  }
  */
  action() {
    ReactLayout.render(MainLayout, {content: <TournamentEdit />});
  }
})
