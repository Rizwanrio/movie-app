import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TrendView extends Component {
  state = {
    trendingNow: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTrending()
  }

  getTrending = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/trending-movies`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()

      const updatedData = data.results.map(each => ({
        id: each.id,
        posterPath: each.poster_path,
        title: each.title,
      }))

      this.setState({
        trendingNow: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  trendView = () => {
    const {trendingNow} = this.state
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    }
    return (
      <>
        <Slider {...settings}>
          {trendingNow.map(el => {
            const {id, posterPath, title} = el
            return (
              <div className="slick-item" key={id}>
                <Link to={`/movies/${id}`}>
                  <img className="logo-image" src={posterPath} alt={title} />
                </Link>
              </div>
            )
          })}
        </Slider>
      </>
    )
  }

  errView = () => (
    <div>
      <img
        src="https://res.cloudinary.com/dxauist1a/image/upload/v1699345219/alert-triangle_wsj4js.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={this.getTrending}>
        Retry
      </button>
    </div>
  )

  loader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderTrendingNow = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.trendView()
      case apiStatusConstants.failure:
        return this.errView()
      case apiStatusConstants.inProgress:
        return this.loader()

      default:
        return null
    }
  }

  render() {
    return <div>{this.renderTrendingNow()}</div>
  }
}

export default TrendView
