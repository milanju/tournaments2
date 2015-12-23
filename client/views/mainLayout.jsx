ReactTransitionGroup = React.addons.TransitionGroup;

MainLayout = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    data = {};
    data.showLogin = Session.get('showLogin');
    return data;
  },

  render() {
    return (
      <div id="main-container" className="main-container">
        <MainHeader />
        <SideMenu />
        <div className="content-wrapper">
          <ReactTransitionGroup>
            {this.props.content}
          </ReactTransitionGroup>
          {this.data.showLogin ? <Login /> : ''}
        </div>
      </div>
    );
  }
});
