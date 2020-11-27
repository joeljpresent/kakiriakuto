import React from 'react';
import { getTriplyShuffledArray, VocabFile, VocabLine } from './utils';

class VocabExercise extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        const shuffledVocab = getTriplyShuffledArray(props.vocab.words);

        this.state = {
            inputText: '',
            vocab: shuffledVocab,
            line: shuffledVocab[0],
            previousCorrectAnswer: null,
            correctCount: 0,
            wrongCount: 0,
            index: 0,
            isPlaying: true,
        };
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({inputText: event.target.value})
    };

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!this.state.inputText) {
            return;
        }
        const isCorrectAnswer = this.state.inputText === this.state.line.jap;
        const isLastQuestion = this.state.index >= this.state.vocab.length - 1;
        const updatedVocab = [
            ...this.state.vocab,
            this.state.vocab[this.state.index],
        ];

        if (isCorrectAnswer) {
            this.setState(state => ({
                correctCount: state.correctCount + 1,
                previousCorrectAnswer: null,
            }));
        } else {
            this.setState(state => ({
                wrongCount: state.wrongCount + 1,
                previousCorrectAnswer: `${state.line.jap} (${state.line.romaji})`,
                vocab: updatedVocab,
            }));
        }
        if (isLastQuestion && isCorrectAnswer) {
            this.setState({
                inputText: '',
                isPlaying: false,
            });
        } else {
            this.setState(state => ({
                index: state.index + 1,
                line: updatedVocab[this.state.index + 1],
                inputText: '',
            }));
        }
        console.log(this.state.inputText);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>{this.state.isPlaying ? this.state.line.fr : "Terminé !"}</h2>
                <input
                    type="text" value={this.state.inputText}
                    onChange={this.handleChange} disabled={!this.state.isPlaying}
                />
                <input type="submit" value="Valider" disabled={!this.state.isPlaying} />
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

type Props = {
    vocab: VocabFile,
};

type State = {
    inputText: string,
    vocab: VocabLine[],
    line: VocabLine,
    previousCorrectAnswer: string | null,
    correctCount: number,
    wrongCount: number,
    index: number,
    isPlaying: boolean,
};
