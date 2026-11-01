/**
 * Everyday Sinhala starter vocabulary for children and their communication partners.
 * Labels are intentionally colloquial. The selected word order belongs to the speaker.
 * IDs and positions are stable; personalize names/photos without moving familiar words.
 */
const word = (key, si, en, symbol) => ({ key, kind: 'word', label: { si, en }, symbol });
const phrase = (key, si, en, symbol) => ({ key, kind: 'phrase', label: { si, en }, symbol });
const navigate = (key, si, en, symbol, target) => ({ key, kind: 'navigate', label: { si, en }, symbol, target });

export const SINHALA_STARTER_BOARDS = [
    {
        key: 'core24', title: { si: 'කියමු 24', en: 'Kiyamu Sinhala Core 24' },
        items: [
            word('to-me', 'මට', 'To me', 'me'),
            word('water', 'වතුර', 'Water', 'water'),
            word('want', 'ඕනේ', 'Want', 'want'),
            word('no', 'එපා', 'Don’t want', 'no'),
            word('i', 'මම', 'I', 'me'),
            word('rice', 'බත්', 'Rice', 'rice'),
            word('eat', 'කනවා', 'Eat', 'eat'),
            word('more', 'තව', 'More', 'more'),
            word('you', 'ඔයා', 'You', 'yourturn'),
            word('go', 'යනවා', 'Go', 'go'),
            word('good', 'හොඳයි', 'Good', 'happy'),
            phrase('finished', 'ඉවරයි', 'Finished', 'finished'),
            phrase('yes', 'ඔව්', 'Yes', 'yes'),
            phrase('no-answer', 'නෑ', 'No', 'negative'),
            {...phrase('help', 'උදව්', 'Help', 'help'), utterance:{si:'මට උදව් කරන්න',en:'Help me'}},
            phrase('stop', 'නවත්තන්න', 'Stop', 'stop'),
            {...phrase('toilet', 'වැසිකිළිය', 'Toilet', 'toilet'), utterance:{si:'මට වැසිකිළියට යන්න ඕනේ',en:'I need the toilet'}},
            phrase('pain', 'මට රිදෙනවා', 'It hurts', 'pain'),
            navigate('food', 'කෑම බීම', 'Food and drink', 'food', 'food'),
            navigate('feelings', 'මට දැනෙන දේ', 'How I feel', 'feelings', 'feelings'),
            navigate('activities', 'සෙල්ලම් කරමු', 'Play and activities', 'play', 'activities'),
            navigate('care', 'මට ඕන දේ', 'My needs', 'care', 'care'),
            navigate('people', 'අය සහ තැන්', 'People and places', 'people', 'people'),
            navigate('chat', 'කතා කරමු', 'Chat', 'chat', 'chat')
        ]
    },
    {
        key: 'food', title: { si: 'කෑම බීම', en: 'Food and drink' },
        items: [
            word('to-me', 'මට', 'To me', 'me'),
            word('water', 'වතුර', 'Water', 'water'),
            word('want', 'ඕනේ', 'Want', 'want'),
            word('no', 'එපා', 'Don’t want', 'no'),
            word('rice', 'බත්', 'Rice', 'rice'),
            word('milk', 'කිරි', 'Milk', 'milk'),
            word('bread', 'පාන්', 'Bread', 'bread'),
            word('banana', 'කෙසෙල්', 'Banana', 'banana'),
            word('more', 'තව', 'More', 'more'),
            phrase('hungry', 'මට බඩගිනියි', 'I’m hungry', 'hungry'),
            phrase('thirsty', 'මට පිපාසයි', 'I’m thirsty', 'thirsty'),
            phrase('finished', 'ඉවරයි', 'Finished', 'finished')
        ]
    },
    {
        key: 'feelings', title: { si: 'මට දැනෙන දේ', en: 'How I feel' },
        items: [
            phrase('happy', 'මට සතුටුයි', 'I’m happy', 'happy'),
            phrase('sad', 'මට දුකයි', 'I’m sad', 'sad'),
            phrase('angry', 'මට තරහයි', 'I’m angry', 'angry'),
            phrase('scared', 'මට බයයි', 'I’m scared', 'scared'),
            phrase('pain', 'මට රිදෙනවා', 'It hurts', 'pain'),
            phrase('tired', 'මට මහන්සියි', 'I’m tired', 'tired'),
            phrase('sleepy', 'මට නිදිමතයි', 'I’m sleepy', 'sleepy'),
            phrase('cold', 'මට සීතලයි', 'I’m cold', 'cold'),
            phrase('hot', 'මට රස්නෙයි', 'I’m hot', 'hot'),
            phrase('hug', 'මාව බදාගන්න', 'Hug me', 'hug'),
            phrase('alone', 'මට තනියම ඉන්න ඕනේ', 'I want some space', 'alone'),
            phrase('quiet', 'සද්දෙ වැඩියි', 'It’s too loud', 'quiet')
        ]
    },
    {
        key: 'activities', title: { si: 'සෙල්ලම් කරමු', en: 'Play and activities' },
        items: [
            word('i', 'මම', 'I', 'me'),
            word('play', 'සෙල්ලම්', 'Play', 'play'),
            word('do', 'කරනවා', 'Do', 'do'),
            word('no', 'එපා', 'Don’t want', 'no'),
            word('ball', 'බෝලෙ', 'Ball', 'ball'),
            word('music', 'සින්දු', 'Songs', 'music'),
            word('book', 'පොත', 'Book', 'book'),
            word('tv', 'ටීවී', 'TV', 'tv'),
            phrase('draw', 'චිත්‍ර අඳිමු', 'Let’s draw', 'draw'),
            phrase('outside', 'එළියට යමු', 'Let’s go outside', 'outside'),
            word('see', 'බලනවා', 'Look at', 'see'),
            word('listen', 'අහනවා', 'Listen to', 'listen')
        ]
    },
    {
        key: 'care', title: { si: 'මට ඕන දේ', en: 'My needs' },
        items: [
            phrase('toilet', 'මට වැසිකිළියට යන්න ඕනේ', 'I need the toilet', 'toilet'),
            phrase('wash', 'අත් සෝදමු', 'Let’s wash hands', 'wash'),
            phrase('bath', 'නාන්න ඕනේ', 'I want a bath', 'bath'),
            phrase('clothes', 'ඇඳුම් මාරු කරන්න ඕනේ', 'I need to change clothes', 'clothes'),
            phrase('rest', 'ටිකක් නවතිමු', 'Let’s take a break', 'rest'),
            phrase('help', 'මට උදව් කරන්න', 'Help me', 'help'),
            phrase('stop', 'නවත්තන්න', 'Stop', 'stop'),
            phrase('no-touch', 'මාව අල්ලන්න එපා', 'Don’t touch me', 'no-touch'),
            phrase('water', 'මට වතුර ඕනේ', 'I want water', 'water'),
            phrase('pain', 'මට රිදෙනවා', 'It hurts', 'pain'),
            phrase('mum', 'අම්මට කතා කරන්න', 'Call Mum', 'mother'),
            phrase('dad', 'තාත්තට කතා කරන්න', 'Call Dad', 'father')
        ]
    },
    {
        key: 'people', title: { si: 'අය සහ තැන්', en: 'People and places' },
        items: [
            word('i', 'මම', 'I', 'me'),
            word('home', 'ගෙදර', 'Home', 'home'),
            word('go', 'යනවා', 'Go', 'go'),
            word('mother', 'අම්මා', 'Mum', 'mother'),
            word('father', 'තාත්තා', 'Dad', 'father'),
            word('sister', 'අක්කා', 'Older sister', 'sister'),
            word('brother', 'අයියා', 'Older brother', 'brother'),
            word('friend', 'යාලුවා', 'Friend', 'friend'),
            word('grandmother', 'ආච්චි', 'Grandma', 'grandmother'),
            word('grandfather', 'සීයා', 'Grandpa', 'grandfather'),
            word('school', 'ඉස්කෝලෙ', 'School', 'school'),
            word('teacher', 'ටීචර්', 'Teacher', 'teacher')
        ]
    },
    {
        key: 'chat', title: { si: 'කතා කරමු', en: 'Chat' },
        items: [
            phrase('yes', 'ඔව්', 'Yes', 'yes'),
            phrase('no', 'එපා', 'Don’t want', 'no'),
            phrase('hello', 'හලෝ', 'Hello', 'hello'),
            phrase('thanks', 'ස්තුතියි', 'Thank you', 'thanks'),
            phrase('again', 'ආයෙත් කියන්න', 'Say it again', 'again'),
            phrase('wait', 'පොඩ්ඩක් ඉන්න', 'Wait a moment', 'wait'),
            phrase('dont-know', 'මම දන්නේ නෑ', 'I don’t know', 'dontknow'),
            phrase('dont-understand', 'මට තේරෙන්නේ නෑ', 'I don’t understand', 'confused'),
            phrase('my-turn', 'දැන් මගේ වාරෙ', 'My turn now', 'myturn'),
            phrase('your-turn', 'දැන් ඔයාගේ වාරෙ', 'Your turn now', 'yourturn'),
            phrase('look', 'මේ බලන්න', 'Look at this', 'look'),
            phrase('different', 'වෙන එකක් ඕනේ', 'I want something different', 'different')
        ]
    }
];

export const SINHALA_STARTER_EXAMPLES = [
    { board: 'core24', keys: ['to-me', 'water', 'want'], text: 'මට වතුර ඕනේ' },
    { board: 'core24', keys: ['i', 'rice', 'eat'], text: 'මම බත් කනවා' },
    { board: 'food', keys: ['to-me', 'water', 'want'], text: 'මට වතුර ඕනේ' },
    { board: 'food', keys: ['to-me', 'rice', 'no'], text: 'මට බත් එපා' },
    { board: 'activities', keys: ['i', 'play', 'do'], text: 'මම සෙල්ලම් කරනවා' },
    { board: 'people', keys: ['i', 'home', 'go'], text: 'මම ගෙදර යනවා' }
];
