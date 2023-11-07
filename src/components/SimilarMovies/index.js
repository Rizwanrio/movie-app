import {Link} from 'react-router-dom'
import './index.css'

const SimilarMovie = props => {
  const {element, getId} = props
  const {id, posterPath, title} = element
  const updateId = () => {
    getId(id)
  }

  return (
    <Link to={`/movies/${id}`} key={id} onClick={updateId}>
      <img src={posterPath} alt={title} className="similar_img" />
    </Link>
  )
}

export default SimilarMovie
