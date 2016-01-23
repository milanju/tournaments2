TournamentViewUserCP = React.createClass({
  propTypes: {
    user: React.PropTypes.object,
    tournament: React.PropTypes.object.isRequired,
    participants: React.PropTypes.array.isRequired,
    players: React.PropTypes.array.isRequired
  },

  isParticipating() {
    console.log(this.props.participants);
    var userId = this.props.user ? this.props.user._id : undefined;
    // loop through participants, if user is found return true
    for (var i = 0; i < this.props.participants.length; i++) {
      if (userId === this.props.participants[i].userId) {
        return true;
      }
    }
    return false;
  },

  isPlayer() {
    var userId = this.props.user ? this.props.user._id : undefined;
    // loop through players, if user is found return true
    for (var i = 0; i < this.props.players.length; i++) {
      if (userId === this.props.players[i].userId) {
        return true;
      }
    }
    return false;
  },

  getPlayer() {
    var userId = this.props.user ? this.props.user._id : undefined;
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
    var userId = this.props.user ? this.props.user._id : undefined;
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
      if (this.props.user) {
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
              cpState = <div>You are signed up for this Tournament. Waiting for checkin!</div>;
            }
          }
        } else {
          if (this.props.tournament.status === 'running') {
            cpState = <div>Tournament is running</div>;
          } else {
            if (this.props.user.profile.accounts[this.props.tournament.region.toLowerCase()]) {
              // user has an account, offer to join
              cpState = <TournamentViewJoin tournamentId={this.props.tournament._id}/>
            } else {
              // user needs to create an account within tournaments region
              cpState = <TournamentViewAddAccount region={this.props.tournament.region.toLowerCase()} />
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

TournamentViewJoin = React.createClass({
  propTypes: {
    tournamentId: React.PropTypes.string.isRequired
  },

  getInitialState() {
    return {disabled: false};
  },

  joinTournament() {
    if (!this.state.disabled) {
      this.setState({disabled: true});
      Meteor.call('Tournaments.methods.join', this.props.tournamentId, (err, res) => {
        if (err) {
          console.log(err);
          this.setState({disabled: false});
          ReactDOM.findDOMNode(this.refs.error).innerHTML = err.reason;
        } else {
          // success
        }
      });
    }
  },

  render() {
    return (
      <div>
        <button className="btn btn-primary" onClick={this.joinTournament}>Join Tournament</button>
        <p className="error" ref="error"></p>
      </div>
    );
  }
});

TournamentViewAddAccount = React.createClass({
  propTypes: {
    region: React.PropTypes.string.isRequired
  },

  getInitialState() {
    return {disabled: false};
  },

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.disabled) {
      var name = ReactDOM.findDOMNode(this.refs.name).value;

      this.setState({disabled: true});
      Meteor.call('Meteor.users.methods.setAccount', this.props.region, name, (err, res) => {
        if (err) {
          this.setState({disabled: false});
          ReactDOM.findDOMNode(this.refs.error).innerHTML = err.reason;
        } else {
          // success
          // add some feedback?
        }
      });
    }
  },

  render() {
    var btnState = this.state.disabled ? 'disabled' : '';
    return (
      <div>
        <p>Add Account for Region</p>
        <form className="form-inline" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Name#123" ref="name" />
          </div>
          {' '}
          <button type="submit" className={'btn btn-primary ' + btnState}>Add Account</button>
        </form>
        <p className="error" ref="error"></p>
      </div>
    );
  }
});
