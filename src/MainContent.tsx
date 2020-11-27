import React from 'react';
import { PageType } from './utils';
import VocabExercise from './VocabExercise';
import vocabs from './vocabs';
import VocabTable from './VocabTable';

class MainContent extends React.Component<Props, State> {
    render() {
        if (this.props.pageType === PageType.VocabularyList) {
            return (<div>
                <h2>La fiche de vocabulaire</h2>
                <VocabTable vocab={vocabs[this.props.selectedVocab]} />
            </div>);
        } else {
            return (<div>
                <h2>Exercice</h2>
                <VocabExercise vocab={vocabs[this.props.selectedVocab]} />
            </div>);
        }
    }
}

export default MainContent;

type Props = {
    selectedVocab: number,
    pageType: number,
};
type State = {};
