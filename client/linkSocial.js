Template.linkSocial.events({
  'click #linkTwitter': function(e, template) {

    // WHY DOES THIS NOT WORK.  force_login should ask user for password
    Meteor.linkWithTwitter({force_login: true}, function(err, data) {
      if (err) console.log(err.message || err);
      Meteor.call('checkLinkedAccounts');
    });
  },
  'click #unlinkTwitter': function(e, template) {
    Meteor.call('unlinkService', 'twitter', function(err, data) {
      if (err) console.log(err.message || err);
    });
  },

  'click #linkFacebook': function(e, template) {

    // WHY DOES THIS NOT WORK.  auth_type: reauthenticate should ask user for password
    Meteor.linkWithFacebook({auth_type: 'reauthenticate' }, function(err, data) {
      if (err) console.log(err.message || err);
      Meteor.call('checkLinkedAccounts');
    });
  },
  'click #unlinkFacebook': function(e, template) {
    Meteor.call('unlinkService','facebook', function(err, data) {
      if (err) console.log(err.message || err);
    });
  },
});
