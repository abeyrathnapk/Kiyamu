/**
 * Original, offline SVG picture cues for the Sinhala starter boards.
 * These are editable starter illustrations, not a standardized symbol vocabulary.
 * They contain no language text; the grid label supplies the accessible meaning.
 */
const ink = '#203b4c';
const teal = '#228474';
const gold = '#ffc85b';
const peach = '#f5b68a';
const white = '#ffffff';
const path = (d, fill = 'none', stroke = ink, width = 5) => '<path d="' + d + '" fill="' + fill + '" stroke="' + stroke + '" stroke-width="' + width + '" stroke-linecap="round" stroke-linejoin="round"/>';
const circle = (cx, cy, r, fill = white, stroke = ink, width = 4) => '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + fill + '" stroke="' + stroke + '" stroke-width="' + width + '"/>';
const rect = (x, y, w, h, fill = white, r = 6) => '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + r + '" fill="' + fill + '" stroke="' + ink + '" stroke-width="4"/>';
const dot = (x, y, r = 3) => circle(x, y, r, ink, ink, 0);
const arrow = (x1, y1, x2, y2) => path('M' + x1 + ' ' + y1 + ' L' + x2 + ' ' + y2) + path('M' + (x2 - 9) + ' ' + (y2 - 8) + ' L' + x2 + ' ' + y2 + ' L' + (x2 - 9) + ' ' + (y2 + 8));
const hand = path('M29 75 L20 52 Q17 44 23 42 Q27 40 34 50 L34 23 Q34 14 41 14 Q47 14 47 23 L47 42 L48 15 Q48 7 54 9 Q60 9 60 17 L60 43 L62 23 Q63 16 69 18 Q74 19 73 27 L72 47 L75 37 Q78 30 83 35 Q87 38 83 48 L76 70 Q72 83 58 85 L44 85 Q34 84 29 75 Z', peach);
const face = mood => {
    let eyes = dot(36, 40) + dot(60, 40);
    let mouth = path('M33 56 Q48 72 63 56');
    let extras = '';
    if (mood === 'sad') { mouth = path('M34 65 Q48 49 62 65'); extras = path('M65 47 Q74 58 68 63 Q60 64 65 47', '#6ec6ed', '#207598', 2); }
    if (mood === 'angry') { mouth = path('M35 63 L61 63'); extras = path('M28 28 L40 34 M68 28 L56 34'); }
    if (mood === 'scared') { mouth = circle(48, 61, 8, ink); extras = path('M28 29 Q35 23 41 28 M55 28 Q61 23 68 29'); }
    if (mood === 'tired') { eyes = path('M29 40 L41 43 M55 43 L67 40'); mouth = path('M39 63 L57 63'); }
    if (mood === 'sleepy') { eyes = path('M29 40 Q35 47 41 40 M55 40 Q61 47 67 40'); mouth = circle(48, 61, 5, ink); }
    if (mood === 'pain') { eyes = path('M30 35 L39 41 L30 47 M66 35 L57 41 L66 47'); mouth = path('M35 64 L41 58 L48 64 L55 58 L62 64'); }
    if (mood === 'confused') { eyes = dot(36, 40) + path('M55 39 L67 39'); mouth = path('M35 62 Q47 54 62 61'); extras = path('M27 27 L41 25 M55 29 L69 32'); }
    return circle(48, 48, 34, gold) + eyes + mouth + extras;
};
const person = (style = '', color = teal) => {
    let head = circle(48, 30, 17, peach);
    let hair = path('M32 28 Q31 9 48 12 Q65 10 65 28 L57 21 L39 24 Z', ink);
    if (style === 'long') hair = path('M30 43 L30 26 Q30 8 48 8 Q68 8 68 27 L68 44 L61 42 L61 26 Q48 28 39 20 L35 42 Z', ink);
    if (style === 'elder') hair = path('M30 27 Q30 8 48 9 Q68 9 66 29 L59 20 L36 23 Z', '#d5dce2') + circle(39, 30, 6, 'none', ink, 2) + circle(57, 30, 6, 'none', ink, 2) + path('M45 30 L51 30', 'none', ink, 2);
    return path('M17 83 Q18 52 48 52 Q78 52 79 83 Z', color) + head + hair + dot(41, 31, 2) + dot(56, 31, 2) + path('M42 40 Q48 45 55 40', 'none', ink, 2);
};
const bowl = path('M15 53 L81 53 Q77 83 48 83 Q20 83 15 53 Z', teal) + path('M24 52 Q21 40 33 36 Q34 28 44 33 Q55 22 61 34 Q76 32 74 52 Z', white);
const water = path('M25 19 L71 19 L65 82 L31 82 Z', '#def4fb') + path('M29 47 Q39 42 48 47 Q57 52 68 47 L65 82 L31 82 Z', '#64bedd', ink, 3);
const heart = path('M48 76 L19 48 C0 24 29 7 48 30 C67 7 96 24 77 48 Z', '#ef7e81');
const home = path('M13 45 L48 14 L83 45 M23 39 L23 82 L73 82 L73 39', gold) + rect(40, 56, 17, 26, white, 2);
const ball = circle(48, 48, 34, white) + path('M39 36 L57 36 L64 52 L48 64 L32 52 Z', teal) + path('M39 36 L30 22 M57 36 L66 22 M64 52 L82 54 M48 64 L48 82 M32 52 L14 54');
const book = path('M48 23 Q31 11 10 17 L10 76 Q31 70 48 82 Q65 70 86 76 L86 17 Q65 11 48 23 Z', '#a7ddd3') + path('M48 23 L48 82 M20 29 L37 32 M20 43 L37 46 M59 32 L76 29 M59 46 L76 43', 'none', ink, 3);
const music = path('M37 64 L37 22 L77 14 L77 57 M37 34 L77 26', teal) + '<ellipse cx="27" cy="68" rx="12" ry="9" fill="' + ink + '"/><ellipse cx="67" cy="61" rx="12" ry="9" fill="' + ink + '"/>';
const symbols = {
    me: person() + path('M78 56 L57 56 M66 47 L57 56 L66 65', 'none', '#db5d31', 6),
    want: path('M13 76 L31 58 L60 58 Q71 58 67 66 L42 70 M30 60 L44 43 Q49 37 54 41 L46 55 M65 67 L81 52 Q89 49 87 57 L67 80 L32 84 L20 88', peach) + path('M68 17 L72 28 L85 30 L75 38 L77 50 L66 44 L55 50 L57 38 L47 30 L61 28 Z', gold, ink, 3),
    no: hand + path('M14 14 L85 85', 'none', '#bc3c3c', 8),
    more: circle(31, 48, 23, '#a7ddd3') + circle(65, 48, 23, gold) + path('M65 36 L65 60 M53 48 L77 48'),
    finished: circle(48, 48, 34, '#a7ddd3') + path('M27 49 L42 64 L70 31', 'none', ink, 7),
    food: bowl + path('M12 15 L12 39 M6 15 L6 26 Q12 35 18 26 L18 15 M84 15 L84 40', 'none', ink, 4),
    feelings: face('happy'),
    play: ball,
    care: heart + path('M37 43 L59 43 M48 32 L48 55', 'none', white, 6),
    people: '<g transform="translate(-12 4) scale(.75)">' + person('long') + '</g><g transform="translate(33 10) scale(.7)">' + person('', '#efae43') + '</g>',
    chat: path('M12 15 L83 15 L83 65 L41 65 L23 82 L23 65 L12 65 Z', '#a7ddd3') + dot(30, 40, 4) + dot(48, 40, 4) + dot(66, 40, 4),
    water,
    rice: bowl + path('M30 45 L35 42 M43 42 L48 39 M56 44 L61 41 M38 49 L43 48 M59 49 L64 48', 'none', '#8c8c75', 2),
    milk: path('M28 12 L61 12 L74 29 L74 83 L23 83 L23 29 Z', white) + path('M28 12 L40 29 L74 29 M40 29 L40 83', 'none', ink, 3) + rect(45, 44, 21, 22, '#a7ddd3', 3),
    bread: path('M19 39 C2 28 14 13 31 14 C45 4 63 13 65 15 C85 12 98 30 78 41 L78 82 L19 82 Z', '#e3a455') + path('M28 41 Q48 30 69 41 L69 73 L28 73 Z', '#ffe3aa', '#bc7f3f', 3),
    banana: path('M17 17 Q19 69 76 51 Q69 86 35 80 Q9 74 10 43 Z', gold) + path('M17 17 L25 11 M20 31 Q27 65 64 62', 'none', '#8d6b24', 3),
    hungry: '<g transform="translate(1 -9)">' + person() + '</g>' + circle(49, 71, 14, gold) + path('M41 70 Q49 64 57 70 M41 77 L57 77', 'none', ink, 3),
    thirsty: '<g transform="translate(-4 2) scale(.65)">' + person() + '</g><g transform="translate(44 30) scale(.6)">' + water + '</g>',
    happy: face('happy'),
    sad: face('sad'),
    angry: face('angry'),
    scared: face('scared'),
    pain: face('pain'),
    tired: face('tired'),
    sleepy: face('sleepy'),
    cold: path('M48 10 L48 86 M15 29 L81 67 M15 67 L81 29 M37 16 L48 27 L59 16 M37 80 L48 69 L59 80 M15 42 L30 38 L26 22 M70 75 L66 59 L82 55 M15 54 L30 58 L26 74 M70 21 L66 37 L82 41', 'none', '#258fb8', 5),
    hot: circle(48, 48, 21, gold) + path('M48 7 L48 17 M48 79 L48 89 M7 48 L17 48 M79 48 L89 48 M19 19 L26 26 M70 70 L77 77 M19 77 L26 70 M70 26 L77 19', 'none', '#c87a12', 5),
    hug: circle(35, 27, 14, peach) + circle(63, 29, 14, peach) + path('M20 84 L20 55 Q35 38 48 56 Q66 38 78 55 L78 84 Z', '#a7ddd3') + path('M26 56 Q48 80 72 55 M24 72 Q46 48 73 73', 'none', ink, 5),
    alone: '<g transform="translate(19 20) scale(.6)">' + person() + '</g>' + path('M27 13 L9 13 L9 82 L27 82 M69 13 L87 13 L87 82 L69 82', 'none', teal, 4),
    quiet: path('M14 36 L30 36 L48 20 L48 77 L30 61 L14 61 Z', gold) + path('M64 34 Q78 48 64 62 M75 24 Q96 48 75 72', 'none', ink, 4) + path('M13 14 L83 84', 'none', '#bc3c3c', 6),
    do: path('M15 75 L31 53 L46 56 L50 39 Q54 30 61 34 L58 52 L70 43 Q79 39 80 47 L71 62 L84 54 Q91 53 88 62 L68 81 L36 86 Z', peach) + path('M17 15 L30 28 M38 8 L40 24 M63 10 L56 25', 'none', '#d18c21', 4),
    ball,
    music,
    book,
    tv: rect(12, 25, 72, 51, '#a7ddd3') + rect(20, 32, 48, 36, white, 2) + dot(76, 44) + dot(76, 58) + path('M34 12 L48 25 L65 10 M27 82 L70 82'),
    draw: rect(13, 14, 60, 68, white, 2) + path('M24 67 Q32 39 41 62 Q48 78 62 52', 'none', teal, 4) + path('M51 38 L75 9 L85 18 L61 47 L49 51 Z', gold) + path('M51 38 L61 47', 'none', ink, 3),
    outside: path('M10 83 L86 83 M29 82 L29 49', 'none', ink, 4) + circle(29, 33, 21, '#a7ddd3') + circle(72, 22, 12, gold) + path('M47 81 Q42 61 59 53 Q78 44 78 31', 'none', '#cc9451', 10),
    see: path('M7 48 Q48 7 89 48 Q48 89 7 48 Z', white) + circle(48, 48, 18, '#a7ddd3') + circle(48, 48, 8, ink),
    listen: path('M31 67 Q40 69 38 80 Q50 91 61 76 L65 60 Q83 43 75 25 Q66 6 45 12 Q28 15 27 33 M40 36 Q39 23 53 24 Q68 25 62 42 L51 52 Q42 49 47 42', peach),
    toilet: rect(54, 11, 24, 36, '#d5e8ee', 3) + path('M16 48 L79 48 Q79 70 57 73 L65 84 L29 84 L36 67 Q18 63 16 48 Z', white) + path('M16 44 L80 44', 'none', ink, 7) + path('M60 20 L69 20', 'none', ink, 3),
    wash: path('M13 21 L52 21 L52 37 L67 37 M39 13 L39 28 M29 13 L49 13', 'none', ink, 7) + path('M63 44 L63 49 M72 44 L72 49 M63 57 L63 62 M72 57 L72 62', 'none', '#2485a7', 4) + path('M12 75 L37 62 L50 66 L67 72 Q80 72 80 79 L48 87 L24 82', peach),
    bath: path('M13 43 L84 43 L79 74 Q48 89 18 74 Z', '#a7ddd3') + path('M19 43 L19 25 Q19 13 29 13 Q38 13 38 24 M19 80 L19 87 M77 80 L77 87') + circle(51, 35, 9, white, ink, 3) + circle(70, 31, 11, white, ink, 3),
    clothes: path('M28 14 L39 14 Q48 29 57 14 L68 14 L88 35 L72 50 L66 42 L66 83 L30 83 L30 42 L24 50 L8 35 Z', '#a7ddd3'),
    rest: rect(15, 16, 26, 66, '#a7ddd3', 6) + rect(55, 16, 26, 66, gold, 6),
    help: '<g transform="translate(-8 3) scale(.7)">' + person() + '</g>' + path('M42 72 L58 54 L74 54 L88 43 M50 80 L67 68 L82 67', 'none', '#d08049', 8) + path('M69 12 L69 35 M58 24 L80 24', 'none', teal, 6),
    stop: path('M30 8 L66 8 L88 30 L88 66 L66 88 L30 88 L8 66 L8 30 Z', '#d34e4e') + '<g transform="translate(19 18) scale(.55)">' + hand + '</g>',
    'no-touch': '<g transform="translate(1 -1) scale(.7)">' + person() + '</g><g transform="translate(42 39) scale(.55)">' + hand + '</g>' + path('M14 12 L85 85', 'none', '#bc3c3c', 6),
    home,
    go: circle(53, 15, 8, peach) + path('M51 28 L38 51 L58 57 L65 83 M39 51 L25 79 M45 38 L24 44 M51 29 L66 43 L79 43', 'none', teal, 7),
    mother: person('long'),
    father: person('', '#5b9dce'),
    sister: person('long', '#efae43') + circle(27, 20, 5, '#e3829d', ink, 2),
    brother: person('', '#df8d61') + path('M30 18 Q48 0 65 18 L72 20 L30 20 Z', gold, ink, 2),
    friend: '<g transform="translate(-8 14) scale(.65)">' + person('', '#efae43') + '</g><g transform="translate(40 14) scale(.65)">' + person('long', teal) + '</g>' + path('M39 69 L58 69', 'none', ink, 4),
    grandmother: person('elder', '#a57ba8') + circle(30, 13, 8, '#d5dce2', ink, 2),
    grandfather: person('elder', '#547e9c') + path('M40 39 Q48 33 57 39 M43 44 L54 44', 'none', ink, 2),
    school: path('M12 81 L12 37 L48 12 L84 37 L84 81 Z', '#a7ddd3') + rect(39, 56, 18, 25, white, 1) + rect(22, 45, 9, 12, white, 1) + rect(65, 45, 9, 12, white, 1) + circle(48, 34, 9, white, ink, 2) + path('M48 28 L48 34 L54 34', 'none', ink, 2),
    teacher: rect(6, 10, 66, 48, '#a7ddd3', 2) + path('M15 24 L39 24 M15 38 L35 38', 'none', ink, 3) + '<g transform="translate(42 30) scale(.65)">' + person('', '#efae43') + '</g>' + path('M58 66 L39 38', 'none', ink, 3),
    yes: circle(48, 48, 34, '#a7ddd3') + path('M27 49 L42 64 L70 31', 'none', ink, 7),
    hello: '<g transform="translate(-8 0) scale(.85)">' + hand + '</g>' + path('M75 9 Q89 20 88 35 M75 22 Q81 28 79 35', 'none', teal, 4),
    thanks: '<g transform="translate(19 15) scale(.7)">' + heart + '</g>' + path('M8 44 L16 51 M80 51 L88 44 M48 6 L48 15', 'none', '#d18c21', 4),
    again: path('M78 31 A33 33 0 1 0 79 66 M78 13 L78 32 L59 32', 'none', teal, 7),
    wait: circle(48, 48, 34, white) + path('M48 22 L48 48 L67 60', 'none', teal, 6) + path('M48 14 L48 18 M82 48 L78 48 M48 82 L48 78 M14 48 L18 48', 'none', ink, 3),
    dontknow: '<g transform="translate(16 20) scale(.65)">' + person('', '#efae43') + '</g>' + path('M8 54 L21 49 M75 49 L88 54 M12 18 Q18 9 25 17 Q29 24 20 28 L20 33 M78 17 L78 29', 'none', ink, 3) + dot(20, 40, 2) + dot(78, 37, 2),
    confused: face('confused'),
    myturn: '<g transform="translate(7 11) scale(.8)">' + person() + '</g>' + path('M82 71 L58 71 M67 61 L57 71 L67 81', 'none', '#c86f25', 6),
    yourturn: '<g transform="translate(7 11) scale(.8)">' + person() + '</g>' + arrow(57, 71, 84, 71),
    look: path('M9 48 Q35 19 60 48 Q35 77 9 48 Z', white) + circle(35, 48, 11, '#a7ddd3') + circle(35, 48, 4, ink) + arrow(61, 48, 88, 48),
    different: circle(26, 33, 17, '#a7ddd3') + rect(58, 56, 29, 29, gold, 2) + arrow(49, 33, 81, 33) + path('M80 33 L80 48', 'none', ink, 5)
};

