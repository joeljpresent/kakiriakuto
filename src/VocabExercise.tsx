import React from 'react';
import { getTriplyShuffledArray } from './utils';
import vocab from "./vocab/conjonctions.json";

class VocabExercise extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        const shuffledVocab = getTriplyShuffledArray(vocab.words);

        this.state = {
            inputText: '',
            shuffledVocab,
            question: shuffledVocab[0].fr,
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
        if (this.state.currentIndex < this.state.shuffledVocab.length - 1) {
            this.setState(state => ({
                currentIndex: state.currentIndex + 1,
                question: this.state.shuffledVocab[this.state.currentIndex + 1].fr,
            }))
        } else {
            this.setState(() => ({
                question: "Terminé !"
            }));
        }
        console.log(this.state.inputText);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>{this.state.question}</h2>
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
    question: string,
    correctCount: number,
    wrongCount: number,
    currentIndex: number,
};

type VocabLine = { jap: string; romaji: string; fr: string; };
