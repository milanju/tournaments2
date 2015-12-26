SideMenuNav = React.createClass({
  componentDidEnter() {
    $(ReactDOM.findDOMNode(this)).css('left', '200px');
    $(ReactDOM.findDOMNode(this)).velocity({
      translateX: "-200px"
    }, {
      duration: 200,
      complete: function() {
      }
    });
  },

  componentWillLeave(done) {
    $(ReactDOM.findDOMNode(this)).velocity({
      translateX: "200px"
    }, {
      duration: 200,
      complete: function() {
        done();
      }
    });
  },

  render() {
    return (
      <nav className="side-menu__nav">
        {Meteor.user() ? <SideMenuUser key="SideMenuUser" currentUser={Meteor.user()} /> : <SideMenuLoginButtons key="SideMenuLoginButtons" setPage={this.props.setPage} />}
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
