/** Explicit Sinhala vocabulary metadata; never classify from an English translation. */
export const KIYAMU_PALETTE = {
    KIYAMU_PEOPLE: {accent:'#E0B400',pale:'#FFF7CC'},
    KIYAMU_ACTIONS: {accent:'#278148',pale:'#E8F5E9'},
    KIYAMU_NOUNS: {accent:'#D97706',pale:'#FFF0DB'},
    KIYAMU_DESCRIBING: {accent:'#2563EB',pale:'#EAF2FF'},
    KIYAMU_SOCIAL: {accent:'#C74780',pale:'#FCE8F1'},
    KIYAMU_MISC: {accent:'#64748B',pale:'#FFFFFF'},
    KIYAMU_QUESTIONS: {accent:'#7C3AED',pale:'#F1EAFF'},
    KIYAMU_ADVERBS: {accent:'#8B5E3C',pale:'#F3EAE2'},
    KIYAMU_DETERMINERS: {accent:'#6B7280',pale:'#F1F3F5'},
    KIYAMU_NEGATION: {accent:'#B91C1C',pale:'#FDECEC'}
};
// Stronger fills inspired by the reference; grammatical assignments stay unchanged.
const KIYAMU_FILLED=['#F3D9AB','#E7B4F5','#F3D9AB','#B5D8F6','#E7B4F5','#CFF5AD','#E8E8E8','#B5D8F6','#F3D9AB','#B5D8F6'];
const KIYAMU_FILLED_BORDERS=['#CD912F','#B746DB','#CD912F','#5A9BD5','#B746DB','#83CD38','#333333','#5A9BD5','#CD912F','#5A9BD5'];
// Optional starting palettes, not a guarantee of category discrimination.
export const KIYAMU_VISION_PALETTES={
    redGreen:['#E6B800','#0072B2','#E69F00','#56B4E9','#CC79A7','#D9D9D9','#332288','#AA4499','#999999','#000000'],
    blueYellow:['#F4A582','#087F8C','#D6604D','#80CDC1','#B2182B','#DDDDDD','#01665E','#8C510A','#999999','#202020'],
    monochrome:['#FFFFFF','#C8C8C8','#E4E4E4','#A0A0A0','#707070','#FFFFFF','#404040','#B8B8B8','#888888','#202020']
};
function tint(hex) {
    return '#'+hex.slice(1).match(/../g).map(c=>Math.round(parseInt(c,16)*0.2+255*0.8).toString(16).padStart(2,'0')).join('');
}
export const KIYAMU_CATEGORIES = Object.keys(KIYAMU_PALETTE).filter(key=>!['KIYAMU_QUESTIONS','KIYAMU_ADVERBS','KIYAMU_DETERMINERS'].includes(key));
const CORE = {
    'to-me':['මට','KIYAMU_PEOPLE'], water:['වතුර','KIYAMU_NOUNS'],
    want:['ඕනේ','KIYAMU_MISC'], no:['එපා','KIYAMU_NEGATION'],
    i:['මම','KIYAMU_PEOPLE'], rice:['බත්','KIYAMU_NOUNS'], eat:['කනවා','KIYAMU_ACTIONS'],
    more:['තව','KIYAMU_MISC'], you:['ඔයා','KIYAMU_PEOPLE'], go:['යනවා','KIYAMU_ACTIONS'],
    good:['හොඳයි','KIYAMU_DESCRIBING'], finished:['ඉවරයි','KIYAMU_DESCRIBING'],
    yes:['ඔව්','KIYAMU_SOCIAL'], 'no-answer':['නෑ','KIYAMU_NEGATION'],
    help:['උදව්','KIYAMU_ACTIONS'], stop:['නවත්තන්න','KIYAMU_NEGATION'],
    toilet:['වැසිකිළිය','KIYAMU_NOUNS'], pain:['මට රිදෙනවා','KIYAMU_MISC']
};
export function isSinhalaTile(element) {
    return !!(element && (element.additionalProps?.sinhalaStarter || element.label?.si || element.colorCategory?.startsWith('KIYAMU_')));
}
export function getSinhalaCategory(element={}) {
    if (element.colorCategory) return KIYAMU_PALETTE[element.colorCategory] ? element.colorCategory : 'KIYAMU_MISC';
    const prefix='grid-element-kiyamu-si-core24-content-';
    const assignment=element.id?.startsWith(prefix) && CORE[element.id.slice(prefix.length)];
    return assignment && element.label?.si===assignment[0] ? assignment[1] : 'KIYAMU_MISC';
}
const same=(value,allowed)=>!value || allowed.includes(value.toLowerCase());
export function getSinhalaAppearanceMode(metadata={}) {
    const color=metadata.colorConfig||{}, text=metadata.textConfig||{};
    if(['filled','border','strips','pale','none','legacy'].includes(color.kiyamuAppearance)) return color.kiyamuAppearance;
    // Existing dark modes, schemes, and personalised profile colours stay intact.
    if(color.colorSchemesActivated || (color.colorMode && color.colorMode!=='COLOR_MODE_BACKGROUND') ||
        !same(color.elementBackgroundColor,['#ffffff','#fff']) ||
        !same(color.elementBorderColor,['#808080','#64748b']) ||
        !same(color.gridBackgroundColor,['#e8e8e8','#f3f5f7']) ||
        !same(text.fontColor,['#000000','#1f2937','#172e35'])) return 'legacy';
    return 'filled';
}
function rgb(color) {
    color=String(color||'').toLowerCase();
    if(color==='white')color='#ffffff'; if(color==='black')color='#000000';
    if(/^#[0-9a-f]{3}$/.test(color))color='#'+color.slice(1).split('').map(c=>c+c).join('');
    if(/^#[0-9a-f]{6}$/.test(color))return [1,3,5].map(i=>parseInt(color.slice(i,i+2),16));
    const match=color.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/);
    return match ? match.slice(1).map(Number) : null;
}
export function contrastRatio(foreground,background) {
    const a=rgb(foreground),b=rgb(background);if(!a||!b)return 0;
    const luminance=channels=>channels.map(c=>c/255).map(c=>c<=0.04045?c/12.92:((c+0.055)/1.055)**2.4).reduce((sum,c,i)=>sum+c*[0.2126,0.7152,0.0722][i],0);
    const x=luminance(a),y=luminance(b);return (Math.max(x,y)+0.05)/(Math.min(x,y)+0.05);
}
export function getSinhalaAppearance(element,metadata={}) {
    if(!isSinhalaTile(element))return null;
    const mode=getSinhalaAppearanceMode(metadata);if(mode==='legacy')return null;
    const category=getSinhalaCategory(element),original=KIYAMU_PALETTE[category];
    const index=Object.keys(KIYAMU_PALETTE).indexOf(category);
    const adapted=KIYAMU_VISION_PALETTES[metadata.colorConfig?.kiyamuVision];
    const palette=adapted ? {accent:adapted[index],pale:original.pale} : mode==='filled' ? {...original,accent:KIYAMU_FILLED_BORDERS[index]} : original;
    const fill=adapted ? adapted[index] : KIYAMU_FILLED[index];
    const toolbar=!!element.additionalProps?.sinhalaToolbar || element.type!=='ELEMENT_TYPE_NORMAL';
    const customBackground=!same(element.backgroundColor,['#fffdf2','#f5f0ff','#e8f4fa','#eef4f3','#ffffff','#fff']);
    const background=customBackground ? element.backgroundColor : !toolbar && mode==='filled' ? fill : mode==='pale'&&!toolbar ? (adapted ? tint(palette.accent) : palette.pale) : '#FFFFFF';
    if(!rgb(background))return null; // Preserve unsupported custom CSS colours through the old renderer.
    let text=element.fontColor || metadata.textConfig?.fontColor || '#1F2937';
    if(same(text,['#172e35','#000000']) || Object.values(KIYAMU_PALETTE).some(p=>p.accent.toLowerCase()===text.toLowerCase()))text='#1F2937';
    if(contrastRatio(text,background)<4.5)text=contrastRatio('#1F2937',background)>=4.5?'#1F2937':contrastRatio('#000000',background)>=4.5?'#000000':'#FFFFFF';
    const border=same(element.borderColor,['#56716e','#64748b']) ? (!toolbar && ['filled','border'].includes(mode) ? palette.accent : '#64748B') : element.borderColor;
    return {mode,category,accent:palette.accent,background,text,border,toolbar};
}
export function getSinhalaBoardBackground(grid,metadata,fallback) {
    if(!grid?.id?.startsWith('grid-data-kiyamu-si-') || getSinhalaAppearanceMode(metadata)==='legacy')return grid?.backgroundColor||fallback;
    return same(grid.backgroundColor,['#f4f6ef','#f3f5f7'])?'#F3F5F7':grid.backgroundColor;
}
