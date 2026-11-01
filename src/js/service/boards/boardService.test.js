jest.mock('../i18nService', () => ({i18nService:{t:key=>key,getTranslation:value=>typeof value==='string'?value:value.si||value.en}}));
jest.mock('../../util/util', () => ({util:{isString:value=>typeof value==='string'}}));
jest.mock('../../util/constants', () => ({constants:{IS_ENVIRONMENT_PROD:true,BOARD_TYPE_SELFCONTAINED:'self',BOARD_TYPE_SINGLE:'single'}}));
let originalFetch, originalLog;
beforeEach(()=>{jest.resetModules();originalFetch=global.fetch;originalLog=global.log;global.log={warn:jest.fn()};});
afterEach(()=>{global.fetch=originalFetch;global.log=originalLog;});

test('Sinhala core is selectable and searchable without the remote catalog', async()=>{
    global.fetch=jest.fn().mockRejectedValue(new Error('offline'));
    const {boardService}=require('./boardService');
    const results=await boardService.query('kiyamu',{lang:'si'});
    expect(results).toHaveLength(1);
    expect(results[0].filename).toBe('kiyamu-sinhala-core-24.grd.json');
    expect(boardService.getPreview('quick-core-24.grd.json').filename).toBe(results[0].filename);
});

test('catalog replaces English Quick Core 24 with the bundled Sinhala choice', async()=>{
    global.fetch=jest.fn().mockResolvedValue({json:async()=>[{name:{en:'Quick Core 24'},url:'communicators/Quick Core 24/en/quick-core-24.grd.json',languages:['en'],selfContained:true,tags:[]},{name:{en:'Personal choice'},url:'other.grd.json',languages:['en'],selfContained:true,tags:[]}]});
    const {boardService}=require('./boardService');
    const results=await boardService.query();
    expect(results[0].filename).toBe('kiyamu-sinhala-core-24.grd.json');
    expect(results.some(preview=>preview.filename==='quick-core-24.grd.json')).toBe(false);
    expect(results.some(preview=>preview.filename==='other.grd.json')).toBe(true);
});
