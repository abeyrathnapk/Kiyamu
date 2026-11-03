import { getSinhalaSymbol } from './sinhalaSymbols';

/** Use the original AAC toolbar order without replacing personalized vocabulary. */
export function applySinhalaToolbar(grid) {
    if (!grid?.id?.startsWith('grid-data-kiyamu-si-v1-') || grid.minColumnCount !== 20) return false;
    const sentence = grid.gridElements.find(element => element.additionalProps?.sinhalaStarter && element.id.endsWith('-sentence'));
    if (!sentence || sentence.x !== 0 || sentence.y !== 0 || sentence.width !== 11) return false;
    const prefix = sentence.id.slice(0, -'sentence'.length);
    const find = key => grid.gridElements.find(element => element.id === prefix + key);
    const speak = find('speak'), undo = find('undo'), clear = find('clear');
    if (![speak, undo, clear].every((element, i) => element && element.x === 11 + i * 3 && element.y === 0 && element.width === 3 && element.height === 1)) return false;
    let home = find('home');
    const quick = ['yes','no','help','toilet'].map(find);
    if (home && (home.x !== 0 || home.y !== 1 || home.width !== 4 || home.height !== 1 || !quick.every((element,i) => element && element.x === (i+1)*4 && element.y === 1 && element.width === 4 && element.height === 1))) return false;
    if (find('back')) return false;

    const navigation = (key, label, symbol, navType) => ({
        ...JSON.parse(JSON.stringify(speak)), id:prefix+key, label, pronunciation:{}, wordForms:[],
        image:{data:getSinhalaSymbol(symbol),author:'Kiyamu contributors'},
        actions:[{modelVersion:speak.actions[0].modelVersion,id:prefix.replace('grid-element-','grid-action-')+key,modelName:'GridActionNavigate',navType,addToCollectElem:false}]
    });
    // A finer column unit gives five equal-size toolbar buttons and a wider sentence.
    grid.gridElements.forEach(element => { element.x *= 2; element.width *= 2; });
    if (home) {
        quick.forEach((element,i) => { element.x=i*10; element.width=10; });
        home.actions = home.actions.map(action => {
            if (action.modelName !== 'GridActionNavigate') return action;
            const {toGridId,...rest} = action;
            return {...rest,navType:'navigateToHomeGrid'};
        });
    } else {
        home = navigation('home',{si:'මුලට',en:'Home'},'home','navigateToHomeGrid');
        grid.gridElements.push(home);
    }
    const back = navigation('back',{si:'ආපසු',en:'Back'},'back','navigateToLastOpenedGrid');
    grid.gridElements.push(back);
    [home, back, speak, undo, clear].forEach((element,i) => {
        element.x=[0,5,25,30,35][i]; element.y=0; element.width=5; element.height=1;
        element.additionalProps={...element.additionalProps,sinhalaToolbar:true};
    });
    sentence.x=10; sentence.width=15;
    grid.minColumnCount=40;
    return true;
}
