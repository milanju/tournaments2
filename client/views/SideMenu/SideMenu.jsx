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
      sideMenu = <SideMenuNav setPage={this.setPage} />
    }

    if (this.state.page === 'login') {
      sideMenu = <SideMenuLogin setPage={this.setPage} />
    }

    if (this.state.page === 'register') {
      sideMenu = <SideMenuRegister />
    }
    return (
      <div className="side-menu">
        {sideMenu}
      </div>
    );
  }
});
