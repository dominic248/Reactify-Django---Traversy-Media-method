import React from 'react';
import Cookies from 'js-cookie';
import axios from "axios";
import './App.css';
import AppbarComponent from './AppbarComponent';

import AddFabComponent from './AddFabComponent';
import SignInSignUpDialogComponent from './SignInSignUpDialogComponent';
import SearchBoxComponent from './SearchBoxComponent';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';

class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      isAuthenticated:false,
      username:'',
      password:'',
      session_id:'',
      rememberme:false
    }
  }
  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
    console.log(this.state.username,this.state.password)
  };
  handleClick= (e) => {
    e.preventDefault()
    console.log(this.state.username,this.state.password)
    this.initLogin()
  }
  
  
  async componentDidMount(){
    var sessioncookie=Cookies.get()
    this.auth=false
    this.sessionkey=''
    console.log(sessioncookie.session_id);
    await console.log(this.state.isAuthenticated,this.state.session_id)
    if(sessioncookie.session_id!==undefined){
      Cookies.set('session_id', sessioncookie.session_id)
      Cookies.set('sessionid', sessioncookie.session_id)
      await axios.get('http://localhost:8000/api/user/current/details/',{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'XMLHttpRequest.withCredentials': true,
            // 'Cookie': 'sessionid='+sessioncookie.session_id
          }
        },{
          withCredentials:true
        })
        .then(response => {
          console.log("Response data: ",response.data);
            Cookies.set('session_id', sessioncookie.session_id, { expires: 60 })
            Cookies.set('sessionid', sessioncookie.session_id, { expires: 60 })
          this.auth=true
          this.sessionkey=sessioncookie.session_id
        })
        .catch(error => {
          error=JSON.stringify(error)
          console.log(error)
          this.auth=false
          this.sessionkey=''
          
      })
      await this.setState({isAuthenticated:this.auth,session_id:this.sessionkey})
    }else{
      await this.setState({isAuthenticated:this.auth,session_id:this.sessionkey})
    }
    await console.log(this.state.isAuthenticated,this.state.session_id)
  }
  async initLogin(username,password,rememberme){
    var sessioncookie=Cookies.get()
    await axios.post('http://localhost:8000/rest-auth/login/',{
          username: username,
          password: password
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
        if(rememberme){
          Cookies.set('session_id', response.data.session_key, { expires: 60 })
          Cookies.set('sessionid', response.data.session_key, { expires: 60 })
        }else{
          Cookies.set('session_id', response.data.session_key)
          Cookies.set('sessionid', response.data.session_key)
        }
        this.auth=true
        this.sessionkey=response.data.session_key
        var sessioncookie=Cookies.get();
        console.log("Cookies after login: ",sessioncookie);
      })
      .catch(error => {
        console.log(error)
        this.auth=false
        this.sessionkey=''
      })
      await this.setState({isAuthenticated:this.auth,session_id:this.sessionkey})
      await console.log(this.state.isAuthenticated,this.state.session_id)
  }
  handleSignInAPI = async(username,password,rememberme) => {
    console.log("Main", username,password,rememberme)
    // await this.setState({username:username,password:password,rememberme:rememberme})
    await this.initLogin(username,password,rememberme)
  }
  render() {
    const supportsHistory='pushState' in window.history;
    return (
      <div>
        <BrowserRouter forceRefresh={!supportsHistory}>
          <Switch>
          <Route exact path='/search' component={SearchBoxComponent} />
            <Route path='/' render={()=>(
              <>
                <AppbarComponent loginState={this.state.isAuthenticated} />
                <button>Hello</button>
                <Route exact path='/inbox' component={AddFabComponent} />
              </>
            )} 
            />

          </Switch>
          <SignInSignUpDialogComponent handleSignInAPI={this.handleSignInAPI} isAuthenticated={this.state.isAuthenticated} />
        </BrowserRouter>
     
      </div>
    );
  }
}
export default App;
