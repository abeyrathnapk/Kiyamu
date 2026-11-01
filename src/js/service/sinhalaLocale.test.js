import english from '../../../app/lang/i18n.en.json';
import sinhala from '../../../app/lang/i18n.si.json';
function flatten(value, prefix = '') {
    return Object.entries(value).flatMap(([key, item]) => typeof item === 'string' ? [[prefix + key, item]] : flatten(item, prefix + key + '.'));
}
test('Sinhala translations cover the interface and preserve substitution placeholders', () => {
    const en = Object.fromEntries(flatten(english)), si = Object.fromEntries(flatten(sinhala));
    expect(Object.keys(si).sort()).toEqual(Object.keys(en).sort());
    const tokens = text => Array.from(text.matchAll(/\{\s*(?:[a-zA-Z_]\w*|\d+)\s*\}/g))
        // ICU plural branches contain translated text, not interpolation variables.
        .filter(match => !/(?:zero|one|two|few|many|other|=\d+)\s*$/.test(text.slice(0, match.index)))
        .map(match => match[0]).sort();
    for (const key of Object.keys(en)) {
        expect(si[key].length).toBeGreaterThan(0);
        expect({key, placeholders:tokens(si[key])}).toEqual({key, placeholders:tokens(en[key])});
    }
    expect(si.startSinhala).toBe('සිංහලෙන් පටන් ගමු');
});
