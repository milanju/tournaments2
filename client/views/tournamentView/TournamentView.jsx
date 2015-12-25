TournamentView = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    var data = {};
    var tournamentId = FlowRouter.getParam('tournamentId');
    var handle = Meteor.subscribe('tournament', tournamentId);
    if (handle.ready()) {
      data.tournament = Tournaments.findOne(tournamentId);
      data.page = Session.get('TournamentView');
    }
    return data;
  },

  componentDidMount() {
    Session.set('TournamentView', 'info');
  },

  renderView(event) {
    var page = this.data.page;

    if (page === 'info') {
      return 'info';
    }

    if (page === 'participants') {
      return 'participants';
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
              {this.renderView()}
            </div> :
            <Loading />
          }
        </ReactTransitionGroup>
      );
  }
});
