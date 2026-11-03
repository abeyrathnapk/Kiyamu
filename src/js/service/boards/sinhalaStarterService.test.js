import { sinhalaStarterService } from './sinhalaStarterService';
import { createSinhalaStarterBoards, SINHALA_HOME_ID } from './sinhalaStarter';
import { dataService } from '../data/dataService';
import { i18nService } from '../i18nService';
import { localStorageService } from '../data/localStorageService';
jest.mock('../data/dataService', () => ({dataService: {getGrids: jest.fn(), saveGrid: jest.fn(), getMetadata: jest.fn(), saveMetadata: jest.fn()}}));
jest.mock('../i18nService', () => ({i18nService: {setContentLanguage: jest.fn(), setAppLanguage: jest.fn()}}));
jest.mock('../data/localStorageService', () => ({localStorageService: {saveUserSettings: jest.fn(),getUserSettings:jest.fn()}}));
const metadata = () => ({homeGridId: null, textConfig:{}, colorConfig:{}, inputConfig:{scanEnabled:true}});
beforeEach(() => { jest.clearAllMocks(); localStorageService.getUserSettings.mockReturnValue({sinhalaToolbarVersion:1}); dataService.getGrids.mockResolvedValue([]); dataService.getMetadata.mockResolvedValue(metadata()); dataService.saveGrid.mockResolvedValue(); });
test('first setup installs boards and selects Sinhala without changing input access', async () => {
    expect(await sinhalaStarterService.install()).toBe(SINHALA_HOME_ID);
    expect(dataService.saveGrid).toHaveBeenCalledTimes(8);
    expect(dataService.saveMetadata).toHaveBeenCalledWith(expect.objectContaining({homeGridId:SINHALA_HOME_ID, activateARASAACGrammarAPI:false, inputConfig:{scanEnabled:true}}));
    expect(i18nService.setContentLanguage).toHaveBeenCalledWith('si');
});
test('adding to an existing profile preserves its boards, home and appearance', async () => {
    const existing={id:'grid-data-custom',label:{si:'මගේ පුවරුව'}};
    dataService.getGrids.mockResolvedValue([existing]);
    dataService.getMetadata.mockResolvedValue({...metadata(),homeGridId:existing.id});
    await sinhalaStarterService.install();
    expect(dataService.saveMetadata).not.toHaveBeenCalled();
    expect(dataService.saveGrid.mock.calls.every(([board]) => board.id !== existing.id)).toBe(true);
});
test('repeated setup leaves personalized starter boards untouched', async () => {
    const existing=createSinhalaStarterBoards(); existing[0].label.si='මගේ කතාව';
    dataService.getGrids.mockResolvedValue(existing);
    dataService.getMetadata.mockResolvedValue({...metadata(),homeGridId:SINHALA_HOME_ID});
    await sinhalaStarterService.install();
    expect(dataService.saveGrid).not.toHaveBeenCalled();
    expect(dataService.saveMetadata).not.toHaveBeenCalled();
});
test('retry completes an interrupted setup without replacing saved boards', async () => {
    dataService.getGrids.mockResolvedValue(createSinhalaStarterBoards().slice(0,2));
    await sinhalaStarterService.install();
    expect(dataService.saveGrid).toHaveBeenCalledTimes(6);
    expect(dataService.saveMetadata).toHaveBeenCalledWith(expect.objectContaining({homeGridId:SINHALA_HOME_ID}));
});


test('replaces Quick Core 24 as home and last-opened board, retaining input settings and saved boards', async () => {
    const old = {id:'grid-data-imported-quick-core', label:{en:'Quick Core 24'}};
    dataService.getGrids.mockResolvedValue([old]);
    dataService.getMetadata.mockResolvedValue({...metadata(),homeGridId:old.id,lastOpenedGridId:old.id,locked:false,globalGridActive:true});
    expect(await sinhalaStarterService.ensureDefault()).toBe(SINHALA_HOME_ID);
    expect(dataService.saveMetadata).toHaveBeenCalledWith(expect.objectContaining({homeGridId:SINHALA_HOME_ID,lastOpenedGridId:SINHALA_HOME_ID,globalGridActive:true,locked:false,inputConfig:{scanEnabled:true}}));
    expect(dataService.saveGrid.mock.calls.every(([grid])=>grid.id!==old.id)).toBe(true);
});

