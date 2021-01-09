import React from "react";
import firebase from "../config.js";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      words: [],
    };

    this.getWords = this.getWords.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * @returns Promise that it will get data from DB
   **/ 
  getWords() {
    return firebase.database().ref("words").once("value");
  }

  mapSnapshotToArray(snapshot) {
    const words = snapshot.val();
    return Object.keys(words).map((workKey) => {
      return { key: workKey, ...words[workKey] };
    });
  }

  handleClick() {
    // at this moment we're in the loading state
    this.getWords().then((snapshot) => {
      // at this moment we're loaded the data and can display it
      const words = this.mapSnapshotToArray(snapshot);
      this.setState({
        words,
      });
    });
    // TODO: catch error
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Get Result</button>
        <ul>
          {this.state.words.map((word) => (
            <li key={word.key}>
              {word.eng} - {word.rus}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
