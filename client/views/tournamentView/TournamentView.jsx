TournamentView = React.createClass({
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
    if (this.data.tournament) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-lg-4">
              <TournamentListed tournament={this.data.tournament} />
            </div>
            <div className="col-xs-12 col-sm-6 col-lg-8">
              User CP
            </div>
          </div>
          <div className="card">
            <div className="card__heading">{this.data.tournament.title}</div>
          </div>
        </div>
      );
    } else {
      return (
        <div>Loading...</div>
      )
    }
  }
});
