TournamentNavigation = React.createClass({
  showPage(page) {
    console.log('click');
    Session.set('TournamentView', page);
  },

  render() {
    return (
      <ul>
        <li><a href="" onClick={this.showPage.bind(this, 'info')}>Info</a></li>
        <li><a href="" onClick={this.showPage.bind(this, 'participants')}>Participants</a></li>
        <li><a href="" onClick={this.showPage.bind(this, 'bracket')}>Bracket</a></li>
      </ul>
    );
  }
});
