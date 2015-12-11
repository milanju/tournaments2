Template.tournamentListed.helpers({
  getLink: function(isLink, slug, _id, link) {
    if (isLink) {
      return link;
    } else {
      return '/t/' + slug + '/' + _id;
    }
  },
  target: function(isLink) {
    if (isLink) {
      return '_blank';
    }
  }
});

Template.tournamentListed.events({
  'click .confirm-delete-tournament': function() {
    Meteor.call('tournamentsDelete', this._id);
  }
});
