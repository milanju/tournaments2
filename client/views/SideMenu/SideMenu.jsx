SideMenu = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    var data = {};
    if (Meteor.user()) {
      data.currentUser = Meteor.user();
    }
    return data;
  },

  getInitialState() {
    return {page: 'nav'};
  },

  setPage(page) {
    this.setState({page: page});
  },

  render() {
    var sideMenu;
    if (this.state.page === 'nav') {
      sideMenu = <SideMenuNav key="SideMenuNav" setPage={this.setPage} />
    }

    if (this.state.page === 'login') {
      sideMenu = <SideMenuLogin key="SideMenuLogin" setPage={this.setPage} />
    }

    if (this.state.page === 'register') {
      sideMenu = <SideMenuRegister key="SideMenuRegister" setPage={this.setPage}/>
    }

    return (
      <div className="side-menu">
        <ReactTransitionGroup>
          {sideMenu}
        </ReactTransitionGroup>
      </div>
    );
  }
});
