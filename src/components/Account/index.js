import Cookies from 'js-cookie'
import Header from '../Header'
import Social from '../Social'
import LoginContext from '../../Context/LoginContext'
import './index.css'

const Account = props => {
  const onClickLogout = () => {
    const {history} = props
    localStorage.clear()
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <LoginContext>
      {value => {
        const {userName, passWord} = value
        const passwordEncrypted = '*'.repeat(passWord.length)

        return (
          <>
            <div className="account_main">
              <Header />
              <div className="account">
                <h1>Account</h1>
                <hr />
                <div className="member_data">
                  <p>Member ship</p>
                  <div className="member_value">
                    <p>{userName}</p>
                    <p>{passwordEncrypted}</p>
                  </div>
                </div>
                <hr />
                <div className="member_data">
                  <p>Plan details</p>
                  <p className="member_value">Premium</p>
                  <p>Ultra HD</p>
                </div>

                <hr />
                <div className="log_btn_div">
                  <button
                    type="button"
                    onClick={onClickLogout}
                    className="logout_btn"
                  >
                    Logout
                  </button>
                </div>
              </div>
              <Social />
            </div>
          </>
        )
      }}
    </LoginContext>
  )
}

export default Account
