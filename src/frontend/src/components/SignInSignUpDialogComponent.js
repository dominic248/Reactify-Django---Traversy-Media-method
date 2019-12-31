import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import SignInDialogContent from "./SignInDialogContent";
import SignUpDialogContent from "./SignUpDialogContent";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}


class SignInSignUpDialogComponent extends React.Component {
  state = {
    isOpen: true,
    value: 0
  };

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
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
  handleSignInSubmit = async (isAuthenticated,session_id) => {
    await console.log(isAuthenticated,session_id);
    await this.props.handleSignInSubmit(
      isAuthenticated,session_id
    );
    // console.log(this.props.isAuthenticated)
    if (this.props.isAuthenticated === true) {
      this.setState({ isOpen: false });
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
          <Tabs
            value={this.state.value}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleChange}
            aria-label="disabled tabs example"
            variant="fullWidth"
          >
            <LinkTab label="Sign-in" {...a11yProps(0)} />
            <LinkTab label="Sign-up" {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={this.state.value} index={0}>
            {/* <DialogTitle id="form-dialog-title">Sign-in</DialogTitle> */}
            <SignInDialogContent handleSignInSubmit={this.handleSignInSubmit} handleClose={this.handleClose}/>
          </TabPanel>
          <TabPanel value={this.state.value} index={1}>
            {/* <DialogTitle id="form-dialog-title">Sign-up</DialogTitle> */}
            <SignUpDialogContent handleClose={this.handleClose}/>
          </TabPanel>
        </Dialog>
      </div>
    );
  }
}

export default SignInSignUpDialogComponent;
