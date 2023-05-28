import React from 'react';
import * as Compare from './compare';
import { getTriplyShuffledArray, PageType, updateArrayMap, VocabFile, VocabLine } from './utils';

class VocabExercise extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        const indexedVocab = props.vocab.words.map((line, index) => ({ line, index }));
        const shuffledVocab = getTriplyShuffledArray(indexedVocab);

        this.state = {
            inputText: '',
            vocabs: shuffledVocab,
            currentVocab: shuffledVocab[0],
            previousVocab: null,
            previousAnswerWasWrong: false,
            mistakeHistory: new Map(),
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
        const isLastQuestion = this.state.index >= this.state.vocabs.length - 1;
        const updatedVocab = [
            ...this.state.vocabs,
            this.state.vocabs[this.state.index],
        ];

        if (isCorrectAnswer) {
            this.setState(state => ({
                correctCount: state.correctCount + 1,
                previousAnswerWasWrong: false,
                previousVocab: state.currentVocab,
            }));
        } else {
            this.setState(state => ({
                wrongCount: state.wrongCount + 1,
                previousAnswerWasWrong: true,
                mistakeHistory: updateArrayMap(
                    state.mistakeHistory,
                    state.currentVocab.index,
                    this.state.inputText
                ),
                previousVocab: state.currentVocab,
                vocabs: updatedVocab,
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
                currentVocab: updatedVocab[this.state.index + 1],
                inputText: '',
            }));
        }
        console.log(this.state.inputText);
    }

    isCorrectAnswer = () => {
        switch (this.props.exoType) {
            case PageType.FrToJap:
                return Compare.jap(this.state.inputText, this.state.currentVocab.line.jap);
            case PageType.FrToRomaji:
            case PageType.JapToRomaji:
                return Compare.romaji(this.state.inputText, this.state.currentVocab.line.romaji);
            case PageType.JapToFr:
                return Compare.fr(this.state.inputText, this.state.currentVocab.line.fr);
        }
    }

    getQuestionLine = () => {
        const question = this.showsJapLine()
            ? this.state.currentVocab.line.jap
            : this.state.currentVocab.line.fr;
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
                    (this.state.previousVocab != null)
                        ? <p className={
                            this.state.previousAnswerWasWrong
                                ? "previous-line-wrong"
                                : "previous-line-correct"
                        }>
                            {this.state.previousVocab.line.jap}{" "}
                            ({this.state.previousVocab.line.romaji}) :{" "}
                            {this.state.previousVocab.line.fr}
                        </p>
                        : null

                }
                <p>
                    Correct: {this.state.correctCount} /
                    Faux: {this.state.wrongCount}
                </p>
                {
                    this.state.isPlaying
                        ? null
                        : <div>
                            <h4>Précédentes erreurs</h4>
                            <ul>{
                                [...this.state.mistakeHistory.entries()].map(([index, mistakes]) => {
                                    const line = this.props.vocab.words[index];
                                    return <li>
                                        {line.jap} ({line.romaji}, {line.fr}){" → "}
                                        {mistakes.join(", ")}
                                    </li>;
                                })}</ul>
                        </div>
                }
            </form>
        );
    }
}

export default VocabExercise;

type Props = {
    vocab: VocabFile,
    exoType: PageType,
};

type IndexedVocab = {
    index: number,
    line: VocabLine
};

type State = {
    /** The answer entered by the player */
    inputText: string,
    /** List of every indexed vocab line */
    vocabs: IndexedVocab[],
    /** The current indexed vocab line */
    currentVocab: IndexedVocab,
    /** The previous indexed vocab line */
    previousVocab: IndexedVocab | null,
    /** Whether the player made a mistake on the previous question */
    previousAnswerWasWrong: boolean,
    /** Map the index of vocab lines and the player's wrong answers */
    mistakeHistory: Map<number, string[]>,
    /** Number of questions that the player got right */
    correctCount: number,
    /** Number of questions that the player got wrong */
    wrongCount: number,
    /** The index of the current vocab within the vocabs list */
    index: number,
    /** Whether the game is still playing (false if the game stops) */
    isPlaying: boolean,
};