// Fixed toolbar aliases share the same visual vocabulary as the body cells.
symbols.check = symbols.yes;
symbols.eat = path('M13 88 Q13 61 37 61 Q61 61 61 88 Z', teal) + circle(37, 34, 23, peach) + dot(29, 29) + dot(43, 29) + circle(43, 45, 5, ink) + path('M59 45 L88 57', 'none', ink, 5) + path('M46 42 Q55 36 64 43 Q61 52 50 49 Z', gold);
symbols['hand-paper'] = symbols.no;
symbols['hands-helping'] = symbols.help;
symbols.back = path('M26 31 A31 31 0 1 1 20 65', 'none', ink, 7) + path('M25 12 L25 34 L47 34', 'none', ink, 7);
symbols['volume-up'] = path('M12 36 L29 36 L48 20 L48 77 L29 61 L12 61 Z', gold) + path('M62 35 Q75 48 62 62 M73 23 Q96 48 73 74', 'none', teal, 5);
symbols.backspace = path('M32 22 L85 22 L85 75 L32 75 L9 48 Z', '#a7ddd3') + path('M46 36 L68 61 M68 36 L46 61', 'none', ink, 5);
symbols.eraser = path('M13 59 L56 16 Q61 12 66 17 L85 36 Q89 41 84 46 L48 82 L35 82 Z', '#efae99') + path('M31 42 L64 65 M49 81 L87 81', 'none', ink, 4);

