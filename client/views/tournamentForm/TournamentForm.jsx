TournamentForm = React.createClass({
  propTypes: {
    editing: React.PropTypes.bool.isRequired
  },

  getInitialState() {
    var isLink = false;
    var tournament = {};
    tournament.title = '';
    tournament.link = '';
    tournament.mode = '';
    tournament.region = '';
    tournament.date = '';
    tournament.leagues = '';
    tournament.description = '';
    if (this.props.editing) {
      tournament = this.props.tournament;
      if (this.props.tournament.isLink) {
        isLink = true;
      }
    }
    return {isLink, tournament};
  },

  isRegion(region) {
    if (this.props.tournament) {
      if (this.props.tournament.region === region) {
        return true;
      }
    }
    return '';
  },

  createAsTournament() {
    this.setState({isLink: false});
  },

  createAsLink() {
    this.setState({isLink: true});
  },

  handleSubmit(event) {
    event.preventDefault();
    var tournament = {};
    tournament.isLink = this.state.isLink;
    tournament.region = ReactDOM.findDOMNode(this.refs.region).value;
    tournament.title = ReactDOM.findDOMNode(this.refs.title).value;
    tournament.date = new Date(ReactDOM.findDOMNode(this.refs.date).value);
    tournament.leagues = ReactDOM.findDOMNode(this.refs.leagues).value;

    if (tournament.isLink) {
      // submit as link
      tournament.link = ReactDOM.findDOMNode(this.refs.link).value;
    } else {
      // submit as tournament
      tournament.description = ReactDOM.findDOMNode(this.refs.description).value;
      tournament.mode = ReactDOM.findDOMNode(this.refs.mode).value;
    }

    if (this.props.editing) {
      var tournamentId = this.props.tournament._id;
      var tournamentSlug = this.props.tournament.slug;
      Meteor.call('tournamentsEdit', tournamentId, tournament, (err, res) => {
        if (err) {
          ReactDOM.findDOMNode(this.refs.error).innerHTML = err.reason;
        } else {
          if (tournament.isLink) {
            FlowRouter.go('/');
          } else {
            FlowRouter.go('/t/' + tournamentSlug + '/' + tournamentId);
          }
        }
      });
    } else {

    }

    Meteor.call('tournamentsCreate', tournament, (err, res) => {
      if (err) {
        ReactDOM.findDOMNode(this.refs.error).innerHTML = err.reason;
      } else {
        if (tournament.isLink) {
          FlowRouter.go('/');
        } else {
          FlowRouter.go('/t/' + 'new' + '/' + res);
        }
      }
    });
  },

  render() {
    return(
      <form id="tournament-form" className="form-horizontal" onSubmit={this.handleSubmit}>
        {this.props.editing ? '' :
          <div className="form-group">
            <div className="radio col-sm-5 col-sm-offset-2 col-lg-3">
              <label>
                <input type="radio" name="tournament-form__type" onChange={this.createAsTournament} value="tournament" checked={!this.state.isLink} />
                New Tournament
              </label>
            </div>
            <div className="radio col-sm-5 col-lg-3">
              <label>
                <input type="radio" name="tournament-form__type" onChange={this.createAsLink} value="link" checked={this.state.isLink}/>
                Tournament Link
              </label>
            </div>
          </div>
        }
        <div className="form-group">
          <label htmlFor="tournament-form__title" className="col-sm-2 control-label">Title</label>
          <div className="col-sm-10">
            <input type="text" ref="title" id="tournament-form__title" className="form-control" placeholder="Title" defaultValue={this.state.tournament.title} />
          </div>
        </div>
        {this.state.isLink ?
          <div className="form-group">
            <label htmlFor="tournament-form__link" className="col-sm-2 control-label">Link</label>
            <div className="col-sm-10">
              <input type="text" ref="link" id="tournament-form__link" className="form-control" placeholder="Link" defaultValue={this.state.tournament.link} />
            </div>
          </div>
          :
          <div className="form-group">
            <label htmlFor="tournament-form__mode" className="col-sm-2 control-label">Mode</label>
            <div className="col-sm-10">
              <select ref="mode" id="tournament-form__mode" className="form-control">
                <option>Single Elimination</option>
              </select>
            </div>
          </div>
        }
        <div className="form-group">
          <label htmlFor="tournament-form__region" className="col-sm-2 control-label">Region</label>
          <div className="col-sm-10">
            <select ref="region" id="tournament-form__region" className="form-control">
              <option checked={this.isRegion("Europe")}>Europe</option>
              <option checked={this.isRegion("Americas")}>Americas</option>
              <option checked={this.isRegion("Korea")}>Korea</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="tournament-form__date" className="col-sm-2 control-label">Date</label>
          <div className="col-sm-10">
            <input type="text" ref="date" id="tournament-form__date" className="form-control" placeholder="Date" defaultValue={this.state.tournament.date} />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="tournament-form__leagues" className="col-sm-2 control-label">Leagues</label>
          <div className="col-sm-10">
            <input type="text" ref="leagues" id="tournament-form__leagues" className="form-control" placeholder="Leagues" defaultValue={this.state.tournament.leagues} />
          </div>
        </div>
        {this.state.isLink ? '' :
          <div className="form-group">
            <label htmlFor="tournament-form__description" className="col-sm-2 control-label">Description</label>
            <div className="col-sm-10">
              <textarea ref="description" id="tournament-form__description" className="form-control" rows="3" defaultValue={this.state.tournament.description}></textarea>
            </div>
          </div>
        }
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <p ref="error" id="tournament-form__error" className="error-msg"></p>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>
      </form>
    );
  }
});
