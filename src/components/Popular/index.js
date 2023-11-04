import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Social from '../Social'
import './index.css'

class Popular extends Component {
  state = {
    popular: [],
    isLoading: true,
    failure: false,
  }

  componentDidMount() {
    this.getPopular()
  }

  getPopular = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const resp = await fetch(
      'https://apis.ccbp.in/movies-app/popular-movies',
      options,
    )
    if (resp.ok) {
      const data = await resp.json()
      const newData = data.results.map(el => ({
        backdropPath: el.backdrop_path,
        id: el.id,
        overview: el.overview,
        posterPath: el.poster_path,
        title: el.title,
      }))
      this.setState({popular: newData, isLoading: false})
    } else {
      this.setState({isLoading: false, failure: true})
    }
  }

  successView = () => {
    const {popular} = this.state
    return (
      <>
        <ul className="popular">
          {popular.map(el => (
            <Link to={`/movies/${el.id}`}>
              <li key={el.id}>
                <img src={el.posterPath} alt={el.id} className="thumbnail" />
              </li>
            </Link>
          ))}
        </ul>
        <Social />
      </>
    )
  }

  loader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  errView = () => (
    <div className="errView">
      <img
        src="https://res.cloudinary.com/dxauist1a/image/upload/v1698822484/Background-Complete_thjtsg.png"
        alt="err"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={this.getPopular}>
        Try Again
      </button>
    </div>
  )

  render() {
    const {isLoading, failure} = this.state
    return (
      <div className="main-popular">
        <Header />
        {isLoading && this.loader()}
        {failure ? this.errView() : this.successView()}
      </div>
    )
  }
}

export default Popular
