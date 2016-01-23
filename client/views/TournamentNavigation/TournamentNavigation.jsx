TournamentNavigation = React.createClass({
  showPage(page) {
    Session.set('TournamentView', page);
  },

  render() {
    return (
      <ul className="nav navbar-nav">
        <li><a onClick={this.showPage.bind(this, 'info')}>Info</a></li>
        <li><a onClick={this.showPage.bind(this, 'participants')}>Participants</a></li>
        <li><a onClick={this.showPage.bind(this, 'bracket')}>Bracket</a></li>
      </ul>
    );
  }
});
