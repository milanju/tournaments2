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
    allowedValues: ['open', 'checkin', 'running', 'finished'],
    optional: true,
    custom: Tournaments.requiredIfNotLink
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
    type: Number,
    optional: true,
    custom: Tournaments.requiredIfNotLink
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
      throw new Meteor.Error(403, 'Access denied');
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
  'Tournaments.methods.join'(tournamentId) {
    if (Meteor.isServer) {
      var user = Meteor.user();

      // user must be logged in
      if (!user) {
        throw new Meteor.Error(403, 'Must be logged in');
      } else {
        var tournament = Tournaments.findOne(tournamentId);
        // status of tournament must be open or checkin
        if (!(tournament.status === 'open' || tournament.status === 'checkin')) {
          throw new Meteor.Error(403, 'Tournament is not open for signups');
        }

        // user must have an account set for the tournaments region
        if (!user.profile.accounts[tournament.region.toLowerCase()]) {
          throw new Meteor.Error(403, 'Must have an account set in the Tournaments region');
        }

        // user must not be signed up to the tournament already
        if (Participants.find({userId: user._id}).length > 0) {
          throw new Meteor.Error(403, 'Already participating in this tournament');
        }

        // all good, sign up user
        Participants.insert({
          tournamentId: tournamentId,
          name: user.profile.accounts[tournament.region.toLowerCase()],
          userId: user._id,
          checkedIn: false
        });
      }
    }
  },
  'Tournaments.methods.addParticipants'(tournamentId, amount) {
    var user = Meteor.user();

    if (user) {
      var tournament = Tournaments.findOne(tournamentId);
      if (Roles.userIsInRole(Meteor.userId(), 'admin') || _.contains(tournament.admins, Meteor.userId())) {
        for (var i = 0; i < amount; i++) {
          Participants.insert({tournamentId: tournamentId, name: 'Player' + i, userId: 'dummy', checkedIn: true});
        }
      }
    }
  },
  'Tournaments.methods.reset'(tournamentId) {
    var user = Meteor.user();

    if (user) {
      var tournament = Tournaments.findOne(tournamentId);
      if (Roles.userIsInRole(Meteor.userId(), 'admin') || _.contains(tournament.admins, Meteor.userId())) {
        Participants.remove({tournamentId: tournamentId});
        Players.remove({tournamentId: tournamentId});
        Tournaments.update(tournamentId, {$set: {status: 'open'}});
      }
    }
  },
  'Tournaments.methods.start'(tournamentId) {
    var tournament = Tournaments.findOne(tournamentId);
    // only allowed if user is admin
    if (Roles.userIsInRole(Meteor.userId(), 'admin') || _.contains(tournament.admins, Meteor.userId())) {
      // tournament must be in status 'checkin'
      if (tournament.status === 'checkin') {
        if (Meteor.isServer) {
          Tournaments.generateBracket(tournamentId);
        }
      } else {
        throw new Meteor.Error(403, 'Tournament must be in checking phase to be started');
      }
    } else {
      throw new Meteor.Error(403, 'Access Denied');
    }
  },
  'Tournaments.methods.startCheckin'(tournamentId) {
    var tournament = Tournaments.findOne(tournamentId);
    if (Roles.userIsInRole(Meteor.userId(), 'admin') || _.contains(tournament.admins, Meteor.userId())) {
      if (Meteor.isServer) {
        Tournaments.startCheckin(tournamentId);
      }
    } else {
      throw new Meteor.Error(403, 'Access Denied');
    }
  }
});

if (Meteor.isServer) {
  Tournaments.generateBracket = function(tournamentId) {
    var tournament = Tournaments.findOne(tournamentId);
    var participants = _.shuffle(Participants.find({tournamentId: tournamentId, checkedIn: true}).fetch());

    if (participants.length >= 2) {
      for (var i = 2; i < participants.length * 2; i *= 2) {
        if (i >= participants.length) {
          var byes = i - participants.length;
          for (var j = 0; j < i; j++) {
            // insert BYE in odd slot if necessary
            if (j % 2 !== 0) {
              if (byes > 0) {
                Players.insert({
                  tournamentId: tournamentId,
                  ro: i,
                  pos: j,
                  bo: 1,
                  name: 'BYE',
                  userId: 'BYE'
                });
                byes--;
                continue;
              }
            }

            var currentPlayer = participants.pop();

            Players.insert({
              tournamentId: tournamentId,
              ro: i,
              pos: j,
              bo: 1,
              name: currentPlayer.name,
              userId: currentPlayer.userId
            });
          }
        } else {
          // generate empty slots
          for (var j = 0; j < i; j++) {
            Players.insert({
              tournamentId: tournamentId,
              ro: i,
              pos: j,
              bo: 1,
              name: 'empty',
              userId: 'empty'
            });
          }
        }
      }

      Tournaments.update(tournamentId, {$set: {status: 'running'}});
    } else {
      // not enough participants
    }
  }

  Tournaments.startCheckin = function(tournamentId) {
    var tournament = Tournaments.findOne(tournamentId);

    if (tournament.status === 'open') {
      Tournaments.update(tournamentId, {$set: {status: 'checkin'}});
    } else {
      // status must be open
    }
  }
}
