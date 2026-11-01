import { constants } from '../../util/constants';
import { SINHALA_STARTER_BOARDS } from './sinhalaVocabulary';
import { getSinhalaSymbol } from './sinhalaSymbols';

import { SINHALA_GRID_PREFIX } from './sinhalaStarterLayout';
export { SINHALA_GRID_PREFIX } from './sinhalaStarterLayout';
export const SINHALA_HOME_ID = SINHALA_GRID_PREFIX + 'home';
const labels = (si, en) => ({si, en});
const colors = { word: '#fffdf2', phrase: '#f5f0ff', navigate: '#e8f4fa', control: '#eef4f3' };

function action(modelName, id, props = {}) {
    return { id: 'grid-action-' + id, modelName, modelVersion: constants.MODEL_VERSION, ...props };
}
function element(boardKey, key, label, x, y, props = {}) {
    return {
        id: 'grid-element-kiyamu-si-' + boardKey + '-' + key,
        modelName: 'GridElement', modelVersion: constants.MODEL_VERSION,
        type: 'ELEMENT_TYPE_NORMAL', label, pronunciation: {}, wordForms: [],
        width: 5, height: 1, x, y, hidden: false, vocabularyLevel: null,
        fontColor: '#172e35', fontSizePct: 19,
        backgroundColor: colors.word, borderColor: '#56716e',
        additionalProps: { sinhalaStarter: true }, ...props
    };
}
function speak(boardKey, key, label, x, y, symbol, instant = false, utterance) {
    const id = boardKey + '-' + key;
    const modelName = utterance ? 'GridActionSpeakCustom' : 'GridActionSpeak';
    return element(boardKey, key, label, x, y, {
        image: { data: getSinhalaSymbol(symbol), author: 'Kiyamu contributors' },
        collectMode: instant ? 'COLLECT_MODE_NEVER' : 'COLLECT_MODE_ALWAYS',
        backgroundColor: instant ? colors.phrase : colors.word,
        actions: [action(modelName, id, { speakLanguage: 'si', ...(utterance ? {speakText: utterance} : {}) })]
    });
}
function navigate(boardKey, key, label, x, y, symbol, target) {
    return element(boardKey, key, label, x, y, {
        image: { data: getSinhalaSymbol(symbol), author: 'Kiyamu contributors' },
        collectMode: 'COLLECT_MODE_NEVER', backgroundColor: colors.navigate,
        actions: [action('GridActionNavigate', boardKey + '-' + key, {navType: 'navigateToGrid', toGridId: SINHALA_GRID_PREFIX + target, addToCollectElem: false})]
    });
}
function collectAction(boardKey, key, label, x, symbol, type) {
    return element(boardKey, key, label, x, 0, {
        width: 3,
        image: {data: getSinhalaSymbol(symbol), author: 'Kiyamu contributors'},
        collectMode: 'COLLECT_MODE_NEVER', backgroundColor: colors.control,
        actions: [action('GridActionCollectElement', boardKey + '-' + key, {action: type})]
    });
}

/** Fixed positions and literal selection order support learning through repetition. */
export function createSinhalaStarterBoards() {
    return SINHALA_STARTER_BOARDS.map(board => {
        const key = board.key;
        const sentence = element(key, 'sentence', labels('මගේ කතාව', 'My message'), 0, 0, {
            width: 11, type: 'ELEMENT_TYPE_COLLECT', backgroundColor: '#ffffff',
            collectMode: 'COLLECT_MODE_NEVER', showLabels: true, showFullLabels: true,
            mode: 'MODE_COLLECT_SEPARATED', singleLine: true, convertToLowercase: false,
            imageHeightPercentage: 65, textElemSizeFactor: 1.6,
            actions: [action('GridActionCollectElement', key + '-sentence', {action: 'COLLECT_ACTION_SPEAK_CONTINUOUS'})]
        });
        const controls = [
            navigate(key, 'home', labels('මුලට', 'Home'), 0, 1, 'home', 'home'),
            speak(key, 'yes', labels('ඔව්', 'Yes'), 4, 1, 'check', true),
            speak(key, 'no', labels('නෑ', 'No'), 8, 1, 'negative', true),
            speak(key, 'help', labels('උදව්', 'Help'), 12, 1, 'hands-helping', true, labels('මට උදව් කරන්න', 'Help me')),
            collectAction(key, 'speak', labels('කියන්න', 'Speak'), 11, 'volume-up', 'COLLECT_ACTION_SPEAK_CONTINUOUS'),
            collectAction(key, 'undo', labels('එකක් මකන්න', 'Undo last'), 14, 'backspace', 'COLLECT_ACTION_REMOVE_WORD'),
            collectAction(key, 'clear', labels('සියල්ල මකන්න', 'Clear message'), 17, 'eraser', 'COLLECT_ACTION_CLEAR'),
            speak(key, 'toilet', labels('වැසිකිළිය', 'Toilet'), 16, 1, 'toilet', true, labels('මට වැසිකිළියට යන්න ඕනේ', 'I need the toilet'))
        ];
        controls.filter(control => control.y === 1).forEach(control => { control.width = 4; });
        const content = board.items.map((item, index) => {
            const x = (index % 4) * 5, y = 2 + Math.floor(index / 4);
            return item.kind === 'navigate'
                ? navigate(key, 'content-' + item.key, item.label, x, y, item.symbol, item.target)
                : speak(key, 'content-' + item.key, item.label, x, y, item.symbol, item.kind === 'phrase', item.utterance);
        });
        return {
            id: SINHALA_GRID_PREFIX + key, modelName: 'GridData', modelVersion: constants.MODEL_VERSION,
            isShortVersion: false, label: board.title, minColumnCount: 20, rowCount: 5,
            showGlobalGrid: false, keyboardMode: 'KEYBOARD_DISABLED', backgroundColor: '#f4f6ef',
            gridElements: [sentence, ...controls, ...content], additionalFiles: [], webRadios: []
        };
    });
}
