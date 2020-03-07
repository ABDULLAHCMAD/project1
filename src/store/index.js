import rootReducer from './reducer';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import firebase from 'firebase'; 

var config = {
  apiKey: "AIzaSyAI4mRHlv4d1ovfBZL4JFf8Wlh7y8KqDK8",
  authDomain: "blood-238f6.firebaseapp.com",
  databaseURL: "https://blood-238f6.firebaseio.com",
  projectId: "blood-238f6",
  storageBucket: "blood-238f6.appspot.com",
  messagingSenderId: "823032981975",
  appId: "1:823032981975:web:edcbbfc34abf151c168392",
  measurementId: "G-QX51SDYXJ9"
};
  firebase.initializeApp(config);


const store = createStore(
    rootReducer,
    {},
    applyMiddleware(thunk)
);

export default store;