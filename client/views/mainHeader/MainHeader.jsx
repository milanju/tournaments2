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

  toggleNav() {
    if (Session.get('sideBarHidden')) {
      $('.content-wrapper').css('left', '200px');
      $('.navbar').css('left', '200px');
      $('.side-menu').css('left', '0');
      Session.set('sideBarHidden', false);
    } else {
      $('.content-wrapper').css('left', '0');
      $('.navbar').css('left', '40px');
      $('.side-menu').css('left', '-200px');
      Session.set('sideBarHidden', true);
    }
  },

  render() {
    return (
      <header>
        <div className="sidebar-toggle"><a className="sidebar-toggle-btn" onClick={this.toggleNav}><span className="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span></a></div>
        <nav className="navbar">
          <div className="container">
            <ul className="nav navbar-nav">
              <li><a href="/" className="logo"><img src="/img/logo.png" /></a></li>
            </ul>
            {this.renderNav()}
          </div>
        </nav>
      </header>
    );
  }
});
