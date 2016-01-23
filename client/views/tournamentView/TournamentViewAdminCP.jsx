TournamentViewAdminCP = React.createClass({
  propTypes: {
    tournament: React.PropTypes.object.isRequired
  },

  resetTournament() {
    Meteor.call('Tournaments.methods.reset', this.props.tournament._id);
  },

  addParticipants() {
    Meteor.call('Tournaments.methods.addParticipants', this.props.tournament._id, 100);
  },

  startCheckin() {
    Meteor.call('Tournaments.methods.startCheckin', this.props.tournament._id);
  },

  startTournament() {
    Meteor.call('Tournaments.methods.start', this.props.tournament._id);
  },

  render() {
    return (
      <div className="card">
        <h4 className="card__headline">Admin CP</h4>
        <a onClick={this.resetTournament}>Reset Tournament</a>
        <a onClick={this.addParticipants}>Add 100</a>
        <a onClick={this.startTournament}>START</a>
        <a onClick={this.startCheckin}>CHECKIN</a>
      </div>
    );
  }
});
