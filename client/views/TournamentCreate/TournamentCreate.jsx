TournamentCreate = React.createClass({
  render() {
    return(
      <div className="container">
        <div className="card">
          <div className="card__heading">Create Tournament</div>
          <TournamentForm editing={false} />
        </div>
      </div>
    );
  }
});
