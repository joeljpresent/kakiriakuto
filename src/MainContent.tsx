import React from 'react';
import { PageType } from './utils';
import VocabExercise from './VocabExercise';
import VOCABS from './vocabs';
import VocabTable from './VocabTable';

class MainContent extends React.Component<Props, State> {
    render() {
        if (this.props.pageType === PageType.FrontPage) {
            return (<div>
                <h2>{VOCABS[this.props.selectedVocab].title}</h2>
                {
                    VOCABS[this.props.selectedVocab].video_id == null
                    ? <p>Ce cours de vocabulaire n'a pas de vidéo associée.</p>
                    : <iframe width="560" height="315"
                        src={`https://www.youtube.com/embed/${VOCABS[this.props.selectedVocab].video_id}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
                      ></iframe>
                }
            </div>);
        } else if (this.props.pageType === PageType.VocabularyList) {
            return (<div>
                <h2>La fiche de vocabulaire</h2>
                <VocabTable vocab={VOCABS[this.props.selectedVocab]} />
            </div>);
        } else {
            return (<div>
                <h2>Exercice</h2>
                <VocabExercise
                    vocab={VOCABS[this.props.selectedVocab]}
                    exoType={this.props.pageType}
                />
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
