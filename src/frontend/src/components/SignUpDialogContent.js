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

class SignUpDialogContent extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirm_password: ""
  };

  handleChangeText = async ({ target }) => {
    await this.setState({ [target.name]: target.value });
    console.log(this.state.username,this.state.email, this.state.password,this.state.confirm_password);
  };

  handleClickSubmit = async e => {
    e.preventDefault();
    await console.log(this.state.username, this.state.password);
    this.props.handleClose()
    // await this.props.handle(
    //   this.state.username,
    //   this.state.password,
    //   this.state.rememberme
    // );
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
