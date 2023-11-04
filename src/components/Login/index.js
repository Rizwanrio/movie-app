import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    err: '',
  }

  login = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok) {
      this.setState({err: ''})
      this.loginSuccessful(data.jwt_token)
    } else {
      this.setState({err: data.error_msg})
    }
  }

  loginSuccessful = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
    const {username, password} = this.state
    localStorage.setItem('username', username)
    localStorage.setItem('password', password)
  }

  user = event => {
    this.setState({username: event.target.value})
  }

  pwd = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, err} = this.state
    return (
      <div className="main">
        <div className="loginLogo">
          <img
            src="https://res.cloudinary.com/dxauist1a/image/upload/v1698124317/Group_7399_i0b20l.png"
            alt="login website logo"
            className="head"
          />
        </div>
        <div className="cont">
          <h1 className="loginHead">Login</h1>
          <form onSubmit={this.login}>
            <label htmlFor="user">USERNAME</label>
            <input
              type="text"
              id="user"
              value={username}
              onChange={this.user}
              className="cred"
            />
            <label htmlFor="pwd">PASSWORD</label>
            <input
              type="password"
              id="pwd"
              value={password}
              onChange={this.pwd}
              className="cred"
            />
            {err.length !== 0 && <p className="err">{err}</p>}
            <button type="submit" className="login_btn">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
