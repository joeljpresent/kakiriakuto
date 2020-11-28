import React from 'react';
import MainContent from './MainContent';
import { PageType, PAGE_TYPES } from './utils';
import vocabs from './vocabs';

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      selectedVocab: 0,
      pageType: 0,
    }
  }

  handleChangeVocab = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectedVocab: Number.parseInt(event.target.value, 10) ?? 0,
      pageType: PageType.VocabularyList,
    });
  }

  handleChangePageType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      pageType: Number.parseInt(event.target.value, 10) ?? 0,
    });
  }

  render() {
    return (
      <header>
        <h1>KakiRiakuto</h1>
        <select value={this.state.selectedVocab} onChange={this.handleChangeVocab}>{
          vocabs.map((vocab, index) =>
            <option value={index} key={index}>{vocab.title}</option>
          )
        }</select>
        <select value={this.state.pageType} onChange={this.handleChangePageType}>{
          PAGE_TYPES.map((pageType, index) =>
            <option value={index} key={index}>{pageType}</option>
          )
        }</select>
        <MainContent selectedVocab={this.state.selectedVocab} pageType={this.state.pageType} />
      </header>
    );
  }
}

export default App;

type Props = {};
type State = {
  selectedVocab: number,
  pageType: number,
};
