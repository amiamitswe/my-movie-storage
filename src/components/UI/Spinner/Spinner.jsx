import React from 'react'
import classes from './Spinner.module.css'

const Spinner = () => {
  return (
    <figure>
      <div className={[classes.dot, classes.four].join(' ')} />
      <div className={[classes.dot, classes.three].join(' ')} />
      <div className={[classes.dot, classes.two].join(' ')} />
      <div className={[classes.dot, classes.one].join(' ')} />
    </figure>
  )
}

export default Spinner
