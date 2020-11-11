import React, { useState } from 'react'
import './App.css'

import ThemeContext from './context/Context'
import Header from './components/Header/Header'
import Movies from './components/Movies/Movies'


function App() {

  const [darkMood, setDarkMood] = useState(false)

  const darkMoodHandler = () => {
    setDarkMood(!darkMood)
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
      <Header darkMood={darkMoodHandler} />
      <ThemeContext.Provider value={darkMood}>
        <Movies />
      </ThemeContext.Provider>
    </div>
  )
}

export default App
