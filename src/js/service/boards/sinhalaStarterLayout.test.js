import { createSinhalaStarterBoards } from './sinhalaStarter';
import { upgradeSinhalaStarterLayout } from './sinhalaStarterLayout';

function legacyBoard() {
    const board = createSinhalaStarterBoards().find(board => board.id.endsWith('-food'));
    board.minColumnCount = 4; board.rowCount = 6;
    const positions = {sentence:[0,0,4], home:[0,1,1], yes:[1,1,1], no:[2,1,1], help:[3,1,1], speak:[0,5,1], undo:[1,5,1], clear:[2,5,1], toilet:[3,5,1]};
    for (const element of board.gridElements) {
        const key = element.id.replace('grid-element-kiyamu-si-food-', '');
        if (positions[key]) [element.x,element.y,element.width] = positions[key];
        else { element.x /= 5; element.width = 1; }
    }
    return board;
}

test('saved starter boards gain top sentence controls without losing personalized content', () => {
    const board = legacyBoard();
    const word = board.gridElements.find(e => e.id.includes('-content-'));
    word.label.si = 'මගේ වචනය'; word.image.data = 'custom-image'; word.actions = [{modelName:'GridActionSpeakCustom',speakText:{si:'මගේ හඬ'}}];
    const content = JSON.stringify(board.gridElements.map(({x,y,width,...rest}) => rest));
    expect(upgradeSinhalaStarterLayout(board)).toBe(true);
    expect(board.minColumnCount).toBe(20); expect(board.rowCount).toBe(5);
    expect(JSON.stringify(board.gridElements.map(({x,y,width,...rest}) => rest))).toBe(content);
    expect(board.gridElements.map(({x,y,width}) => [x,y,width])).toEqual(createSinhalaStarterBoards().find(board => board.id.endsWith('-food')).gridElements.map(({x,y,width}) => [x,y,width]));
    const updated = JSON.stringify(board);
    expect(upgradeSinhalaStarterLayout(board)).toBe(false);
    expect(JSON.stringify(board)).toBe(updated);
});

test.each(['moved','added','foreign'])('leaves %s layouts untouched', change => {
    const board = legacyBoard();
    if (change === 'moved') board.gridElements[1].x = 2;
    if (change === 'added') board.gridElements.push({...board.gridElements[1],id:'personal-tile'});
    if (change === 'foreign') board.id = 'grid-data-personal';
    const before = JSON.stringify(board);
    expect(upgradeSinhalaStarterLayout(board)).toBe(false);
    expect(JSON.stringify(board)).toBe(before);
});
