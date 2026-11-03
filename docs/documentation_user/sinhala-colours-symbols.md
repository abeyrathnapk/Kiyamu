# කියමු 24 — පාට සහ රූප / Colours and symbols

## භාවිතය

අගුල අරින්න → සැකසුම් → පෙනුම → **කියමු කොටුවල පාට**. ඉහළ පාට තීරු, ලා පාට පසුබිම් හෝ වර්ග අනුව පාට නැති පෙනුම තෝරන්න. **දැනට ඇති පෙනුම තබන්න** තේරීමෙන් පැරණි පෞද්ගලික සැකසුම් භාවිත කළ හැක. පෙනුම මාරු කළත් වචන, කොටු පිහිටීම සහ පින්තූර වෙනස් නොවේ.

කොටුව සංස්කරණය කර **පාට වර්ගය** වෙනස් කරන්න. එම සංස්කරණ කවුළුවෙන් හුරු ඡායාරූපයක් හෝ වෙනත් රූපයක් තෝරාගත හැක. මුළු පුවරුව නැවත සෑදීමට අවශ්‍ය නැහැ. රතු “එපා”, “නෑ”, “නවත්තන්න” වචන සාමාන්‍ය සන්නිවේදන වචනයි; දෝෂ හෝ දත්ත මැකීමේ අනතුරු ඇඟවීම් නොවේ.

“ඕනේ”, “තව” සහ සම්පූර්ණ වාක්‍ය වැනි කොටු ඉංග්‍රීසි පරිවර්තනය බලා වර්ග කරන්නේ නැහැ. වර්ග නොකළ වචන සාමාන්‍ය අළු තීරුවකින් පෙන්වයි. කොටුවේ සිංහල වචනය වෙනස් කළ විට එහි වර්ගයත් නැවත බලන්න.

## Appearance and preservation

Settings → Appearance provides full category backgrounds (default for an unpersonalised Sinhala profile), category borders, strips, pale category backgrounds, and no category colours. A compatibility choice keeps existing appearance. Personalised profile schemes and dark colours are detected and retained until a caregiver chooses a new mode. The stored settings are not reset. Custom tile backgrounds/borders remain available in the tile editor. Low-contrast label colours are corrected at rendering time only; the saved colour remains intact.

The default is board #F3F5F7, tile #FFFFFF, label #1F2937, neutral boundary #64748B. Strips are approximately 6% of the smaller tile dimension (3–10 px). Image and label placement is the same across the three colour modes. Images remain proportionally contained, with a white icon area; labels are real Sinhala text with room for vowel signs. Category colour never recolours the picture. Focus has a dark outer outline separated by white; activation is a brief inset mark. No continuous category flashing is used. Reduced-motion preferences are respected.

| Editable category | Accent | Pale background |
| --- | --- | --- |
| People and pronouns | #E0B400 | #FFF7CC |
| Verbs and actions | #278148 | #E8F5E9 |
| Nouns, objects and things | #D97706 | #FFF0DB |
| Describing words | #2563EB | #EAF2FF |
| Social expressions | #C74780 | #FCE8F1 |
| Miscellaneous / unclassified | #64748B | #FFFFFF |
| Negation / important words | #B91C1C | #FDECEC |

The initial core assignments are explicitly based on the Sinhala message: මම/මට/ඔයා → people; වතුර/බත්/වැසිකිළිය → nouns; කනවා/යනවා → actions; හොඳයි/ඉවරයි → describing; ඔව් → social; එපා/නෑ/නවත්තන්න → negation/important. උදව් is classified as an action request because its spoken message is මට උදව් කරන්න. ඕනේ, තව, whole phrases and navigation categories remain neutral rather than guessing their grammatical class from English. These are editable AAC choices, not a claim that Sinhala and English grammar are interchangeable. The fallback for an older unclassified tile applies only when its original Sinhala label still matches. Explicit saved categories always take precedence.

