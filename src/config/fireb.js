import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAlwEf3KGhD5IaOb2uGGTLFVXzmbFOfemg",
    authDomain: "shob-hobe.firebaseapp.com",
    databaseURL: "https://shob-hobe.firebaseio.com",
    projectId: "shob-hobe",
    storageBucket: "shob-hobe.appspot.com",
    messagingSenderId: "859591594573",
    appId: "1:859591594573:web:13eb33d649a4195197c204"
};

const fireb = firebase.initializeApp(firebaseConfig);

export default fireb;