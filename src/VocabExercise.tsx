import React from 'react';

class VocabExercise extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            inputText: ''
        };
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({inputText: event.target.value})
    };

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(this.state.inputText);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.inputText} onChange={this.handleChange} />
                <input type="submit" />
            </form>
        );
    }
}

export default VocabExercise;

type Props = {};

type State = {
    inputText: string
};
