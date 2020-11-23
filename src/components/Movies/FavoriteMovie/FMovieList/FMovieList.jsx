import React, { useEffect, useState } from 'react'
import { API } from '../../../../API/API'

import limitTitle from '../../../../Helper/LimiteTitle'
import axios from '../../../../axios-orders'
import { Spinner2 } from '../../../UI/Spinner/Spinner'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'


// material ui style
const useStyles = makeStyles((theme) => ({
  root: {
    height: '70vh',
    overflow: 'auto',
    boxShadow: '0px 1px 15px 10px #464443',
    padding: '0'
  },
  inline: {
    display: 'inline',
  },
  avatarRoot: {
    height: 'auto',
    width: '45px',
    borderRadius: '5px',
    marginRight: '10px'
  },
  listRoot: {
    borderBottom: '1px solid #292c3b',
    paddingBottom: '14px',
    "&:last-child": {
      borderBottom: 'none'
    },
    '&:hover': {
      backgroundColor: '#4a4c5a3d',
      cursor: 'pointer'
    }
  },
  mTitle: {
    margin: '0',
    lineHeight: '1',
    fontSize: '1.15rem',
    marginBottom: '5px'
  }
}))

const AlignItemsList = ({ movieData }) => {
  // use material style
  const classes = useStyles()

  const MOVIE_IDs = movieData

  const [fMovieListData, setFMovieListData] = useState([])

  // render data from api
  useEffect(() => {
    const API_KEY = API
    const promise = MOVIE_IDs.map(movieID => {
      return axios.get(`/?i=${movieID}&apikey=${API_KEY}`)
        .then(res => res.data)
    })

    Promise.all(promise)
      .then(res => setFMovieListData(res))
      .catch(err => console.log(err.message))
  }, [MOVIE_IDs])


  let renderFMovieData

  if (fMovieListData.length <= 0) {
    renderFMovieData = <Spinner2 />
  }
  else {
    renderFMovieData = fMovieListData.map(mov => {
      return (
        <React.Fragment key={mov.imdbID}>
          <ListItem alignItems="flex-start"
            classes={{
              root: classes.listRoot,
            }}
          >
            <ListItemAvatar>
              <Avatar classes={{ root: classes.avatarRoot }} alt="Remy Sharp" src={mov.Poster} />
            </ListItemAvatar>
            <ListItemText
              primary={<h2 className={classes.mTitle}>{`Title : ${limitTitle(mov.Title)}`}</h2>}
              secondary={
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="inherit"
                >
                  {<p>{`Actors : ${limitTitle(mov.Actors, 40)}`}</p>}
                </Typography>
              }
            />
          </ListItem>
        </React.Fragment>
      )
    })
  }


  return (
    <List className={classes.root}>
      {renderFMovieData}
    </List>
  )
}

export default AlignItemsList