import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import Social from '../Social'
import Header from '../Header'
import TrendView from '../TrendView'
import OriginalView from '../OriginalView'

import './index.css'

class Home extends Component {
  state = {
    poster: '',
    posterLoad: true,
    posterEr: false,
  }

  componentDidMount() {
    this.getOriginal()
  }

  getOriginal = async () => {
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
        posterLoad: false,
      })
    } else {
      this.setState({
        posterLoad: false,
        posterEr: true,
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
            backgroundSize: '100vw 100%',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Header />
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

  render() {
    const {posterLoad, posterEr} = this.state
    return (
      <div className="back-cont">
        {posterLoad && this.loader}
        {posterEr ? (
          <div>{this.errView(this.originalView)}</div>
        ) : (
          <div>{this.posterView()}</div>
        )}
        <div className="slick_section">
          <div>
            <h1 className="slick_name">Trending Now</h1>
            <TrendView />
          </div>
          <div>
            <h1 className="slick_name">Originals</h1>
            <OriginalView />
          </div>
        </div>
        <Social />
      </div>
    )
  }
}

export default Home
