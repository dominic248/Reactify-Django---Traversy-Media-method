import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";


class SignUpDialogContent extends React.Component {
  state = {
    username: "",
    username_error: "",
    email: "",
    email_error: "",
    password: "",
    password_error: "",
    confirm_password: "",
    confirm_password_error: "",
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
      this.setState({username_error: "",email_error: "",password_error: "",confirm_password_error: ""}) 
    })
    .catch(error => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        error.response.data.username ? this.setState({username_error: error.response.data.username}) : this.setState({username_error: ""})
        error.response.data.email ? this.setState({email_error: error.response.data.email}) : this.setState({email_error: ""})
        error.response.data.password1 ? this.setState({password_error: error.response.data.password1}) : this.setState({password_error: ""})
        error.response.data.password2 ? this.setState({confirm_password_error: error.response.data.password2}) : this.setState({confirm_password_error: ""})
        // console.log(error.response.status);
        // console.log(error.response.headers);
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
                error={this.state.username_error !== ""}
                helperText={this.state.username_error}
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
              error={this.state.email_error !== ""}
              helperText={this.state.email_error}
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
              error={this.state.password_error !== ""}
              helperText={this.state.password_error}
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
              error={this.state.confirm_password_error !== ""}
              helperText={this.state.confirm_password_error}
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
