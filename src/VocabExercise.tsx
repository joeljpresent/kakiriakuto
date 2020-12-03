import React from 'react';
import * as Compare from './compare';
import { getTriplyShuffledArray, PageType, VocabFile, VocabLine } from './utils';

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
        const isCorrectAnswer = this.isCorrectAnswer();
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
                previousCorrectAnswer: this.getPreviousCorrectAnswer(state.line),
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

    isCorrectAnswer() {
        switch (this.props.exoType) {
            case PageType.FrToJap:
                return Compare.jap(this.state.inputText, this.state.line.jap);
            case PageType.FrToRomaji:
                return Compare.romaji(this.state.inputText, this.state.line.romaji);
            case PageType.JapToFr:
                return Compare.fr(this.state.inputText, this.state.line.fr);
        }
    }

    getPreviousCorrectAnswer(previousLine: VocabLine) {
        switch (this.props.exoType) {
            case PageType.FrToJap:
                return `${previousLine.jap} (${previousLine.romaji})`;
            case PageType.FrToRomaji:
                return previousLine.romaji;
            case PageType.JapToFr:
                return previousLine.fr;
        }
        console.error("Unknown exercise type!");
        return null;
    }

    getQuestionLine() {
        const question = this.props.exoType === PageType.JapToFr
                       ? this.state.line.jap
                       : this.state.line.fr;
        return this.state.isPlaying ? question : "Terminé !";
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <p className="question-line">{this.getQuestionLine()}</p>
                <input
                    type="text" value={this.state.inputText}
                    onChange={this.handleChange} disabled={!this.state.isPlaying}
                />
                <input type="submit" value="Valider" disabled={!this.state.isPlaying} />
                {
                    (this.state.previousCorrectAnswer != null)
                    ? <p>La bonne réponse était {this.state.previousCorrectAnswer}</p>
                    : null
                }
                <p>Correct: {this.state.correctCount}</p>
                <p>Faux: {this.state.wrongCount}</p>
            </form>
        );
    }
}

export default VocabExercise;

type Props = {
    vocab: VocabFile,
    exoType: PageType,
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
