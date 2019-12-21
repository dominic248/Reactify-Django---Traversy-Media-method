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

class LoginDialog extends React.Component {
  state = {
    isOpen: true,
    username: "",
    password: "",
    rememberme: false
  };

  handleClickOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
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
    await this.props.handleRec(
      this.state.username,
      this.state.password,
      this.state.rememberme
    );
    // console.log(this.props.isAuthenticated)
    if (this.props.isAuthenticated === true) {
      this.setState({ setOpenModal: false });
    }
  };

  render() {
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Open form dialog
        </Button>
        <Dialog
          open={this.state.isOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth="xs"
          fullWidth={true}
          style={{ textAlign: "center" }}
          
        >
          <DialogTitle id="form-dialog-title" >Sign-in</DialogTitle>
          <DialogContent>
            <DialogContentText>Welcome dear user!</DialogContentText>

            <TextField
              autoFocus
              margin="dense"
              id="login-username"
              value={this.state.username}
              name="username"
              onChange={this.handleChangeText}
              label="Email Address"
              fullWidth
            />
            <br />
            <TextField
              margin="dense"
              id="login-password"
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
              Login
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default LoginDialog;
