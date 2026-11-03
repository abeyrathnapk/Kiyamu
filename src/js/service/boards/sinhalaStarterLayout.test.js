import { createSinhalaStarterBoards } from './sinhalaStarter';
import { upgradeSinhalaStarterLayout } from './sinhalaStarterLayout';

function previousBoard(key='food', original=false) {
    const board=createSinhalaStarterBoards().find(board=>board.id.endsWith('-'+key));
    const prefix='grid-element-kiyamu-si-'+key+'-';
    const core=key==='core24';
    board.minColumnCount=20;
    board.gridElements=board.gridElements.filter(element=>element.id!==prefix+'back' && !(core && element.id===prefix+'home'));
    for(const element of board.gridElements) {
        const name=element.id.slice(prefix.length);
        delete element.additionalProps.sinhalaToolbar;
        element.x/=2; element.width/=2;
        if(name==='sentence') {element.x=0;element.width=11;}
        if(['speak','undo','clear'].includes(name)){element.x=11+['speak','undo','clear'].indexOf(name)*3;element.width=3;}
        if(['home','yes','no','help','toilet'].includes(name)){element.x=['home','yes','no','help','toilet'].indexOf(name)*4;element.y=1;element.width=4;}
    }
    if(original) {
        board.minColumnCount=4;board.rowCount=6;
        const positions={sentence:[0,0,4],home:[0,1,1],yes:[1,1,1],no:[2,1,1],help:[3,1,1],speak:[0,5,1],undo:[1,5,1],clear:[2,5,1],toilet:[3,5,1]};
        for(const element of board.gridElements) {
            const name=element.id.slice(prefix.length);
            if(positions[name]) [element.x,element.y,element.width]=positions[name];
            else {element.x/=5;element.width=1;}
        }
    }
    return board;
}
const vocabulary=board=>JSON.stringify(board.gridElements.filter(element=>element.id.includes('-content-')).map(({x,y,width,...rest})=>rest));
const positions=board=>board.gridElements.map(({id,x,y,width,height})=>({id,x,y,width,height})).sort((a,b)=>a.id.localeCompare(b.id));

test.each([['food',false],['food',true],['core24',false]])('updates saved %s board (original layout: %s) and preserves personalized vocabulary', (key,original)=>{
    const board=previousBoard(key,original);
    const word=board.gridElements.find(element=>element.id.includes('-content-'));
    word.label.si='මගේ වචනය';word.image.data='custom-image';word.actions=[{modelName:'GridActionSpeakCustom',speakText:{si:'මගේ හඬ'}}];
    const before=vocabulary(board);
    expect(upgradeSinhalaStarterLayout(board)).toBe(true);
    expect(board.minColumnCount).toBe(40);
    expect(vocabulary(board)).toBe(before);
    expect(positions(board)).toEqual(positions(createSinhalaStarterBoards().find(board=>board.id.endsWith('-'+key))));
    const updated=JSON.stringify(board);
    expect(upgradeSinhalaStarterLayout(board)).toBe(false);
    expect(JSON.stringify(board)).toBe(updated);
});

test.each(['moved','added','foreign'])('leaves %s original layouts untouched', change=>{
    const board=previousBoard('food',true);
    if(change==='moved')board.gridElements[1].x=2;
    if(change==='added')board.gridElements.push({...board.gridElements[1],id:'personal-tile'});
    if(change==='foreign')board.id='grid-data-personal';
    const before=JSON.stringify(board);
    expect(upgradeSinhalaStarterLayout(board)).toBe(false);
    expect(JSON.stringify(board)).toBe(before);
});
