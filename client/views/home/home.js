Template.home.onCreated(function() {
  var instance = this;
  Tracker.autorun(function() {
    var page = FlowRouter.getParam('page');
    if (page) {
      instance.subscribe('tournamentsFromPage', page);
    } else {
      instance.subscribe('tournamentsFromPage', 1);
    }
    instance.subscribe('allTournamentsCount');
  });
});

Template.home.helpers({
  tournaments: function() {
    return Tournaments.find({}, {limit: 6});
  },
  tournamentsCount: function() {
    return Counts.get('allTournamentsCount');
  }
});
