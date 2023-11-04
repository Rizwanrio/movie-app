import Cookies from 'js-cookie'
import Header from '../Header'
import Social from '../Social'
import './index.css'

const Account = props => {
  const username = localStorage.getItem('username')
  const password = localStorage.getItem('password')

  const passwordEncrypt = '*'.repeat(password.length)
  const onClickLogout = () => {
    const {history} = props
    localStorage.clear()
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="account_main">
      <Header />
      <div className="account">
        <h1>Account</h1>
        <hr />
        <div className="member_data">
          <h2>Member ship</h2>
          <div className="member_value">
            <p>{username}</p>
            <p>{passwordEncrypt}</p>
          </div>
        </div>
        <hr />
        <div className="member_data">
          <h2>Plan details</h2>
          <p className="member_value">Premium Ultra HD</p>
        </div>
        <hr />
        <div className="log_btn_div">
          <button type="button" onClick={onClickLogout} className="logout_btn">
            Logout
          </button>
        </div>
      </div>

      <Social />
    </div>
  )
}

export default Account
