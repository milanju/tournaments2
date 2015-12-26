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
              optional: true
            },
            americas: {
              type: String,
              optional: true
            },
            asia: {
              type: String,
              optional: true
            },
            southeastAsia: {
              type: String,
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
    if (Meteor.user()) {
      var query = {};
      query['profile.accounts.' + region] = name;
      Meteor.users.update({_id: Meteor.userId()}, {$set: query});
    } else {
      throw new Meteor.Error('Access denied');
    }
  }
});
