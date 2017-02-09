Meteor.methods({
  checkLinkedAccounts: function() {
    var u = Meteor.user();

    var linkedAccounts = {};
    for (var key in u.services) {
      var s = u.services[key];
      switch (key) {
        case 'facebook':
          linkedAccounts.facebook = {
            name: s.name,
            email: s.email,
            gender: s.gender,
            age_range: s.age_range,
            profileImage: `https://graph.facebook.com/${s.id}/picture?type=square`,
          };
          break;
        case 'twitter':
          linkedAccounts.twitter = {
            name: s.screenName,
            profileImage: s.profile_image_url_https
          };
          break;
      }
    }
    Meteor.users.update(u._id, { $set: { 'profile.linkedAccounts': linkedAccounts } });
    return linkedAccounts;
  },
  unlinkService: function(serviceName) {
    check(serviceName, String);
    Accounts.unlinkService(Meteor.userId(), serviceName, function(err) {
      return Meteor.call('checkLinkedAccounts');
    });
  },

});
