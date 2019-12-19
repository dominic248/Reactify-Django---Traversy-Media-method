import React from 'react';
import Cookies from 'js-cookie';
import axios from "axios";
// import './App.css';
import AppbarComponent from './AppbarComponent';
import AddFabComponent from './AddFabComponent';

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
  // handleChange = ({ target }) => {
  //   this.setState({ [target.name]: target.value });
  //   console.log(this.state.username,this.state.password)
  // };
  // handleClick= (e) => {
  //   e.preventDefault()
  //   console.log(this.state.username,this.state.password)
  //   this.initLogin()
  // }
  
  
  // async componentDidMount(){
  //   var sessioncookie=Cookies.get()
  //   console.log(sessioncookie.session_id);
  //   await console.log(this.state.isAuthenticated,this.state.session_id)
  //   if(sessioncookie.session_id!==undefined){
  //     Cookies.set('session_id', sessioncookie.session_id)
  //     Cookies.set('sessionid', sessioncookie.session_id)
  //     await axios.get('http://localhost:8000/api/user/current/details/',{
  //       headers: {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json',
  //           // 'XMLHttpRequest.withCredentials': true,
  //           // 'Cookie': 'sessionid='+sessioncookie.session_id
  //         }
  //       },{
  //         withCredentials:true
  //       })
  //       .then(response => {
  //         console.log("Response data: ",response.data);
  //           Cookies.set('session_id', sessioncookie.session_id, { expires: 60 })
  //           Cookies.set('sessionid', sessioncookie.session_id, { expires: 60 })
  //         this.auth=true
  //         this.sessionkey=sessioncookie.session_id
  //       })
  //       .catch(error => {
  //         error=JSON.stringify(error)
  //         console.log(error)
  //         // auth=true
  //         this.auth=false
  //         this.sessionkey=''
          
  //     })
  //     await this.setState({isAuthenticated:this.auth,session_id:this.sessionkey})
  //   }else{
  //     await this.setState({isAuthenticated:this.auth,session_id:this.sessionkey})
  //   }
  //   await console.log(this.state.isAuthenticated,this.state.session_id)
  // }
  // async initLogin(username,password,rememberme){
  //   var sessioncookie=Cookies.get()
  //   await axios.post('http://localhost:8000/rest-auth/login/',{
  //         username: username,
  //         password: password
  //     },{
  //       headers: {
  //           'Content-Type': 'application/json',
  //       }
  //     },{
  //       withCredentials:true
  //     })
  //     .then(response => {
  //       // var responsed=JSON.stringify(response)
  //       console.log(response);  
  //       if(rememberme){
  //         Cookies.set('session_id', response.data.session_key, { expires: 60 })
  //         Cookies.set('sessionid', response.data.session_key, { expires: 60 })
  //       }else{
  //         Cookies.set('session_id', response.data.session_key)
  //         Cookies.set('sessionid', response.data.session_key)
  //       }
  //       this.auth=true
  //       this.sessionkey=response.data.session_key
  //       var sessioncookie=Cookies.get();
  //       console.log("Cookies after login: ",sessioncookie);
  //     })
  //     .catch(error => {
  //       console.log(error)
  //       this.auth=false
  //       this.sessionkey=''
  //     })
  //     await this.setState({isAuthenticated:this.auth,session_id:this.sessionkey})
  //     await console.log(this.state.isAuthenticated,this.state.session_id)
  // }
  // handleRec = async(username,password,rememberme) => {
  //   console.log("Main", username,password,rememberme)
  //   // await this.setState({username:username,password:password,rememberme:rememberme})
  //   await this.initLogin(username,password,rememberme)
  // }
  render() {
    return (
      <div>
        
      <AppbarComponent loginState={this.state.isAuthenticated} />
      
      {/* <div style={{textAlign:"center",position: "absolute",top:"50%",left: "50%",transform: "translate(-50%,-50%)"}}>
      <LoginModal handleRec={this.handleRec} isAuthenticated={this.state.isAuthenticated} />
      </div> */}
      <AddFabComponent />
      </div>
    );
  }
}
export default App;
