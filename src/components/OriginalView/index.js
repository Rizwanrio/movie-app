import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class OriginalView extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getOriginal()
  }

  getOriginal = () => {
    const {original} = this.props
    if (original === 'err') {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
    this.setState({apiStatus: apiStatusConstants.success})
  }

  originalView = () => {
    const {original} = this.props
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
            infinite: true,
            dots: false,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 1,
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
          {original.map(el => {
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

  renderOriginalNow = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.originalView()
      case apiStatusConstants.failure:
        return this.errView()
      case apiStatusConstants.inProgress:
        return this.loader()

      default:
        return null
    }
  }

  render() {
    return <div>{this.renderOriginalNow()}</div>
  }
}

export default OriginalView
