// TO DO: README.md - describe project and superstructure of Nalo Sentences
// TO DO: Add words to all inventories (ONGOING)
// TO DO: take out 'a' in Subject Contraction; ex: ofaka > ofka. Q: Under what circumstances? Not straightforward.
// TO DO: Action types: ActionTransitiveAnimate (nalo, le, ne, lewi, me, fane, piro, faka, ti, te), ActionTransitiveInanimateLand (le, piro, royu, faka, tokta), ActionTransitiveFood (mo, lo, fe, piro, time, ti), 
    // ActionIntransitive (foro, to, ukto, uka, ika), ActionSpecial (pate mi o[s] ka)
// TO DO: Address 'or' conjunction (+ peka?) and 'if' conjunction (bound)

// TO DO: Sort out semantic oddities with 'kaxu'
// TO DO: Sort out use cases for other conjunctions; which Sources or Themes should carry over based on senType

// DONE: Subordinate Clauses: General, kaxu
// DONE: Add LOCATION / POSSESSION sentences
// DONE: Check if theme and goal are the same word; decide how to handle that
// DONE: Add to Them function: ellide 'a' from the end of a mode if word[0] in 'ptfsxlrwy'
// DONE: Add in modes
// DONE: Split pronouns into P1, P2, P3
// DONE: Add documentation for functions
// DONE: Added ThemeActionLand, ThemeActionWater, ThemeActionSky
// DONE: Added Adverbials to Movement and Action sentence types; currently at 33% random

/* ========== VOCABULARY ARRAYS (LISTS) ========== */

// Words are organized into arrays based on semantic content. All array names are plural by convention.
// Last array edit: 2024.06.04 (Tue)

const actions = ['le', 'ne', 'nalo', 'to', 'ukto', 'uka', 'fe', 'ika', 'lewi', 'lo', 'me', 'mo', 'fane',
    'piro', 'royu', 'faka', 'puto', 'time', 'ti', 'te', 'tokta'];
const adverbialsTime = ['suni', 'uka', 'yu', 'suyu', 'susu', 'lesupa', 'lesuka', 'suwo', 'suyo', 'se', 'su'];
// ANIMALS
const animalsLand = ['ri', 'tipika', 'toro', 'naunau', 'timeka', 'rifla', 'rifa', 'riflamohi', 'riflamohu',
    'rita', 'rilayaki', 'ripu', 'rose', 'rosefne', 'rihepu', 'timekaxu', 'rifaupu'];
const animalsSky = ['fi', 'rifa', 'rifla', 'riflamohi', 'riflamohu', 'rifaupu'];
const animalsWater = ['liko', 'rifla', 'riflamohi', 'riflamohu', 'rilayaki', 'li', 'fila'];
const biomes = ['kifapla', 'kiisa', 'kihela', 'kiheku', 'kihela', 'kihexa', 'kira', 'xaseisa', 
    'xaseusa', 'xufula'];
// PUT THESE INTO ARRAYS BELOW AFTER IMPLEMENTED
const conjunctionsUnused = ['asupeka', 'paxi', 'kwi', 'kyu']
// PUT THESE INTO ARRAYS BELOW AFTER IMPLEMENTED
const conjunctionsBound = ['asupeka'];
const conjunctionsFreeCause = ['kaxu'];
const conjunctionsFreeTime = ['ayu', 'awi', 'asu'];
const conjunctionsSimple = [];
const emotions = ['suna', 'sina', 'isana', 'usana'];
const modes = ['naka', 'peka', 'saroka', 'tapeka', 'kipeka'];
// OBJECTS
const objectsNatureLand = ['xu', 'xa', 'ta', 'la', 'xe', 'ki', 'kipta', 'kilu', 'xo', 'raxa', 'raxu', 
    'rexu', 'retafila', 'kila', 'koksa', 'meyaki', 'kolesu', 'kolesi', 'lasi', 'laxu', 'puxa', 'puxu', 
    'taki', 'sa', 'tapsawo', 'toxa', 'xareti', 'xakihela', 'xase', 'xehela', 'xepu', 'xesu',
    'xese', 'xoxu', 'xuxerifa', 'xuxeti', 'xipo', 'xofota'];
const objectsNatureSky = ['lefu', 'lesupa', 'lesuka', 'selesu', 'selesi', 'suhi', 'suhu', 'lesi', 'lesu', 
    'xefu', 'xifa', 'xitalafu', 'tasupfu', 'tapfu', 'xisu'];
