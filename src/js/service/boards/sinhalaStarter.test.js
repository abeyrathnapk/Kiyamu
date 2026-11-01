import { createSinhalaStarterBoards, SINHALA_HOME_ID } from './sinhalaStarter';
import { SINHALA_STARTER_BOARDS } from './sinhalaVocabulary';

test('starter boards have unique IDs, valid navigation, and no overlapping cells', () => {
    const boards = createSinhalaStarterBoards();
    const boardIds = new Set(boards.map(board => board.id));
    const elementIds = new Set(), actionIds = new Set();
    expect(boardIds.has(SINHALA_HOME_ID)).toBe(true);
    expect(boards).toHaveLength(7);
    for (const board of boards) {
        const occupied = new Set();
        expect(board.minColumnCount).toBe(20);
        expect(board.showGlobalGrid).toBe(false);
        for (const element of board.gridElements) {
            expect(elementIds.has(element.id)).toBe(false);
            elementIds.add(element.id);
            for (let x = element.x; x < element.x + element.width; x++) {
                for (let y = element.y; y < element.y + element.height; y++) {
                    expect(x).toBeLessThan(board.minColumnCount); expect(y).toBeLessThan(board.rowCount);
                    expect(occupied.has(x + ':' + y)).toBe(false);
                    occupied.add(x + ':' + y);
                }
            }
            expect(element.label.si).toMatch(/[\u0d80-\u0dff]/);
            for (const action of element.actions) {
                expect(actionIds.has(action.id)).toBe(false); actionIds.add(action.id);
                if (action.modelName === 'GridActionNavigate') expect(boardIds.has(action.toGridId)).toBe(true);
            }
            if (element.image) expect(element.image.data).toMatch(/^data:image\/svg\+xml;base64,/);
        }
        expect(occupied.size).toBe(board.minColumnCount * board.rowCount);
    }
});

test('category boards keep consistent quick-access and sentence controls', () => {
    const boards = createSinhalaStarterBoards();
    const expected = {home:[0,1], yes:[4,1], no:[8,1], help:[12,1], speak:[11,0], undo:[14,0], clear:[17,0], toilet:[16,1]};
    boards.forEach((board, index) => {
        if (board.id === SINHALA_HOME_ID) return;
        for (const [name, position] of Object.entries(expected)) {
            const control = board.gridElements.find(e => e.id === 'grid-element-kiyamu-si-' + SINHALA_STARTER_BOARDS[index].key + '-' + name);
            expect([control.x, control.y]).toEqual(position);
            expect(control.collectMode).toBe('COLLECT_MODE_NEVER');
        }
    });
});

test('children can compose natural Sinhala requests and statements in tap order', () => {
    const boards = createSinhalaStarterBoards();
    const food = boards.find(b => b.id.endsWith('-food'));
    const people = boards.find(b => b.id.endsWith('-people'));
    const compose = (board, keys) => keys.map(key => {
        const element = board.gridElements.find(e => e.id.endsWith('-content-' + key));
        expect(element.collectMode).toBe('COLLECT_MODE_ALWAYS');
        return element.label.si;
    }).join(' ');
    const core = boards.find(board => board.id === SINHALA_HOME_ID);
    expect(core.gridElements.filter(element => element.id.includes('-content-'))).toHaveLength(24);
    expect(compose(core, ['to-me','water','want'])).toBe('මට වතුර ඕනේ');
    expect(compose(core, ['i','rice','eat'])).toBe('මම බත් කනවා');
    expect(compose(food, ['to-me','water','want'])).toBe('මට වතුර ඕනේ');
    expect(compose(food, ['to-me','rice','no'])).toBe('මට බත් එපා');
    expect(compose(people, ['i','home','go'])).toBe('මම ගෙදර යනවා');
});
