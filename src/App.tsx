import React, { ChangeEvent, MouseEvent, useState } from "react";
import MainContent from "./MainContent";
import { PageType, PAGE_TYPES } from "./utils";
import VOCABS from "./vocabs";

export default function App() {
  const [selectedVocab, setSelectedVocab] = useState(0);
  const [pageType, setPageType] = useState(PageType.FrontPage);

  function handleChangeVocab(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedVocab(Number.parseInt(event.target.value, 10) ?? 0);
    setPageType(PageType.FrontPage);
  }

  function handleChoosePageType(event: ChangeEvent<HTMLSelectElement>) {
    setPageType(Number.parseInt(event.target.value, 10) ?? PageType.FrontPage);
  }

  function handleResetPageType(event: MouseEvent<HTMLInputElement>) {
    setPageType(PageType.FrontPage);
  }

  return (
    <header>
      <h1>KakiRiakuto</h1>
      <select value={selectedVocab} onChange={handleChangeVocab}>{
        VOCABS.map((vocab, index) =>
          <option value={index} key={index}>{vocab.title}</option>
        )
      }</select>
      {
        pageType === PageType.FrontPage
          ? <select value={pageType} onChange={handleChoosePageType}>{
            PAGE_TYPES.map((pageType, index) =>
              <option value={index} key={index}>{pageType}</option>
            )
          }</select>
          : <input type="button" value="← Retour" onClick={handleResetPageType} />
      }
      <MainContent selectedVocab={selectedVocab} pageType={pageType} />
    </header>
  );
}
