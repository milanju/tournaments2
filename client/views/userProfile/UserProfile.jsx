UserProfile = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    var data = {};
    var username = FlowRouter.getParam('username');
    var handle = Meteor.subscribe('user', username);


    if (handle.ready()) {
      data.user = Meteor.users.findOne({username: username});
    }

    return data;
  },

  getInitialState() {
    return {editing: false};
  },

  setEdit() {
    this.setState({editing: true});
  },

  saveData() {
    var europe = ReactDOM.findDOMNode(this.refs.europe).value;
    var americas = ReactDOM.findDOMNode(this.refs.americas).value;
    var asia = ReactDOM.findDOMNode(this.refs.asia).value;
    var southeastAsia = ReactDOM.findDOMNode(this.refs.southeastAsia).value;

    if (europe !== '') {
      Meteor.call('Meteor.users.methods.setAccount', 'europe', europe);
    }

    if (americas !== '') {
      Meteor.call('Meteor.users.methods.setAccount', 'americas', americas);
    }

    if (asia !== '') {
      Meteor.call('Meteor.users.methods.setAccount', 'asia', asia);
    }

    if (southeastAsia !== '') {
      Meteor.call('Meteor.users.methods.setAccount', 'southeastAsia', southeastAsia);
    }

    this.setState({editing: false});
  },

  render() {
    var editButton = '';
    if (this.data.user && this.data.user._id === Meteor.userId()) {
      if (this.state.editing) {
        editButton = <a className="profile-edit" onClick={this.saveData}>Save</a>
      } else {
        editButton = <a className="profile-edit" onClick={this.setEdit}>Edit</a>
      }
    }

    return (
      <ReactTransitionGroup>
        {this.data.user ?
          <div className="container" key="profile">
            <div className="card card--medium card--profile">
              {this.data.user.username} {editButton}
              <div>
                Accounts
                {this.state.editing && (this.data.user._id === Meteor.userId()) ?
                  <ul>
                    <li>
                      <label htmlFor="accounts-europe">Europe</label>
                      <input type="text" id="accounts-europe" className="form-control"
                        placeholder="Name#123" ref="europe"
                        defaultValue={this.data.user.profile.accounts.europe ? this.data.user.profile.accounts.europe : ''} />
                    </li>
                    <li>
                      <label htmlFor="accounts-americas">Americas</label>
                      <input type="text" id="accounts-americas" className="form-control"
                        placeholder="Name#123" ref="americas"
                        defaultValue={this.data.user.profile.accounts.americas ? this.data.user.profile.accounts.americas : ''} />
                    </li>
                    <li>
                      <label htmlFor="accounts-asia">Asia</label>
                      <input type="text" id="accounts-asia" className="form-control"
                        placeholder="Name#123" ref="asia"
                        defaultValue={this.data.user.profile.accounts.asia ? this.data.user.profile.accounts.asia : ''} />
                    </li>
                    <li>
                      <label htmlFor="accounts-southeast-asia">Southeast Asia</label>
                      <input type="text" id="accounts-southeast-asia" className="form-control"
                        placeholder="Name#123" ref="southeastAsia"
                        defaultValue={this.data.user.profile.accounts.southeastAsia ? this.data.user.profile.accounts.southeastAsia : ''} />
                    </li>
                  </ul> :
                  <ul>
                    {this.data.user.profile.accounts.europe ? <li>Europe: {this.data.user.profile.accounts.europe}</li> : ''}
                    {this.data.user.profile.accounts.americas ? <li>Americas: {this.data.user.profile.accounts.americas}</li> : ''}
                    {this.data.user.profile.accounts.asia ? <li>Asia: {this.data.user.profile.accounts.asia}</li> : ''}
                    {this.data.user.profile.accounts.southeastAsia ? <li>Southeast Asia: {this.data.user.profile.accounts.southeastAsia}</li> : ''}
                  </ul>
                }
              </div>
            </div>
          </div> : <Loading />
        }
      </ReactTransitionGroup>
    );
  }
});
