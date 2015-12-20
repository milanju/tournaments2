TournamentEdit = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    var data = {};
    var tournamentId = FlowRouter.getParam('tournamentId');
    var handle = Meteor.subscribe('tournament', tournamentId);
    if (handle.ready()) {
      data.tournament = Tournaments.findOne(tournamentId);
    }
    return data;
  },

  render() {
    return(
      <div className="container">
        <div className="card">
          <div className="card__heading">Create Tournament</div>
          {this.data.tournament? <TournamentForm editing={true} tournament={this.data.tournament} /> : <p>Loading...</p>}
        </div>
      </div>
    );
  }
});
