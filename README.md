# React_Native_Redux_Sample

Experimental react-native app using redux for state management, and thunk to retrieve data through ajax from an api. Heavily influenced by the example at https://github.com/alinz/example-react-native-redux.

Currently retrieves a list of characters in the game League of Legends from their official api at https://developer.riotgames.com and shows them in a listview. Simple navigation is also included, if you click on an item it takes you to a detail page, and back if you use native back. I've only tested the app on android.

<img src="http://i.imgur.com/WUGFCvx.png" width="250"><br />
<i>The initial screen of the app running on a Sony Xperia Z2</i>

If you intend to clone and run you will have to add your own api key for the riot games api in app/mySecrets.js.<br />*export const myApiKey = "insert_api_key_here";*
