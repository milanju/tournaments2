Template.tournamentEdit.onCreated(function() {
  var instance = this;
  var tournamentId = FlowRouter.getParam('tournamentId');
  instance.state = new ReactiveDict();
  instance.subscribe('tournament', tournamentId);

  instance.autorun(function() {
    instance.state.set('tournament', Tournaments.findOne(tournamentId));
    console.log(instance.state.get('tournament'));
  });
});

Template.tournamentEdit.helpers({
  tournament: function() {
    console.log(Template.instance().state.get('tournament'));
    return Template.instance().state.get('tournament');
  }
});
