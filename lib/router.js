FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render('main', {content: 'home'});
  }
});

FlowRouter.route('/register', {
  action: function() {
    BlazeLayout.render('main', {content: 'register'});
  }
});

FlowRouter.route('/h/:page', {
  action: function() {
    BlazeLayout.render('main', {content: 'home'});
  }
});

