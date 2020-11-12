import React from 'react'
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
      <h3>{movieYear} <span>type : {movieType}</span></h3>
    </div>
  )
}

export default Movie
