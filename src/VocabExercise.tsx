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
            previousLine: null,
            previousAnswerWasWrong: false,
            correctCount: 0,
            wrongCount: 0,
            index: 0,
            isPlaying: true,
        };
    }

    showsJapLine = () => {
        return [PageType.JapToFr, PageType.JapToRomaji].includes(this.props.exoType);
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ inputText: event.target.value })
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
                previousAnswerWasWrong: false,
                previousLine: state.line,
            }));
        } else {
            this.setState(state => ({
                wrongCount: state.wrongCount + 1,
                previousAnswerWasWrong: true,
                previousLine: state.line,
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
            case PageType.JapToRomaji:
                return Compare.romaji(this.state.inputText, this.state.line.romaji);
            case PageType.JapToFr:
                return Compare.fr(this.state.inputText, this.state.line.fr);
        }
    }

    getQuestionLine() {
        const question = this.showsJapLine()
            ? this.state.line.jap
            : this.state.line.fr;
        return this.state.isPlaying ? question : "Terminé !";
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h2 className={
                    this.showsJapLine()
                        ? "question-line-jap"
                        : ""
                }>
                    {this.getQuestionLine()}
                </h2>
                <input
                    type="text" value={this.state.inputText}
                    onChange={this.handleChange} disabled={!this.state.isPlaying}
                />
                <input type="submit" value="Valider" disabled={!this.state.isPlaying} />
                {
                    (this.state.previousLine != null)
                        ? <p className={
                            this.state.previousAnswerWasWrong
                                ? "previous-line-wrong"
                                : "previous-line-correct"
                        }>
                            {this.state.previousLine.jap}{" "}
                            ({this.state.previousLine.romaji}) :{" "}
                            {this.state.previousLine.fr}
                        </p>
                        : null

                }
                <p>
                    Correct: {this.state.correctCount} /
                    Faux: {this.state.wrongCount}
                </p>
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
    previousLine: VocabLine | null,
    previousAnswerWasWrong: boolean,
    correctCount: number,
    wrongCount: number,
    index: number,
    isPlaying: boolean,
};
