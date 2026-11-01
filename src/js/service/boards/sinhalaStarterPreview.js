import { GridPreview } from '../../model/GridPreview';
export const SINHALA_STARTER_FILENAME = 'kiyamu-sinhala-core-24.grd.json';
export const QUICK_CORE_FILENAME = 'quick-core-24.grd.json';
export function isSinhalaStarterFilename(filename) {
    return [SINHALA_STARTER_FILENAME, QUICK_CORE_FILENAME].includes(filename);
}
export function createSinhalaStarterPreview() {
    return new GridPreview({
        name: {si:'කියමු 24', en:'Kiyamu Sinhala Core 24'},
        description: {si:'දරුවන් සහ ඔවුන්ට සහාය දෙන අය සඳහා සිංහල කොටු 24ක මුල් පුවරුව සහ රූප පුවරු හයක්. මට වතුර ඕනේ වැනි කෙටි වාක්‍ය හදමු.', en:'A 24-cell Sinhala home board and six everyday picture boards for children and caregivers. Bundled for offline use; speech needs an available Sinhala voice.'},
        url: SINHALA_STARTER_FILENAME, languages:['si'], selfContained:true,
        author:'Kiyamu contributors', tags:['SINHALA','4x6'], priority:100000
    });
}
