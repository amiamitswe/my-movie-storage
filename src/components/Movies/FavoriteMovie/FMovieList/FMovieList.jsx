import React, { useEffect, useState } from 'react'
import axios from '../../../../axios-orders'
import { Spinner2 } from '../../../UI/Spinner/Spinner'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
    height: '70vh',
    overflow: 'auto',
    boxShadow: '0px 1px 100px #000',
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
  }
}))

export default function AlignItemsList({ movieData }) {
  const classes = useStyles()
  const MOVIE_IDs = movieData
  const API_KEY = '747adb9e'

  const [fMovieListData, setFMovieListData] = useState([])

  useEffect(() => {
    const promise = MOVIE_IDs.map(movieID => {
      return axios.get(`/?i=${movieID}&apikey=${API_KEY}`)
        .then(res => res.data)
    })

    Promise.all(promise)
      .then(res => setFMovieListData(res))
      .catch(err => console.log(err.message))
  }, [MOVIE_IDs])

  console.log(fMovieListData)

  const limitTitle = (text, value = 20) => {
    const result = []
    if (text.length > value) {
      text.split(' ').reduce((acc, cur) => {
        if (acc + cur.length <= value) {
          result.push(cur)
        }
        return acc += cur.length
      }, 0)
      return (result.join(' ') + ' ...')
    }
    return text
  }

  let renderFMovieData

  if (fMovieListData.length <= 0) {
    renderFMovieData = <Spinner2 />
  }
  else {
    renderFMovieData = fMovieListData.map(mov => {
      return (
        <React.Fragment key={mov.imdbID}>
          <ListItem alignItems="flex-start" classes={{root: classes.listRoot}}>
            <ListItemAvatar>
              <Avatar classes={{root: classes.avatarRoot}} alt="Remy Sharp" src={mov.Poster} />
            </ListItemAvatar>
            <ListItemText
              primary={`Title : ${limitTitle(mov.Title)}`}
              secondary={
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {`Actors : ${limitTitle(mov.Actors, 40)}`}
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
