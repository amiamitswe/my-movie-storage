import React, { useState } from 'react'
import './App.css'

import ThemeContext from './context/Context'
import Header from './components/Header/Header'
import Movies from './components/Movies/Movies'


function App() {

  const [darkMood, setDarkMood] = useState(false)
  const [searchMovie, setSearchMovie] = useState('')
  const [passMovieName, setPassMovieName] = useState(null)
  const [year, setYear] = React.useState('')
  const [yearCheck, setYearCheck] = useState(false)
  const [isAtHome, setIsAtHome] = useState(true)

  let inputValue = searchMovie

  const darkMoodHandler = () => {
    setDarkMood(!darkMood)
  }

  const searchMovieHandler = (event) => {
    if (searchMovie.length === 0) {
      setSearchMovie(event.target.value.trim())
    }
    else {
      setSearchMovie(event.target.value)
    }
    setIsAtHome(false)
    if (event.target.value === '') {
      setYearCheck(false)
    }
  }

  const setPassDataForMovie = () => {
    if (searchMovie !== '') {
      setPassMovieName(searchMovie)
      setYearCheck(true)
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
    if (!isAtHome) {
      console.log('At Home Page....')
      setPassMovieName(null)
      setYear('')
      setSearchMovie('')
      setYearCheck(false)
      setIsAtHome(true)
    }
  }

  const onYearChangeHandler = (event) => {
    setYear(event.target.value)
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
        selectYear={onYearChangeHandler}
        enableYear={yearCheck}
        year={year}
        inputValue={inputValue}
      />
      <ThemeContext.Provider
        value={{
          darkMood: darkMood,
          searchMovie: passMovieName,
          movieByYear: year
        }}
      >
        <Movies goHome={goHomeHandler} />
      </ThemeContext.Provider>
    </div>
  )
}

export default App
