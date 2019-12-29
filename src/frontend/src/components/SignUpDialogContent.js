import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

class SignUpDialogContent extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirm_password: ""
  };

  
  async initRegister(submit){
    await axios.post('http://localhost:8000/rest-auth/registration/',{
        username: this.state.username,
        password1: this.state.password,
        password2: this.state.confirm_password,
        email: this.state.email,
        submit:submit
    },{
      headers: {
          'Content-Type': 'application/json',
      }
    },{
      withCredentials:true
    })
    .then(response => {
      // var responsed=JSON.stringify(response)
      console.log(response);  
    })
    .catch(error => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    })
  }
  handleChangeText = async ({ target }) => {
    await this.setState({ [target.name]: target.value });
    console.log(this.state.username,this.state.email, this.state.password,this.state.confirm_password);
    await this.initRegister(false)
  };

  handleClickSubmit = async (e) => {
    e.preventDefault();
    await this.initRegister(true)
    await console.log(this.state.username, this.state.password);
    this.props.handleClose()
  };

  render() {
    return (
      <>
        <DialogContent>
              <DialogContentText>Please Sign-up</DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="signup-username"
                value={this.state.username}
                name="username"
                onChange={this.handleChangeText}
                label="Username"
                fullWidth
              />
              <br />
              <TextField
                margin="dense"
                id="signup-email"
                value={this.state.email}
                name="email"
                onChange={this.handleChangeText}
                label="Email Address"
                fullWidth
              />
              <br />
              <TextField
                margin="dense"
                id="signup-password"
                value={this.state.password}
                type="password"
                name="password"
                onChange={this.handleChangeText}
                label="Password"
                fullWidth
              />
              <br />
              <TextField
                margin="dense"
                id="signup-confirm-password"
                value={this.state.confirm_password}
                type="password"
                name="confirm_password"
                onChange={this.handleChangeText}
                label="Confirm Password"
                fullWidth
              />
              <br />
            </DialogContent>
            <DialogActions style={{ justifyContent: "center" }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={this.handleClickSubmit}
              >
                Sign-up
              </Button>
              <Button onClick={this.props.handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
      </>
    );
  }
}
export default SignUpDialogContent;
