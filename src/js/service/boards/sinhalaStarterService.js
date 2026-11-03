import { createSinhalaStarterBoards, createSinhalaGlobalGrid, SINHALA_HOME_ID, SINHALA_GRID_PREFIX } from './sinhalaStarter';
import { dataService } from '../data/dataService';
import { localStorageService } from '../data/localStorageService';
import { i18nService } from '../i18nService';
import { SINHALA_STARTER_FILENAME } from './sinhalaStarterPreview';

/** Add only missing starter boards: repeating setup never overwrites customized boards. */
async function install({makeHome = false} = {}) {
    const existing = await dataService.getGrids(false, true);
    const allExisting = await dataService.getGrids(false, false);
    const existingIds = new Set(allExisting.map(grid => grid.id));
    for (const board of createSinhalaStarterBoards()) {
        if (!existingIds.has(board.id)) await dataService.saveGrid(board);
    }
    const metadata = await dataService.getMetadata();
    const unfinishedSetup = !metadata.homeGridId && existing.every(grid => grid.id.startsWith(SINHALA_GRID_PREFIX));
    if (!existing.length || unfinishedSetup || makeHome) {
        metadata.homeGridId = SINHALA_HOME_ID;
        metadata.lastOpenedGridId = SINHALA_HOME_ID;
        await prepareSharedToolbar(metadata);
        if (!existing.length || unfinishedSetup) metadata.locked = true;
        metadata.toHomeAfterSelect = false;
        metadata.activateARASAACGrammarAPI = false;
        metadata.vocabularyLevel = null;
        metadata.textConfig.maxLines = 2;
        metadata.textConfig.lineHeight = 1.6;
        metadata.textConfig.fontSizePct = 19;
        metadata.textConfig.convertMode = null;
        metadata.colorConfig.colorSchemesActivated = false;
        metadata.colorConfig.borderRadius = 0.7;
        await dataService.saveMetadata(metadata);
        localStorageService.saveUserSettings({voiceConfig: {voiceLangIsTextLang: false}, originGridsetFilename: SINHALA_STARTER_FILENAME, sinhalaToolbarVersion:1});
    }
    await i18nService.setContentLanguage('si');
    await i18nService.setAppLanguage('si');
    localStorageService.saveUserSettings({isEmpty: false});
    return SINHALA_HOME_ID;
}
async function prepareSharedToolbar(metadata) {
    if (!metadata.globalGridId) {
        const toolbar = createSinhalaGlobalGrid();
        const grids = await dataService.getGrids(false, false);
        if (!grids.some(grid => grid.id === toolbar.id)) await dataService.saveGrid(toolbar);
        metadata.globalGridId = toolbar.id;
        metadata.globalGridHeightPercentage = 17;
    }
    // Starter boards have their own toolbar; other boards use this shared row.
    metadata.globalGridActive = true;
}

/** Replace only the recognized imported default; never delete saved boards. */
async function ensureDefault() {
    const metadata = await dataService.getMetadata();
    const grids = await dataService.getGrids(false, true);
    const selectedId = metadata.homeGridId || metadata.lastOpenedGridId;
    const selected = grids.find(grid => grid.id === selectedId);
    const englishName = typeof selected?.label === 'string' ? selected.label : selected?.label?.en;
    const quickCore = englishName?.trim().toLowerCase() === 'quick core 24';
    const oldStarter = selectedId === SINHALA_GRID_PREFIX + 'home' && selected?.gridElements?.some(element => element.additionalProps?.sinhalaStarter);
    if (!grids.length || quickCore || oldStarter) {
        await install({makeHome:true});
        return SINHALA_HOME_ID;
    }
    if (selectedId === SINHALA_HOME_ID && !localStorageService.getUserSettings().sinhalaToolbarVersion) {
        await prepareSharedToolbar(metadata);
        await dataService.saveMetadata(metadata);
        localStorageService.saveUserSettings({sinhalaToolbarVersion:1});
    }
    // A previously added starter set also needs the new core as its navigation target.
    if (!grids.some(grid => grid.id === SINHALA_HOME_ID) && grids.some(grid => grid.id.startsWith(SINHALA_GRID_PREFIX))) {
        const core = createSinhalaStarterBoards().find(grid => grid.id === SINHALA_HOME_ID);
        await dataService.saveGrid(core);
    }
    return null;
}
export const sinhalaStarterService = { install, ensureDefault };
