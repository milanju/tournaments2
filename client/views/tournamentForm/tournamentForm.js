Template.tournamentForm.onCreated(function() {
  var instance = this;
  instance.editing = instance.data.editing;
  instance.state = new ReactiveDict();
  instance.state.set('editing', instance.data.editing);
  instance.state.set('isLink', false);
  if (instance.state.get('editing')) {
    instance.state.set('tournament', Template.instance().data.tournament);
    instance.state.set('isLink', instance.state.get('tournament').isLink);
  }
});

Template.tournamentForm.onRendered(function() {
  $(function() {
    $('#tournament-form__date').datetimepicker();
  });
});

Template.tournamentForm.helpers({
  isEditing: function() {
    return Template.instance().state.get('editing');
  },
  isLink: function() {
    return Template.instance().state.get('isLink');
  },
  titleValue: function() {
    if (Template.instance().state.get('editing')) {
      return Template.instance().state.get('tournament').title;
    }
  },
  dateValue: function() {
    if (Template.instance().state.get('editing')) {
      return Template.instance().state.get('tournament').date;
    }
  },
  leaguesValue: function() {
    if (Template.instance().state.get('editing')) {
      return Template.instance().state.get('tournament').leagues;
    }
  },
  descriptionValue: function() {
    if (Template.instance().state.get('editing') && !Template.instance().state.get('isLink')) {
      return Template.instance().state.get('tournament').description;
    }
  },
  linkValue: function() {
    if (Template.instance().state.get('editing') && Template.instance().state.get('isLink')) {
      return Template.instance().state.get('tournament').link;
    }
  },
  regionValue: function(region) {
    if (Template.instance().state.get('editing')) {
      if (Template.instance().state.get('tournament').region === region) return 'selected';
    }
  }
});

Template.tournamentForm.events({
  'click #tournament-form__type--1': function() {
    Template.instance().state.set('isLink', false);
  },
  'click #tournament-form__type--2': function() {
    Template.instance().state.set('isLink', true);
  },
  'submit #tournament-form': function(event) {
    event.preventDefault();
    var tournament = {};
    var isLink = Template.instance().state.get('isLink');
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

      Meteor.call('tournamentsCreate', tournament, function(err, res) {
      });
    } else {
      // submit as tournament
      var description = event.target['tournament-form__description'].value;
      tournament.description = description;

      Meteor.call('tournamentsCreate', tournament);
    }
  }
});
