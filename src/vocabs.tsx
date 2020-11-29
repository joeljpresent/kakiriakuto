import { VocabFile } from "./utils";
import annexe from './vocab/annexe.json';
import conjonctions from './vocab/conjonctions.json';
import premiers_kanji from './vocab/premiers_kanji.json';
import e_supesharu from './vocab/e_supesharu.json';
import yasashii from "./vocab/yasashii.json"

/** Array of all vocabulary files */
const vocabs: VocabFile[] = [
    premiers_kanji,
    conjonctions,
    annexe,
    e_supesharu,
    yasashii,
];

export default vocabs;
