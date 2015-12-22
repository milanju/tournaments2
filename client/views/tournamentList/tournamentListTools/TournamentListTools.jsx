TournamentListTools = React.createClass({
  propTypes: {
    tournament: React.PropTypes.object.isRequired
  },

  openDeleteModal() {
    $('#modal-delete-' + this.props.tournament._id).modal({show: true, backdrop: false});
  },

  render() {
    if (this.props.tournament.userId === Meteor.userId()) {
      return (
        <div className="tournament-list__tols">
          <a href={'/t/' + this.props.tournament.slug + '/' + this.props.tournament._id + '/edit'}
            className="tournament-list__tools__btn"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Edit">
            <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
          </a>
          <a href="" className="tournament-list__tools__btn"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Delete"
            onClick={this.openDeleteModal}>
            <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
          </a>
        </div>
      );
    } else {
      return (
        <div className="tournament-list__tools"></div>
      );
    }
  }
});
