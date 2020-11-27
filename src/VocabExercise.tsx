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
            expectedAnswer: shuffledVocab[0].jap,
            previousCorrectAnswer: null,
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
        if (this.state.inputText === this.state.expectedAnswer) {
            this.setState(state => ({
                correctCount: state.correctCount + 1,
                previousCorrectAnswer: null,
            }));
        } else {
            this.setState(state => ({
                wrongCount: state.wrongCount + 1,
                previousCorrectAnswer: state.expectedAnswer,
                shuffledVocab: [
                    ...state.shuffledVocab,
                    state.shuffledVocab[state.currentIndex],
                ],
            }));
        }
        if (this.state.currentIndex < this.state.shuffledVocab.length - 1) {
            this.setState(state => ({
                currentIndex: state.currentIndex + 1,
                question: this.state.shuffledVocab[this.state.currentIndex + 1].fr,
                expectedAnswer: this.state.shuffledVocab[this.state.currentIndex + 1].jap,
                inputText: '',
            }));
        } else {
            this.setState({
                question: "Terminé !",
                inputText: '',
            });
        }
        console.log(this.state.inputText);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>{this.state.question}</h2>
                <input type="text" value={this.state.inputText} onChange={this.handleChange} />
                <input type="submit" value="Valider" />
                <div>
                    {
                        (this.state.previousCorrectAnswer != null)
                        ? <p>La bonne réponse était {this.state.previousCorrectAnswer}</p>
                        : null
                    }
                    <p>Correct: {this.state.correctCount}</p>
                    <p>Faux: {this.state.wrongCount}</p>
                </div>
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
    expectedAnswer: string,
    previousCorrectAnswer: string | null,
    correctCount: number,
    wrongCount: number,
    currentIndex: number,
};

type VocabLine = { jap: string; romaji: string; fr: string; };
