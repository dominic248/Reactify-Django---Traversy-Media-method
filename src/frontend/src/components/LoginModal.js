import React from 'react';
import {Modal,Backdrop,Fade,Button,TextField,FormControlLabel,Checkbox } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Cookies from 'js-cookie';
import axios from 'axios';

const styles = theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
});


class LoginModal extends React.Component {
  constructor(props){
    super(props)
    this.state={
      setOpenModal:false,
      username:'',
      password:'',
      rememberme:false
    }
  }
  

  handleOpenLoginModal = () => {
    this.setState({setOpenModal:true});
  };

  handleCloseLoginModal = () => {
    this.setState({setOpenModal:false});
  };

  handleChangeText = async({ target }) => {
    await this.setState({ [target.name]: target.value });
    console.log(this.state.username,this.state.password)
  };
  handleChangeRememberMe = () => {
    this.setState({ rememberme: !this.state.rememberme });
    console.log(this.state.rememberme)
  };
  handleClickSubmit= async (e) => {
    e.preventDefault()
    await console.log(this.state.username,this.state.password)
    await this.props.handleRec(this.state.username,this.state.password,this.state.rememberme)
    // console.log(this.props.isAuthenticated)
    if(this.props.isAuthenticated===true){
      this.setState({ setOpenModal: false })
    }
  }
  
  render() {
    const { classes } = this.props;
    return(
    <div>
      <Button variant="contained" color="primary" type="button" onClick={this.handleOpenLoginModal}>Login</Button>
      
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={this.state.setOpenModal}
        onClose={this.handleCloseLoginModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={this.state.setOpenModal}>
          <div className={classes.paper}>
          <form method="POST" noValidate autoComplete="off">
          <TextField id="standard-basic" value={this.state.username} name="username" onChange={this.handleChangeText} label="Standard" /><br />
        <TextField id="standard-basic" value={this.state.password} name="password" onChange={this.handleChangeText} label="Standard" /><br />
            <TextField id="filled-basic" label="Filled" variant="filled" /><br />
            <TextField id="outlined-basic" label="Outlined" variant="outlined" required /><br />
            <FormControlLabel control={
                <Checkbox checked={this.state.rememberme} onChange={this.handleChangeRememberMe} name="rememberme" color="primary" />
              } label="Primary" />
            <Button variant="contained" color="primary" type="submit" onClick={this.handleClickSubmit}>Hello World</Button>
          </form>
          </div>
        </Fade>
      </Modal>
    </div>
    )
  };
}
export default withStyles(styles)(LoginModal);
// export default LoginModal