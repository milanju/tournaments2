TournamentView = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    var data = {};
    var user = Meteor.user();
    var tournamentId = FlowRouter.getParam('tournamentId');
    var tournamentHandle = Meteor.subscribe('tournament', tournamentId);
    var participantsHandle = Meteor.subscribe('participants', tournamentId);
    var playersHandle = Meteor.subscribe('players', tournamentId);
    if (tournamentHandle.ready() && participantsHandle.ready() && playersHandle.ready()) {
      data.user = user;
      data.tournament = Tournaments.findOne(tournamentId);
      data.participants = Participants.find({tournamentId: tournamentId}).fetch();
      data.players = Players.find({tournamentId: tournamentId}).fetch();
      data.page = Session.get('TournamentView');
      data.bracket = [];
      for (var i = 2; i < data.participants.length * 2; i *= 2) {
        data.bracket.push({
          _id: 'ro' + i,
          round: Players.find({tournamentId: tournamentId, ro: i}, {sort: {pos: 1}}).fetch()
        });
      }
    }
    return data;
  },

  componentDidMount() {
    Session.set('TournamentView', 'info');
  },

  renderParticipants() {
    return this.data.participants.map((participant) => {
      return (
        <li key={participant._id}>{participant.name}</li>
      );
    });
  },

  renderView(event) {
    var page = this.data.page;

    if (page === 'info') {
      return (
          <h4>Info</h4>
      );
    }

    if (page === 'participants') {
      return (
        <div>
          <h4>Participants</h4>
          <ul>{this.renderParticipants()}</ul>
        </div>
      );
    }

    if (page === 'bracket') {
      return <TournamentViewBracket bracket={this.data.bracket} />;
    }
  },

  render() {
    if (this.data.tournament) {
      var isSiteAdmin = Roles.userIsInRole(this.data.user ? this.data.user._id : undefined, 'admin');
      var isTournamentAdmin = _.contains(this.data.tournament.admins, this.data.user ? this.data.user._id : undefined);
      var isTournamentOwner = (this.data.user ? this.data.user._id : undefined) === this.data.tournament.userId;
      var isAdmin = isSiteAdmin || isTournamentAdmin || isTournamentOwner;
    }

    return (
      <ReactTransitionGroup>
        {this.data.tournament ?
          <div className="container container--view" key="view">
            {isAdmin ? <TournamentViewAdminCP tournament={this.data.tournament} /> : ''}
            <TournamentViewUserCP
              user={this.data.user}
              tournament={this.data.tournament}
              participants={this.data.participants}
              players={this.data.players} />
              <div className="card">
                <h2 className="card__headline">{this.data.tournament.title}</h2>
                {this.renderView()}
              </div>
          </div> :
          <Loading />
        }
      </ReactTransitionGroup>
    );
  }
});
