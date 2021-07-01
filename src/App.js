import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import TodoPage from './TodoPage';

const TOKEN_KEY = 'TOKEN';

export default class App extends Component {
  state = {
    token: localStorage.getItem(TOKEN_KEY)
  }

  login = (userToken) => {
    this.setState({ token: userToken})
    localStorage.setItem(TOKEN_KEY, userToken)
  }

  logout = () => {
    this.setState({ token: ''})
    localStorage.setItem('TOKEN', '')
  }

  render() {

    return (
      <Router>
        <div>
          <div>
            <Link to='/'>HomePage</Link> 
            <Link to='/login'>Login</Link> 
            <Link to='/signup'>Signup</Link> 
            <Link to='/todos'>Todos</Link> 
          </div>
          <Switch>
            <Route
              path='/'
              exact
              render={(routerProps) => <HomePage {...routerProps} />}/>
            <Route
              path='/signup'
              exact
              render={(routerProps) => <SignUpPage login={this.login} {...routerProps} />}/>
            <Route
              path='/login'
              exact
              render={(routerProps) => <LoginPage login={this.login} {...routerProps} />}/>
            <Route
              path='/todos'
              exact
              render={(routerProps) =>
                this.state.token
                  ? <TodoPage {...routerProps} token={this.state.token} />
                  : <Redirect to='/' />
              }
              />
          </Switch>
        </div>
      </Router>
    )
  }
}