test('an explicit personal home is kept even if Quick Core also exists', async () => {
    dataService.getGrids.mockResolvedValue([{id:'personal',label:{en:'My words'}},{id:'quick',label:{en:'Quick Core 24'}}]);
    dataService.getMetadata.mockResolvedValue({...metadata(),homeGridId:'personal',lastOpenedGridId:'quick'});
    expect(await sinhalaStarterService.ensureDefault()).toBeNull();
    expect(dataService.saveGrid).not.toHaveBeenCalled();
    expect(dataService.saveMetadata).not.toHaveBeenCalled();
});

test('a returning Sinhala core profile is not reset or translated again', async () => {
    dataService.getGrids.mockResolvedValue(createSinhalaStarterBoards());
    dataService.getMetadata.mockResolvedValue({...metadata(),homeGridId:SINHALA_HOME_ID});
    expect(await sinhalaStarterService.ensureDefault()).toBeNull();
    expect(dataService.saveMetadata).not.toHaveBeenCalled();
    expect(i18nService.setContentLanguage).not.toHaveBeenCalled();
});


test('restores the retained original toolbar once, without replacing it', async()=>{
    dataService.getGrids.mockResolvedValue(createSinhalaStarterBoards());
    dataService.getMetadata.mockResolvedValue({...metadata(),homeGridId:SINHALA_HOME_ID,globalGridId:'original-toolbar',globalGridActive:false});
    localStorageService.getUserSettings.mockReturnValue({sinhalaToolbarVersion:0});
    await sinhalaStarterService.ensureDefault();
    expect(dataService.saveGrid).not.toHaveBeenCalled();
    expect(dataService.saveMetadata).toHaveBeenCalledWith(expect.objectContaining({globalGridId:'original-toolbar',globalGridActive:true}));
    expect(localStorageService.saveUserSettings).toHaveBeenCalledWith({sinhalaToolbarVersion:1});
    jest.clearAllMocks();
    localStorageService.getUserSettings.mockReturnValue({sinhalaToolbarVersion:1});
    dataService.getMetadata.mockResolvedValue({...metadata(),homeGridId:SINHALA_HOME_ID,globalGridId:'original-toolbar',globalGridActive:false});
    await sinhalaStarterService.ensureDefault();
    expect(dataService.saveMetadata).not.toHaveBeenCalled();
});

test('creates a bundled shared toolbar for a returning profile that has none', async()=>{
    dataService.getGrids.mockResolvedValue(createSinhalaStarterBoards());
    dataService.getMetadata.mockResolvedValue({...metadata(),homeGridId:SINHALA_HOME_ID});
    localStorageService.getUserSettings.mockReturnValue({sinhalaToolbarVersion:0});
    await sinhalaStarterService.ensureDefault();
    expect(dataService.saveGrid).toHaveBeenCalledTimes(1);
    const toolbar=dataService.saveGrid.mock.calls[0][0];
    expect(toolbar.gridElements.filter(element=>element.y===0).sort((a,b)=>a.x-b.x).map(element=>element.id.split('-').pop())).toEqual(['home','back','sentence','speak','undo','clear']);
    expect(toolbar.gridElements.some(element=>element.type==='ELEMENT_TYPE_DYNAMIC_GRID_PLACEHOLDER')).toBe(true);
    expect(dataService.saveMetadata).toHaveBeenCalledWith(expect.objectContaining({globalGridId:toolbar.id,globalGridActive:true}));
});
