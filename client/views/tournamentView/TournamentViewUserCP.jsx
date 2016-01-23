TournamentViewUserCP = React.createClass({
  propTypes: {
    user: React.PropTypes.object,
    tournament: React.PropTypes.object.isRequired,
    participants: React.PropTypes.array.isRequired,
    players: React.PropTypes.array.isRequired
  },

  isParticipating() {
    var userId = this.data.user ? this.data.userId : undefined;
    // loop through participants, if user is found return true
    for (var i = 0; i < this.props.participants.length; i++) {
      if (userId === this.props.participants[i].userId) {
        return true;
      }
    }
    return false;
  },

  isPlayer() {
    var userId = this.data.user ? this.data.userId : undefined;
    // loop through players, if user is found return true
    for (var i = 0; i < this.props.players.length; i++) {
      if (userId === this.props.players[i].userId) {
        return true;
      }
    }
    return false;
  },

  getPlayer() {
    var userId = this.data.user ? this.data.userId : undefined;
    // loop through players. First occurrence is most advanced.
    for (var i = 0; i < this.props.players.length; i++) {
      if (userId === this.props.players[i].userId) {
        return this.props.players[i];
      }
    }
  },

  getOpponent(player) {
    var opponentPos;
    var opponentRo = player.ro;

    if (player.pos % 2 === 0) {
      opponentPos = player.pos + 1;
    } else {
      opponentPos = player.pos - 1;
    }
    for (var i = 0; i < this.props.players.length; i++) {
      if (players[i].ro === opponentRo && players[i].pos === opponentPos) {
        return this.props.players[i];
      }
    }
  },

  droppedOut() {
    var player = this.getPlayer();
    var opponent = this.getOpponent(player);

    // check slot of player. then get opponent. if player has less score than opponent, he dropped out
    if (opponent.score > player.score) {
      return true;
    } else {
      return false
    }
  },

  isCheckedIn() {
    var userId = this.data.user ? this.data.userId : undefined;
    for (var i = 0; i < this.props.participants.length; i++) {
      if (userId === this.props.participants[i].userId) {
        if (this.props.participants[i].checkedIn) {
          return true;
        } else {
          return false;
        }
      }
    }
    return false;
  },

  render() {
    var cpState = <div>UserCP</div>;

    // if tournament is not over
    if (this.props.tournament.status !== 'finished') {
      // if user is logged in
      if (this.data.user) {
        // if user is participant
        if (this.isParticipating()) {
          if (this.props.tournament.status === 'running') {
            if (this.isPlayer()) {
              if (this.droppedOut()) {
                cpState = <div>You lost in round X vs Y.</div>;
              } else if (this.getOpponent().userId !== 'empty') {
                cpState = <div>MATCH vs ENEMY, report Score</div>;
              } else {
                cpState = <div>Waiting for opponent</div>;
              }
            } else {
              cpState = <div>You didn't check in.</div>;
            }
          } else {
            if (this.isCheckedIn()) {
              cpState = <div>You are checked in. Waiting for tournament to start.</div>
            } else if (this.props.tournament.status === 'checkin') {
              cpState = <div>Check in now!</div>;
            } else {
              cpState = <div>Waiting for checkin!</div>;
            }
          }
        } else {
          if (this.props.tournament.status === 'running') {
            cpState = <div>Tournament is running</div>;
          } else {
            if (this.data.user.profile.accounts[this.props.tournament.region.toLowerCase()]) {
              cpState = <div>Join Tournament</div>
            } else {
              cpState = <div>Add account for region</div>
            }
          }
        }
      } else {
        cpState = <div>Please log in</div>
      }
    } else {
      cpState = <div>Tournament is over</div>
    }

    return (
      <div className="card">
        <h4 className="card__headline">User CP</h4>
        {cpState}
      </div>
    );
  }
});
