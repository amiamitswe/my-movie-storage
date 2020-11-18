import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import FavoriteIcon from '@material-ui/icons/Favorite'

import ThemeMood from '../../../context/Context'
import IMG from '../../../assets/IMG/move_if_not_found.jpg'
import classes from './Movie.module.css'

// get props as object alternative of props using {}
const Movie = ({ movieTitle, moviePostal, movieYear, movieType, ifFavorite, setFavorite, handleOpen }) => {

  const themeMood = useContext(ThemeMood).darkMood


  // function for title limite
  const limitTitle = (text, value = 30) => {
    const result = []
    if (movieTitle) {
      if (text.length > value) {
        text.split(' ').reduce((acc, cur) => {
          if (acc + cur.length <= value) {
            result.push(cur)
          }
          return acc += cur.length
        }, 0)
        return (result.join(' ') + ' ...')
      }
    }
    return text
  }


  return (
    <div className={classes.Movie}>
      <div className={classes.FevoritWrap}>
        <h1 onClick={handleOpen}>{limitTitle(movieTitle)}</h1>
        <FavoriteIcon
          onClick={setFavorite}
          style={{ color: ifFavorite ? '#fd0939c9' : themeMood ? '#fff' : '#4a4c5a' }}
          className={classes.Fevorit} />

      </div>
      <div onClick={handleOpen} >
        <img src={moviePostal !== 'N/A' ? moviePostal : IMG} alt={movieTitle} />
        <h3>Release year : {movieYear}</h3>
        <h4 className={classes.MovieType}>type : {movieType}</h4>
      </div>
    </div>
  )
}


// check props types
Movie.propTypes = {
  movieTitle: PropTypes.string,
  handleOpen: PropTypes.func.isRequired,
  moviePostal: PropTypes.string,
  movieYear: PropTypes.string,
  movieType: PropTypes.string
}

export default Movie
