import {BsGoogle} from 'react-icons/bs'
import {
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiFillYoutube,
} from 'react-icons/ai'
import './index.css'

const Social = () => (
  <div className="social">
    <div className="social_icons">
      <BsGoogle />
      <AiOutlineTwitter />
      <AiOutlineInstagram />
      <AiFillYoutube />
    </div>
    <p>Contact Us</p>
  </div>
)

export default Social
