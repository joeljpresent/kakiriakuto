import { VocabFile } from "./utils";
import conjonctions from './vocab/conjonctions.json';
import premiers_kanji from './vocab/premiers_kanji.json';
import e_supesharu from './vocab/e_supesharu.json';

/** Array of all vocabulary files */
const vocabs: VocabFile[] = [
    premiers_kanji,
    conjonctions,
    e_supesharu,
];

export default vocabs;
