/* Zero-dependency test runner: `node tests/run.js` */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
globalThis.SL = {};
// Load the same scripts index.html loads, minus the UI.
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map((m) => m[1]).filter((s) => !/app\.js$/.test(s));
for (const s of scripts) vm.runInThisContext(fs.readFileSync(path.join(root, s), 'utf8'), { filename: s });

let failed = 0, passed = 0;
function check(name, cond, detail) {
  if (cond) passed++;
  else { failed++; console.error('✗ ' + name + (detail ? '\n    ' + detail : '')); }
}
function eqTable(inf, tense, expected) {
  const got = SL.conj.table(inf, tense).join(', ');
  check(`${inf} ${tense}`, got === expected.join(', '), `expected ${expected.join(', ')}\n    got      ${got}`);
}

// ---------- Conjugation engine ----------
const T = {
  presente: {
    hablar: 'hablo hablas habla hablamos habláis hablan',
    comer: 'como comes come comemos coméis comen',
    vivir: 'vivo vives vive vivimos vivís viven',
    pensar: 'pienso piensas piensa pensamos pensáis piensan',
    empezar: 'empiezo empiezas empieza empezamos empezáis empiezan',
    poder: 'puedo puedes puede podemos podéis pueden',
    jugar: 'juego juegas juega jugamos jugáis juegan',
    pedir: 'pido pides pide pedimos pedís piden',
    seguir: 'sigo sigues sigue seguimos seguís siguen',
    hacer: 'hago haces hace hacemos hacéis hacen',
    conocer: 'conozco conoces conoce conocemos conocéis conocen',
    saber: 'sé sabes sabe sabemos sabéis saben',
    encontrar: 'encuentro encuentras encuentra encontramos encontráis encuentran',
    preferir: 'prefiero prefieres prefiere preferimos preferís prefieren',
    conducir: 'conduzco conduces conduce conducimos conducís conducen',
  },
  preterito: {
    hablar: 'hablé hablaste habló hablamos hablasteis hablaron',
    comer: 'comí comiste comió comimos comisteis comieron',
    llegar: 'llegué llegaste llegó llegamos llegasteis llegaron',
    buscar: 'busqué buscaste buscó buscamos buscasteis buscaron',
    empezar: 'empecé empezaste empezó empezamos empezasteis empezaron',
    jugar: 'jugué jugaste jugó jugamos jugasteis jugaron',
    tener: 'tuve tuviste tuvo tuvimos tuvisteis tuvieron',
    estar: 'estuve estuviste estuvo estuvimos estuvisteis estuvieron',
    hacer: 'hice hiciste hizo hicimos hicisteis hicieron',
    decir: 'dije dijiste dijo dijimos dijisteis dijeron',
    traer: 'traje trajiste trajo trajimos trajisteis trajeron',
    conducir: 'conduje condujiste condujo condujimos condujisteis condujeron',
    dormir: 'dormí dormiste durmió dormimos dormisteis durmieron',
    pedir: 'pedí pediste pidió pedimos pedisteis pidieron',
    sentir: 'sentí sentiste sintió sentimos sentisteis sintieron',
    pensar: 'pensé pensaste pensó pensamos pensasteis pensaron',
    volver: 'volví volviste volvió volvimos volvisteis volvieron',
    venir: 'vine viniste vino vinimos vinisteis vinieron',
  },
  imperfecto: {
    hablar: 'hablaba hablabas hablaba hablábamos hablabais hablaban',
    vivir: 'vivía vivías vivía vivíamos vivíais vivían',
    ser: 'era eras era éramos erais eran',
    oír: 'oía oías oía oíamos oíais oían',
  },
  futuro: {
    hablar: 'hablaré hablarás hablará hablaremos hablaréis hablarán',
    tener: 'tendré tendrás tendrá tendremos tendréis tendrán',
    decir: 'diré dirás dirá diremos diréis dirán',
    oír: 'oiré oirás oirá oiremos oiréis oirán',
  },
  condicional: {
    hacer: 'haría harías haría haríamos haríais harían',
    vivir: 'viviría vivirías viviría viviríamos viviríais vivirían',
  },
  perfecto: {
    hablar: 'he hablado, has hablado, ha hablado, hemos hablado, habéis hablado, han hablado',
    volver: 'he vuelto, has vuelto, ha vuelto, hemos vuelto, habéis vuelto, han vuelto',
  },
  subjuntivo: {
    hablar: 'hable hables hable hablemos habléis hablen',
    comer: 'coma comas coma comamos comáis coman',
    tener: 'tenga tengas tenga tengamos tengáis tengan',
    hacer: 'haga hagas haga hagamos hagáis hagan',
    pensar: 'piense pienses piense pensemos penséis piensen',
    dormir: 'duerma duermas duerma durmamos durmáis duerman',
    pedir: 'pida pidas pida pidamos pidáis pidan',
    sentir: 'sienta sientas sienta sintamos sintáis sientan',
    jugar: 'juegue juegues juegue juguemos juguéis jueguen',
    empezar: 'empiece empieces empiece empecemos empecéis empiecen',
    llegar: 'llegue llegues llegue lleguemos lleguéis lleguen',
    conocer: 'conozca conozcas conozca conozcamos conozcáis conozcan',
    decir: 'diga digas diga digamos digáis digan',
    volver: 'vuelva vuelvas vuelva volvamos volváis vuelvan',
    ver: 'vea veas vea veamos veáis vean',
  },
};
for (const [tense, verbs] of Object.entries(T)) {
  for (const [inf, s] of Object.entries(verbs)) {
    eqTable(inf, tense, s.includes(',') ? s.split(', ') : s.split(' '));
  }
}
// Every verb × tense must produce 6 non-empty strings
for (const v of SL.verbs) for (const t of SL.conj.TENSES) {
  const tab = SL.conj.table(v, t.id);
  check(`${v.inf} ${t.id} complete`, tab.length === 6 && tab.every((f) => typeof f === 'string' && f && !f.includes('null')), tab.join(','));
}

