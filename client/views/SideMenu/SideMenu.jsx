SideMenu = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    var data = {};
    if (Meteor.user()) {
      data.currentUser = Meteor.user();
    }
    return data;
  },

  render() {
    return (
      <nav className="side-menu">
        <a href="/" className="logo"><img src="/img/logo.png" /></a>
        {this.data.currentUser ? <SideMenuUser currentUser={this.data.currentUser} /> : <SideMenuLoginButtons />}
        <ul className="side-menu__list">
          <li className="side-menu__list__item"><a href="/t/create">Create +</a></li>
          <li className="side-menu__list__item"><a href="/page1">Page 1</a></li>
          <li className="side-menu__list__item"><a href="/page1">Page 2</a></li>
          <li className="side-menu__list__item"><a href="/page1">Page 3</a></li>
        </ul>
        <div className="starcraft-logo">
          <img src="/img/starcraft2-lotv.png" />
        </div>
      </nav>
    );
  }
});
