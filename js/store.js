/* Progress persistence (localStorage) and derived progress queries. */
(function (SL) {
  const KEY = 'spanish-learning-progress-v1';
  const DEFAULTS = {
    version: 1,
    completed: {},   // unitId → { best, date }
    cards: {},       // "u3:4" → { box, due, seen, misses }
    xp: 0,
    daily: {},       // "2026-11-23" → xp earned that day
    streak: { count: 0, last: null },
    settings: {
      vosotros: true,     // include vosotros in drills
      freeMode: false,    // unlock every unit
      rate: 0.9,          // speech rate
      voice: '',          // preferred voice name
      autoSpeak: true,    // read Spanish aloud after answering
      goal: 30,           // daily XP goal
      reviewSize: 20,
      theme: 'auto',
    },
  };

  let state = load();

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return merge(JSON.parse(raw));
    } catch (e) { /* private mode or corrupt data: start fresh */ }
    return merge({});
  }
  function merge(s) {
    const out = Object.assign({}, structuredClone(DEFAULTS), s);
    out.settings = Object.assign({}, DEFAULTS.settings, s.settings || {});
    out.streak = Object.assign({}, DEFAULTS.streak, s.streak || {});
    return out;
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* storage full or blocked */ }
  }

  const today = () => SL.srs.today();
  const yesterday = () => SL.srs.addDays(today(), -1);

  function addXP(n) {
    if (n <= 0) return;
    const d = today();
    state.xp += n;
    state.daily[d] = (state.daily[d] || 0) + n;
    if (state.streak.last !== d) {
      state.streak.count = state.streak.last === yesterday() ? state.streak.count + 1 : 1;
      state.streak.last = d;
    }
    save();
  }

  function streak() {
    const l = state.streak.last;
    return l === today() || l === yesterday() ? state.streak.count : 0;
  }

  const unitIndex = (id) => SL.units.findIndex((u) => u.id === id);
  const isComplete = (id) => !!state.completed[id];
  function isUnlocked(id) {
    const i = unitIndex(id);
    return state.settings.freeMode || i === 0 || isComplete(SL.units[i - 1].id) || isComplete(id);
  }
  function nextUnit() {
    return SL.units.find((u) => !isComplete(u.id) && isUnlocked(u.id)) || null;
  }

  function completeUnit(id, score) {
    const prev = state.completed[id];
    state.completed[id] = { best: Math.max(score, prev ? prev.best : 0), date: today() };
    const u = SL.units[unitIndex(id)];
    u.vocab.forEach((_, i) => {
      const cid = id + ':' + i;
      if (!state.cards[cid]) state.cards[cid] = SL.srs.newCard(today());
    });
    save();
  }

  function cardWord(cid) {
    const [uid, i] = cid.split(':');
    const u = SL.units[unitIndex(uid)];
    return u && u.vocab[+i] ? { unit: u, word: u.vocab[+i] } : null;
  }

  function dueCards() {
    const d = today();
    return Object.entries(state.cards)
      .filter(([cid, c]) => c.due <= d && cardWord(cid))
      .sort((a, b) => (a[1].due < b[1].due ? -1 : a[1].due > b[1].due ? 1 : a[1].box - b[1].box))
      .map(([cid]) => cid);
  }

  function gradeCard(cid, correct) {
    const c = state.cards[cid];
    if (!c) return;
    state.cards[cid] = SL.srs.grade(c, correct, today());
    save();
  }

  function tenseUnlocked(t) {
    return state.settings.freeMode || isComplete(t.unlock);
  }

  SL.store = {
    get state() { return state; },
    save,
    addXP, streak, today,
    isComplete, isUnlocked, nextUnit, completeUnit, unitIndex,
    cardWord, dueCards, gradeCard, tenseUnlocked,
    setSetting(k, v) { state.settings[k] = v; save(); },
    exportJSON: () => JSON.stringify(state, null, 2),
    importJSON(text) {
      const parsed = JSON.parse(text);
      if (!parsed || typeof parsed !== 'object' || !parsed.completed) throw new Error('Not a progress file');
      state = merge(parsed);
      save();
    },
    reset() { state = merge({}); save(); },
  };
})(globalThis.SL = globalThis.SL || {});
