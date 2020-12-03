import { VocabFile } from "./utils";
import annexe from './vocab/annexe.json';
import conjonctions from './vocab/conjonctions.json';
import premiers_kanji from './vocab/premiers_kanji.json';
import pronoms_personnels from './vocab/pronoms_personnels.json';
import suffixes_honorifiques from './vocab/suffixes_honorifiques.json';
import unites_mesure from './vocab/unites_mesure.json';
import yasashii from "./vocab/yasashii.json"

/** Array of all vocabulary files */
const VOCABS: VocabFile[] = [
    premiers_kanji,
    conjonctions,
    unites_mesure,
    pronoms_personnels,
    suffixes_honorifiques,
    annexe,
    yasashii,
];

export default VOCABS;
