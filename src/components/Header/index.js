import {Component} from 'react'
import {Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {MdMenuOpen} from 'react-icons/md'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import './index.css'

class Header extends Component {
  state = {
    inputVal: '',
    searchBox: false,
    menu: false,
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

  showMenu = () => {
    this.setState({menu: true})
  }

  closeMenu = () => {
    this.setState({menu: false})
  }

  render() {
    const {searchBox, menu} = this.state

    return (
      <nav className="header_outer">
        <div className="header_main">
          <div className="left-cont">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dxauist1a/image/upload/v1698124317/Group_7399_i0b20l.png"
                alt="website logo"
                className="logo"
              />
            </Link>
            <ul>
                <li>
                    <Link to="/" className="menu menu_lg">
                    <p>Home</p>
                    </Link>
                </li>
                <li>
                    <Link to="/popular" className="menu menu_lg">
                    <p>Popular</p>
                    </Link>
                </li>
            </ul>       
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
            <div className="menu_lg">
              <Link to="/account">
                <img
                  src="https://res.cloudinary.com/dxauist1a/image/upload/v1698730550/Avatar_sal1y5.png"
                  alt="profile"
                />
              </Link>
            </div>
            <div className="menu_sm_icon">
              <MdMenuOpen onClick={this.showMenu} />
            </div>
          </div>
        </div>
        {menu && (
          <div className="header_main">
            <ul className="sm_menu">
              <Link to="/" className="menu">
                <li>Home</li>
              </Link>
              <Link to="/popular" className="menu">
                <li>Popular</li>
              </Link>
              <Link to="/account" className="menu">
                <li>Account</li>
              </Link>
            </ul>
            <AiOutlineCloseCircle onClick={this.closeMenu} className="cross" />
          </div>
        )}
      </nav>
    )
  }
}
export default Header
