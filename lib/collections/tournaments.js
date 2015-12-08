Tournaments = new Mongo.Collection('tournaments');
Tournaments.friendlySlugs('title');


Meteor.methods({
  tournamentsCreate: function(tournament) {
    var user = Meteor.user();
    if (user) {
      tournament.userId = user._id;
      Tournaments.insert(tournament);
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
