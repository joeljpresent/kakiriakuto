import React from 'react';
import { getTriplyShuffledArray } from './utils';
import vocab from "./vocab/conjonctions.json";

class VocabExercise extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            inputText: '',
            shuffledVocab: getTriplyShuffledArray(vocab.words),
            correctCount: 0,
            wrongCount: 0,
            currentIndex: 0
        };
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({inputText: event.target.value})
    };

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(this.state.inputText);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.inputText} onChange={this.handleChange} />
                <input type="submit" value="Valider" />
            </form>
        );
    }
}

export default VocabExercise;

type Props = {};

type State = {
    inputText: string,
    shuffledVocab: VocabLine[],
    correctCount: number,
    wrongCount: number,
    currentIndex: number,
};

type VocabLine = { jap: string; romaji: string; fr: string; };
