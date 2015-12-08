Template.tournamentForm.onCreated(function() {
  var instance = this;
  instance.editing = instance.data.editing;
  instance.isLink = new ReactiveVar(false);
});

Template.tournamentForm.onRendered(function() {
  $(function() {
    $('#tournament-form__date').datetimepicker();
  });
});

Template.tournamentForm.helpers({
  isLink: function() {
    return Template.instance().isLink.get();
  }
})

Template.tournamentForm.events({
  'click #tournament-form__type--1': function() {
    Template.instance().isLink.set(false);
  },
  'click #tournament-form__type--2': function() {
    Template.instance().isLink.set(true);
  },
  'submit #tournament-form': function(event) {
    event.preventDefault();
    var tournament = {};
    var isLink = Template.instance().isLink.get();
    var region = event.target['tournament-form__region'].value;
    var title = event.target['tournament-form__title'].value;
    var date = new Date(event.target['tournament-form__date'].value);
    var leagues = event.target['tournament-form__leagues'].value;

    tournament.isLink = isLink;
    tournament.region = region;
    tournament.title = title;
    tournament.date = date;
    tournament.leagues = leagues;
    tournament
    if (isLink) {
      // submit as link
      var link = event.target['tournament-form__link'].value;

      tournament.link = link;

      Meteor.call('tournamentsCreate', tournament);
    } else {
      // submit as tournament
      var description = event.target['tournament-form__description'].value;
      var participants = [];
      var bracket = [];

      tournament.description = description;
      tournament.participants = participants;
      tournament.bracket = bracket;

      Meteor.call('tournamentsCreate', tournament);
    }
  }
});
