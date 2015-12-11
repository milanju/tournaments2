Template.tournamentView.onCreated(function() {
  var instance = this;
  var tournamentId = FlowRouter.getParam('tournamentId');
  instance.state = new ReactiveDict();
  instance.subscribe('tournament', tournamentId);

  instance.autorun(function() {
    instance.state.set('tournament', Tournaments.findOne(tournamentId));
  });
});

Template.tournamentView.helpers({
  tournament: function() {
    return Template.instance().state.get('tournament');
  }
});
