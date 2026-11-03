import { constants } from '../../util/constants';
import { SINHALA_STARTER_BOARDS } from './sinhalaVocabulary';
import { getSinhalaSymbol } from './sinhalaSymbols';
import { applySinhalaToolbar } from './sinhalaToolbar';
import { getSinhalaCategory } from '../../util/sinhalaAppearance';

import { SINHALA_GRID_PREFIX } from './sinhalaStarterLayout';
export { SINHALA_GRID_PREFIX } from './sinhalaStarterLayout';
export const SINHALA_HOME_ID = SINHALA_GRID_PREFIX + 'core24';
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
        fontColor: '#1F2937', fontSizePct: 19,
        backgroundColor: colors.word, borderColor: '#64748B',
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
        actions: [action('GridActionNavigate', boardKey + '-' + key, {navType: 'navigateToGrid', toGridId: target === 'home' ? SINHALA_HOME_ID : SINHALA_GRID_PREFIX + target, addToCollectElem: false})]
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
        const core = key === 'core24';
        const columns = 20;
        const sentenceWidth = columns - 9;
        const sentence = element(key, 'sentence', labels('මගේ කතාව', 'My message'), 0, 0, {
            width: sentenceWidth, type: 'ELEMENT_TYPE_COLLECT', backgroundColor: '#ffffff',
            collectMode: 'COLLECT_MODE_NEVER', showLabels: true, showFullLabels: true,
            mode: 'MODE_COLLECT_SEPARATED', singleLine: true, convertToLowercase: false,
            imageHeightPercentage: 65, textElemSizeFactor: 1.6,
            actions: [action('GridActionCollectElement', key + '-sentence', {action: 'COLLECT_ACTION_SPEAK_CONTINUOUS'})]
        });
        let controls = [
            navigate(key, 'home', labels('මුලට', 'Home'), 0, 1, 'home', 'home'),
            speak(key, 'yes', labels('ඔව්', 'Yes'), 4, 1, 'check', true),
            speak(key, 'no', labels('නෑ', 'No'), 8, 1, 'negative', true),
            speak(key, 'help', labels('උදව්', 'Help'), 12, 1, 'hands-helping', true, labels('මට උදව් කරන්න', 'Help me')),
            collectAction(key, 'speak', labels('කියන්න', 'Speak'), sentenceWidth, 'volume-up', 'COLLECT_ACTION_SPEAK_CONTINUOUS'),
            collectAction(key, 'undo', labels('එකක් මකන්න', 'Undo last'), sentenceWidth + 3, 'backspace', 'COLLECT_ACTION_REMOVE_WORD'),
            collectAction(key, 'clear', labels('සියල්ල මකන්න', 'Clear message'), sentenceWidth + 6, 'eraser', 'COLLECT_ACTION_CLEAR'),
            speak(key, 'toilet', labels('වැසිකිළිය', 'Toilet'), 16, 1, 'toilet', true, labels('මට වැසිකිළියට යන්න ඕනේ', 'I need the toilet'))
        ];
        if (core) controls = controls.filter(control => control.y === 0);
        controls.filter(control => control.y === 1).forEach(control => { control.width = 4; });
        const content = board.items.map((item, index) => {
            const count = 4, width = 5;
            const x = (index % count) * width, y = (core ? 1 : 2) + Math.floor(index / count);
            const tile = item.kind === 'navigate'
                ? navigate(key, 'content-' + item.key, item.label, x, y, item.symbol, item.target)
                : speak(key, 'content-' + item.key, item.label, x, y, item.symbol, item.kind === 'phrase', item.utterance);
            tile.width = width;
            if (core) tile.colorCategory = getSinhalaCategory(tile);
            return tile;
        });
        const grid = {
            id: SINHALA_GRID_PREFIX + key, modelName: 'GridData', modelVersion: constants.MODEL_VERSION,
            isShortVersion: false, label: board.title, minColumnCount: columns, rowCount: core ? 7 : 5,
            showGlobalGrid: false, keyboardMode: 'KEYBOARD_DISABLED', backgroundColor: '#F3F5F7',
            gridElements: [sentence, ...controls, ...content], additionalFiles: [], webRadios: []
        };
        applySinhalaToolbar(grid);
        return grid;
    });
}

/** Shared toolbar for retained imported boards and newly created boards. */
export function createSinhalaGlobalGrid() {
    const core = createSinhalaStarterBoards().find(grid => grid.id === SINHALA_HOME_ID);
    const elements = core.gridElements.filter(element => element.y === 0).map(element => ({
        ...element, id:element.id.replace('-core24-', '-toolbar-'),
        actions:element.actions.map(action => ({...action,id:action.id.replace('-core24-', '-toolbar-')}))
    }));
    elements.push(element('toolbar','board',{si:'පුවරුව',en:'Board'},0,1,{
        type:'ELEMENT_TYPE_DYNAMIC_GRID_PLACEHOLDER',width:40,height:6,actions:[]
    }));
    return {...core,id:SINHALA_GRID_PREFIX+'toolbar',label:{si:'පොදු බොත්තම් පේළිය',en:'Shared toolbar'},gridElements:elements,rowCount:7};
}
