import { VocabFile } from "./utils";
import conjonctions from './vocab/conjonctions.json';
import premiers_kanji from './vocab/premiers_kanji.json';
import e_supesharu from './vocab/e_supesharu.json';
import yasashii from "./vocab/yasashii.json"

/** Array of all vocabulary files */
const vocabs: VocabFile[] = [
    premiers_kanji,
    conjonctions,
    e_supesharu,
    yasashii,
];

export default vocabs;