const objectsNatureWater = ['kula', 'laklesi', 'retafila', 'ufakula', 'ukula', 'xoyulapa', 'xula',
    'kusukxula', 'kuxula', 'xularekfa'];
// PLACES
const placesNatureLand = ['kixu', 'kilu', 'kipulu', 'kixa', 'kixi', 'kixase', 'kixapti', 'pukifu',
     'kifu', 'kisela', 'kuki', 'loki', 'moki', 'kiselaptikta', 'noki', 'nokisa', 'tyapulapa', 'pekufu'];
const placesNatureWater = ['iknola', 'keki', 'kekihu', 'kinolu', 'kinola', 'kinolafka', 'lahefka', 
    'layaki', 'lapahalu', 'lauka', 'meklapa', 'melu', 'pulu', 'sela', 'sukaka'];
const pronounsAll = ['mi', 'mipi', 'umi', 'mu', 'umu', 'mupi', 'mumu', 'mimu', 'mimuru', 'ma', 'mapi', 'uma', 'mama'];
const pronouns1P = ['mi', 'mipi', 'umi'];
const pronouns2P = ['mu', 'umu', 'mupi', 'mumu'];
const pronouns1P2P = ['mimu', 'mimuru'];
const pronouns3PS = ['ma', 'mapi']
const pronouns3PP = ['uma', 'mama'];
const qualities = ['isa', 'usa', 'ika', 'uka'];
const statesInanimate = ['pta', 'wopfa', 'pti', 'pla', 'psa', 'ifafka', 'ufafka', 'heku', 'iku', 'itu',
    'utu', 'ki', 'si', 'su'];
const statesAnimate = ['we', 'ye', 'ifafka', 'ufafka', 'pla', 'ufaro', 'ifaro', 'sule', 'sile', 'sune',
    'sine', 'sufe', 'sife'];
const tools = ['tiro', 'fore', 'tare', 'tiko', 'tuse', 'kela'];
const weather = ['fafula', 'fapa', 'fula', 'lafu', 'talafu', 'faneufa', 'rafu', 'ufa', 'xefu'];

/* ========== WORD OBJECTS ========== */

// Each Word Object contains a name string (just in case) and a root,
// which is an array of all the vocabulary arrays (above) that semantically qualify
// for that Word type.

let wordAction = {
    name: 'wordAction',
    root: [actions]
}

let wordConjunction = {
    name: 'wordConjunction',
    root: [conjunctionsFreeCause, conjunctionsFreeTime]
}

let wordStatesAnimate = {
    name: 'wordStateAnimate',
    root: [statesAnimate, emotions]
}

let wordStatesInanimate = {
    name: 'wordStateInanimate',
    root: [statesInanimate]
}

let wordTool = {
    name: 'wordTool',
    root: [tools],
}

let wordPronoun1P = {
    name: 'wordPronoun1P',
    root: [pronouns1P],
    mode: [modes]
}

let wordPronoun1P2P = {
    name: 'wordPronoun1P2P',
    root: [pronouns1P2P],
    mode: [modes]
}

let wordPronoun2P = {
    name: 'wordPronoun2P',
    root: [pronouns2P],
    mode: [modes]
}

let wordPronoun3PS = {
    name: 'wordPronoun3PS',
    root: [pronouns3PS],
    mode: [modes]
}

let wordPronoun3PP = {
    name: 'wordPronoun3PP',
    root: [pronouns3PP],
    mode: [modes]
}

let wordPronounAll = {
    name: 'wordPronounAll',
    root: [pronounsAll],
    mode: [modes]
}

let wordAnimalLand = {
    name: 'wordAnimalLand',
    root: [animalsLand]   
}

let wordAnimalSky = {
    name: 'wordAnimalSky',
    root: [animalsSky]   
}

let wordAnimalWater = {
    name: 'wordAnimalWater',
    root: [animalsWater]   
}

let wordObjectNatureLand = {
    name: 'wordObjectNatureLand',
    root: [objectsNatureLand]
}

let wordObjectNatureSky = {
    name: 'wordObjectNatureSky',
    root: [objectsNatureSky]
}

let wordObjectNatureWater = {
    name: 'wordObjectNatureWater',
    root: [objectsNatureWater]
}

/* ========== THEME OBJECTS ========== */

// Theme Objects are like Word Objects, except for that they stipulate what other parts of speech are allowed,
// and which semantic vocabulary lists will satisfy that part of speech based on the limits of the Theme.

// For example, a Tool can only be acted upon logically by an animal or human with agency, so the 'sources' attribute 
// for Tool only includes the Pronoun and Animal arrays.

