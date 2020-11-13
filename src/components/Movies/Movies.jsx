import React, { useEffect, useState, useContext } from 'react'
import axios from '../../axios-orders'

import Movie from './Movie/Movie'
import { Spinner } from '../UI/Spinner/Spinner'
import Error from '../UI/Error/Error'
import Modal from '../UI/Modal/Modal'
import ModalMovie from './ModalMovie/ModalMovie'
import SearchMovie from '../../context/Context'
import classes from './Movies.module.css'

const Movies = () => {

  const searchMovie = useContext(SearchMovie).searchMovie
  const movieByYear = useContext(SearchMovie).movieByYear

  const [movie, setMovie] = useState([])
  const [errormsg, setErrormsg] = useState()
  const [open, setOpen] = useState(false)
  const [selectMovie, setSelectMovie] = useState(null)
  const [year, setyear] = useState()
  const [searchByMovie, setSearchByMovie] = useState(null)

  const API_KEY = '747adb9e'


  if (year !== movieByYear) {
    setyear(movieByYear)
  }

  if (searchByMovie !== searchMovie) {
    setSearchByMovie(searchMovie)
  }

  const handleOpen = (id) => {
    setOpen(true)
    setSelectMovie(id)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const defaultMovie = () => {
    let series = ['marvel', 'avengers', 'iron man', 'harry potter', '3 idiots']
    const promise = series.map(series => {
      return axios.get(`/?apikey=${API_KEY}&s=${encodeURIComponent(series)}`)
        .then(res => res.data.Search)
    })

    Promise.all(promise)
      .then((rs) => setMovie(rs))
      .catch(error => setErrormsg(error))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  const searchForMovie = () => {
    axios.get(`/?apikey=${API_KEY}&s=${encodeURIComponent(searchByMovie)}`)
      .then((rs) => !rs.data.hasOwnProperty('Error') ? setMovie(rs.data.Search) : setMovie(''))
      .catch(error => setErrormsg(error.message))
  }

  const testooo = () => {
    axios.get(`/?apikey=${API_KEY}&s=${encodeURIComponent(searchByMovie)}&y=${year}`)
      .then((rs) => !rs.data.hasOwnProperty('Error') ? setMovie(rs.data.Search) : setMovie(''))
      .catch(error => setErrormsg(error.message))
  }


  useEffect(() => {
    if (movieByYear !== '') {
      testooo()
    }

    else if (searchByMovie !== null) {
      searchForMovie()
    }
    else {
      defaultMovie()
    }

    return () => {
      setMovie([])
      setyear()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchByMovie, movieByYear])


  let movieData = <Spinner />
  if (searchByMovie === null && movieByYear === '') {
    if (errormsg) {
      movieData = <Error>{errormsg.message}</Error>
    }
    else {
      if (movie.length > 0) {
        movieData = movie.map(res => res.map(mov => (
          <Movie
            style={{ zIndex: '9999' }}
            key={mov.imdbID}
            movieTitle={mov.Title}
            moviePostal={mov.Poster}
            movieYear={mov.Year}
            movieType={mov.Type}
            handleOpen={() => handleOpen(mov.imdbID)} />
        )))
      }
    }
  }

  else {
    if (movie === "") {
      movieData = <Error>No MOVIES found in this name "<b>
        <u>{searchByMovie}</u></b>{year !== '' ?
          <span>" in "<b><u>{year}</u></b>" year </span> : null} Sorry !!! </Error>
    }
    else {
      if (errormsg) {
        movieData = <Error>{errormsg}</Error>
      }

      if (movie.length > 0) {
        movieData = movie.map((mov, index) =>
          <Movie
            style={{ zIndex: '9999' }}
            key={index + `${mov.imdbID}`}
            movieTitle={mov.Title}
            moviePostal={mov.Poster}
            movieYear={mov.Year}
            movieType={mov.Type}
            handleOpen={() => handleOpen(mov.imdbID)} />
        )
      }
    }
  }

  return (
    <React.Fragment>
      <h1>Your Movies</h1>

      <div className={classes.Movies}>
        {movieData}
      </div>

      <Modal
        modalOpen={open}
        modalClose={handleClose}>
        <ModalMovie dataInfo={selectMovie} />
      </Modal>
    </React.Fragment>
  )
}

export default Movies
