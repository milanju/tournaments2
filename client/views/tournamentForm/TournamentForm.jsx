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
    tournament.bos = [];
    if (this.props.editing) {
      tournament = this.props.tournament;
      if (this.props.tournament.isLink) {
        isLink = true;
      }
    }
    return {isLink, tournament};
  },

  componentDidMount() {
    $(function() {
      $('#tournament-form__date').datetimepicker();
    });
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

  renderBos() {
    var ro = 1;
    return this.state.tournament.bos.map((bo) => {
      ro *= 2;
      return (
        <div className="col-xs-12 col-sm-4 col-lg-3" key={'ro' + ro}>
          <label>ro{ro}</label>
          <input type="text" className="form-control" placeholder="Best of" ref={'boRo' + ro} />
        </div>
      );
    });
  },

  addBo() {
    var bos = this.state.tournament.bos;
    bos.push({});
    this.setState({'tournament.bos': bos});
  },

  removeBo() {
    var bos = this.state.tournament.bos;
    bos.pop();
    this.setState({'tournament.bos': bos});
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
      tournament.defaultBo = parseInt(ReactDOM.findDOMNode(this.refs.defaultBo).value);
      tournament.description = ReactDOM.findDOMNode(this.refs.description).value;
      tournament.mode = ReactDOM.findDOMNode(this.refs.mode).value;
    }

    if (this.props.editing) {
      var tournamentId = this.props.tournament._id;
      var tournamentSlug = this.props.tournament.slug;
      Meteor.call('Tournaments.methods.edit', tournamentId, tournament, (err, res) => {
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

    Meteor.call('Tournaments.methods.create', tournament, (err, res) => {
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
        {!this.state.isLink ?
          <div className="form-group">
            <label className="col-sm-2 control-label">Best ofs</label>
            <div className="col-sm-10">
              <div className="row">
                <div className="col-xs-12 col-sm-4 col-lg-3">
                  <label>Default</label>
                  <input type="text" className="form-control" ref="defaultBo" placeholder="Best of" />
                </div>
                {this.renderBos()}
                <div className="col-xs-12 col-sm-4 col-lg-3">
                  <label>Add/Remove bo</label><br />
                  <a className="btn btn-info" onClick={this.addBo}>
                    <span className="glyphicon glyphicon-plus"></span>
                  </a>{' '}
                  <a className="btn btn-danger" onClick={this.removeBo}>
                    <span className="glyphicon glyphicon-minus"></span>
                  </a>
                </div>
              </div>
            </div>
          </div> : ''
        }
        <div className="form-group">
          <label htmlFor="tournament-form__region" className="col-sm-2 control-label">Region</label>
          <div className="col-sm-10">
            <select ref="region" id="tournament-form__region" className="form-control">
              <option checked={this.isRegion("Europe")}>Europe</option>
              <option checked={this.isRegion("Americas")}>Americas</option>
              <option checked={this.isRegion("Asia")}>Asia</option>
              <option checked={this.isRegion("Southeast Asia")}>Southeast Asia</option>
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
