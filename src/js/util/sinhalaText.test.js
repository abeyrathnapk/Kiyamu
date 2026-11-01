import { containsSinhala, getSinhalaVoices, removeLastGrapheme } from './sinhalaText';
const native = {id:'si-native',lang:'si',langFull:'si-LK',type:'VOICE_TYPE_NATIVE',local:true,ref:{}};
const english = {...native,id:'english',lang:'en',langFull:'en-US'};
const online = {id:'si-online',lang:'si',type:'VOICE_TYPE_RESPONSIVEVOICE',local:false};
test('Sinhala text never selects an English voice or an unverified device-default voice', () => {
    expect(containsSinhala('මට වතුර ඕනේ')).toBe(true);
    expect(containsSinhala('hello')).toBe(false);
    expect(getSinhalaVoices([english,native,{...native,id:'default',ref:undefined}])).toEqual([native]);
});
test('offline speech excludes online providers and absent ResponsiveVoice', () => {
    expect(getSinhalaVoices([native,online],{online:false,responsiveAvailable:true})).toEqual([native]);
    expect(getSinhalaVoices([online],{online:true,responsiveAvailable:false})).toEqual([]);
    expect(getSinhalaVoices([online],{online:true,responsiveAvailable:true})).toEqual([online]);
});
test('deletion removes a Sinhala grapheme with its vowel signs', () => {
    expect(removeLastGrapheme('කී')).toBe('');
    expect(removeLastGrapheme('වතුර')).toBe('වතු');
    expect(removeLastGrapheme('මට')).toBe('ම');
    expect(removeLastGrapheme('')).toBe('');
});

test('Android may use a downloaded Sinhala engine voice even when localService is misreported', () => {
    const downloaded = {...native, local:false};
    expect(getSinhalaVoices([downloaded,english,online],{online:false,isAndroid:true})).toEqual([downloaded]);
    expect(getSinhalaVoices([downloaded],{online:false,isAndroid:false})).toEqual([]);
});
