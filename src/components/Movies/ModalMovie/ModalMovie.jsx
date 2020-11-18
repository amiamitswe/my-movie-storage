import React, { useState, useEffect } from 'react'
import { API } from '../../../API/API'

import axios from '../../../axios-orders'
import { Spinner2 } from '../../UI/Spinner/Spinner'
import Error from '../../UI/Error/Error'
import IMG from '../../../assets/IMG/move_if_not_found.jpg'
import classes from './ModalMovie.module.css'

const ModalMovie = (props) => {

  const [movieData, setMovieData] = useState()
  const [errorMsg, setErrorMsg] = useState(null)

  // get ingo according to movie id
  useEffect(() => {
    const API_KEY = API
    const MOVIE_ID = props.dataInfo

    axios.get(`/?i=${MOVIE_ID}&apikey=${API_KEY}`)
      .then(res => setMovieData(res.data))
      .catch(err => setErrorMsg(err.message))

    return () => {
      setMovieData(null)
    }
  }, [props.dataInfo])


  let renderMovieData = <Spinner2 />

  if (errorMsg) {
    renderMovieData = <Error>{errorMsg}</Error>
  }

  if (movieData) {
    renderMovieData = (
      <React.Fragment>
        <div className={classes.ModalMovie}>

          <div className={classes.MoviePostal}>
            <img src={movieData.Poster !== 'N/A' ? movieData.Poster : IMG} alt={movieData.Title} />
            <h1 style={{ textAlign: 'center' }}>{movieData.Year}</h1>
          </div>

          <div className={classes.Info}>
            <h1>Name : {movieData.Title}</h1>
            <h3>Genre : <span className={classes.LabelData}>{movieData.Genre}</span></h3>
            <h3>Type : <span className={classes.LabelData}>{movieData.Type}</span></h3>
            <h3>Release Date : <span className={classes.LabelData}>{movieData.Released}</span></h3>
            <h3>Runtime : <span className={classes.LabelData}>{movieData.Runtime}</span></h3>
            <h3>Director By : <span className={classes.LabelData}>{movieData.Director}</span></h3>
            <h3>Production : <span className={classes.LabelData}>{movieData.Production}</span></h3>
            <h3>Language : <span className={classes.LabelData}>{movieData.Language}</span></h3>
            <h3>Country : <span className={classes.LabelData}>{movieData.Country}</span></h3>
            <h3>Actors : <span className={classes.LabelData}>{movieData.Actors}</span></h3>
            <h3>Script Writers : <span className={classes.LabelData}>{movieData.Writer}</span></h3>
          </div>
        </div>

        <div className={classes.AdiInfo}>
          <div className={classes.Rating}>
            <h3>IMDB Rating : <span className={classes.LabelData}>{movieData.imdbRating} Out of 10</span></h3>
            <h3>IMDB Votes : <span className={classes.LabelData}>{movieData.imdbVotes}</span></h3>
            <h3>Metascore : <span className={classes.LabelData}>{movieData.Metascore}</span></h3>
            <h3>BoxOffice : <span className={classes.LabelData}>{movieData.BoxOffice}</span></h3>
          </div>
          <h3>Awards : <span className={classes.LabelData}>{movieData.Awards}</span></h3>
        </div>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      {renderMovieData}
    </React.Fragment>
  )
}

export default ModalMovie
