TournamentListed = React.createClass({
  propTypes: {
    tournament: React.PropTypes.object.isRequired
  },

  getLink() {
    return '/t/' + this.props.tournament.slug + '/' + this.props.tournament._id;
  },

  deleteTournament() {
    Meteor.call('tournamentsDelete', this.props.tournament._id);
  },

  render() {
    return (
      <div>
        <TournamentListTools
          tournament={this.props.tournament} />
        <a className="tournament-list__link"
          href={this.props.tournament.isLink ? this.props.tournament.link : this.getLink()}
          target={this.props.tournament.isLink ? '_blank' : ''}>
          <div className="card tournament-list__card">
            <h3 className="tournament-list__title">{this.props.tournament.title}</h3>
            <table>
              <tbody>
                <tr>
                  <td className="tournament-list__td">
                    Platform:
                  </td>
                  <td>
                    {this.props.tournament.isLink ? 'Remote' : 'Tournaments'}
                  </td>
                </tr>
                <tr>
                  <td className="tournament-list__td">
                    Start in:
                  </td>
                  <td>
                    {moment(this.props.tournament.date).fromNow()}
                  </td>
                </tr>
                <tr>
                  <td className="tournament-list__td">
                    Date:
                  </td>
                  <td className="tournament-list__td">
                    {moment(this.props.tournament.date).format('LLL')}
                  </td>
                </tr>
                <tr>
                  <td className="tournament-list__td">
                    Server:
                  </td>
                  <td className="tournament-list__td">
                    {this.props.tournament.region}
                  </td>
                </tr>
                <tr>
                  <td className="tournament-list__td">
                    Participants:
                  </td>
                  <td className="tournament-list__td">
                    {/*this.props.tournament.isLink ? 'N/A' : this.props.tournament.participants.length*/}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </a>
        <div className="modal fade" id={'modal-delete-' + this.props.tournament._id}
          tabIndex="-1" role="dialog" aria-labelledby={'delete-' + this.props.tournament._id}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id={'delete-' + this.props.tournament._id}>Delete Tournament</h4>
              </div>
              <div className="modal-body">
                <button type="button" className="btn btn-danger confirm-delete-tournament" data-dismiss="modal" onClick={this.deleteTournament}>Delete</button>
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
