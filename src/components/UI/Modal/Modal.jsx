import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import ThemeContext from '../../../context/Context'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: '80%',
    height: '80%',
    overflowY: 'auto',
    boxShadow: theme.shadows[5],
    padding: '30px 32px 20px',

  },
}))

export default function TransitionsModal(props) {
  const classes = useStyles()
  const themeData = useContext(ThemeContext)

  let style = {
    color: '#050505',
    background: '#fff'
  }
  if (themeData.darkMood) {
    style = {
      color: '#fff',
      background: '#18191a'
    }
  }

  return (
    <React.Fragment>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.modalOpen}
        onClose={props.modalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}

      >
        <Fade in={props.modalOpen}>
          <div className={classes.paper} style={style}>
            {props.children}
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  )
}