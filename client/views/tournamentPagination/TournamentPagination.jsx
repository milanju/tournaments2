TournamentPagination = React.createClass({
  paginateLeft() {
    var page = FlowRouter.getParam('page');
    if (page) {
      FlowRouter.go('/h/' + (parseInt(page) - 1));
    } else {
      FlowRouter.go('/h/' + 0);
    }
  },

  paginateRight() {
    var page = FlowRouter.getParam('page');
    if (page) {
      FlowRouter.go('/h/' + (parseInt(page) + 1));
    } else {
      FlowRouter.go('/h/' + 2);
    }
  },

  render() {
    return (
      <div>
        <a href="" onClick={this.paginateLeft}>Left</a>{' '}
        <a href="" onClick={this.paginateRight}>Right</a>
      </div>
    );
  }
});
