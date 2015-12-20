Template.tournamentListTools.onRendered(function() {
  $('.tournament-list__tools__btn').tooltip();
});

Template.tournamentListTools.helpers({
  showTools: function() {
    var ownerId = Template.instance().data.ownerId;
    var user = Meteor.user();
    if (user) {
      if (ownerId === user._id || Roles.userIsInRole(user._id, 'admin')) {
        return true
      } else {
        return false;
      }
    }
  },
  editUrl: function() {
    var tournament = Template.instance().data.tournament;
    var tournamentSlug = tournament.slug;
    var tournamentId = tournament._id;
    return '/t/' + tournamentSlug + '/' + tournamentId + '/edit';
  }
});

Template.tournamentListTools.events({
  'click .delete-tournament': function() {
    $('#modal-delete-' + Template.instance().data.tournament._id).modal({show: true, backdrop: false});
  }
});
