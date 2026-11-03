import { KIYAMU_PALETTE, KIYAMU_CATEGORIES, getSinhalaCategory, getSinhalaAppearanceMode, getSinhalaAppearance, contrastRatio } from './sinhalaAppearance';
const tile=()=>({id:'grid-element-kiyamu-si-core24-content-water',type:'ELEMENT_TYPE_NORMAL',label:{si:'වතුර',en:'Water'},x:10,y:2,width:10,height:1,image:{data:'personal-photo'},backgroundColor:'#fffdf2',fontColor:'#172e35',borderColor:'#56716e',additionalProps:{sinhalaStarter:true}});
const metadata=mode=>({colorConfig:{colorSchemesActivated:false,colorMode:'COLOR_MODE_BACKGROUND',kiyamuAppearance:mode},textConfig:{fontColor:'#000000'}});

test('every requested pale background has normal text contrast of at least 4.5:1',()=>{
    for(const category of Object.keys(KIYAMU_PALETTE)) {
        const style=getSinhalaAppearance({...tile(),colorCategory:category},metadata('pale'));
        expect(style.background).toBe(KIYAMU_PALETTE[category].pale);
        expect(contrastRatio(style.text,style.background)).toBeGreaterThanOrEqual(4.5);
    }
    expect(KIYAMU_CATEGORIES).not.toContain('KIYAMU_ADVERBS');
    expect(KIYAMU_CATEGORIES).not.toContain('KIYAMU_QUESTIONS');
    expect(KIYAMU_CATEGORIES).not.toContain('KIYAMU_DETERMINERS');
});
test('three modes preserve vocabulary, geometry, photographs and settings',()=>{
    const element=tile(),before=JSON.stringify(element);
    for(const mode of ['strips','pale','none']) {
        const settings=metadata(mode),saved=JSON.stringify(settings),style=getSinhalaAppearance(element,settings);
        expect(style.mode).toBe(mode);expect(style.background).toBe(mode==='pale'?'#FFF0DB':'#FFFFFF');
        expect(JSON.stringify(settings)).toBe(saved);expect(JSON.stringify(element)).toBe(before);
    }
});
test('categories use the reviewed Sinhala message, never the English translation',()=>{
    expect(getSinhalaCategory({...tile(),label:{si:'වතුර',en:'Run'}})).toBe('KIYAMU_NOUNS');
    expect(getSinhalaCategory({...tile(),label:{si:'මම',en:'Water'}})).toBe('KIYAMU_MISC');
    expect(getSinhalaCategory({...tile(),colorCategory:'KIYAMU_PEOPLE'})).toBe('KIYAMU_PEOPLE');
    expect(getSinhalaCategory({...tile(),colorCategory:'KIYAMU_MISC'})).toBe('KIYAMU_MISC');
});
test('preserves customised profile schemes unless the user chooses a new mode',()=>{
    const settings=metadata();settings.colorConfig.colorSchemesActivated=true;
    expect(getSinhalaAppearanceMode(settings)).toBe('legacy');expect(getSinhalaAppearance(tile(),settings)).toBeNull();
    settings.colorConfig.kiyamuAppearance='none';expect(getSinhalaAppearance(tile(),settings).background).toBe('#FFFFFF');
});
test('custom tile colours remain, with readable text and no saved-data mutation',()=>{
    const element={...tile(),backgroundColor:'#123456',fontColor:'#345678',borderColor:'#abcdef'},saved=JSON.stringify(element);
    const style=getSinhalaAppearance(element,metadata('pale'));
    expect(style.background).toBe('#123456');expect(style.border).toBe('#abcdef');
    expect(contrastRatio(style.text,style.background)).toBeGreaterThanOrEqual(4.5);
    expect(JSON.stringify(element)).toBe(saved);
});
test('red negation is ordinary vocabulary and toolbar controls remain neutral',()=>{
    const element={...tile(),colorCategory:'KIYAMU_NEGATION'};
    expect(getSinhalaAppearance(element,metadata('strips')).accent).toBe('#B91C1C');
    expect(getSinhalaAppearance({...element,additionalProps:{sinhalaStarter:true,sinhalaToolbar:true}},metadata('pale')).background).toBe('#FFFFFF');
});

test('filled is default; every vision and appearance option keeps readable text and saved data',()=>{
    expect(getSinhalaAppearanceMode({})).toBe('filled');
    for(const vision of ['standard','redGreen','blueYellow','monochrome']) {
        for(const mode of ['filled','border','strips','pale','none']) {
            for(const category of Object.keys(KIYAMU_PALETTE)) {
                const element={...tile(),colorCategory:category};
                const settings=metadata(mode);settings.colorConfig.kiyamuVision=vision;
                const before=JSON.stringify({element,settings});
                const result=getSinhalaAppearance(element,settings);
                expect(contrastRatio(result.text,result.background)).toBeGreaterThanOrEqual(4.5);
                expect(JSON.stringify({element,settings})).toBe(before);
                if(mode==='border')expect(result.background).toBe('#FFFFFF');
            }
        }
    }
    expect(getSinhalaAppearanceMode(metadata('strips'))).toBe('strips');
});
