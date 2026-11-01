import { sinhalaStarterService } from './sinhalaStarterService';
import { createSinhalaStarterBoards, SINHALA_HOME_ID } from './sinhalaStarter';
import { dataService } from '../data/dataService';
import { i18nService } from '../i18nService';
import { localStorageService } from '../data/localStorageService';
jest.mock('../data/dataService', () => ({dataService: {getGrids: jest.fn(), saveGrid: jest.fn(), getMetadata: jest.fn(), saveMetadata: jest.fn()}}));
jest.mock('../i18nService', () => ({i18nService: {setContentLanguage: jest.fn(), setAppLanguage: jest.fn()}}));
jest.mock('../data/localStorageService', () => ({localStorageService: {saveUserSettings: jest.fn()}}));
const metadata = () => ({homeGridId: null, textConfig:{}, colorConfig:{}, inputConfig:{scanEnabled:true}});
beforeEach(() => { jest.clearAllMocks(); dataService.getGrids.mockResolvedValue([]); dataService.getMetadata.mockResolvedValue(metadata()); dataService.saveGrid.mockResolvedValue(); });
test('first setup installs boards and selects Sinhala without changing input access', async () => {
    expect(await sinhalaStarterService.install()).toBe(SINHALA_HOME_ID);
    expect(dataService.saveGrid).toHaveBeenCalledTimes(7);
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
    expect(dataService.saveGrid).toHaveBeenCalledTimes(5);
    expect(dataService.saveMetadata).toHaveBeenCalledWith(expect.objectContaining({homeGridId:SINHALA_HOME_ID}));
});
