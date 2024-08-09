import React from "react";
import { VocabFile } from "./utils";

export default function VocabTable({ vocab }: Props) {
  return (
    <table>
      <thead><tr>
        <td>Traduction</td>
        <td>Japonais</td>
        <td>Intonation</td>
        <td>Rômaji</td>
      </tr></thead>
      <tbody>
        {
          vocab.words.map((line, index) =>
            <tr key={line.fr + index}>
              <td>{line.fr}</td>
              <td>{line.jap}</td>
              <td>{line.pitch ?? <i>inconnu</i>}</td>
              <td>{line.romaji}</td>
            </tr>
          )
        }
      </tbody>
    </table>
  );
}

type Props = {
  vocab: VocabFile,
};
