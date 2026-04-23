
m1 = {
  "a": "&#x10300;",  // OLD ITALIC LETTER A 
  "b": "&#x1041A;",  // DESERET CAPITAL LETTER VEE 
  "c": "&#x1103;",   // HANGUL CHOSEONG TIKEUT
  "d": "&#x1095;",   // MYANMAR SHAN DIGIT FIVE
  "e": "&#x0F5B;",   // TIBETAN LETTER DZA
  "f": "&#x0CEF;",   // KANNADA DIGIT NINE
  "g": "&#x0D6D;",   // MALAYALAM DIGIT SEVEN
  "h": "&#x0A2E;",   // GURMUKHI LETTER MA
  "i": "&#x1109;",   // HANGUL CHOSEONG SIOS
  "j": "&#x10408;",  // DESERET CAPITAL LETTER SHORT A 
  "k": "&#x051E;",   // CYRILLIC CAPITAL LETTER ALEUT KA 
  "l": "&#x10539;",  // CAUCASIAN ALBANIAN LETTER CHA 
  "m": "&#x1328;",   // ETHIOPIC SYLLABLE CHA
  "n": "&#x0E17;",   // THAI CHARACTER THO THAHAN 
  "o": "&#x07DB;",   // NKO LETTER SA
  "p": "&#x10502;",  // ELBASAN LETTER CE
  "q": "&#x09ED;",   // BENGALI DIGIT SEVEN
  "r": "&#x053B;",   // ARMENIAN CAPITAL LETTER INI 
  "s": "&#x0D17;",   // MALAYALAM LETTER GA 
  "t": "&#x10B5;",   // GEORGIAN CAPITAL LETTER KHAR
  "u": "&#x053F;",   // ARMENIAN CAPITAL LETTER KEN
  "v": "&#x13C9;",   // CHEROKEE LETTER QUO
  "w": "&#x0E1F;",   // THAI CHARACTER FO FAN 
  "x": "&#x0514;",   // CYRILLIC CAPITAL LETTER LHA
  "y": "&#x080A;",   // SAMARITAN LETTER KAAF
  "z": "&#x10350;"   // OLD PERMIC LETTER AN
}

m2 = {
  "a": "&#x1D70;",   // LATIN SMALL LETTER N WITH MIDDLE TILDE
  "b": "&#x266D;",   // MUSIC FLAT SIGN 
  "c": "&#x122D;",   // ETHIOPIC SYLLABLE RE
  "d": "&#x1D1CE;",  // MUSICAL SYMBOL TEMPUS IMPERFECTUM CUM PROLATIONE IMPERFECTA DIMINUTION-3
  "e": "&#x096C;",   // DEVANAGARI DIGIT SIX
  "f": "&#x10346;",  // GOTHIC LETTER FAIHU
  "g": "&#x1B9D;",   // SUNDANESE LETTER WA
  "h": "&#x10AC;",   // GEORGIAN CAPITAL LETTER NAR
  "i": "&#x10382;",  // UGARITIC LETTER GAMLA
  "j": "&#x1D4A5;",  // MATHEMATICAL SCRIPT CAPITAL J 
  "k": "&#x20AD;",   // KIP SIGN 
  "l": "&#x1D4DB;",  // MATHEMATICAL BOLD SCRIPT CAPITAL L 
  "m": "&#x0BF1;",   // TAMIL NUMBER ONE HUNDRED
  "n": "&#x0E81;",   // LAO LETTER KO
  "o": "&#x0C20;",   // TELUGU LETTER TTHA
  "p": "&#xA6E0;",   // BAMUM LETTER MBEN
  "q": "&#x1007;",   // MYANMAR LETTER JA
  "r": "&#x10342;",  // GOTHIC LETTER RAIDA
  "s": "&#x13A6;",   // CHEROKEE LETTER GA
  "t": "&#x1D366;",  // COUNTING ROD UNIT DIGIT SEVEN
  "u": "&#x07CE;",   // NKO LETTER U 
  "v": "&#x2A54;",   // DOUBLE LOGICAL OR
  "w": "&#x0E9C;",   // LAO LETTER PHO SUNG
  "x": "&#x0CF1;",   // KANNADA SIGN JIHVAMULIYA
  "y": "&#x10284;",  // LYCIAN LETTER G
  "z": "&#x2F04;"    // ANGXI RADICAL SECOND
}

