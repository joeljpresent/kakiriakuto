import React from "react";
import { PageType, PAGE_TYPES } from "./utils";
import VocabExercise from "./VocabExercise";
import VOCABS from "./vocabs";
import VocabTable from "./VocabTable";

export default function MainContent({ pageType, selectedVocab }: Props) {
  if (pageType === PageType.FrontPage) {
    return (<div>
      <h2>{VOCABS[selectedVocab].title}</h2>
      <p className="small-width">
        {VOCABS[selectedVocab].description}
      </p>
    </div>);
  } else if (pageType === PageType.YouTubeVideo) {
    return (<div>
      <h2>{VOCABS[selectedVocab].title}</h2>
      {
        VOCABS[selectedVocab].video_id == null
          ? <p>Ce cours de vocabulaire n'a pas de vidéo associée.</p>
          : <iframe width="560" height="315" title="Vidéo du cours de vocabulaire"
            src={`https://www.youtube.com/embed/${VOCABS[selectedVocab].video_id}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media;
                            gyroscope; picture-in-picture" allowFullScreen
          ></iframe>
      }
    </div>);
  } else if (pageType === PageType.VocabularyList) {
    return (<div>
      <h2>La fiche de vocabulaire</h2>
      <VocabTable vocab={VOCABS[selectedVocab]} />
    </div>);
  } else {
    return (<div>
      <p><i>{
        PAGE_TYPES[pageType]
      }</i></p>
      <VocabExercise
        vocab={VOCABS[selectedVocab]}
        exoType={pageType}
      />
    </div>);
  }
}

type Props = {
  selectedVocab: number,
  pageType: number,
};
