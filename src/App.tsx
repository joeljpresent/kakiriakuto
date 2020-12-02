import React from 'react';
import MainContent from './MainContent';
import { PageType, PAGE_TYPES } from './utils';
import VOCABS from './vocabs';

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      selectedVocab: 0,
      pageType: PageType.FrontPage,
    }
  }

  handleChangeVocab = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectedVocab: Number.parseInt(event.target.value, 10) ?? 0,
      pageType: PageType.FrontPage,
    });
  }

  handleChoosePageType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      pageType: Number.parseInt(event.target.value, 10) ?? PageType.FrontPage,
    });
  }

  handleResetPageType = (event: React.MouseEvent<HTMLInputElement>) => {
    this.setState({
      pageType: PageType.FrontPage,
    });
  }

  render() {
    return (
      <header>
        <h1>KakiRiakuto</h1>
        <select value={this.state.selectedVocab} onChange={this.handleChangeVocab}>{
          VOCABS.map((vocab, index) =>
            <option value={index} key={index}>{vocab.title}</option>
          )
        }</select>
        {
          this.state.pageType === PageType.FrontPage
          ? <select value={this.state.pageType} onChange={this.handleChoosePageType}>{
              PAGE_TYPES.map((pageType, index) =>
                <option value={index} key={index}>{pageType}</option>
              )
              }</select>
          : <input type="button" value="← Retour" onClick={this.handleResetPageType} />
        }
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