let themeTool = {
    name: 'themeTool',
    root: [tools],
    mode: [modes],
    locations: [wordObjectNatureWater, wordObjectNatureLand, wordAnimalLand, wordAnimalSky],
    possessors: [wordPronounAll, wordAnimalLand],
    sources: [wordPronounAll, wordAnimalLand],
    goals: [wordObjectNatureLand, wordStatesInanimate],
    adverbials: []  
}

let themeEmotion = {
    name: 'themeEmotion',
    root: [emotions],
    mode: [modes],
    locations: [],
    possessors: [wordPronounAll, wordAnimalLand],
    sources: [wordPronounAll],
    goals: [wordPronounAll, wordAnimalLand, wordAnimalSky, wordAnimalWater],
    adverbials: []
}

let themePronoun1P = {
    name: 'themePronoun1P',
    root: [pronouns1P],
    mode: [modes],
    locations: [wordObjectNatureWater, wordObjectNatureLand, wordAnimalLand, wordAnimalSky],
    possessors: [],
    adverbials: [adverbialsTime],
    adjectives: [],
    prepositions: [],
    sources: [wordPronoun2P, wordPronoun3PP, wordPronoun3PS],
    goals: [wordObjectNatureLand, wordObjectNatureWater, wordObjectNatureSky, 
        wordAnimalSky, wordAnimalWater, wordAnimalLand, wordStatesAnimate]
}

let themePronoun1P2P = {
    name: 'themePronoun1P2P',
    root: [pronouns1P2P],
    mode: [modes],
    locations: [wordObjectNatureWater, wordObjectNatureLand, wordAnimalLand, wordAnimalSky],
    possessors: [],
    adverbials: [adverbialsTime],
    adjectives: [],
    prepositions: [],
    sources: [wordPronoun3PP, wordPronoun3PS],
    goals: [wordObjectNatureLand, wordObjectNatureWater, wordObjectNatureSky, 
        wordAnimalSky, wordAnimalWater, wordAnimalLand, wordStatesAnimate]
}

let themePronoun2P = {
    name: 'themePronoun2P',
    root: [pronouns2P],
    mode: [modes],
    locations: [wordObjectNatureWater, wordObjectNatureLand, wordAnimalLand, wordAnimalSky],
    possessors: [],
    adverbials: [adverbialsTime],
    adjectives: [],
    prepositions: [],
    sources: [wordPronoun1P, wordPronoun3PP, wordPronoun3PS],
    goals: [wordObjectNatureLand, wordObjectNatureWater, wordObjectNatureSky, 
        wordAnimalSky, wordAnimalWater, wordAnimalLand, wordStatesAnimate]
}

let themePronoun3PS = {
    name: 'themePronoun3PS',
    root: [pronouns3PS],
    mode: [modes],
    locations: [wordObjectNatureWater, wordObjectNatureLand, wordAnimalLand, wordAnimalSky],
    possessors: [],
    adverbials: [adverbialsTime],
    adjectives: [],
    prepositions: [],
    sources: [wordPronoun1P, wordPronoun1P2P, wordPronoun2P],
    goals: [wordObjectNatureLand, wordObjectNatureWater, wordObjectNatureSky, 
        wordAnimalSky, wordAnimalWater, wordAnimalLand, wordStatesAnimate]
}

let themePronoun3PP = {
    name: 'themePronoun3PP',
    root: [pronouns3PP],
    mode: [modes],
    locations: [wordObjectNatureWater, wordObjectNatureLand, wordAnimalLand, wordAnimalSky],
    possessors: [],
    adverbials: [adverbialsTime],
    adjectives: [],
    prepositions: [],
    sources: [wordPronoun1P, wordPronoun1P2P, wordPronoun2P, wordPronoun3PS],
    goals: [wordObjectNatureLand, wordObjectNatureWater, wordObjectNatureSky, 
        wordAnimalSky, wordAnimalWater, wordAnimalLand, wordStatesAnimate]
}

let themeAnimalLand = {
    name: 'themeAnimalLand',
    root: [animalsLand],
    mode: [modes],
    locations: [wordObjectNatureLand, wordPronounAll],
    possessors: [wordPronounAll],
    sources: [wordPronounAll],
    goals: [wordObjectNatureLand, wordStatesAnimate],
    adverbials: [adverbialsTime]    
}

