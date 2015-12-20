MainHeader = React.createClass({
  render() {
    return (
      <nav className="navbar">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="/">Tournaments</a>
          </div>
          <div id="navbar" className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li className="active"><a href="#">Page 1</a></li>
              <li><a href="#about">Page 2</a></li>
              <li><a href="/t/create">Create</a></li>
            </ul>
            <UserBar />
          </div>
        </div>
      </nav>
    );
  }
});