m3 = {
  "a": "&#x10001;",  // LINEAR B SYLLABLE B038 E
  "b": "&#x2CD2;",   // COPTIC CAPITAL LETTER OLD COPTIC HEI 
  "c": "&#x1573;",   // CANADIAN SYLLABICS TYA
  "d": "&#x1D507;",  // MATHEMATICAL FRAKTUR CAPITAL D
  "e": "&#x0B3D;",   // TIBETAN LETTER DZA
  "f": "&#x2A0D;",   // FINITE PART INTEGRAL
  "g": "&#x01E4;",   // LATIN CAPITAL LETTER G WITH STROKE
  "h": "&#x12E0;",   // ETHIOPIC SYLLABLE ZHA
  "i": "&#x1703;",   // TAGALOG LETTER KA
  "j": "&#x3057;",   // HIRAGANA LETTER SI
  "k": "&#xA018;",   // CHEROKEE SMALL LETTER TSI
  "l": "&#x2827;",   // BRAILLE PATTERN DOTS-1236
  "m": "&#x0D28;",   // MALAYALAM LETTER NA
  "n": "&#x12AC;",   // ETHIOPIC SYLLABLE KEE
  "o": "&#x0DA7;",   // SINHALA LETTER ALPAPRAANA TTAYANNA
  "p": "&#xAA6D;",   // MYANMAR LETTER KHAMTI HA
  "q": "&#x10E2;",   // GEORGIAN LETTER TAR
  "r": "&#x053B;",   // ARMENIAN CAPITAL LETTER INI
  "s": "&#x1511;",   // CANADIAN SYLLABICS SHI
  "t": "&#x2020;",   // DAGGER
  "u": "&#x00B5;",   // MICRO SIGN 
  "v": "&#xAA9C;",   // TAI VIET LETTER LOW PO
  "w": "&#x0429;",   // CYRILLIC CAPITAL LETTER SHCHA 
  "x": "&#x102C4;",  // CARIAN LETTER NG
  "y": "&#x03AB;",   // GREEK CAPITAL LETTER UPSILON WITH DIALYTIKA 
  "z": "&#xA903;"    // KAYAH LI DIGIT THREE 
}


function to_struse(s1) {
  s2 = ""
  for (const char of s1) {
      c1 = char.toLowerCase();
      if (c1 in m1) {
        const rn = Math.floor(Math.random() * 3) + 1;
        if (rn == 1) {
          s2 += m1[c1];
        } else if (rn == 2) {
          s2 += m2[c1];
        } else {
          s2 += m3[c1];
        }
      } else {
        if (char == " ") {
          s2 += "&ensp; "
        } else {
          s2 += c1;
        }
      }
  }
  return s2
}

function displayResult() {
  const inputStr = document.getElementById("userInput").value;
  
  const result = to_struse(inputStr);
  console.log(result);
  
  document.getElementById("outputArea").innerHTML = result;
}


const form = document.getElementById('userForm');
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Stops the page from reloading
  displayResult()
});


showSeveral = false
if (showSeveral) {

  // s1 = "hola mundo!"
  // s1 = "short for abstruse"
  // s1 = "abcdefghijklmnopqrstuvwxyz"
  // s1 = "unicode inter-alphabet substitutions"
  // s1 = "struse"
  // s1 = "Enter text:"
  // s1 = "Submit"
  // s1 = "har"
  // s1 = "yeeha"
  s1 = "rhymes with juice"

  for (let i = 0; i < 4; i++) {
    let t1 = to_struse(s1)
    document.writeln("<b>" + t1 + "</b>")
    document.writeln("<pre>" + t1.replace(/&/g, "&amp;") + "</pre><p>")
  }
}

