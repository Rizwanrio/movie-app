import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Social from '../Social'
import SimilarMovie from '../SimilarMovies'
import './index.css'

const status = {
  Initial: 'init',
  Failure: 'fail',
  Load: 'loading',
  Success: 'success',
}

class MovieItemDetails extends Component {
  state = {
    movieDetails: [],
    idMovie: '',
    pageStatus: status.Initial,
  }

  componentDidMount() {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({idMovie: id}, this.getDetails)
  }

  getId = id => {
    this.setState({idMovie: id}, this.getDetails)
  }

  getDetails = async () => {
    this.setState({pageStatus: status.Load})
    const {idMovie} = this.state

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const resp = await fetch(
      `https://apis.ccbp.in/movies-app/movies/${idMovie}`,
      options,
    )
    console.log(resp)
    if (resp.ok) {
      const data = await resp.json()

      const newData = {
        adult: data.movie_details.adult,
        backdropPath: data.movie_details.backdrop_path,
        budget: data.movie_details.budget,
        genres: data.movie_details.genres,
        id: data.movie_details.id,
        overview: data.movie_details.overview,
        posterPath: data.movie_details.poster_path,
        title: data.movie_details.title,
        releaseDate: data.movie_details.release_date,
        runtime: data.movie_details.runtime,
        similarMovies: data.movie_details.similar_movies.map(el1 => ({
          backdropPath: el1.backdrop_path,
          id: el1.id,
          overview: el1.overview,
          posterPath: el1.poster_path,
          title: el1.title,
        })),
        spokenLanguages: data.movie_details.spoken_languages.map(el2 => ({
          id: el2.id,
          englishName: el2.english_name,
        })),
        voteAverage: data.movie_details.vote_average,
        voteCount: data.movie_details.vote_count,
      }
      this.setState({movieDetails: newData, pageStatus: status.Success})
    } else {
      this.setState({pageStatus: status.Failure})
    }
  }

  loader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderFailedView = () => (
    <div className="errView">
      <img
        src="https://res.cloudinary.com/dxauist1a/image/upload/v1698822484/Background-Complete_thjtsg.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={this.getDetails}>
        Try Again
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {movieDetails} = this.state
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    const d = new Date(movieDetails.releaseDate)
    const monthName = months[d.getMonth()]
    const date = new Date(movieDetails.releaseDate)
    const year = date.getFullYear()
    const day = date.getDay().toString()
    let dateEndingWord
    if (day.endsWith('1')) {
      dateEndingWord = 'st'
    } else if (day.endsWith('2')) {
      dateEndingWord = 'nd'
    } else if (day.endsWith('3')) {
      dateEndingWord = 'rd'
    } else {
      dateEndingWord = 'th'
    }
    return (
      <>
        <div
          className="banner"
          style={{
            backgroundImage: `url(${movieDetails.posterPath})`,
            height: '40vh',
            backgroundSize: '100% auto',
            color: '#ffffff',
          }}
        >
          <h1>{movieDetails.title}</h1>
          <div className="movie_specs">
            <p>
              {Math.floor(movieDetails.runtime / 60)}h{' '}
              {movieDetails.runtime % 60}m
            </p>
            <p className="certification">{movieDetails.adult ? 'A' : 'U/A'}</p>
            <p>{year}</p>
          </div>
          <p>{movieDetails.overview}</p>
          <button type="button" className="play_btn">
            Play
          </button>
        </div>
        <div className="detail_middle_cont">
          <ul className="extra_details">
            <li className="detail_tabs">
              <h3 className="detail_head">Genres</h3>
              <ul>
                {movieDetails.genres.map(el => (
                  <li key={el.id}>
                    <p>{el.name}</p>
                  </li>
                ))}
              </ul>
            </li>
            <li className="detail_tabs">
              <h3 className="detail_head">Audio Available</h3>
              <ul>
                {movieDetails.spokenLanguages.map(el => (
                  <li key={el.id}>
                    <p>{el.englishName}</p>
                  </li>
                ))}
              </ul>
            </li>
            <li className="detail_tabs">
              <h3 className="detail_head">Rating Count</h3>
              <p>{movieDetails.voteCount}</p>
              <h3 className="detail_head">Rating Average</h3>
              <p>{movieDetails.voteAverage}</p>
            </li>
            <li className="detail_tabs">
              <h3 className="detail_head">Budget</h3>
              <p>{movieDetails.budget}</p>
              <h3 className="detail_head">Release Date</h3>
              <p>{`${day}${dateEndingWord} ${monthName} ${year}`}</p>
            </li>
          </ul>
          <div>
            <h2 className="more">More like this</h2>
            <div className="similar">
              {movieDetails.similarMovies.map(el => (
                <SimilarMovie element={el} getId={this.getId} />
              ))}
            </div>
          </div>
        </div>
        <Social />
      </>
    )
  }

  renderView = () => {
    const {pageStatus} = this.state
    switch (pageStatus) {
      case 'loading':
        return this.loader()
      case 'success':
        return this.renderSuccessView()
      case 'fail':
        return this.renderFailedView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="detail">
        <div className="detail_cont">
          <div className="header">
            <Header />
          </div>
          {this.renderView()}
        </div>
      </div>
    )
  }
}

export default MovieItemDetails