let themeAnimalSky = {
    name: 'themeAnimalSky',
    root: [animalsSky],
    mode: [modes],
    locations: [wordObjectNatureSky, wordObjectNatureLand, wordObjectNatureWater],
    possessors: [wordPronounAll],
    sources: [wordPronounAll],
    goals: [wordObjectNatureSky, wordStatesAnimate],
    adverbials: [adverbialsTime]
}

let themeAnimalWater = {
    name: 'themeAnimalWater',
    root: [animalsWater],
    mode: [modes],
    locations: [wordObjectNatureWater, wordPronounAll],
    possessors: [wordPronounAll],
    sources: [wordPronounAll],
    goals: [wordObjectNatureWater, wordStatesAnimate],
    adverbials: [adverbialsTime]
}

let themeObjectNatureLand = {
    name: 'themeObjectNatureLand',
    root: [objectsNatureLand],
    mode: [modes],
    locations: [wordObjectNatureLand, wordPronounAll],
    possessors: [wordPronounAll, wordAnimalLand],
    sources: [wordPronounAll],
    goals: [wordObjectNatureLand, wordStatesInanimate],
    adverbials: [adverbialsTime]
}

let themeAction = {
    name: 'themeAction',
    root: [actions],
    mode: [modes],
    adverbials: [adverbialsTime],
    locations: [wordObjectNatureWater, wordObjectNatureWater, wordObjectNatureSky],
    possessors: [],
    adjectives: [],
    prepositions: [],
    sources: [wordPronounAll],
    goals: [wordObjectNatureLand, wordObjectNatureSky, wordObjectNatureWater,
        wordTool, wordAnimalLand, wordAnimalSky, wordAnimalWater]
}

let themeActionLand = {
    name: 'themeActionLand',
    root: [actions],
    mode: [modes],
    adverbials: [adverbialsTime],
    locations: [wordObjectNatureLand],
    possessors: [],
    adjectives: [],
    prepositions: [],
    sources: [wordPronounAll, wordAnimalLand],
    goals: [wordObjectNatureLand, wordObjectNatureWater,
        wordTool, wordAnimalLand, wordAnimalSky, wordAnimalWater]
}
let themeActionSky = {
    name: 'themeActionSky',
    root: [actions],
    mode: [modes],
    adverbials: [adverbialsTime],
    locations: [wordObjectNatureSky],
    possessors: [],
    adjectives: [],
    prepositions: [],
    sources: [wordPronounAll, wordAnimalSky],
    goals: [wordObjectNatureLand, wordObjectNatureWater, wordObjectNatureWater,
        wordTool, wordAnimalLand, wordAnimalSky, wordAnimalWater]
}

let themeActionWater = {
    name: 'themeActionWater',
    root: [actions],
    mode: [modes],
    adverbials: [adverbialsTime],
    locations: [wordObjectNatureWater],
    possessors: [],
    adjectives: [],
    prepositions: [],
    sources: [wordPronounAll, wordAnimalWater],
    goals: [wordObjectNatureWater, wordTool, wordAnimalWater]
}

/* ========== SENTENCE TYPES ========== */

// Sentence types determine which types of words can serve as Themes.
// It has a 'theme' attribute, which lists valid Theme Objects in an array.

 let sentenceAction = {
    name: 'sentenceAction',
    themes: [themeAction, themeActionLand, themeActionSky, themeActionWater]
}

 let sentenceMovement = {
    name: 'sentenceMovement',
    themes: [themePronoun1P, themePronoun1P2P, themePronoun2P, themePronoun3PS, themePronoun3PP, themeAnimalLand, 
        themeAnimalSky, themeAnimalWater]
}

let sentenceChange = {
    name: 'sentenceChange',
    themes: [themeObjectNatureLand, themeTool]
}

let sentencePossession = {
    name: 'sentencePossession',
    themes: [themeObjectNatureLand, themeTool]
}

let sentenceLocation = {
    name: 'sentenceLocation',
    themes: [themePronoun1P, themePronoun1P2P, themePronoun2P, themePronoun3PS, themePronoun3PP, themeAnimalLand, 
        themeAnimalSky, themeAnimalWater, themeObjectNatureLand, themeTool]
}

/* ========== FUNCTIONS ========== */

/*
DOES:       Helper Function. Returns true or false at random.
PARAMS:     none
RETURNS:    bool
*/
function trueFalse() {
     zeroOne = Math.floor(Math.random() * 2);
     return (zeroOne === 1) ? true : false;
}

