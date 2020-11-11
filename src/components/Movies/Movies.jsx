import React, { useEffect, useState } from 'react'
import axios from '../../axios-orders'

import Movie from './Movie/Movie'
import { Spinner } from '../UI/Spinner/Spinner'
import Error from '../UI/Error/Error'
import Modal from '../UI/Modal/Modal'
import ModalMovie from './ModalMovie/ModalMovie'
import classes from './Movies.module.css'

const Movies = () => {
  
  const [movie, setMovie] = useState([])
  const [errormsg, setErrormsg] = useState(null)
  const [open, setOpen] = useState(false)
  const [selectMovie, setSelectMovie] = useState(null)

  const handleOpen = (id) => {
    setOpen(true)
    setSelectMovie(id)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const series = ['marvel', 'avengers', 'iron man', 'harry potter', '3 idiots']

  useEffect(() => {
    const API_KEY = '747adb9e'
    const promise = series.map(series => {
      return axios.get(`/?apikey=${API_KEY}&s=${encodeURIComponent(series)}`)
        .then(res => res.data.Search)
    })

    Promise.all(promise)
      .then((rs) => setMovie(rs))
      .catch(error => setErrormsg(error.message))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  let movieData = <Spinner />
  if (errormsg) {
    movieData = <Error>{errormsg}</Error>
  }

  if (movie.length > 0) {
    movieData = movie.map(res => res.map(mov => (
      <Movie
      style={{zIndex: '9999'}}
        key={mov.imdbID}
        movieTitle={mov.Title}
        moviePostal={mov.Poster}
        movieYear={mov.Year}
        movieType={mov.Type}
        handleOpen={() => handleOpen(mov.imdbID)} />
    )))
  }

  return (
    <React.Fragment>
      <h1>Your Movies</h1>

      <Modal

        modalOpen={open}
        modalClose={handleClose}>
        <ModalMovie dataInfo={selectMovie} />
      </Modal>
      <div className={classes.Movies}>
        {movieData}
      </div>
    </React.Fragment>
  )
}

export default Movies
