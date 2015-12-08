Meteor.publish('user', function(username) {
  return Meteor.users.find({username: username});
});

Meteor.publish('tournaments', function() {
  return Tournaments.find();
});

Meteor.publish('tournamentsFromPage', function(page) {
  return Tournaments.find({}, {skip: (page - 1) * 6, limit: 6});
});

Meteor.publish('allTournamentsCount', function() {
  Counts.publish(this, 'allTournamentsCount', Tournaments.find());
});