/*
DOES:       Helper function. Takes in any number between 0 and 100 as a parameter; returns 'true' at that
            frequency (i.e. if n = 40, function will return true at 40% chance). Any number > 100 will default
            to 100, and any number < 0 will default to 0.
PARAMS:     n (any real number between 0 and 100)
RETURNS:    bool (true n% of the time)
*/
function xPercent(n) {
    if (n < 0) {
        n = 0;
    } else if (n > 100) {
        n = 100;
    }
    let random100 = Math.random() * 100;
    return n >= random100;
}

/*
DOES:       Picks a random sentence type.
PARAMS:     none
RETURNS:    string
*/
function pickSentenceType(sentenceType) {
    randomNumber = Math.random() * 10;
    if (randomNumber <= 2.5) {
        sentenceType = 'action';
    } else if (randomNumber <= 5) {
        sentenceType = 'movement'; 
    } else if (randomNumber <= 7.5) {
        sentenceType = 'change';
    } else if (randomNumber <= 8.75) {
        sentenceType = 'possession';
    } else if (randomNumber <= 10) {
        sentenceType = 'location';
    }

    //console.log('SENTENCE TYPE: ' + sentenceType);
    
    return sentenceType;
}

/*
DOES:       Picks a random Theme Object (i.e. a broad semantic category) appropriate to the sentence type.
PARAMS:     sentenceType (string)
RETURNS:    Theme Object
*/
function pickThemeType(sentenceType) {
    let randomTheme;
    if (sentenceType == 'action') {
        randomTheme = Math.floor(Math.random() * sentenceAction.themes.length);
        return sentenceAction.themes[randomTheme];
    } else if (sentenceType === 'movement') {
        randomTheme = Math.floor(Math.random() * sentenceMovement.themes.length);
        return sentenceMovement.themes[randomTheme];
    } else if (sentenceType === 'location') {
        randomTheme = Math.floor(Math.random() * sentenceLocation.themes.length);
        return sentenceLocation.themes[randomTheme];
    } else if (sentenceType === 'possession') {
        randomTheme = Math.floor(Math.random() * sentencePossession.themes.length);
        return sentencePossession.themes[randomTheme];
    } else if (sentenceType === 'change') {
        randomTheme = Math.floor(Math.random() * sentenceChange.themes.length);
        return sentenceChange.themes[randomTheme];    
    }
}

/*
DOES:       Picks a random semantic vocabulary list to serve as a Sentence's SOURCE (i.e. the originator of an action),
            given a designated THEME.
PARAMS:     themeType (Theme Object)
RETURNS:    array
*/
function pickSourceType(themeType) {
    let maxSource = themeType.sources.length;
    let randomSource = Math.floor(Math.random() * maxSource);
    return themeType.sources[randomSource];
}

/*
DOES:       Picks a random semantic vocabulary list to serve as a Sentence's GOAL (i.e. receiver of an action),
            given a designated THEME.
PARAMS:     themeType (Theme Object)
RETURNS:    array
*/
function pickGoalType(themeType) {
    let maxGoal = themeType.goals.length;
    let randomGoal = Math.floor(Math.random() * maxGoal);
    return themeType.goals[randomGoal];
}

/*
DOES:       Returns a modal word to be added to the beginning of a Theme.
PARAMS:     themeType (Theme Object)
RETURNS:    string
*/
function addMode(wordType) {
    let maxMode = wordType.mode.length;
    let randomMode = Math.floor(Math.random() * maxMode);
    let maxArray = wordType.mode[randomMode].length;
    let randomArray = Math.floor(Math.random() * maxArray);
    let word = wordType.mode[randomMode][randomArray];
    // Check that this array location exists
    if (randomArray === undefined) {
        return '';
    } else {
        return word;
    }
}

/*
DOES:       Adds a mode to a theme under certain conditions: 40% of the time if given an Action sentence,
            or 100% of the time if a specific Mode is provided.
PARAMS:     wordType (Theme Object), senType (string), giveTheme (string), giveMode (string - OPTIONAL)
RETURNS:    string - theme word combined with Mode word
*/
function pickMode(wordType, senType, giveTheme, giveMode = undefined) {
    let word = giveTheme;
    let mode = '';

    // Adds mode 40% of the time to an Action Sentence, or 100% of the time if mode is given.
    if ((senType === 'action' && xPercent(40)) || giveMode !== undefined) {
        let protoMode;
        if (giveMode !== undefined) {
            protoMode = giveMode;
        } else {
            protoMode = addMode(wordType);
        }
        if (word[0] === 'k') {
            // Change 'ka' to 'ya' if root begins with 'k'
            let adjustedProtoMode = protoMode.substring(0, protoMode.length - 2) + 'ya';
            mode = adjustedProtoMode;
        } else if ('mnptfsxlrwy'.includes(word[0])) {
            // Omit final 'a' if root begins with: mnptfsxlrwy
            let adjustedProtoMode = protoMode.substring(0, protoMode.length - 1);
            mode = adjustedProtoMode;
        } else {
            // Send the full mode along for combination
            mode = protoMode;
        }
    }

    word = mode + word;

    if (word[0] === 'u') {
        word = 'w' + word;
    } else {
        word = 'o' + word;
    }

    return word;
}


