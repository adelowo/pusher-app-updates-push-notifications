import { Alert, Linking, AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import RNPusherPushNotifications from 'react-native-pusher-push-notifications';

const appUpdateInterest = 'debug-updates';

// Initialize notifications
export const init = () => {
  // Set your app key and register for push
  RNPusherPushNotifications.setInstanceId(
    'XXX-XXXX-XXXXX-XXX-XXXXX'
  );

  // Init interests after registration
  RNPusherPushNotifications.on('registered', () => {
    subscribe(appUpdateInterest);
  });

  // Setup notification listeners
  RNPusherPushNotifications.on('notification', handleNotification);
};

// Handle notifications received
const handleNotification = notification => {
  // iOS app specific handling
  if (Platform.OS === 'ios') {
    Alert.alert('App update', notification.userInfo.aps.alert.body, [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Update now',
        onPress: () =>
          Linking.openURL(
            'itms-apps://itunes.apple.com/ng/app/testflight/id899247664?mt=8'
          ),
      },
    ]);
  }
};

// Subscribe to an interest
const subscribe = interest => {
  console.log(interest);
  RNPusherPushNotifications.subscribe(
    interest,
    (statusCode, response) => {
      console.error(statusCode, response);
    },
    () => {
      console.log('Success');
    }
  );
};

init();

AppRegistry.registerComponent(appName, () => App);
