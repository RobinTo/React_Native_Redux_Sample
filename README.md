# React Native with Redux and Navigation Example

Experimental react-native app using redux for state management, and thunk to handle async actions when getting data through ajax from an api or AsyncStorage. Heavily influenced by the example at https://github.com/alinz/example-react-native-redux.

If you intend to clone and run you will have to add your own api key for the riot games api in app/mySecrets.js.<br />*export const myApiKey = "insert_api_key_here";*

![Live game screen](http://i.imgur.com/AWTkt0f.png)

#### Steps to run it on a phone:

1. Install node and the android sdk, make sure you've set the ANDROID_HOME path variable.
2. Make sure that you have the correct usb drivers etc. installed, run *adb devices* and verify that your device is listed
3. Clone the project
4. Run "npm install react-native-cli -g" to install the react native cli globally.
5. Run "npm install" to install dependencies.
6. Run reactNative.bat or just open it in a text editor to see the commands, and run them yourselves in the command line.
