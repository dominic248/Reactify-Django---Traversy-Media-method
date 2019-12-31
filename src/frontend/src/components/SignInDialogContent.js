import React from "react";
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

import Cookies from "js-cookie";
import axios from "axios";

class SignInDialogContent extends React.Component {
  state = {
    non_field_errors:"",
    password_error:"",
    username: "",
    password: "",
    rememberme: false
  };

  handleChangeText = async ({ target }) => {
    await this.setState({ [target.name]: target.value });
    await this.setState({ non_field_errors: '', password_error: ''});
    console.log(this.state.username, this.state.password);
  };
  handleChangeRememberMe = async event => {
    await this.setState({ rememberme: event.target.checked });
    console.log(this.state.rememberme);
  };
  handleClickSubmit = async e => {
    e.preventDefault();
    await console.log(this.state.username, this.state.password);
    await this.initLogin(
      this.state.username,
      this.state.password,
      this.state.rememberme
    );
  };
  async initLogin(username, password, rememberme) {
    await axios
      .post(
        "http://localhost:8000/rest-auth/login/",
        {
          username: username,
          password: password
        },
        {
          headers: { "Content-Type": "application/json" }
        },
        { withCredentials: true }
      )
      .then(response => {
        console.log(response);
        if (rememberme) {
          Cookies.set("session_id", response.data.session_key, { expires: 60 });
          Cookies.set("sessionid", response.data.session_key, { expires: 60 });
        } else {
          Cookies.set("session_id", response.data.session_key);
          Cookies.set("sessionid", response.data.session_key);
        }
        this.auth = true;
        this.sessionkey = response.data.session_key;
        var sessioncookie = Cookies.get();
        console.log("Cookies after login: ", sessioncookie);
      })
      .catch(error => {
        if (error.response) {
          console.log("hel",error.response.data);
          error.response.data.non_field_errors ? this.setState({non_field_errors: error.response.data.non_field_errors}) : this.setState({non_field_errors: ""})
          error.response.data.password ? this.setState({password_error: error.response.data.password}) : this.setState({password_error: ""})
          console.log("hel",this.state.non_field_errors);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        this.auth = false;
        this.sessionkey = "";
      });
    await this.props.handleSignInSubmit({
      isAuthenticated: this.auth,
      session_id: this.sessionkey
    });
    await console.log(this.state.isAuthenticated, this.state.session_id);
  }

  render() {
    return (
      <>
        <DialogContent>
          <DialogContentText>Welcome dear user!</DialogContentText>
          <TextField
            autoFocus
            error={this.state.non_field_errors !== "" }
            helperText={this.state.non_field_errors}
            margin="dense"
            id="signin-username"
            value={this.state.username}
            name="username"
            onChange={this.handleChangeText}
            label="Email Address"
            fullWidth
          />
          <br />
          <TextField
          error={this.state.non_field_errors !== "" || this.state.password_error !== ""}
          helperText={this.state.non_field_errors || this.state.password_error}
            margin="dense"
            id="signin-password"
            value={this.state.password}
            name="password"
            onChange={this.handleChangeText}
            label="Password"
            fullWidth
          />
          <br />
          <FormControlLabel
            control={
              <Switch
                checked={this.state.rememberme}
                onChange={this.handleChangeRememberMe}
                name="rememberme"
                color="primary"
              />
            }
            label="Remember Me"
          />
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={this.handleClickSubmit}
          >
            Sign-in
          </Button>
          <Button onClick={this.props.handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </>
    );
  }
}
export default SignInDialogContent;
