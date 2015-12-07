FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render('main', {content: 'home'});
  }
});

FlowRouter.route('/:page', {
  action: function() {
    BlazeLayout.render('main', {content: 'home'});
  }
});
