import React from 'react';
// import ReactDOM from 'react-dom';
import config from '../config.js';
import firebase from 'firebase/app';
import 'firebase/database';

if (firebase.apps.length === 0) {
  firebase.initializeApp(config);
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataBase: [],
    };

    this.getDatabase = this.getDatabase.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }


  getDatabase() {
    let arr;
    firebase
      .database()
      .ref('words')
      .on('value', (snapshot) => {
        const data = snapshot.val();
        arr = Object.entries(data);
      });
      console.log(arr);
      return arr;
  }

  handleClick() {
    this.setState({
      dataBase: this.getDatabase()
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>
          Get Result
        </button>
        <ul>
          <li>{ this.state.dataBase }</li>
        </ul>
      </div>
    )
  }
}

export default App;