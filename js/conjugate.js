/* Conjugation engine: builds full tables for the verbs in data/verbs.js. */
(function (SL) {
  const PERSONS = ['yo', 'tú', 'él / ella / usted', 'nosotros', 'vosotros', 'ellos / ellas / ustedes'];

  // `unlock` = the unit that teaches the tense; the trainer offers it once that unit is complete.
  const TENSES = [
    { id: 'presente', label: 'Present', es: 'Presente', unlock: 'u6' },
    { id: 'preterito', label: 'Preterite', es: 'Pretérito indefinido', unlock: 'u18' },
    { id: 'imperfecto', label: 'Imperfect', es: 'Pretérito imperfecto', unlock: 'u20' },
    { id: 'futuro', label: 'Future', es: 'Futuro simple', unlock: 'u24' },
    { id: 'condicional', label: 'Conditional', es: 'Condicional', unlock: 'u24' },
    { id: 'perfecto', label: 'Present perfect', es: 'Pretérito perfecto', unlock: 'u25' },
    { id: 'subjuntivo', label: 'Present subjunctive', es: 'Presente de subjuntivo', unlock: 'u27' },
  ];

  const END = {
    presente: { ar: ['o', 'as', 'a', 'amos', 'áis', 'an'], er: ['o', 'es', 'e', 'emos', 'éis', 'en'], ir: ['o', 'es', 'e', 'imos', 'ís', 'en'] },
    preterito: { ar: ['é', 'aste', 'ó', 'amos', 'asteis', 'aron'], er: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'] },
    imperfecto: { ar: ['aba', 'abas', 'aba', 'ábamos', 'abais', 'aban'], er: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'] },
    futuro: ['é', 'ás', 'á', 'emos', 'éis', 'án'],
    condicional: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'],
    subjuntivo: { ar: ['e', 'es', 'e', 'emos', 'éis', 'en'], er: ['a', 'as', 'a', 'amos', 'áis', 'an'] },
    strong: ['e', 'iste', 'o', 'imos', 'isteis', 'ieron'],
  };
  const HABER = ['he', 'has', 'ha', 'hemos', 'habéis', 'han'];

  function cls(inf) {
    const e = inf.slice(-2);
    return e === 'ír' ? 'ir' : e;
  }
  const stemOf = (inf) => inf.slice(0, -2);

  // c→qu, g→gu, z→c before e/é (buscar → busqué, llegar → llegue, empezar → empiece)
  function join(stem, ending, c) {
    if (c === 'ar' && /^[eé]/.test(ending)) {
      if (stem.endsWith('c')) stem = stem.slice(0, -1) + 'qu';
      else if (stem.endsWith('g')) stem = stem.slice(0, -1) + 'gu';
      else if (stem.endsWith('z')) stem = stem.slice(0, -1) + 'c';
    }
    return stem + ending;
  }

  function replaceLast(str, from, to) {
    const i = str.lastIndexOf(from);
    return i < 0 ? null : str.slice(0, i) + to + str.slice(i + 1);
  }

  // Boot-verb change: e→ie, o→ue (jugar: u→ue), e→i
  function bootStem(stem, type) {
    if (type === 'ie') return replaceLast(stem, 'e', 'ie');
    if (type === 'i') return replaceLast(stem, 'e', 'i');
    if (type === 'ue') return replaceLast(stem, 'o', 'ue') || replaceLast(stem, 'u', 'ue');
    return stem;
  }
  // -ir stem changers in 3rd-person preterite & nos/vos subjunctive: e→i, o→u
  function narrowStem(stem) {
    return replaceLast(stem, 'e', 'i') || replaceLast(stem, 'o', 'u');
  }

  function presente(v) {
    if (v.pres) return v.pres.slice();
    const c = cls(v.inf), s = stemOf(v.inf);
    const out = END.presente[c].map((e, i) => {
      const boot = v.stem && i !== 3 && i !== 4;
      return (boot ? bootStem(s, v.stem) : s) + e;
    });
    if (v.yo) out[0] = v.yo;
    return out;
  }

  function preterito(v) {
    if (v.pret) return v.pret.slice();
    if (v.pretStem) {
      return END.strong.map((e) => {
        if (e === 'ieron' && v.pretStem.endsWith('j')) e = 'eron';
        return v.pretStem + e;
      });
    }
    const c = cls(v.inf), s = stemOf(v.inf);
    const ends = c === 'ar' ? END.preterito.ar : END.preterito.er;
    return ends.map((e, i) => {
      let st = s;
      if (c === 'ir' && v.stem && (i === 2 || i === 5)) st = narrowStem(s);
      return join(st, e, c);
    });
  }

  function imperfecto(v) {
    if (v.imp) return v.imp.slice();
    const c = cls(v.inf), s = stemOf(v.inf);
    return (c === 'ar' ? END.imperfecto.ar : END.imperfecto.er).map((e) => s + e);
  }

  const futStem = (v) => v.fut || v.inf;
  const futuro = (v) => END.futuro.map((e) => futStem(v) + e);
  const condicional = (v) => END.condicional.map((e) => futStem(v) + e);

  function participle(v) {
    if (v.part) return v.part;
    return stemOf(v.inf) + (cls(v.inf) === 'ar' ? 'ado' : 'ido');
  }
  const perfecto = (v) => HABER.map((h) => h + ' ' + participle(v));

  function subjuntivo(v) {
    if (v.subj) return v.subj.slice();
    const c = cls(v.inf);
    const ends = c === 'ar' ? END.subjuntivo.ar : END.subjuntivo.er;
    const yoStem = presente(v)[0].replace(/o$/, '');
    return ends.map((e, i) => {
      let st = yoStem;
      if (v.stem && (i === 3 || i === 4)) {
        st = stemOf(v.inf);
        if (c === 'ir') st = narrowStem(st);
      }
      return join(st, e, c);
    });
  }

  const FN = { presente, preterito, imperfecto, futuro, condicional, perfecto, subjuntivo };

  function findVerb(inf) {
    return SL.verbs.find((v) => v.inf === inf);
  }

  SL.conj = {
    PERSONS,
    TENSES,
    participle,
    table(verbOrInf, tense) {
      const v = typeof verbOrInf === 'string' ? findVerb(verbOrInf) : verbOrInf;
      if (!v) throw new Error('Unknown verb: ' + verbOrInf);
      if (!FN[tense]) throw new Error('Unknown tense: ' + tense);
      return FN[tense](v);
    },
  };
})(globalThis.SL = globalThis.SL || {});
