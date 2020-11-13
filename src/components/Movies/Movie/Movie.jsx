import React from 'react'
import PropTypes from 'prop-types'

import classes from './Movie.module.css'

const Movie = ({ movieTitle, moviePostal, movieYear, movieType, handleOpen }) => {

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
    <div onClick={handleOpen} className={classes.Movie}>
      <h1>{limitTitle(movieTitle)}</h1>
      <img src={moviePostal} alt={movieTitle} />
      <h3>Release year : {movieYear}</h3>
      <h4 className={classes.MovieType}>type : {movieType}</h4>
    </div>
  )
}

Movie.propTypes = {
  movieTitle: PropTypes.string,
  handleOpen: PropTypes.func.isRequired,
  moviePostal: PropTypes.string,
  movieYear: PropTypes.string,
  movieType: PropTypes.string
};

export default Movie
