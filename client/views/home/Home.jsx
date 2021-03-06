Home = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    var data = {};
    var page = FlowRouter.getParam('page');
    var tournamentsHandle;
    var tournamentsCountHandle;

    if (page) {
      tournamentsHandle = Meteor.subscribe('tournamentsFromPage', page);
    } else {
      tournamentsHandle = Meteor.subscribe('tournamentsFromPage', 1);
    }

    tournamentsCountHandle = Meteor.subscribe('allTournamentsCount');

    if (tournamentsHandle.ready() && tournamentsCountHandle.ready()) {
      data.tournaments = Tournaments.find({}, {limit: 6}).fetch();
      data.tournamentsCount = Counts.get('allTournamentsCount');
    }

    return data;
  },

  render() {
    return (
      <ReactTransitionGroup>
        {this.data.tournaments ?
          <div className="container" key="home">
            <TournamentList tournaments={this.data.tournaments} />
            <TournamentPagination />
          </div> : <Loading />
        }
      </ReactTransitionGroup>
    );
  }
});