/*
DOES:       Picks a random but specific word to stand in as the Sentence's THEME.
PARAMS:     themeType (Theme Object), senType (string)
RETURNS:    string - a random word with theme particle appended
*/
function pickThemeWord(wordType, senType = undefined, giveMode = undefined, giveTheme = undefined) {
    let word = '';
    let mode = '';

    if (giveTheme !== undefined) {
        word = giveTheme;
    } else {
        let maxRoot = wordType.root.length;
        let randomRoot = Math.floor(Math.random() * maxRoot);
        let maxArray = wordType.root[randomRoot].length;
        let randomArray = Math.floor(Math.random() * maxArray);
        word = wordType.root[randomRoot][randomArray];
    }

    return word;
}

/*
DOES:       Picks a random but specific word to stand in as the Sentence's SOURCE.
PARAMS:     themeType (Theme Object), senType (string).
RETURNS:    string - a random word with source particle appended.
*/
function pickSourceWord(wordType, senType) {
    let maxRoot = wordType.root.length;
    let randomRoot = Math.floor(Math.random() * maxRoot);
    let maxArray = wordType.root[randomRoot].length;
    let randomArray = Math.floor(Math.random() * maxArray);
    let word = wordType.root[randomRoot][randomArray];
    if (senType === 'change' || senType === 'movement') {
        if (word[0] === 'p') {
            word = 'wa' + word;
        } else {
            word = 'pa' + word;
        }
    }
    return word;
}

/*
DOES:       Picks a random but specific word to stand in as the Sentence's GOAL.
PARAMS:     themeType (Theme Object), senType (string)
RETURNS:    string - a random word with goal particle appended
*/
function pickGoalWord(wordType, senType) {
    let maxRoot = wordType.root.length;
    let randomRoot = Math.floor(Math.random() * maxRoot);
    let maxArray = wordType.root[randomRoot].length;
    let randomArray = Math.floor(Math.random() * maxArray);
    let word = wordType.root[randomRoot][randomArray];
    if (word[0] === 'k') {
        return 'ya' + word;
    } else {
        return 'ka' + word;
    }
}

/*
DOES:       Picks an adverbial at random. Will append adverbial + particle 33% of the time.
PARAMS:     wordType (Theme Object), senType (string)
RETURNS:    string - a random adverbial phrase with adverbial particle OR empty string
*/
function pickAdverb(wordType, senType) {
    if (wordType.adverbials.length === 0) {
        //console.log('ADVERB: none');
        return '';
    }
    let word = '';
    //let randomTo10 = Math.random() * 10;
    if (xPercent(33)) {
        let maxRoot = wordType.adverbials.length;
        let randomRoot = Math.floor(Math.random() * maxRoot);
        let maxArray = wordType.adverbials[randomRoot].length;
        let randomArray = Math.floor(Math.random() * maxArray);
        word = wordType.adverbials[randomRoot][randomArray];
    }
    if (word !== '') {
        return ' a' + word;
    } else {
        return word;
    }
}

/*
DOES:       Picks a conjunction at random.
PARAMS:     None.
RETURNS:    String; a conjunction.
*/
function pickConjunction() {
    let maxRoot = wordConjunction.root.length;
    let randomRoot = Math.floor(Math.random() * maxRoot);
    let maxArray = wordConjunction.root[randomRoot].length;
    let randomArray = Math.floor(Math.random() * maxArray);
    let word = wordConjunction.root[randomRoot][randomArray];
    return word;
}

/*
DOES:       Picks a random but specific word to stand in as the Sentence's POSSESSOR.
PARAMS:     themeType (Theme Object), senType (string)
RETURNS:    string - a random word with particle appended
*/
function pickPossessor(wordType, senType) {
    let maxPossessor = wordType.possessors.length;
    let randomPossessor = Math.floor(Math.random() * maxPossessor);
    let wordPossessor = wordType.possessors[randomPossessor];

    let maxRoot = wordPossessor.root.length;
    let randomRoot = Math.floor(Math.random() * maxRoot);
    let maxArray = wordPossessor.root[randomRoot].length;
    let randomArray = Math.floor(Math.random() * maxArray);
    let word = wordPossessor.root[randomRoot][randomArray];

    //console.log('POSESSOR WORD: ' + word);

    if (word !== undefined) {
        return 'a' + word;
    } else {
        return '';
    }
}

