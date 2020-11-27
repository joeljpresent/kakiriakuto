import { VocabFile } from "./utils";
import conjonctions from './vocab/conjonctions.json';
import premiers_kanji from './vocab/premiers_kanji.json';

/** Array of all vocabulary files */
const vocabs: VocabFile[] = [
    premiers_kanji,
    conjonctions,
];

export default vocabs;
