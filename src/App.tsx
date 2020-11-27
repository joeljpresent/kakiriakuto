import React from 'react';
import VocabExercise from './VocabExercise';
import vocabs from "./vocabs";
import VocabTable from './VocabTable';

class App extends React.Component {
  render() {
    return (
      <header>
        <h1>KakiRiakuto</h1>
        <h2>Exercice</h2>
        <VocabExercise vocab={vocabs[0]} />
        <h2>La fiche de vocabulaire</h2>
        <VocabTable vocab={vocabs[0]} />
      </header>
    );
  }
}

export default App;
