import React from "react";
import vocab from "./vocab/conjonctions.json";

class VocabTable extends React.Component {
    render() {
        return (
            <table>
                <thead>
                    <td>Traduction</td>
                    <td>Japonais</td>
                    <td>Rōmaji</td>
                </thead>
                <tbody>
                {
                    vocab.words.map((line, index) => <tr key={line.fr + index}>
                        <td>{line.fr}</td>
                        <td>{line.jap}</td>
                        <td>{line.romaji}</td>
                    </tr>)
                }
                </tbody>
            </table>
        );
    }
}

export default VocabTable;
