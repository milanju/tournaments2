Template.tournamentListTools.onRendered(function() {
  $('.tournament-list__tools__btn').tooltip();
});

Template.tournamentListTools.helpers({
  showTools: function() {
    var ownerId = Template.instance().data.ownerId;
    var user = Meteor.user();
    if (ownerId === user._id || Roles.userIsInRole(user._id, 'admin')) {
      return true
    } else {
      return false;
    }
  }
});

Template.tournamentListTools.events({
  'click .delete-tournament': function() {
    $('#modal-delete-' + Template.instance().data.tournamentId).modal({show: true, backdrop: false});
  }
});
