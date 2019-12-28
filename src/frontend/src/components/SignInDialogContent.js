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
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

class SignInDialogContent extends React.Component {
  state = {
    username: "",
    password: "",
    rememberme: false
  };

  handleChangeText = async ({ target }) => {
    await this.setState({ [target.name]: target.value });
    console.log(this.state.username, this.state.password);
  };
  handleChangeRememberMe = async event => {
    await this.setState({ rememberme: event.target.checked });
    console.log(this.state.rememberme);
  };
  handleClickSubmit = async e => {
    e.preventDefault();
    await console.log(this.state.username, this.state.password);
    await this.props.handle(
      this.state.username,
      this.state.password,
      this.state.rememberme
    );
  };

  render() {
    return (
      <>
        <DialogContent>
          <DialogContentText>Welcome dear user!</DialogContentText>
          <TextField
            autoFocus
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
