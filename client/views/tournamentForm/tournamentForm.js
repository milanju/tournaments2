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
    tournament.isLink = Template.instance().state.get('isLink');
    tournament.region = event.target['tournament-form__region'].value;
    tournament.title = event.target['tournament-form__title'].value;
    tournament.date = new Date(event.target['tournament-form__date'].value);
    tournament.leagues = event.target['tournament-form__leagues'].value;

    if (tournament.isLink) {
      // submit as link
      tournament.link = event.target['tournament-form__link'].value;
    } else {
      // submit as tournament
      tournament.description = event.target['tournament-form__description'].value;
      tournament.mode = event.target['tournament-form__mode'].value;
    }

    if (Template.instance().state.get('editing')) {
      var tournamentId = Template.instance().state.get('tournament')._id;
      var tournamentSlug = Template.instance().state.get('tournament').slug;
      console.log(tournament.title);
      Meteor.call('tournamentsEdit', Template.instance().state.get('tournament')._id, tournament, function(err, res) {
        if (err) {
          $('#tournament-form__error').html(err.reason);
        } else {
          if (tournament.isLink) {
            FlowRouter.go('/');
          } else {
            FlowRouter.go('/t/' + tournamentSlug + '/' + tournamentId);
          }
        }
      });
    } else {

    }

    Meteor.call('tournamentsCreate', tournament, function(err, res) {
      if (err) {
        $('#tournament-form__error').html(err.reason);
      } else {
        if (tournament.isLink) {
          FlowRouter.go('/');
        } else {
          FlowRouter.go('/t/' + 'new' + '/' + res);
        }
      }
    });
  }
});
