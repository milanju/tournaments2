FlowRouter.route('/', {
  name: 'Home',
  action() {
    ReactLayout.render(MainLayout, {content: <Home />});
  }
});

FlowRouter.route('/register', {
  action() {
    ReactLayout.render(MainLayout, {content: <Register />});
  }
});

FlowRouter.route('/h/:page', {
  name: 'Home',
  action() {
    ReactLayout.render(MainLayout, {content: <Home />});
  }
});

FlowRouter.route('/users/:username', {
  action() {
    ReactLayout.render(MainLayout, {content: <UserProfile />});
  }
});

FlowRouter.route('/t/create', {
  action() {
    ReactLayout.render(MainLayout, {content: <TournamentCreate />})
  }
});

FlowRouter.route('/t/:slug/:tournamentId', {
  name: 'TournamentView',
  action() {
    ReactLayout.render(MainLayout, {content: <TournamentView />});
  }
});

FlowRouter.route('/t/:slug/:tournamentId/edit', {
  action() {
    ReactLayout.render(MainLayout, {content: <TournamentEdit />});
  }
});
