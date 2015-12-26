Meteor.publish('user', function(username) {
  return Meteor.users.find({username: username});
});

Meteor.publish('tournament', function(tournamentId) {
  return Tournaments.find(tournamentId);
});

Meteor.publish('tournaments', function() {
  return Tournaments.find();
});

Meteor.publish('tournamentsFromPage', function(page) {
  return Tournaments.find({}, {skip: (page - 1) * 6, limit: 6});
});

Meteor.publish('participants', function(tournamentId) {
  return Participants.find({tournamentId: tournamentId});
});

Meteor.publish('players', function(tournamentId) {
  return Players.find({tournamentId: tournamentId});
});

Meteor.publish('allTournamentsCount', function() {
  Counts.publish(this, 'allTournamentsCount', Tournaments.find());
});
