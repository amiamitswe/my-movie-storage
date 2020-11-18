import React, { useEffect, useState, useContext } from 'react'
import { API } from '../../API/API'
import axios from '../../axios-orders'

import Movie from './Movie/Movie'
import { Spinner } from '../UI/Spinner/Spinner'
import Error from '../UI/Error/Error'
import Modal from '../UI/Modal/Modal'
import ModalMovie from './ModalMovie/ModalMovie'
import SearchMovie from '../../context/Context'
import FavoriteList from './FavoriteMovie/FavoriteMovie'
import ThemeMood from '../../context/Context'
import classes from './Movies.module.css'

const Movies = (props) => {

  // get context data
  const searchMovie = useContext(SearchMovie).searchMovie
  const movieByYear = useContext(SearchMovie).movieByYear
  const themeMood = useContext(ThemeMood).darkMood

  // use state
  const [movie, setMovie] = useState([])
  const [errormsg, setErrormsg] = useState()
  const [open, setOpen] = useState(false)
  const [selectMovie, setSelectMovie] = useState(null)
  const [year, setyear] = useState()
  const [searchByMovie, setSearchByMovie] = useState(null)
  const [favoriteID, setFavoriteID] = useState([])

  // default movie name for search
  let series = ['marvel', 'avengers', 'iron man', 'harry potter', '3 idiots']


  // api key
  const API_KEY = API

  // set context year to setYear
  if (year !== movieByYear) {
    setyear(movieByYear)
  }

  // set context search movie to state
  if (searchByMovie !== searchMovie) {
    setSearchByMovie(searchMovie)
  }

  // open modal
  const handleOpen = (id) => {
    setOpen(true)
    setSelectMovie(id)
  }

  // close modal
  const handleClose = () => {
    setOpen(false)
  }

  // search default movies
  const defaultMovie = () => {
    const promise = series.map(series => {
      return axios.get(`/?apikey=${API_KEY}&s=${encodeURIComponent(series)}`)
        .then(res => res.data.Search)
    })

    Promise.all(promise)
      .then((rs) => setMovie(rs))
      .catch(error => setErrormsg(error))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }


  // search by movie name and relese year
  const searchForMovieWithYear = () => {
    axios.get(`/?apikey=${API_KEY}&s=${encodeURIComponent(searchByMovie)}&y=${year}`)
      .then((rs) => !rs.data.hasOwnProperty('Error') ? setMovie(rs.data.Search) : setMovie(''))
      .catch(error => setErrormsg(error))
  }


  // use effect
  useEffect(() => {
    if (searchByMovie !== null) {
      searchForMovieWithYear()
      return
    }

    defaultMovie()

    // set movie and year to empty
    return () => {
      setMovie([])
      setyear()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchByMovie, movieByYear])

  // set favorite movie
  const setFavoritehandler = (id) => {
    const favoriteData = [...favoriteID]
    const findFavoritID = favoriteData.findIndex(el => el === id)

    if (findFavoritID === -1) {
      favoriteData.push(id)
    } else {
      favoriteData.splice(findFavoritID, 1)
    }

    setFavoriteID(favoriteData)
  }

  // check favorite movie is already there or not
  const checkfavoriteID = (id) => favoriteID.some(el => el === id)

  // render movie data 
  const renderMovies = (mov, index) => {
    return <Movie
      style={{ zIndex: '9999' }}
      key={index + `${mov.imdbID}`}
      movieTitle={mov.Title}
      moviePostal={mov.Poster}
      movieYear={mov.Year}
      movieType={mov.Type}
      setFavorite={() => setFavoritehandler(mov.imdbID)}
      ifFavorite={checkfavoriteID(mov.imdbID)}
      handleOpen={() => handleOpen(mov.imdbID)} />
  }

  let movieData = <Spinner />

  // check is movie and year is empty
  if (searchByMovie === null && movieByYear === '') {
    if (errormsg) {
      movieData = <Error>{errormsg.message}</Error>
    }
    else {
      // check movie length and data inside movie is array
      if (movie.length > 0 && Array.isArray(movie[0])) {
        movieData = movie.map(res => res.map((mov, index) => (
          renderMovies(mov, index)
        )))
      }
    }
  }

  else {
    if (movie === "") {

      // go home button style
      const goHomeStyle = [classes.GoHomeBTN]
      if (themeMood) {
        goHomeStyle.push(classes.GHDark)
      }
      else {
        goHomeStyle.push(classes.GHReg)
      }

      // error message if movie not found
      movieData =
        <React.Fragment>
          <Error>No MOVIES found in this name "<b>
            <u>{searchByMovie}</u></b>{year !== '' ?
              <span>" in "<b><u>{year}</u></b>" year </span> : null} Sorry !!! </Error>
          <button className={goHomeStyle.join(' ')} onClick={props.goHome} >
            Go Home...
          </button>
        </React.Fragment>
    }
    else {
      if (errormsg) {
        movieData = <Error>{errormsg.message}</Error>
      }

      if (movie.length > 0) {
        movieData = movie.map((mov, index) => renderMovies(mov, index))
      }
    }
  }

  return (
    <React.Fragment>
      <h1>Your Movies</h1>

      <div className={classes.Movies}>
        {favoriteID.length > 0 ?
          <FavoriteList favoriteMovies={favoriteID} /> : null}

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
