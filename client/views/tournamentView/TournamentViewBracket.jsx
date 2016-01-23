TournamentViewBracket = React.createClass({
  propTypes: {
    bracket: React.PropTypes.array.isRequired
  },

  render() {
    var bracket = [];
    var reverseBracket = this.props.bracket.reverse();
    for (var i = 0; i < reverseBracket.length; i++) {
      var cols = [];
      for (var j = 0; j < reverseBracket[i].round.length; j += 2) {
        cols.push(
          <div className="match" key={reverseBracket[i].round[j]._id}>
            <div className="match__content">
              <div className="match__content__player">{reverseBracket[i].round[j].name}</div>
              <div className="match__content__player">{reverseBracket[i].round[j+1].name}</div>
            </div>
          </div>
        );
      }
      bracket.push(
        <div className="round" key={reverseBracket[i]._id}>
          {cols}
        </div>
      );
    }

    return (
      <div>
        <h4>Bracket</h4>
        <div className="bracket">
          {bracket}
        </div>
      </div>
    );
  }
});
