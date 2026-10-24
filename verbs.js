/* Verb forms (過去式 / 過去分詞) for the verb-forms drill.
   VerbForms.forms(word) -> { past: [..], pp: [..] } or null when the entry is not a verb we can drill.
   The first item of each list is the "main" answer shown to students; the others are also accepted. */
'use strict';
(function () {
  const IRR = {
    awake: [['awoke'], ['awoken']], beat: [['beat'], ['beaten']], bless: [['blessed', 'blest'], ['blessed', 'blest']],
    broadcast: [['broadcast', 'broadcasted'], ['broadcast', 'broadcasted']], burst: [['burst'], ['burst']],
    choose: [['chose'], ['chosen']], deal: [['dealt'], ['dealt']], fit: [['fitted', 'fit'], ['fitted', 'fit']],
    forgive: [['forgave'], ['forgiven']], hang: [['hung', 'hanged'], ['hung', 'hanged']], lay: [['laid'], ['laid']],
    quit: [['quit', 'quitted'], ['quit', 'quitted']], rise: [['rose'], ['risen']], seek: [['sought'], ['sought']],
    set: [['set'], ['set']], shake: [['shook'], ['shaken']], shine: [['shone', 'shined'], ['shone', 'shined']],
    shot: [['shot'], ['shot']], shut: [['shut'], ['shut']], sink: [['sank'], ['sunk']], slide: [['slid'], ['slid']],
    speed: [['sped', 'speeded'], ['sped', 'speeded']], spread: [['spread'], ['spread']], steal: [['stole'], ['stolen']],
    stick: [['stuck'], ['stuck']], strike: [['struck'], ['struck', 'stricken']], sweep: [['swept'], ['swept']],
    swing: [['swung'], ['swung']], tear: [['tore'], ['torn']], throw: [['threw'], ['thrown']],
    underlie: [['underlay'], ['underlain']], prove: [['proved'], ['proved', 'proven']],
    // common irregulars not in the current word list (kept so future words work too)
    bring: [['brought'], ['brought']], build: [['built'], ['built']], buy: [['bought'], ['bought']], catch: [['caught'], ['caught']],
    come: [['came'], ['come']], cut: [['cut'], ['cut']], do: [['did'], ['done']], draw: [['drew'], ['drawn']], drink: [['drank'], ['drunk']],
    drive: [['drove'], ['driven']], eat: [['ate'], ['eaten']], fall: [['fell'], ['fallen']], feel: [['felt'], ['felt']], find: [['found'], ['found']],
    fly: [['flew'], ['flown']], forget: [['forgot'], ['forgotten', 'forgot']], get: [['got'], ['gotten', 'got']], give: [['gave'], ['given']],
    go: [['went'], ['gone']], grow: [['grew'], ['grown']], have: [['had'], ['had']], hear: [['heard'], ['heard']], hide: [['hid'], ['hidden']],
    hit: [['hit'], ['hit']], hold: [['held'], ['held']], hurt: [['hurt'], ['hurt']], keep: [['kept'], ['kept']], know: [['knew'], ['known']],
    lead: [['led'], ['led']], leave: [['left'], ['left']], lend: [['lent'], ['lent']], let: [['let'], ['let']], lose: [['lost'], ['lost']],
    make: [['made'], ['made']], mean: [['meant'], ['meant']], meet: [['met'], ['met']], pay: [['paid'], ['paid']], put: [['put'], ['put']],
    read: [['read'], ['read']], ride: [['rode'], ['ridden']], ring: [['rang'], ['rung']], run: [['ran'], ['run']], say: [['said'], ['said']],
    see: [['saw'], ['seen']], sell: [['sold'], ['sold']], send: [['sent'], ['sent']], shoot: [['shot'], ['shot']], show: [['showed'], ['shown', 'showed']],
    sing: [['sang'], ['sung']], sit: [['sat'], ['sat']], sleep: [['slept'], ['slept']], speak: [['spoke'], ['spoken']], spend: [['spent'], ['spent']],
    stand: [['stood'], ['stood']], swim: [['swam'], ['swum']], take: [['took'], ['taken']], teach: [['taught'], ['taught']], tell: [['told'], ['told']],
    think: [['thought'], ['thought']], understand: [['understood'], ['understood']], wake: [['woke'], ['woken']], wear: [['wore'], ['worn']],
    win: [['won'], ['won']], write: [['wrote'], ['written']],
  };
  const DOUBLE = new Set(['admit', 'omit', 'occur', 'prefer', 'regret', 'control', 'refer', 'permit', 'commit', 'submit', 'equip']);
  const BRITISH_L = new Set(['travel', 'cancel', 'total', 'equal', 'label', 'model']); // American -> single l, British -> ll
  const SKIP = new Set(['manager']);           // data entry tagged as verb by mistake
  const isVerbPos = pos => /(^|\/)(v|vt|vi)\./.test(pos || '');
  const primaryVerb = pos => /^(v|vt|vi)\./.test(pos || '');

  function regularEd(b) {
    if (/[^aeiou]y$/.test(b)) return [b.slice(0, -1) + 'ied'];
    if (/e$/.test(b)) return [b + 'd'];
    if (BRITISH_L.has(b)) return [b + 'ed', b + 'led'];
    const vowelGroups = (b.match(/[aeiou]+/g) || []).length;
    if (/[^aeiou][aeiou][^aeiouwxy]$/.test(b) && (vowelGroups === 1 || DOUBLE.has(b))) return [b + b.slice(-1) + 'ed'];
    return [b + 'ed'];
  }
  function forms(w) {
    if (!w || !isVerbPos(w.pos)) return null;
    const base = String(w.w || '').split('/')[0].trim().toLowerCase();
    if (!/^[a-z]+$/.test(base) || SKIP.has(base)) return null;     // phrases / odd entries are not drilled
    if (IRR[base]) { if (!primaryVerb(w.pos) && !(base in IRR)) return null; return { base, irregular: true, past: IRR[base][0].slice(), pp: IRR[base][1].slice() }; }
    if (!primaryVerb(w.pos)) return null;                              // mostly-noun words (fog, thunder...) are skipped
    const ed = regularEd(base); return { base, irregular: false, past: ed, pp: ed.slice() };
  }
  window.VerbForms = { forms };
})();
