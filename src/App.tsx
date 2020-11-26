import React from 'react';
import VocabExercise from './VocabExercise';
import VocabTable from './VocabTable';

class App extends React.Component {
  render() {
    return (
      <header>
        <h1>KakiReakuto</h1>
        <h2>Fiche de vocabulaire</h2>
        <VocabTable />
        <h2>Exercice</h2>
        <VocabExercise />
      </header>
    );
  }
}

export default App;
