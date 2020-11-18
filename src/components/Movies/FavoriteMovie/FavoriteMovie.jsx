import React, { useState, useContext } from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite'
import CancelIcon from '@material-ui/icons/Cancel'
import FMovieList from './FMovieList/FMovieList'
import ThemeMood from '../../../context/Context'
import classes from './FavoriteMovie.module.css'

const FavoriteMovie = ({ favoriteMovies }) => {

  const themeMood = useContext(ThemeMood).darkMood

  const [showFMovieLlist, setShowFMovieLlist] = useState(false)

  // show favorite icon
  const showme = () => {
    setShowFMovieLlist(!showFMovieLlist)
  }

  let showMovieList
  let showFavoriteIcon = <FavoriteIcon className={classes.FavoriteListIcon} />

  // if favorite movies exist
  if (showFMovieLlist) {
    showMovieList = (
      <div
        className={classes.FMovieList}
        style={{ background: themeMood ? '#2a2d3c' : '#fff' }}
      >
        <FMovieList movieData={favoriteMovies} />
      </div>
    )
    // change favorite to close icon
    showFavoriteIcon = <CancelIcon className={classes.FavoriteListIcon} />
  }

  return (
    <React.Fragment>
      <div onClick={showme} className={classes.FavoriteList} >
        {showFavoriteIcon}
      </div>

      {showMovieList}
    </React.Fragment>
  )
}

export default FavoriteMovie
