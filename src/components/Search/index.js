import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Social from '../Social'
import './index.css'

const statusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Search extends Component {
  state = {
    inputSearch: '',
    apiStatus: statusConstants.initial,
    searchData: [],
  }

  getSearch = async () => {
    this.setState({apiStatus: statusConstants.inProgress})
    const {inputSearch} = this.state
    console.log(inputSearch)
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const resp = await fetch(
      `https://apis.ccbp.in/movies-app/movies-search?search=${inputSearch}`,
      options,
    )
    console.log(
      `https://apis.ccbp.in/movies-app/movies-search?search=${inputSearch}`,
    )

    if (resp.ok) {
      const data = await resp.json()
      console.log(data)
      const newData = data.results.map(el => ({
        backdropPath: el.backdrop_path,
        id: el.id,
        overview: el.overview,
        posterPath: el.poster_path,
        title: el.title,
      }))
      this.setState({apiStatus: statusConstants.success, searchData: newData})
    } else {
      this.setState({apiStatus: statusConstants.failure})
    }
  }

  loader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="errView">
      <img
        src="https://res.cloudinary.com/dxauist1a/image/upload/v1698822484/Background-Complete_thjtsg.png"
        alt="err"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={this.getSearch}>
        Try Again
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {searchData, inputSearch} = this.state
    return (
      <>
        {searchData.length > 0 ? (
          <div className="searchCont">
            {searchData.map(el => (
              <Link to={`/movies/${el.id}`} key={el.id}>
                <img src={el.posterPath} alt={el.title} className="searchImg" />
              </Link>
            ))}
          </div>
        ) : (
          <div className="search-not-found">
            <img
              src="https://res.cloudinary.com/dxauist1a/image/upload/v1699014013/Group_7394_q1s2yy.png"
              alt="no movies"
              className="search-not-found-image"
            />
            <h1 className="search-not-found-heading">
              Your search for {inputSearch} did not find any matches.
            </h1>
          </div>
        )}
      </>
    )
  }

  renderDefaultView = () => (
    <div className="defaultCont">
      <p>Search the movie,by clicking on the search Icon</p>
    </div>
  )

  renderSearchMovies = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case statusConstants.initial:
        return this.renderDefaultView()
      case statusConstants.success:
        return this.renderSuccessView()
      case statusConstants.failure:
        return this.renderFailureView()
      case statusConstants.inProgress:
        return this.loader()

      default:
        return null
    }
  }

  setInput = searchVal => {
    console.log(searchVal)
    this.setState({inputSearch: searchVal}, this.getSearch)
  }

  render() {
    return (
      <div className="searchBack">
        <Header setInput={this.setInput} box />
        <div>{this.renderSearchMovies()}</div>
        <Social />
      </div>
    )
  }
}

export default Search
