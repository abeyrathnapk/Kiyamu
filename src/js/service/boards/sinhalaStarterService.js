import { createSinhalaStarterBoards, SINHALA_HOME_ID, SINHALA_GRID_PREFIX } from './sinhalaStarter';
import { dataService } from '../data/dataService';
import { localStorageService } from '../data/localStorageService';
import { i18nService } from '../i18nService';

/** Add only missing starter boards: repeating setup never overwrites customized boards. */
async function install() {
    const existing = await dataService.getGrids(false, true);
    const allExisting = await dataService.getGrids(false, false);
    const existingIds = new Set(allExisting.map(grid => grid.id));
    for (const board of createSinhalaStarterBoards()) {
        if (!existingIds.has(board.id)) await dataService.saveGrid(board);
    }
    const metadata = await dataService.getMetadata();
    const unfinishedSetup = !metadata.homeGridId && existing.every(grid => grid.id.startsWith(SINHALA_GRID_PREFIX));
    if (!existing.length || unfinishedSetup) {
        metadata.homeGridId = SINHALA_HOME_ID;
        metadata.globalGridActive = false;
        metadata.locked = true;
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
        localStorageService.saveUserSettings({voiceConfig: {voiceLangIsTextLang: false}});
    }
    await i18nService.setContentLanguage('si');
    await i18nService.setAppLanguage('si');
    localStorageService.saveUserSettings({isEmpty: false});
    return SINHALA_HOME_ID;
}
export const sinhalaStarterService = { install };
