import React from 'react';
import axios from "axios";
// import './App.css';


class App extends React.Component {

  componentDidMount() {
    axios.get('http://localhost/json/data.json')
    .then(response => {
      console.log(response.data);
    }, error => {
      console.log(error);
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="/static/frontend/images/logo192.png" className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;