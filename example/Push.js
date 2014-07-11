function Push() {
}

Push.prototype = {

  registerBaidu : function() {
    var self = this;

    var baiduPush = require('com.steedos.push.baidu');

    Ti.API.info("registerBaidu start ...");

    baiduPush.registerBcm({
      success : function(e) {
        Ti.API.info('JS registration success event: ' + JSON.stringify(e.data));
        alert('Yeah JS registration success event: ' + JSON.stringify(e.data));
      },
      error : function(e) {
        Ti.API.error("Error during registration : " + e.error);
        alert("Error during registration : " + e.error);
      },
      callback : function(e) {// called when a push notification is received
        Ti.API.info('JS message event: ' + JSON.stringify(e.data));
        alert('JS message event: ' + JSON.stringify(e.data));
      }
    });
  },

  registerApple : function() {
    var self = this;
    Ti.API.debug("registerApple start ...");
    Titanium.Network.registerForPushNotifications({
      types : [Titanium.Network.NOTIFICATION_TYPE_BADGE, Titanium.Network.NOTIFICATION_TYPE_ALERT,
      // Titanium.Network.NOTIFICATION_TYPE_NEWSSTAND,
      Titanium.Network.NOTIFICATION_TYPE_SOUND],
      success : function(e) {
        self.deviceToken = e.deviceToken;

        Ti.API.debug("registerApple success: " + self.deviceToken);
        Ti.API.debug("Push notification types: " + Titanium.Network.remoteNotificationTypes);
        Ti.API.debug("Push notification enabled: " + Titanium.Network.remoteNotificationsEnabled);

        self.getToken();
      },
      error : function(e) {
        alert("Error during registration: " + e.error);
        Ti.API.info("Error during registration: " + e.error);
      },
      callback : function(e) {
        var data = e.data;
        var badge = data.badge;
        if (badge > 0) {
          Titanium.UI.iPhone.appBadge = badge;
        } else {
          Titanium.UI.iPhone.appBadge = 0;
        }
        Ti.App.fireEvent('steedos:didReceiveNotification', e.data);
      }
    });
  }
};

module.exports = Push;
