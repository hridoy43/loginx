import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import fireb from './config/fireb'
import { useSelector, useDispatch } from 'react-redux'
import { signIn, signOut } from './actions'

//components
import Login from './components/Login'
import SignUp from './components/SignUp'
import Home from './components/Home'
import PrimarySearchAppBar from './components/AppBar'
import error from './components/404'

const Authonticator = (setUser, dispatch) => {
  fireb.auth().onAuthStateChanged((user) => {
    if (user) {
      //setUser(user);
      dispatch(signIn())
      console.log('Log: Authonticator -> user', user)
    } else {
      //setUser(null);
      dispatch(signOut())
    }
  })
}

function App(props) {
  const [user, setUser] = useState(null);
  const isLogged = useSelector(state => state.isLogged)
  const dispatch = useDispatch();

  useEffect(() => {
    Authonticator(setUser, dispatch);
  }, [])



  return (

    <BrowserRouter>
      {!isLogged ? <Login /> :
        <div>
          <PrimarySearchAppBar />

          <Switch>
            {/* <Route path='/login' component={Login} /> */}
            <Route path='/home' component={Home} />
            <Route path='/*' component={error} />
          </Switch>
        </div>
      }
    </BrowserRouter>
  );
}

export default App;
