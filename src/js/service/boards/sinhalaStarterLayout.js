import { applySinhalaToolbar } from './sinhalaToolbar';

export const SINHALA_GRID_PREFIX = 'grid-data-kiyamu-si-v1-';

/** Upgrade the original starter layout on read, preserving words, pictures and actions.
 * Caregiver-arranged layouts are left untouched. The conversion is idempotent and
 * is persisted through the normal save path when the board is next edited.
 */
export function upgradeSinhalaStarterLayout(grid) {
    const legacyChanged = upgradeLegacySinhalaLayout(grid);
    const toolbarChanged = applySinhalaToolbar(grid);
    return legacyChanged || toolbarChanged;
}

function upgradeLegacySinhalaLayout(grid) {
    if (grid?.id?.startsWith(SINHALA_GRID_PREFIX)) {
        for (const element of grid.gridElements || []) {
            if (!element.additionalProps?.sinhalaStarter || !element.id.endsWith('-home') || element.id.includes('-content-')) continue;
            for (const action of element.actions || []) {
                if (action.modelName === 'GridActionNavigate' && action.toGridId === SINHALA_GRID_PREFIX + 'home') action.toGridId = SINHALA_GRID_PREFIX + 'core24';
            }
        }
    }
    if (!grid || !grid.id?.startsWith(SINHALA_GRID_PREFIX) || grid.minColumnCount !== 4 || grid.rowCount !== 6 || grid.gridElements?.length !== 21) return false;
    const prefix = 'grid-element-kiyamu-si-' + grid.id.slice(SINHALA_GRID_PREFIX.length) + '-';
    const controls = {sentence:[0,0,4], home:[0,1,1], yes:[1,1,1], no:[2,1,1], help:[3,1,1], speak:[0,5,1], undo:[1,5,1], clear:[2,5,1], toilet:[3,5,1]};
    const seen = new Set(), cells = new Set();
    for (const element of grid.gridElements) {
        if (!element.id?.startsWith(prefix) || !element.additionalProps?.sinhalaStarter || element.height !== 1) return false;
        const key = element.id.slice(prefix.length);
        if (seen.has(key)) return false;
        seen.add(key);
        if (controls[key]) {
            const [x,y,width] = controls[key];
            if (element.x !== x || element.y !== y || element.width !== width) return false;
        } else {
            if (!key.startsWith('content-') || element.width !== 1 || !Number.isInteger(element.x) || !Number.isInteger(element.y) || element.x < 0 || element.x > 3 || element.y < 2 || element.y > 4) return false;
            const cell = element.x + ':' + element.y;
            if (cells.has(cell)) return false;
            cells.add(cell);
        }
    }
    if (!Object.keys(controls).every(key => seen.has(key)) || cells.size !== 12) return false;
    for (const element of grid.gridElements) {
        const key = element.id.slice(prefix.length);
        if (key === 'sentence') {
            element.width = 11;
        } else if (['speak','undo','clear'].includes(key)) {
            element.x = 11 + ['speak','undo','clear'].indexOf(key) * 3;
            element.y = 0;
            element.width = 3;
        } else if (controls[key]) {
            element.x = ['home','yes','no','help','toilet'].indexOf(key) * 4;
            element.y = 1;
            element.width = 4;
        } else {
            element.x *= 5;
            element.width = 5;
        }
    }
    grid.minColumnCount = 20;
    grid.rowCount = 5;
    return true;
}
