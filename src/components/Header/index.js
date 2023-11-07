import {Component} from 'react'
import {Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import './index.css'

class Header extends Component {
  state = {
    inputVal: '',
    searchBox: false,
  }

  componentDidMount() {
    this.getBox()
  }

  startSearch = () => {
    const {setInput} = this.props
    const {inputVal} = this.state
    console.log(inputVal)
    setInput(inputVal)
  }

  updateSearch = event => {
    console.log(event.target.value)
    this.setState({inputVal: event.target.value})
  }

  getBox = () => {
    const {box} = this.props
    this.setState({searchBox: box})
  }

  render() {
    const {searchBox} = this.state
    return (
      <div className="header_main">
        <div className="left-cont">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dxauist1a/image/upload/v1698124317/Group_7399_i0b20l.png"
              alt="login website logo"
              className="logo"
            />
          </Link>
          <Link to="/" className="menu">
            <p>Home</p>
          </Link>
          <Link to="/popular" className="menu">
            <p>Popular</p>
          </Link>
        </div>
        <div className="right-cont">
          {searchBox ? (
            <div className="searchBox">
              <input
                type="input"
                placeholder="search"
                onChange={this.updateSearch}
              />
              <button
                type="button"
                onClick={this.startSearch}
                className="search_btn"
                testid="searchButton"
              >
                <HiOutlineSearch />
              </button>
            </div>
          ) : (
            <Link to="/search" className="search_icon">
              <button
                testid="searchButton"
                type="button"
                className="searchIcon"
              >
                <HiOutlineSearch />
              </button>
            </Link>
          )}
          <Link to="/account">
            <img
              src="https://res.cloudinary.com/dxauist1a/image/upload/v1698730550/Avatar_sal1y5.png"
              alt="profile"
            />
          </Link>
        </div>
      </div>
    )
  }
}
export default Header