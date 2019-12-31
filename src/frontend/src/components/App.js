import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
import "./App.css";
import AppbarComponent from "./AppbarComponent";
import { withStyles } from "@material-ui/core/styles";
import AddFabComponent from "./AddFabComponent";
import SignInSignUpDialogComponent from "./SignInSignUpDialogComponent";
import SearchBoxComponent from "./SearchBoxComponent";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

const useStyles = theme => ({
  root: {
    flexGrow: 1
  },
})

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      session_id: "",
    };
  }
  // handleChange = ({ target }) => {
  //   this.setState({ [target.name]: target.value });
  //   console.log(this.state.username,this.state.password)
  // };

  async componentDidMount() {
    await this.getData();
    await console.log(this.state.isAuthenticated, this.state.session_id);
  }

  async getData() {
    var sessioncookie = Cookies.get();
    this.auth = false;
    this.sessionkey = "";
    console.log(sessioncookie.session_id);
    await console.log(this.state.isAuthenticated, this.state.session_id);
    if (sessioncookie.session_id !== undefined) {
      Cookies.set("session_id", sessioncookie.session_id);
      Cookies.set("sessionid", sessioncookie.session_id);
      await axios
        .get(
          "http://localhost:8000/api/user/current/details/",
          {
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
              // 'XMLHttpRequest.withCredentials': true,
              // 'Cookie': 'sessionid='+sessioncookie.session_id
            }
          },
          {
            withCredentials: true
          }
        )
        .then(response => {
          console.log("Response data: ", response.data);
          Cookies.set("session_id", sessioncookie.session_id, { expires: 60 });
          Cookies.set("sessionid", sessioncookie.session_id, { expires: 60 });
          this.auth = true;
          this.sessionkey = sessioncookie.session_id;
        })
        .catch(error => {
          error = JSON.stringify(error);
          console.log(error);
          this.auth = false;
          this.sessionkey = "";
        });
      await this.setState({
        isAuthenticated: this.auth,
        session_id: this.sessionkey
      });
    } else {
      await this.setState({
        isAuthenticated: this.auth,
        session_id: this.sessionkey
      });
    }
  }

  handleSignInSubmit = async (isAuthenticated,session_id) => {
    console.log("Main", isAuthenticated,session_id);
    await this.setState({isAuthenticated:isAuthenticated,session_id:session_id});
    await this.getData();
  };
  render() {
    const { classes } = this.props;
    const supportsHistory = "pushState" in window.history;
    return (
      <div className={classes.root}>
        <BrowserRouter forceRefresh={!supportsHistory}>
          <Switch>
            <Route exact path="/search" component={SearchBoxComponent} />
            <Route exact path="/settings" component={SearchBoxComponent} />
            <Route
              path="/"
              render={() => (
                <>
                  <AppbarComponent loginState={this.state.isAuthenticated} />
                  <button>Hello</button>
                  <Route exact path="/inbox" component={AddFabComponent} />
                </>
              )}
            />
          </Switch>
          <SignInSignUpDialogComponent
            handleSignInSubmit={this.handleSignInSubmit}
            isAuthenticated={this.state.isAuthenticated}
          />
        </BrowserRouter>
      </div>
    );
  }
}
export default withStyles(useStyles)(App);
