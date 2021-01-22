import React from 'react';
import firebase from '../../config.js';
import Spinner from '../spinner/spinner.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      words: [],
      rus: '',
      eng: '',
      emptyList: false,
      loadingList: true,
    };

    this.getWords = this.getWords.bind(this);
    this.seeListWords = this.seeListWords.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addWord = this.addWord.bind(this);
    this.deleteWordFromList = this.deleteWordFromList.bind(this);
  }

  /**
   * @returns Promise that it will get data from DB
   **/
  getWords() {
    return firebase.database().ref('words').once('value');
  }

  addWord(event) {
    // const wordId = this.state.words.length + 1;
    let vocabluary = firebase.database().ref('words');
    let newWord = vocabluary.push();
    newWord.set({
      eng: this.state.eng,
      rus: this.state.rus,
    });
    // firebase
    //   .database()
    //   .ref('words/word' + wordId)
    //   .set({
    //     eng: this.state.eng,
    //     rus: this.state.rus,
    //   });
    event.preventDefault();
    this.seeListWords();
  }

  mapSnapshotToArray(snapshot) {
    const words = snapshot.val();
    return Object.keys(words).map((workKey) => {
      return { key: workKey, ...words[workKey] };
    });
  }

  seeListWords() {
    // at this moment we're in the loading state
    this.getWords()
      .then((snapshot) => {
        // at this moment we're loaded the data and can display it
        const words = this.mapSnapshotToArray(snapshot);
        this.setState({
          words,
          loadingList: false,
        });
      })
      .catch((err) => {
        this.setState({ emptyList: true });
      });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  deleteWordFromList(e) {
    let copyWordsArray = [...this.state.words];
    let resultArray = copyWordsArray.filter(word => word !== e.target.value);
    this.setState({people: resultArray});
    console.log(e.target.value);
  }

  render() {
    const {words, emptyList, eng, rus, loadingList} = this.state;

    if(loadingList) {
      // return <Spinner />
    }

    return (
      <div>
        <button onClick={this.seeListWords}>Get Result</button>
        {!emptyList ? (

          <ul>
            {words.map((
              word //The eighth paragraph shows that this is not how the key should be used.
            ) => (
              <li key={word.key}>
                {word.eng} - {word.rus}
                <button onClick={this.deleteWordFromList}>X</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>The word list is not available.</p>
        )}

        <form onSubmit={this.addWord}>
          <label>
            English word:
            <input
              type="text"
              name="eng"
              value={eng}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Russian word:
            <input
              type="text"
              name="rus"
              value={rus}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Добавить" />
        </form>

      </div>
    );
  }
}

export default App;
