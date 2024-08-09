import React, { useState } from "react";
import * as Compare from "./compare";
import { getTriplyShuffledArray, PageType, updateArrayMap, VocabFile, VocabLine } from "./utils";

export default function VocabExercise({ vocab, exoType }: Props) {
  const indexedVocab = vocab.words.map((line, index) => ({ line, index }));
  const shuffledVocab = getTriplyShuffledArray(indexedVocab);

  const [inputText, setInputText] = useState("");
  const [vocabs, setVocabs] = useState(shuffledVocab);
  const [currentVocab, setCurrentVocab] = useState(shuffledVocab[0]);
  const [previousVocab, setPreviousVocab] = useState<IndexedVocab | null>(null);
  const [previousAnswerWasWrong, setPreviousAnswerWasWrong] = useState(false);
  const [mistakeHistory, setMistakeHistory] = useState(new Map<number, string[]>());
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  function showsJapLine() {
    return [PageType.JapToFr, PageType.JapToRomaji].includes(exoType);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputText(event.target.value);
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!inputText) {
      return;
    }
    const isTheCorrectAnswer = isCorrectAnswer();
    const isLastQuestion = index >= vocabs.length - 1;
    const updatedVocab = [
      ...vocabs,
      vocabs[index],
    ];

    if (isTheCorrectAnswer) {
      setCorrectCount(correctCount + 1);
      setPreviousAnswerWasWrong(false);
      setPreviousVocab(currentVocab);
    } else {
      setWrongCount(wrongCount + 1);
      setPreviousAnswerWasWrong(true);
      setMistakeHistory(updateArrayMap(mistakeHistory, currentVocab.index, inputText));
      setPreviousVocab(currentVocab);
      setVocabs(updatedVocab);
    }
    if (isLastQuestion && isTheCorrectAnswer) {
      setInputText("");
      setIsPlaying(false);
    } else {
      setIndex(index + 1);
      setCurrentVocab(updatedVocab[index + 1]);
      setInputText("");
    }
    console.log(inputText);
  }

  function isCorrectAnswer() {
    switch (exoType) {
      case PageType.FrToJap:
        return Compare.jap(inputText, currentVocab.line.jap);
      case PageType.FrToRomaji:
      case PageType.JapToRomaji:
        return Compare.romaji(inputText, currentVocab.line.romaji);
      case PageType.JapToFr:
        return Compare.fr(inputText, currentVocab.line.fr);
    }
  }

  function getQuestionLine() {
    const question = showsJapLine()
      ? currentVocab.line.jap
      : currentVocab.line.fr;
    return isPlaying ? question : "Terminé !";
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className={
        showsJapLine()
          ? "question-line-jap"
          : ""
      }>
        {getQuestionLine()}
      </h2>
      <input
        type="text" value={inputText}
        onChange={handleChange} disabled={!isPlaying}
      />
      <input type="submit" value="Valider" disabled={!isPlaying} />
      {
        (previousVocab != null)
          ? <p className={
            previousAnswerWasWrong
              ? "previous-line-wrong"
              : "previous-line-correct"
          }>
            {previousVocab.line.jap}{" "}
            ({previousVocab.line.romaji}) :{" "}
            {previousVocab.line.fr}
          </p>
          : null

      }
      <p>
        Correct: {correctCount} /
        Faux: {wrongCount}
      </p>
      {
        isPlaying
          ? null
          : <div>
            <h4>Précédentes erreurs</h4>
            <ul>{
              [...mistakeHistory.entries()].map(([index, mistakes]) => {
                const line = vocab.words[index];
                return <li>
                  <b>{line.jap} ({line.romaji}) : {line.fr}</b>{" → "}
                  {mistakes.join(", ")}
                </li>;
              })}</ul>
          </div>
      }
    </form>
  );
}

type Props = {
  vocab: VocabFile,
  exoType: PageType,
};

type IndexedVocab = {
  index: number,
  line: VocabLine
};