// ---------- Curriculum integrity ----------
const ids = new Set();
SL.units.forEach((u, i) => {
  check(`unit ${u.id} unique id`, !ids.has(u.id)); ids.add(u.id);
  check(`unit ${u.id} sequential id`, u.id === 'u' + (i + 1), `position ${i + 1}`);
  for (const k of ['title', 'level', 'icon', 'summary']) check(`${u.id}.${k}`, !!u[k]);
  check(`${u.id} has grammar`, Array.isArray(u.grammar) && u.grammar.length > 0);
  check(`${u.id} has ≥10 vocab`, Array.isArray(u.vocab) && u.vocab.length >= 10, `has ${u.vocab && u.vocab.length}`);
  check(`${u.id} has ≥8 exercises`, Array.isArray(u.exercises) && u.exercises.length >= 8, `has ${u.exercises && u.exercises.length}`);
  u.vocab.forEach((w, j) => check(`${u.id} vocab ${j}`, Array.isArray(w) && w.length >= 2 && w[0] && w[1], JSON.stringify(w)));
  u.exercises.forEach((ex, j) => {
    const tag = `${u.id} exercise ${j + 1} (${ex.type})`;
    switch (ex.type) {
      case 'mc':
        check(tag, ex.q && Array.isArray(ex.options) && ex.options.length >= 2 && Number.isInteger(ex.answer) && ex.options[ex.answer] !== undefined, JSON.stringify(ex));
        check(tag + ' distinct options', new Set(ex.options).size === ex.options.length, JSON.stringify(ex.options));
        break;
      case 'fill':
        check(tag, ex.q && ex.q.includes('___') && Array.isArray(ex.answer) && ex.answer.length, JSON.stringify(ex));
        break;
      case 'translate':
        check(tag, ex.q && Array.isArray(ex.answer) && ex.answer.length, JSON.stringify(ex));
        break;
      case 'order':
        check(tag, ex.q && typeof ex.answer === 'string' && ex.answer.split(' ').length >= 3, JSON.stringify(ex));
        break;
      default:
        check(tag + ' known type', false, ex.type);
    }
  });
});
check('curriculum has units', SL.units.length >= 20, `has ${SL.units.length}`);
for (const t of SL.conj.TENSES) check(`tense ${t.id} unlock unit exists`, ids.has(t.unlock));

// ---------- Answer checking ----------
const A = SL.answers;
check('exact match', A.check('Hablo español', ['hablo español']).status === 'correct');
check('punctuation ignored', A.check('¿Cómo estás?', ['cómo estás']).status === 'correct');
check('accent slip tolerated', A.check('como estas', ['cómo estás']).status === 'accent');
check('wrong rejected', A.check('hola', ['adiós']).status === 'wrong');
check('optional pronoun', A.check('soy estudiante', ['(yo) soy estudiante']).status === 'correct');
check('optional pronoun filled', A.check('yo soy estudiante', ['(yo) soy estudiante']).status === 'correct');
check('typo tolerance (long)', A.check('trabajamoss', ['trabajamos']).status === 'typo');
check('no typo tolerance on short words', A.check('sol', ['son']).status === 'wrong');
check('ñ is not an accent slip', A.check('ano', ['año']).status !== 'correct');

// ---------- SRS ----------
const S = SL.srs;
let card = S.newCard('2026-01-01');
card = S.grade(card, true, '2026-01-01');
check('srs box up', card.box === 1 && card.due === '2026-01-02', JSON.stringify(card));
card = S.grade(card, true, '2026-01-02');
check('srs box 2 → 3 days', card.box === 2 && card.due === '2026-01-05', JSON.stringify(card));
card = S.grade(card, false, '2026-01-05');
check('srs lapse resets', card.box === 0 && card.due === '2026-01-05', JSON.stringify(card));

const totalVocab = SL.units.reduce((n, u) => n + u.vocab.length, 0);
const totalEx = SL.units.reduce((n, u) => n + u.exercises.length, 0);
console.log(`\n${passed} passed, ${failed} failed  ·  ${SL.units.length} units, ${totalVocab} words, ${totalEx} grammar exercises, ${SL.verbs.length} verbs`);
process.exit(failed ? 1 : 0);
