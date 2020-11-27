import React from 'react';
import VocabExercise from './VocabExercise';
import vocabs from "./vocabs";
import VocabTable from './VocabTable';

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      selectedVocab: 0,
    }
  }

  handleChangeVocab = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectedVocab: Number.parseInt(event.target.value) ?? 0,
    });
  }

  render() {
    return (
      <header>
        <h1>KakiRiakuto</h1>
        <select value={this.state.selectedVocab} onChange={this.handleChangeVocab}>{
          vocabs.map((vocab, index) =>
            <option value={index} key={index}>{vocab.title}</option>
          )
        }</select>
        <h2>Exercice</h2>
        <VocabExercise vocab={vocabs[this.state.selectedVocab]} />
        <h2>La fiche de vocabulaire</h2>
        <VocabTable vocab={vocabs[this.state.selectedVocab]} />
      </header>
    );
  }
}

export default App;

type Props = {};
type State = {
  selectedVocab: number,
};
