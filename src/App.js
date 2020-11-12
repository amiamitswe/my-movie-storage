import React, { useState } from 'react'
import './App.css'

import ThemeContext from './context/Context'
import Header from './components/Header/Header'
import Movies from './components/Movies/Movies'


function App() {

  const [darkMood, setDarkMood] = useState(false)
  const [searchMovie, setSearchMovie] = useState('')
  const [passMovieName, setPassMovieName] = useState(null)

  const darkMoodHandler = () => {
    setDarkMood(!darkMood)
  }

  const searchMovieHandler = (event) => {
    setSearchMovie(event.target.value.trim())
  }

  const setPassDataForMovie = () => {
    if (searchMovie !== '') {
      setPassMovieName(searchMovie)
    }
  }

  const clickedForMovie = () => {
    setPassDataForMovie()
  }

  const onPressEnter = (e) => {
    if (e.key === 'Enter') {
      setPassDataForMovie()
    }
  }

  const goHomeHandler = () => {
    console.log('Commint soon')
  }

  let darkTheme = ['App']
  if (darkMood) {
    darkTheme.push('Dark')
  }
  else {
    darkTheme.push('White')
  }

  return (

    <div className={darkTheme.join(' ')}>
      <Header
        darkMood={darkMoodHandler}
        searchMovie={searchMovieHandler}
        clicked={clickedForMovie}
        onKeyEnter={onPressEnter}
        goHome={goHomeHandler}
      />
      <ThemeContext.Provider value={{ darkMood: darkMood, searchMovie: passMovieName }}>
        <Movies />
      </ThemeContext.Provider>
    </div>
  )
}

export default App
