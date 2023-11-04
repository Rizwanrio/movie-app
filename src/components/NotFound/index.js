import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class NotFound extends Component {
  render() {
    return (
      <div className="not_found_page">
        <h1>Lost Your Way</h1>
        <p>
          we are sorry, the page you requested could not be found Please go back
          to the homepage.
        </p>
        <Link to="/">
          <button type="button">Go To Home</button>
        </Link>
      </div>
    )
  }
}

export default NotFound
