import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import {RiAlertFill} from 'react-icons/ri'
import Social from '../Social'
import Header from '../Header'

import './index.css'

class Home extends Component {
  state = {
    trend: [],
    original: [],
    trendEr: false,
    originalEr: false,
    trendLoad: true,
    originalLoad: true,
    poster: '',
    posterLoad: true,
    posterEr: false,
  }

  componentDidMount() {
    this.getTrend()
    this.getOriginal()
  }

  getTrend = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const resp = await fetch(
      'https://apis.ccbp.in/movies-app/trending-movies',
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
      this.setState({trendLoad: false, trend: newData})
    } else {
      this.setState({trendEr: true, trendLoad: false})
    }
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
        originalLoad: false,
        original: newData,
        poster,
        posterLoad: false,
      })
    } else {
      this.setState({
        originalEr: true,
        originalLoad: false,
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

  trendView = () => {
    const {trend} = this.state
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }
    return (
      <div className="slick-container">
        <Slider {...settings}>
          {trend.map(el => {
            const {id, posterPath} = el
            return (
              <div className="slick-item" key={id}>
                <Link to={`/movies/${id}`}>
                  <img
                    className="logo-image"
                    src={posterPath}
                    alt="poster logo"
                  />
                </Link>
              </div>
            )
          })}
        </Slider>
      </div>
    )
  }

  originalView = () => {
    const {original} = this.state
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }
    return (
      <div className="slick-container">
        <Slider {...settings}>
          {original.map(el => {
            const {id, posterPath} = el
            return (
              <div className="slick-item" key={id}>
                <img
                  className="logo-image"
                  src={posterPath}
                  alt="poster logo"
                />
              </div>
            )
          })}
        </Slider>
      </div>
    )
  }

  errView = fn => (
    <div>
      <RiAlertFill />
      <p>Something went wrong. Please try again.</p>
      <button type="button" onClick={fn()}>
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
    const {
      trendEr,
      trendLoad,
      originalEr,
      originalLoad,
      posterLoad,
      posterEr,
    } = this.state
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
            <p className="slick_name">Trending Now</p>
            <div>{trendLoad && this.loader()}</div>
            <div>
              {trendEr ? (
                <div>{this.errView(this.trendView)}</div>
              ) : (
                <div className="main-container">{this.trendView()}</div>
              )}
            </div>
          </div>
          <div>
            <p className="slick_name">Originals</p>
            <div>{originalLoad && this.loader()}</div>
            <div>
              {originalEr ? (
                <div>{this.errView(this.originalView)}</div>
              ) : (
                <div className="main-container">{this.originalView()}</div>
              )}
            </div>
          </div>
        </div>
        <Social />
      </div>
    )
  }
}

export default Home
