Meteor.users.schema = new SimpleSchema({
username: {
      type: String,
      optional: true
    },
    emails: {
      type: Array,
      optional: true
    },
    profile: {
      type: new SimpleSchema({
        accounts: {
          type: new SimpleSchema({
            europe: {
              type: String,
              min: 1,
              optional: true
            },
            americas: {
              type: String,
              min: 1,
              optional: true
            },
            asia: {
              type: String,
              min: 1,
              optional: true
            },
            southeastAsia: {
              type: String,
              min: 1,
              optional: true
            }
          }),
          defaultValue: {}
        }
      }),
      defaultValue: {}
    },
    "emails.$": {
      type: Object
    },
    "emails.$.address": {
      type: String,
      regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
      type: Boolean
    },
    createdAt: {
      type: Date
    },
    services: {
      type: Object,
      optional: true,
      blackbox: true
    },
    roles: {
      type: Object,
      optional: true,
      blackbox: true
    },
    roles: {
      type: [String],
      optional: true
    },
    heartbeat: {
      type: Date,
      optional: true
    }
});

Meteor.users.attachSchema(Meteor.users.schema);

Meteor.methods({
  'Meteor.users.methods.setAccount'(region, name) {
    if (Meteor.isServer) {
      if (Meteor.user()) {
        if (name === '') {
          throw new Meteor.Error('Account name may not be empty');
        }
        console.log(name);
        var query = {};
        query['profile.accounts.' + region] = name;
        Meteor.users.update({_id: Meteor.userId()}, {$set: query}, function(err, res) {
          console.log(err);
          console.log(res);
          if (err) {
            throw err;
          }
        });
      } else {
        throw new Meteor.Error('Access denied');
      }
    }
  }
});
