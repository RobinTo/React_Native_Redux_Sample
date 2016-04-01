# React_Native_Redux_Sample

Experimental react-native app using redux for state management, and thunk to retrieve data through ajax from an api. Heavily influenced by the example at https://github.com/alinz/example-react-native-redux.

Currently retrieves a list of characters in the game League of Legends from their official api at https://developer.riotgames.com and shows them in a listview.

<img src="http://i.imgur.com/WUGFCvx.png" width="250">

If you intend to clone and run you will have to add your own api key for the riot games api in app/mySecrets.js.<br />*export const myApiKey = "insert_api_key_here";*
