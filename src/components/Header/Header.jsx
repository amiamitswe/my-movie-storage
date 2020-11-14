import React from 'react'

import { fade, makeStyles } from '@material-ui/core/styles'
import { createMuiTheme, AppBar, Switch, IconButton, Toolbar, Typography, InputBase, MenuItem, FormControl, Select } from '@material-ui/core'
import { Home as HomeIcon, Search as SearchIcon } from '@material-ui/icons'
import { ThemeProvider } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  homeButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    cursor: 'pointer'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 1),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 70,
  },
  selectEmpty: {
    marginTop: theme.spacing(0),
    color: '#fff',
    '&::after': {
      borderColor: '#fff'
    }
  },
  selectRoot: {
    background: '#4a4c5a',
    paddingRight: '14px !important',

    '&:focus': {
      background: '#4a4c5a'
    },
    '&:hover': {
      background: '#ffffff40',
      borderBottom: 'none'
    },
  },
  arrowIcon: {
    color: 'inherit'
  },
  switch: {
    marginRight: '-6px'
  },
  track: {
    background: '#fff'
  },
  switchBase: {
    color: '#fff'
  }
}))


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#636364',
    }
  },
})

export default function PrimarySearchAppBar(props) {
  const classes = useStyles()
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  })

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked })
    props.darkMood()
  }

  const selectYearForMovie = []
  for (let i = 1990; i <= new Date().getFullYear(); i++) {
    selectYearForMovie.unshift(i)
  }


  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{ backgroundColor: '#2a2d3c' }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.homeButton}
            color="inherit"
            aria-label="open drawer"
          >
            <HomeIcon />
          </IconButton>
          <Typography onClick={props.goHome} className={classes.title} variant="h6" noWrap>
            My Movie Storages
          </Typography>
          <div className={classes.search}>
            <InputBase
              placeholder="Search Movie…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={props.searchMovie}
              onKeyDown={props.onKeyEnter}
            />
          </div>
          <IconButton
            onClick={props.clicked}
            aria-label="search icon"
            style={{ color: '#fff' }}
          >
            <SearchIcon />
          </IconButton>

          <FormControl
            className={classes.formControl}
          >
            <Select
              disabled={!props.enableYear}
              value={props.year}
              onChange={props.selectYear}
              displayEmpty
              className={classes.selectEmpty}
              inputProps={{ 'aria-label': 'Without label' }}

              classes={{
                root: classes.selectRoot,
                icon: classes.arrowIcon,
              }}
            >
              <MenuItem value="">
                <em>Year</em>
              </MenuItem>

              {selectYearForMovie.map(el => (
                <MenuItem key={el} value={el}>{el}</MenuItem>))
              }
            </Select>
          </FormControl>

          <div className={classes.grow} />

          <ThemeProvider theme={theme} >
            <Switch
              classes={{
                root: classes.switch,
                switchBase: classes.switchBase,
                track: classes.track
              }}
              checked={state.checkedA}
              onChange={handleChange}
              color='primary'
              name="checkedA"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </ThemeProvider>
        </Toolbar>
      </AppBar>
    </div>
  )
}