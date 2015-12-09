Tournaments = new Mongo.Collection('tournaments');
Tournaments.friendlySlugs('title');

TournamentsSchema = new SimpleSchema({
  userId: {
    type: String
  },
  isLink: {
    type: Boolean
  },
  createdAt: {
    type: Date
  },
  date: {
    type: Date
  },
  region: {
    type: String
  },
  title: {
    type: String,
    max: 200
  },
  leagues: {
    type: String,
    max: 100
  },
  description: {
    type: String,
    max: 10000,
    optional: true,
    custom: function() {
      // required if not link
      var shouldBeRequired = this.field('isLink').value == false;

      if (shouldBeRequired) {
        if (!this.operator) {
          if (!this.isSet || this.value === null || this.value === "") return "required";
        } else if (this.isSet) {
          if (this.operator === "$set" && this.value === null || this.value === "") return "required";
          if (this.operator === "$unset") return "required";
          if (this.operator === "$rename") return "required";
        }
      }
    }
  },
  link: {
    type: String,
    optional: true,
    max: 200,
    custom: function() {
      // required if link
      var shouldBeRequired = this.field('isLink').value == true;

      if (shouldBeRequired) {
        if (!this.operator) {
          if (!this.isSet || this.value === null || this.value === "") return "required";
        } else if (this.isSet) {
          if (this.operator === "$set" && this.value === null || this.value === "") return "required";
          if (this.operator === "$unset") return "required";
          if (this.operator === "$rename") return "required";
        }
      }
    }
  }
});

Tournaments.attachSchema(TournamentsSchema);

Meteor.methods({
  tournamentsCreate: function(tournament) {
    var user = Meteor.user();
    if (user) {
      tournament.userId = user._id;
      tournament.createdAt = new Date();

      Tournaments.insert(tournament, function(err, res) {
        if (err) {
          if (Meteor.isClient) {
            $('#tournament-form__error').html(err);
          }
        } else {
          if (tournament.isLink) {
            FlowRouter.go('/');
          } else {
            FlowRouter.go('/' + 'new' + '/' + res);
          }
        }
      });
    }
  },
  tournamentsDelete: function(tournamentId) {
    var user = Meteor.user();
    if (user) {
      var tournament = Tournaments.findOne(tournamentId);
      if (tournament.userId === user._id || Roles.userIsInRole(user._id, 'admin')) {
        Tournaments.remove(tournamentId);
      }
    }
  }
});
