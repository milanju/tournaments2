TournamentView = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    var data = {};
    var tournamentId = FlowRouter.getParam('tournamentId');
    var tournamentHandle = Meteor.subscribe('tournament', tournamentId);
    var participantsHandle = Meteor.subscribe('participants', tournamentId);
    var playersHandle = Meteor.subscribe('players', tournamentId);
    if (tournamentHandle.ready() && participantsHandle.ready()) {
      data.tournament = Tournaments.findOne(tournamentId);
      data.participants = Participants.find({tournamentId: tournamentId}).fetch();
      data.players = Players.find({tournamentId: tournamentId}).fetch();
      data.page = Session.get('TournamentView');
    }
    return data;
  },

  componentDidMount() {
    Session.set('TournamentView', 'info');
  },

  renderParticipants() {
    return this.data.participants.map((participant) => {
      return (
        <li>{participant.name}</li>
      );
    });
  },

  renderView(event) {
    var page = this.data.page;

    if (page === 'info') {
      return 'info';
    }

    if (page === 'participants') {
      return (
        <div>
          <h1>Participants</h1>
          <ul>{this.renderParticipants()}</ul>
        </div>
      );
    }

    if (page === 'bracket') {
      return 'bracket';
    }
  },

  render() {
      return (
        <ReactTransitionGroup>
          {this.data.tournament ?
            <div className="container" key="view">
              <TournamentViewUserCP
                tournament={this.data.tournament}
                participants={this.data.participants}
                players={this.data.players} />
              {this.renderView()}
            </div> :
            <Loading />
          }
        </ReactTransitionGroup>
      );
  }
});