// A negative answer is distinct from the stop/refusal hand symbol.
symbols.negative = circle(48, 48, 34, '#f7ded8') + path('M33 33 L63 63 M63 33 L33 63', 'none', ink, 7);

// Preserve exact previous built-ins for rendering existing boards without rewriting images.
const previousSymbols = {...symbols};
const stickPerson = (style = '', color = teal) => {
    const skin = color === '#df8d61' || color === '#547e9c' ? '#b87b50' : peach;
    const head = circle(48, 27, 15, skin, ink, 3);
    const features = dot(43, 25, 1.7) + dot(53, 25, 1.7) + path('M43 33 Q48 37 53 33', 'none', ink, 2);
    const hair = style === 'long' ? path('M32 34 L32 23 Q34 8 48 10 Q64 9 64 25 L64 35', 'none', ink, 3)
        : style === 'elder' ? path('M34 19 Q48 5 62 19', 'none', '#a3a3a3', 4) + circle(42,25,5,'none',ink,1.5) + circle(54,25,5,'none',ink,1.5)
        : '';
    return path('M48 43 L48 65 M48 48 L27 60 M48 48 L69 60 M48 65 L33 85 M48 65 L63 85','none',ink,4) + head + features + hair;
};
const variants = [['',teal],['long',teal],['','#efae43'],['','#5b9dce'],['long','#efae43'],['','#df8d61'],['elder','#a57ba8'],['elder','#547e9c']];
for (const key of Object.keys(symbols)) {
    for (const [style,color] of variants) symbols[key] = symbols[key].split(person(style,color)).join(stickPerson(style,color));
}
symbols.go = circle(53,16,10,peach,ink,3) + path('M50 28 L39 51 L57 59 L65 84 M39 51 L24 81 M46 36 L26 46 M50 29 L65 42 L79 42','none',ink,4) + dot(56,15,1.8);
symbols.eat = circle(32,24,14,peach,ink,3) + dot(36,22,2) + path('M36 31 L43 31 M32 39 L32 65 M32 65 L18 86 M32 65 L46 86 M32 46 L48 52 L59 34 M32 46 L17 57','none',ink,4) + path('M48 31 L66 31','none',ink,3) + circle(62,30,4,gold,ink,2) + '<g transform="translate(56 42) scale(.38)">' + bowl + '</g>';

