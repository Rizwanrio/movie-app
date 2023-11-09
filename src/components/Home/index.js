import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Social from '../Social'
import Header from '../Header'
import TrendView from '../TrendView'
import OriginalView from '../OriginalView'
import './index.css'

const status = {
  Initial: 'init',
  Failure: 'fail',
  Load: 'loading',
  Success: 'success',
}

class Home extends Component {
  state = {
    poster: '',
    original: [],
    pageStatus: status.Initial,
  }

  componentDidMount() {
    this.getOriginal()
  }

  getOriginal = async () => {
    this.setState({pageStatus: status.Load})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const resp = await fetch(
      'https://apis.ccbp.in/movies-app/originals',
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
      const poster = newData[Math.floor(Math.random() * 11)]
      this.setState({
        poster,
        original: newData,
        pageStatus: status.Success,
      })
    } else {
      this.setState({
        pageStatus: status.Failure,
        original: 'err',
      })
    }
  }

  posterView = () => {
    const {poster} = this.state
    return (
      <div>
        <div
          className="home"
          style={{
            backgroundImage: `url(${poster.posterPath})`,
            height: '40vh',
            backgroundSize: '100% auto',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="header">
            <Header />
          </div>
          <div className="matter">
            <h1>{poster.title}</h1>
            <p>{poster.overview}</p>
            <button type="button" className="play_btn">
              Play
            </button>
          </div>
        </div>
      </div>
    )
  }

  errView = () => (
    <div>
      <img
        src="https://res.cloudinary.com/dxauist1a/image/upload/v1699345219/alert-triangle_wsj4js.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={this.getOriginal}>
        Retry
      </button>
    </div>
  )

  loader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderHomePoster = () => {
    const {pageStatus} = this.state
    switch (pageStatus) {
      case status.Success:
        return this.posterView()
      case status.Failure:
        return this.errView()
      case status.Load:
        return this.loader()

      default:
        return null
    }
  }

  render() {
    const {original} = this.state
    return (
      <div className="back-cont">
        {this.renderHomePoster()}
        <div className="slick_section">
          <div>
            <h1 className="slick_name">Trending Now</h1>
            <TrendView />
          </div>
          <div>
            <h1 className="slick_name">Originals</h1>
            <OriginalView original={original} />
          </div>
        </div>
        <Social />
      </div>
    )
  }
}

export default Home