Optional question (#7C3AED/#F1EAFF), adverb (#8B5E3C/#F3EAE2), and determiner (#6B7280/#F1F3F5) categories are supported when deliberately supplied as vocabulary metadata; they are not automatically assigned or added to this board's category choices. An already assigned extended category remains editable.

## Symbols and licensing

The colour update adds no vocabulary. A subsequent requested style update renders original built-in people and action drawings as simple stick figures. Existing photographs, image data, URLs and attribution fields are preserved. The coherent original Kiyamu SVG set remains the starter library; its editable drawing source is [sinhalaSymbols.js](../../src/js/service/boards/sinhalaSymbols.js). Application source is AGPL-3.0; original exported artwork follows this repository's CC BY-SA 4.0 non-source terms. Retain Kiyamu contributor attribution, the licence and a record of modifications. Third-party symbols and personal photographs keep their own permissions and notices; see [NOTICE.md](../../NOTICE.md). Ordinary interface icons remain separate from communication pictures. Emoji are not the default symbol library.

For future vocabulary, continue this simple drawing style or choose a coherent, explicitly licensed AAC library. Show actions as actions (drinking rather than just a cup), keep meaningful natural colours, and use recognisable Sri Lankan food, clothes, transport, schools and routines. Represent varied skin tones, genders and disabilities without stereotypes. Do not replace a child's familiar pictures merely to make a library uniform. Abstract words such as want/more/not need consistent symbols and teaching.

## Caregiver review / පවුල සමඟ පරීක්ෂාව

Computer checks do not establish whether a child recognises a symbol. Review proposed additions with Sinhala-speaking children and caregivers before replacing familiar pictures. Ask what each picture means without first giving the expected answer; record ambiguities and the family's preferred words. Test the smallest supported tile size on the actual device, indoors and in bright daylight. Review long labels, vowel signs, focus outlines, touch targets and scanning. Offer individual colour, text-size, input and photograph adaptations rather than one compulsory appearance.

දරුවාට රූපය පෙන්වා එයින් අදහස් වන්නේ කුමක්දැයි බලන්න. අපේක්ෂිත පිළිතුර කලින් නොකියන්න. හුරු නැති රූප, අපැහැදිලි වචන සහ පවුල භාවිත කරන වෙනත් වචන සටහන් කරන්න. දරුවා භාවිත කරන උපකරණයෙන්, ගෙදරදී සහ එළියේ තද ආලෝකයේදී පරීක්ෂා කරන්න. අකුරු, පිලි, පාට සහ කොටු තෝරන පහසුව බලන්න. එක් දරුවෙකුට ගැළපෙන පෙනුම සෑම දරුවෙකුටම ගැළපේ යැයි නොසිතන්න.

Family recognition, cultural review and actual-device daylight checks have not been performed in this development environment.

## Filled colours and colour vision options

Full backgrounds use stronger fills inspired by the supplied example, with the existing Sinhala category assignments unchanged. The table above specifies strip/border accents and pale fills; full fills use a separate palette. Existing saved appearance choices and custom tile colours are retained. Choose Full category backgrounds in Settings → Appearance to change a previously saved mode.

Optional red–green (protan/deutan), blue–yellow (tritan) and greyscale palettes are starting points for individual review, not clinically validated corrections or a guarantee that all categories are distinguishable. They work with full, pale, border and strip appearances. Symbols are not filtered or recoloured. Text contrast is checked against the actual tile background (at least 4.5:1), with black or white used where needed. Keep words, pictures and positions as non-colour cues, following [W3C guidance on use of colour](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color).

මුල් පෙනුම සම්පූර්ණ පාට පසුබිම් වේ. සැකසුම් → පෙනුම මඟින් ලා පාට, පාට දාර හෝ තීරු තෝරන්න. රතු–කොළ, නිල්–කහ සහ අළු පාට විකල්ප දරුවාගේ උපාංගයෙන් පරීක්ෂා කර ගැළපෙන පෙනුම තෝරන්න. කලින් සුරැකි තේරීම් වෙනස් නොවේ.

### Stick-figure people

People and walking/eating drawings use original Kiyamu round-headed line figures inspired by the requested visual style, not copied third-party artwork. Existing boards are updated only when image data exactly matches an old built-in illustration. Saved images are not rewritten; custom images and photographs pass through unchanged. Family and action labels remain unchanged. Review recognition with the child before routine use.

The default reference-inspired palette uses peach (#F3D9AB), lilac (#E7B4F5), blue (#B5D8F6), green (#CFF5AD) and neutral grey, with stronger matching borders. These are approximate visual matches to the supplied screenshot, not the Modified Fitzgerald colour mapping. The original pale, strip and border options retain their previous palette. Sinhala vocabulary category metadata is unchanged.

Built-in icons have transparent backings by default so tile colours surround the drawing. Settings → Appearance → White background behind icons restores the white backing. Only exact built-in image data is adapted; custom artwork and photographs are unchanged, including any white pixels already in those files.