/*
DOES:       Picks a random but specific word to stand in as the Sentence's LOCATION.
PARAMS:     themeType (Theme Object), senType (string)
RETURNS:    string - a random word with particle appended
*/
function pickLocation(wordType, senType) {
    let maxLocation = wordType.locations.length;
    let randomLocation = Math.floor(Math.random() * maxLocation);
    let wordLocation = wordType.locations[randomLocation];

    let maxRoot = wordLocation.root.length;
    let randomRoot = Math.floor(Math.random() * maxRoot);
    let maxArray = wordLocation.root[randomRoot].length;
    let randomArray = Math.floor(Math.random() * maxArray);
    let word = wordLocation.root[randomRoot][randomArray];

    //console.log('LOCATION WORD: ' + word);

    if (word !== undefined) {
        return 'a' + word;
    } else {
        return '';
    }
}

/*
DOES:       If Theme and Goal are the same noun, this function adds demonstrative pronouns ('this'/'that')
            to differentiate them. If Theme and Goal are different, it does nothing.
PARAMS:     None.
RETURNS:    None; action is performed on globally scoped 'theme' and 'goal' if necessary.
*/
function checkSameThemeGoal(theme, goal) {
    let themeNoArticle = theme.substring(1);
    let goalNoArticle = goal.substring(2);
    if (themeNoArticle !== goalNoArticle) {
        // Do nothing; prevents if-statement from further evaluation.
    }
    else if (themeNoArticle === goalNoArticle && xPercent(50)) {
        theme = theme + ' ni';
        goal = goal + ' nu';
    } else {
        theme = theme + ' nu';
        goal = goal + ' ni';
    }
}

