import React from 'react'
import classes from './Spinner.module.css'

const Spinner = () => {
  return (
    <figure className={classes.Spinner}>
      <div className={[classes.dot, classes.four].join(' ')} />
      <div className={[classes.dot, classes.three].join(' ')} />
      <div className={[classes.dot, classes.two].join(' ')} />
      <div className={[classes.dot, classes.one].join(' ')} />
    </figure>
  )
}


const Spinner2 = () => {
  return (
    <div className={classes.loader}>Loading...</div>
  )
}

export { Spinner, Spinner2 }
