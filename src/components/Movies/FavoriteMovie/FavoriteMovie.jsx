import React, { useState } from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite'
import CancelIcon from '@material-ui/icons/Cancel';
import FMovieList from './FMovieList/FMovieList'
import classes from './FavoriteMovie.module.css'

const FavoriteMovie = ({ favoriteMovies }) => {

  const [showFMovieLlist, setShowFMovieLlist] = useState(false)

  const showme = () => {
    setShowFMovieLlist(!showFMovieLlist)
  }

  let showMovieList
  let showFavoriteIcon = <FavoriteIcon className={classes.FavoriteListIcon} />
  if (showFMovieLlist) {
    showMovieList = (
      <div className={classes.FMovieList}>
        <FMovieList movieData={favoriteMovies} />
      </div>
    )
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