/*
DOES:       Constructs a sentence by picking a Theme at random (Theme Object), then picking a random but logical
            Source and Goal based on the chosen Theme, with optional Adjectives and Adverbials.
PARAMS:     sentenceType (string), subordinate (bool)
            giveTheme (string - OPTIONAL), giveSource (string - OPTIONAL), giveLocation (string - OPT.),
            givePossessor (string - OPT.), giveGoal (string - OPTIONAL), giveMode (string - OPTIONAL),
            giveThemeType (Theme Object - OPTIONAL), suppressAdverb (bool - OPTIONAL);
RETURNS:    string - a concatenation of all of the individual sentence part strings
*/
function buildSentence(sentenceType, subordinate, giveTheme, giveSource, giveLocation, givePossessor, giveGoal,
    giveMode, giveThemeType, suppressAdverb) {
    /* === Initializing  constituent parts of SENTENCE. === */
    let source = '';
    let theme = '';
    let goal = '';
    let adverb = '';
    let sentence = '';
    let mode = '';
    let location;
    let possessor;
    let themeType;

    // Determine Theme type
    if (giveThemeType !== undefined) {
        themeType = giveThemeType;
    } else {
        themeType = pickThemeType(sentenceType);
    }
    // Determine Source type
    sourceType = pickSourceType(themeType);
    // Determine Goal type
    goalType = pickGoalType(themeType);
    // Determine Theme word   
    themeNoMode = pickThemeWord(themeType, sentenceType, giveMode, giveTheme);
    // Add Mode to Theme word
    theme = pickMode(themeType, sentenceType, themeNoMode, giveMode);
    // Determine Source word
    if (giveSource !== undefined) {
        source = giveSource;
    } else {
        source = pickSourceWord(sourceType, sentenceType);
    }
    // Determine Goal word
    if (giveGoal !== undefined) {
        goal = giveGoal;
    } else {
        goal = pickGoalWord(goalType, sentenceType);
    }
    // Determine adverbial (n% chance of use)
    if (suppressAdverb) {
        adverb = '';
    } else {
        adverb = pickAdverb(themeType, sentenceType);
    }
    // Ensure that Theme and Goal are not identical
        //console.log('SENTENCE: ' + sentenceType + ' | THEME: ' + theme + ' | GOAL: ' + goal);
    checkSameThemeGoal(theme, goal);

    /* === DETERMINE SYNTAX === */
    /* Put Parts in correct order based on sentenceType. */
    if (sentenceType === 'action') {
        sentence = `${theme} ${source}${adverb} ${goal}`;
    } else if (sentenceType === 'movement') {
        // Add a Source 50% of the time 
        if (xPercent(50)) {
            source = source + ' ';
        } else {
            source = ''; // Delete source word
        }
        sentence = `${theme}${adverb} ${source}${goal}`;
    } else if (sentenceType === 'change') {
        if (subordinate) {
            sentence = `${theme} ${source} ${goal}`;
        } else {
            sentence = `${source} ${theme} ${goal}`;
        }
    } else if (sentenceType === 'location') {
        if (giveLocation != undefined) {
            location = giveLocation;
        } else {
            location = pickLocation(themeType);
        }
        sentence = `${theme}${adverb} ${location}`;
    } else if (sentenceType === 'possession') {
        if (givePossessor != undefined) {
            possessor = givePossessor;
        } else {
            possessor = pickPossessor(themeType);
        }
        sentence = `${theme} ${possessor}`;
    }

    /* === ADD SUBORDINATE CLAUSE === */
    /* Optionally adds subordinate clause. */
    if (subordinate) {
        // Do not recurse indefinitely.
        return sentence;
    } else if (xPercent(30)) {
        // Subordinate clause optional, 30% chance *UPDATE LATER*
        let conjunction = pickConjunction();
        //conjunction = 'kaxu';
        //console.log('CONJUNCTION: ' + conjunction);
        let sentenceTypeSub;
        let sentenceSub;

        // Evaluate Conjunction:
            // Pick sentence type based on Conjunction
            // Feed in values to buildSentence based on Conjunction
        // buildSentence(sentenceType, subordinate, giveTheme, giveSource, giveGoal, giveLocation, givePossessor,
            // giveMode, giveThemeType, suppressAdverb)
        if (conjunction === 'kaxu') {
            if (sentenceType === 'movement') {
                sentenceTypeSub = 'action';
                sentenceSub = buildSentence(sentenceTypeSub, true, undefined, themeNoMode, undefined, undefined,
                    undefined, 'peka', undefined, false);
            } else if (sentenceType === 'action') {
                sentenceTypeSub = 'possession';
                sentenceSub = buildSentence(sentenceTypeSub, true, undefined, undefined, undefined, undefined,
                    source, 'peka', themeEmotion, false);
            } else if (sentenceType === 'change') {
                sentenceTypeSub = 'possession';
                sentenceSub = buildSentence(sentenceTypeSub, true, undefined, undefined, undefined, undefined,
                    undefined, 'peka', themeEmotion, false);
            } else if (sentenceType === 'possession') {
                sentenceTypeSub = 'movement';
                sentenceSub = buildSentence(sentenceTypeSub, true, themeNoMode, undefined, undefined, undefined,
                    possessor, 'peka', undefined, false);
            } else if (sentenceType === 'location') {
                sentenceTypeSub = 'possession';
                sentenceSub = buildSentence(sentenceTypeSub, true, undefined, undefined, undefined, undefined,
                    undefined, 'peka', themeEmotion, false);
            }
        /*
        } else if (conjunction === 'paxi') {
            sentenceTypeSub = ''
            sentenceSub = buildSentence(sentenceTypeSub, true);
        } else if (conjunction === 'kwi') {
            sentenceTypeSub = ''
            sentenceSub = buildSentence(sentenceTypeSub, true);
        } else if (conjunction === 'kyu') {
            sentenceTypeSub = ''
            sentenceSub = buildSentence(sentenceTypeSub, true);      
        */     
        } else if (conjunction === 'awi' || conjunction === 'ayu' || conjunction === 'asu') {
            // Suppress adverbials
            sentenceTypeSub = pickSentenceType();
            sentenceSub = buildSentence(sentenceTypeSub, true, undefined, undefined, undefined, undefined,
                undefined, undefined, undefined, true);
        } else {
            sentenceTypeSub = pickSentenceType();
            sentenceSub = buildSentence(sentenceTypeSub, true);
        }

        // Add subordinate clause to main clause.
        sentence = sentence + ' ' + conjunction + ' ' + sentenceSub;
    }

    // Final return
    return sentence;
}

/* ========== MAIN PROGRAM ========== */
function main() {
    // Create n sentences (currently 8)
    for (let i = 0; i < 10; i++) {
        let sentenceTypeMain = pickSentenceType();
        let sentenceMain = buildSentence(sentenceTypeMain, false);
        console.log(sentenceMain);
    }
}

main();