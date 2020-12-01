import { VocabFile } from "./utils";
import annexe from './vocab/annexe.json';
import conjonctions from './vocab/conjonctions.json';
import premiers_kanji from './vocab/premiers_kanji.json';
import yasashii from "./vocab/yasashii.json"

/** Array of all vocabulary files */
const vocabs: VocabFile[] = [
    premiers_kanji,
    conjonctions,
    annexe,
    yasashii,
];

export default vocabs;
