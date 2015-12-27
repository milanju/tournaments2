Tournaments = new Mongo.Collection('tournaments');
Tournaments.friendlySlugs('title');

ParticipantsSchema = new SimpleSchema({
  userId: {
    type: String
  }
});

Tournaments.requiredIfLink = function() {
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

Tournaments.requiredIfNotLink = function() {
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

Tournaments.schema = new SimpleSchema({
  userId: {
    type: String
  },
  status: {
    type: String,
    allowedValues: ['open', 'checkin', 'running', 'finished']
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
    custom: Tournaments.requiredIfNotLink
  },
  link: {
    type: String,
    optional: true,
    max: 200,
    custom: Tournaments.requiredIfLink
  },
  admins: {
    type: [String]
  },
  defaultBo: {
    type: Number
  },
  bos: {
    type: [Object],
    optional: true
  },
  mode: {
    type: String,
    optional: true,
    allowedValues: ['Single Elimination'],
    custom: Tournaments.requiredIfNotLink
  },
  started: {
    type: Boolean,
    optional: true,
    custom: Tournaments.requiredIfNotLink,
    defaultValue: false
  },
  checkin: {
    type: Boolean,
    optional: true,
    custom: Tournaments.requiredIfNotLink,
    defaultValue: false
  }
});

Tournaments.attachSchema(Tournaments.schema);

Meteor.methods({
  'Tournaments.methods.create'(tournament) {
    var user = Meteor.user();
    if (user) {
      tournament.userId = user._id;
      tournament.createdAt = new Date();
      tournament.admins = [user._id];
      if (tournament.isLink) {

      } else {
        tournament.status = 'open';
        tournament.participants = [];
        tournament.bracket = [];
      }

      return Tournaments.insert(tournament, function(err, res) {
        if (err) {
          if (Meteor.isServer) {
            throw err;
          } else {
            return err;
          }
        }
      });
    } else {
      throw new Meteor.Error('Access denied');
    }
  },
  'Tournaments.methods.edit'(tournamentId, options) {
    var user = Meteor.user();
    if (user) {
      var tournament = Tournaments.findOne(tournamentId);
      if (tournament.userId === user._id || Roles.userIsInRole(user, 'admin')) {
        Tournaments.update(tournamentId, {$set: options}, function(err, res) {
          if (err) {
            if (Meteor.isServer) {
              throw err;
            } else {
              return err;
            }
          }
        });
      } else {
        new Meteor.Error(403, 'Access denied');
      }
    }
  },
  'Tournaments.methods.delete'(tournamentId) {
    var user = Meteor.user();
    if (user) {
      var tournament = Tournaments.findOne(tournamentId);
      if (tournament.userId === user._id || Roles.userIsInRole(user._id, 'admin')) {
        Tournaments.remove(tournamentId);
      }
    }
  },
  'Tournaments.methods.deleteParticipants'(tournamentId, amount) {
    for (var i = 0; i < amount; i++) {
      Participants.insert({tournamentId: tournamentId, name: 'Player' + i, userId: 'dummy'});
    }
  },
  'Tournaments.methods.reset'(tournamentId) {
    Participants.remove({tournamentId: tournamentId});
  }
});
