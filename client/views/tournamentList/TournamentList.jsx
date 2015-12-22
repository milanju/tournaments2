TournamentList = React.createClass({
  propTypes: {
    // the tournaments to be rendered
    tournaments: React.PropTypes.array.isRequired
  },

  renderTournaments() {
    return this.props.tournaments.map((tournament) => {
      return (
        <div key={tournament._id} className="col-xs-12 col-sm-6 col-lg-4">
          <TournamentListed tournament={tournament} />
        </div>
      );
    });
  },

  render() {
    return (
      <div className="row">
        {this.renderTournaments()}
      </div>
    );
  }
});
