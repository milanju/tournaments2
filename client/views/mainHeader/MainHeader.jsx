MainHeader = React.createClass({
  renderNav() {
    console.log('hello');
    console.log(FlowRouter);
    if (FlowRouter.current().route.name === 'Home') {
      return <TournamentPagination />;
    }
    if (FlowRouter.current().route.name === 'TournamentView') {
      return <TournamentNavigation />
    }
    return <div></div>;
  },

  render() {
    return (
      <nav className="navbar">
        <div className="container">
          <ul className="nav navbar-nav">
            {this.renderNav()}
          </ul>
        </div>
      </nav>
    );
  }
});
