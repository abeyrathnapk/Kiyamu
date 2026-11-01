/** Helpers keep Sinhala glyphs and speech in the intended language. */
export const containsSinhala = text => /[\u0D80-\u0DFF]/.test(text || '');

export function getSinhalaVoices(voices, { online = true, responsiveAvailable = false, nativeAvailable = true, isAndroid = false } = {}) {
    return voices.filter(voice => {
        const lang = (voice.langFull || voice.lang || '').toLowerCase().split(/[-_]/)[0];
        if (lang !== 'si') return false;
        // Android can expose downloaded engine voices with localService=false.
        // Try the enumerated Sinhala voice and let speech synthesis report failure.
        if (voice.type === 'VOICE_TYPE_NATIVE') return nativeAvailable && !!voice.ref && (online || voice.local || isAndroid);
        if (!online && !voice.local) return false;
        if (voice.type === 'VOICE_TYPE_RESPONSIVEVOICE') return responsiveAvailable && online;
        return voice.type === 'VOICE_TYPE_EXTERNAL_DATA' || voice.type === 'VOICE_TYPE_EXTERNAL_PLAYING';
    });
}

export function removeLastGrapheme(text) {
    if (!text) return '';
    if (typeof Intl.Segmenter === 'function') {
        const parts = Array.from(new Intl.Segmenter('si', { granularity: 'grapheme' }).segment(text));
        return text.slice(0, parts[parts.length - 1].index);
    }
    // Preserve vowel marks, virama and joined letters on older engines.
    const parts = text.match(/(?:[^\p{M}\u200d]\p{M}*)(?:\u200d[^\p{M}]\p{M}*)*/gu) || [];
    parts.pop();
    return parts.join('');
}