export const SINHALA_SYMBOL_NAMES = Object.keys(symbols);

export function getSinhalaSymbol(name) {
    const body = symbols[name];
    if (!body) {
        throw new Error('Unknown Sinhala starter symbol: ' + name);
    }
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 96 96"><rect width="96" height="96" rx="12" fill="#fff"/>' + body + '</svg>';
    return 'data:image/svg+xml;base64,' + btoa(svg);
}

const previousToCurrent = new Map();
for (const name of SINHALA_SYMBOL_NAMES) {
    if(previousSymbols[name] === symbols[name]) continue;
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 96 96"><rect width="96" height="96" rx="12" fill="#fff"/>' + previousSymbols[name] + '</svg>';
    previousToCurrent.set('data:image/svg+xml;base64,' + btoa(svg), getSinhalaSymbol(name));
}
/** Exact built-in matches only: custom drawings and photographs pass through untouched. */
const transparentBuiltins = new Map(SINHALA_SYMBOL_NAMES.map(name => {
    const data = getSinhalaSymbol(name);
    const svg = atob(data.split(',')[1]).replace('<rect width="96" height="96" rx="12" fill="#fff"/>', '');
    return [data, 'data:image/svg+xml;base64,' + btoa(svg)];
}));
export function getUpdatedSinhalaSymbol(data, whiteBacking = false) {
    const current = previousToCurrent.get(data) || data;
    return whiteBacking ? current : transparentBuiltins.get(current) || current;
}
