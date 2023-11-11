import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import LoginContext from './Context/LoginContext'
import Login from './components/Login'
import Home from './components/Home'
import Account from './components/Account'
import Popular from './components/Popular'
import MovieItemDetails from './components/MovieItemDetails'
import Search from './components/Search'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

class App extends Component {
  state = {
    userName: '',
    passWord: '',
  }

  updateUser = user => {
    this.setState({userName: user})
  }

  updatePassword = pwd => {
    this.setState({passWord: pwd})
  }

  render() {
    const {userName, passWord} = this.state
    return (
      <LoginContext.Provider
        value={{
          userName,
          passWord,
          updateUser: this.updateUser,
          updatePassword: this.updatePassword,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/popular" component={Popular} />
          <ProtectedRoute exact path="/search" component={Search} />
          <ProtectedRoute exact path="/account" component={Account} />
          <ProtectedRoute
            exact
            path="/movies/:id"
            component={MovieItemDetails}
          />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </LoginContext.Provider>
    )
  }
}
export default App
