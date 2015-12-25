TournamentPagination = React.createClass({
  paginateLeft(event) {
    event.preventDefault();
    var page = FlowRouter.getParam('page');
    if (page) {
      FlowRouter.go('/h/' + (parseInt(page) - 1));
    } else {
      FlowRouter.go('/h/' + 0);
    }
  },

  paginateRight(event) {
    event.preventDefault();
    var page = FlowRouter.getParam('page');
    if (page) {
      FlowRouter.go('/h/' + (parseInt(page) + 1));
    } else {
      FlowRouter.go('/h/' + 2);
    }
  },

  render() {
    return (
      <ul className="nav navbar-nav">
        <li><a onClick={this.paginateLeft}>Left</a></li>
        <li><a onClick={this.paginateRight}>Right</a></li>
      </ul>
    );
  }
});
