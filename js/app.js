/* Paso a Paso: UI, router and exercise session engine. */
(function (SL) {
  'use strict';
  const S = SL.store;
  const $app = document.getElementById('app');

  // ── Utilities ────────────────────────────────────────────────
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = (a, n) => shuffle(a).slice(0, n);
  const pct = (n, d) => (d ? Math.round((n / d) * 100) : 0);
  const ARTICLE = /^(el|la|los|las|un|una)\s+/i;
  const LEVELS = [
    { id: 'A1', name: 'Beginner' },
    { id: 'A2', name: 'Elementary' },
    { id: 'B1', name: 'Intermediate' },
  ];
  const PRAISE = ['¡Muy bien!', '¡Perfecto!', '¡Excelente!', '¡Genial!', '¡Eso es!', '¡Fenomenal!'];
  const PASS = 80;

  function html(strings, ...vals) {
    return strings.reduce((out, s, i) => out + s + (i < vals.length ? vals[i] : ''), '');
  }
  function toast(msg) {
    const t = document.createElement('div');
    t.className = 'toast'; t.textContent = msg; t.setAttribute('role', 'status');
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2200);
  }
  function applyTheme() {
    const t = S.state.settings.theme;
    if (t === 'auto') delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = t;
  }

  // ── Speech ───────────────────────────────────────────────────
  const TTS = {
    supported: typeof window !== 'undefined' && 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined',
    voices: [],
    load() {
      if (!this.supported) return;
      this.voices = speechSynthesis.getVoices().filter((v) => /^es([-_]|$)/i.test(v.lang));
    },
    voice() {
      const pref = S.state.settings.voice;
      return this.voices.find((v) => v.name === pref) || this.voices.find((v) => /es[-_]ES/i.test(v.lang)) || this.voices[0] || null;
    },
    canListen() { return this.supported && this.voices.length > 0; },
    speak(text) {
      if (!this.supported || !text) return;
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(String(text).replace(/[\/()]/g, ', ').replace(/→/g, ', '));
      const v = this.voice();
      if (v) u.voice = v;
      u.lang = v ? v.lang : 'es-ES';
      u.rate = S.state.settings.rate;
      speechSynthesis.speak(u);
    },
  };
  if (TTS.supported) {
    TTS.load();
    speechSynthesis.addEventListener && speechSynthesis.addEventListener('voiceschanged', () => TTS.load());
  }
  const speakBtn = (text, cls = '') => TTS.supported
    ? `<button type="button" class="speak ${cls}" data-say="${esc(text)}" aria-label="Listen: ${esc(text)}" title="Listen">🔊</button>`
    : '';

  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-say]');
    if (b) { e.preventDefault(); TTS.speak(b.dataset.say); return; }
    if (e.target.closest('[data-rerun]')) { e.preventDefault(); route(); }
  });

  // ── Router ───────────────────────────────────────────────────
  let teardown = null; // cleanup for the active view (session key handlers etc.)
  const routes = [
    // Plain #name routes, so links survive hosts that only pass simple hashes.
    [/^#?(home)?$/, viewHome, 'home'],
    [/^#path$/, viewPath, 'path'],
    [/^#unit-(u\d+)$/, viewUnit, 'path'],
    [/^#practice-(u\d+)$/, viewPractice, 'path'],
    [/^#review$/, viewReview, 'review'],
    [/^#verbs$/, viewVerbs, 'verbs'],
    [/^#words$/, viewWords, 'words'],
    [/^#prefs$/, viewSettings, 'settings'],
  ];
  function route() {
    if (teardown) { teardown(); teardown = null; }
    if (TTS.supported) speechSynthesis.cancel();
    document.querySelector('.feedback')?.remove();
    const h = location.hash || '#home';
    let found = routes.find(([re]) => re.test(h));
    if (!found) { location.hash = '#home'; return; }
    const [re, fn, nav] = found;
    document.querySelectorAll('[data-nav]').forEach((a) => a.classList.toggle('active', a.dataset.nav === nav));
    document.querySelectorAll('[data-nav]').forEach((a) => a.toggleAttribute('aria-current', a.dataset.nav === nav));
    fn(...h.match(re).slice(1));
    updateBadge();
    window.scrollTo(0, 0);
  }
  function updateBadge() {
    const n = S.dueCards().length;
    const b = document.getElementById('due-badge');
    b.hidden = n === 0;
    b.textContent = n > 99 ? '99+' : n;
  }
  const unitById = (id) => SL.units.find((u) => u.id === id);

  // ── Home ─────────────────────────────────────────────────────
  function viewHome() {
    const st = S.state;
    const next = S.nextUnit();
    const done = SL.units.filter((u) => S.isComplete(u.id)).length;
    const cards = Object.values(st.cards);
    const mastered = cards.filter((c) => c.box >= SL.srs.MASTERED).length;
    const due = S.dueCards().length;
    const todayXP = st.daily[S.today()] || 0;
    const goal = st.settings.goal;
    const streak = S.streak();
    const hour = new Date().getHours();
    const greet = hour < 12 ? '¡Buenos días!' : hour < 20 ? '¡Buenas tardes!' : '¡Buenas noches!';

    const days = [...Array(7)].map((_, i) => SL.srs.addDays(S.today(), i - 6));
    const maxXP = Math.max(goal, ...days.map((d) => st.daily[d] || 0));
    const dayName = (d) => new Date(d + 'T12:00:00').toLocaleDateString(undefined, { weekday: 'short' });

    const nextIdx = next ? S.unitIndex(next.id) + 1 : 0;
    $app.innerHTML = html`
      <div class="wrap">
        <div class="hero">
          <div><h1>${greet}</h1><p class="muted" style="margin:0">${done === 0 ? 'Welcome! Your Spanish journey starts here.' : `You’ve completed ${done} of ${SL.units.length} units. ¡Sigue así!`}</p></div>
          <div class="streak" title="Day streak">🔥 ${streak}</div>
        </div>

        ${next ? html`
        <section class="card continue">
          <div class="continue-row">
            <div class="continue-icon" aria-hidden="true">${next.icon}</div>
            <div style="flex:1">
              <div class="eyebrow">${done === 0 ? 'Start here' : 'Up next'} · Unit ${nextIdx} · ${next.level}</div>
              <h2 style="margin:.15em 0 .2em">${esc(next.title)}</h2>
              <div class="muted small">${esc(next.summary)}</div>
            </div>
          </div>
          <div class="btn-row" style="margin-top:14px"><a class="btn" href="#unit-${next.id}">Open lesson</a></div>
        </section>` : html`
        <section class="card continue"><div class="continue-row"><div class="continue-icon">🎓</div><div><h2 style="margin:0">¡Enhorabuena!</h2><div class="muted">You finished every unit. Keep your words fresh with reviews and verb drills.</div></div></div></section>`}

        <div class="grid grid-2" style="margin-top:14px">
          <a class="card" href="#review" style="text-decoration:none;color:inherit">
            <div class="eyebrow muted">Review</div>
            <h3 style="margin:.2em 0">${due ? `${due} word${due === 1 ? '' : 's'} due` : 'All caught up'}</h3>
            <div class="small muted">${due ? 'Spaced repetition keeps them in memory.' : 'New reviews appear as you learn.'}</div>
          </a>
          <div class="card">
            <div class="eyebrow muted">Today’s goal</div>
            <h3 style="margin:.2em 0">${todayXP} / ${goal} XP</h3>
            <div class="bar accent" role="progressbar" aria-valuenow="${todayXP}" aria-valuemax="${goal}"><i style="width:${Math.min(100, pct(todayXP, goal))}%"></i></div>
          </div>
        </div>

        <section class="grid grid-4" style="margin-top:14px">
          <div class="card stat"><b>${done}</b><span>units done</span></div>
          <div class="card stat"><b>${cards.length}</b><span>words learned</span></div>
          <div class="card stat"><b>${mastered}</b><span>words mastered</span></div>
          <div class="card stat"><b>${st.xp}</b><span>total XP</span></div>
        </section>

        <section class="card" style="margin-top:14px">
          <h3>Your level</h3>
          ${LEVELS.map((l) => {
            const us = SL.units.filter((u) => u.level === l.id);
            const d = us.filter((u) => S.isComplete(u.id)).length;
            return html`<div class="level-row"><span class="level-tag">${l.id}</span><div><div class="small"><b>${l.name}</b> <span class="muted">· ${d}/${us.length} units</span></div><div class="bar ok"><i style="width:${pct(d, us.length)}%"></i></div></div><span class="small muted">${pct(d, us.length)}%</span></div>`;
          }).join('')}
        </section>

        <section class="card" style="margin-top:14px">
          <h3>Last 7 days</h3>
          <div class="week" aria-label="XP earned per day">
            ${days.map((d) => { const x = st.daily[d] || 0; return `<div title="${x} XP"><i class="${x ? '' : 'zero'}" style="height:${Math.max(3, (x / maxXP) * 72)}px"></i><span>${esc(dayName(d))}</span></div>`; }).join('')}
          </div>
        </section>
      </div>`;
  }

  // ── Path ─────────────────────────────────────────────────────
  function viewPath() {
    const next = S.nextUnit();
    $app.innerHTML = html`
      <div class="wrap">
        <h1>Learning path</h1>
        <p class="muted">Each unit teaches one grammar topic and a set of words. Score ${PASS}% or more in the practice to unlock the next one.</p>
        ${LEVELS.map((l) => html`
          <div class="level-head"><span class="level-tag">${l.id}</span><h2 style="margin:0">${l.name}</h2></div>
          <div class="unit-list">
            ${SL.units.filter((u) => u.level === l.id).map((u) => {
              const n = S.unitIndex(u.id) + 1;
              const c = S.state.completed[u.id];
              const open = S.isUnlocked(u.id);
              const cls = c ? 'done' : !open ? 'locked' : next && next.id === u.id ? 'current' : '';
              const status = c ? `<span class="unit-status ok">✓ ${c.best}%</span>` : !open ? '<span class="unit-status" aria-label="Locked">🔒</span>' : '<span class="unit-status">Start ›</span>';
              const inner = `<div class="unit-ico" aria-hidden="true">${u.icon}</div><div><div class="unit-title">${n}. ${esc(u.title)}</div><div class="unit-sum">${esc(u.summary)}</div></div>${status}`;
              return open ? `<a class="unit-item ${cls}" href="#unit-${u.id}">${inner}</a>` : `<div class="unit-item ${cls}" aria-disabled="true">${inner}</div>`;
            }).join('')}
          </div>`).join('')}
        <p class="small muted" style="margin-top:20px">Already know some Spanish? Turn on <a href="#prefs">Free mode</a> in Settings to unlock every unit.</p>
      </div>`;
  }

  // ── Unit (lesson) ────────────────────────────────────────────
  function renderGrammar(u) {
    return u.grammar.map((g) => html`
      <section class="card gsec">
        <h3>${esc(g.h)}</h3>
        ${g.p || ''}
        ${g.table ? html`<div class="table-scroll"><table>
          <thead><tr>${g.table.head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead>
          <tbody>${g.table.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody>
        </table></div>` : ''}
        ${g.ex ? html`<ul class="examples">${g.ex.map(([es, en]) => `<li>${speakBtn(es)}<div><div class="es">${esc(es)}</div><div class="en">${esc(en)}</div></div></li>`).join('')}</ul>` : ''}
        ${g.tip ? `<div class="tip">${g.tip}</div>` : ''}
      </section>`).join('');
  }
  function masteryDots(box) {
    const n = Math.min(box, SL.srs.MASTERED);
    return `<span class="dots" title="Memory strength ${n}/${SL.srs.MASTERED}">${[...Array(SL.srs.MASTERED)].map((_, i) => `<i class="${i < n ? 'on' : ''}"></i>`).join('')}</span>`;
  }
  function renderVocab(u) {
    return html`<div class="vocab-list">${u.vocab.map((w, i) => {
      const card = S.state.cards[u.id + ':' + i];
      return html`<div class="vocab-row">${speakBtn(w[0])}<div><div class="es">${esc(w[0])}</div>${w[2] ? `<div class="note">${esc(w[2])}</div>` : ''}</div><div class="en">${esc(w[1])}</div><div class="lvl">${card ? masteryDots(card.box) : ''}</div></div>`;
    }).join('')}</div>`;
  }
  function viewUnit(id) {
    const u = unitById(id);
    if (!u) { location.hash = '#path'; return; }
    if (!S.isUnlocked(id)) {
      $app.innerHTML = `<div class="wrap"><div class="card empty"><div class="emoji">🔒</div><h2>This unit is locked</h2><p class="muted">Finish the previous unit first, or enable Free mode in Settings.</p><a class="btn primary" href="#path">Back to the path</a></div></div>`;
      return;
    }
    const n = S.unitIndex(id) + 1;
    const c = S.state.completed[id];
    let tab = 'grammar';
    try { tab = sessionStorage.getItem('unit-tab-' + id) || 'grammar'; } catch (e) { /* ignore */ }
    const draw = () => {
      $app.innerHTML = html`
        <div class="wrap">
          <div class="crumbs"><a href="#path">‹ Learning path</a></div>
          <div class="unit-head">
            <div class="unit-ico" aria-hidden="true">${u.icon}</div>
            <div><div class="eyebrow muted">Unit ${n} · ${u.level}${c ? ` · ✓ best ${c.best}%` : ''}</div><h1 style="margin:0">${esc(u.title)}</h1></div>
          </div>
          <p class="muted">${esc(u.summary)}</p>
          <div class="tabs" role="tablist">
            <button role="tab" data-tab="grammar" aria-selected="${tab === 'grammar'}">📘 Grammar</button>
            <button role="tab" data-tab="vocab" aria-selected="${tab === 'vocab'}">📇 Vocabulary (${u.vocab.length})</button>
          </div>
          <div class="stack">${tab === 'grammar' ? renderGrammar(u) : renderVocab(u)}</div>
          ${tab === 'grammar' ? `<p class="small muted" style="margin-top:14px">Next, look over the <a href="#" data-tab="vocab">vocabulary</a>. The practice uses both.</p>` : `<p class="small muted" style="margin-top:14px">Tap 🔊 to hear each word. When you pass the practice, these words go into your review deck.</p>`}
          <div class="sticky-cta"><a class="btn primary block" href="#practice-${id}">${c ? 'Practise again' : 'Start practice'} · ${u.exercises.length + 7} questions</a></div>
        </div>`;
      $app.querySelectorAll('[data-tab]').forEach((b) => b.addEventListener('click', (e) => {
        e.preventDefault();
        tab = b.dataset.tab;
        try { sessionStorage.setItem('unit-tab-' + id, tab); } catch (err) { /* ignore */ }
        draw();
      }));
    };
    draw();
  }

  // ── Item builders ────────────────────────────────────────────
  // Distractors: other words from the same pool whose text differs.
  function distractors(word, pool, side, n = 3) {
    const other = 1 - side;
    const seen = new Set([word[side].toLowerCase()]);
    const out = [];
    for (const w of shuffle(pool)) {
      const t = w[side].toLowerCase();
      // skip duplicates and synonyms (same meaning on the other side)
      if (!seen.has(t) && w[other].toLowerCase() !== word[other].toLowerCase()) { seen.add(t); out.push(w[side]); }
      if (out.length === n) break;
    }
    return out;
  }
  function widePool(unit) {
    const i = S.unitIndex(unit.id);
    return SL.units.slice(Math.max(0, i - 2), i + 1).flatMap((u) => u.vocab);
  }
  const mcEsEn = (w, pool, extra = {}) => Object.assign({ kind: 'mc', label: 'What does this mean?', prompt: w[0], promptSay: w[0], options: [w[1], ...distractors(w, pool, 1)], correct: w[1], say: w[0] }, extra);
  const mcEnEs = (w, pool, extra = {}) => Object.assign({ kind: 'mc', label: 'Choose the Spanish', prompt: w[1], options: [w[0], ...distractors(w, pool, 0)], correct: w[0], say: w[0] }, extra);
  const listenItem = (w, pool, extra = {}) => Object.assign({ kind: 'listen', label: 'Listen and choose the meaning', audio: w[0], options: [w[1], ...distractors(w, pool, 1)], correct: w[1], say: w[0], reveal: w[0] }, extra);
  function typeEnEs(w, extra = {}) {
    // Never show the vocab note before answering: it usually contains the answer
    // (e.g. "f. la estudiante"). Accept the feminine / regional form it names, and
    // show the note afterwards instead.
    const forms = [w[0]];
    const alt = w[2] && w[2].match(/^(?:f\.|Latin America:)\s*(.+)$/);
    if (alt) forms.push(alt[1]);
    const answers = [];
    forms.forEach((f) => { answers.push(f); const b = f.replace(ARTICLE, ''); if (b !== f) answers.push(b); });
    const bare = w[0].replace(ARTICLE, '');
    return Object.assign({ kind: 'type', label: 'Write it in Spanish', prompt: w[1], hint: '', answers, say: w[0], article: bare !== w[0] ? w[0] : null, explain: w[2] ? `Note: ${w[2]}` : undefined }, extra);
  }
  const matchItem = (words) => ({ kind: 'match', label: 'Match the pairs', pairs: words.map((w) => [w[0], w[1]]) });

  function exToItem(ex) {
    const display = SL.answers.display;
    switch (ex.type) {
      case 'mc': {
        const correct = ex.options[ex.answer];
        let say = null;
        if (ex.q.includes('___')) say = ex.q.replace('___', correct);
        else if (/^[“"]/.test(ex.q) || /^\d/.test(ex.q)) say = correct;
        return { kind: 'mc', label: 'Choose the right answer', prompt: ex.q, options: ex.options.slice(), correct, explain: ex.explain, say };
      }
      case 'fill':
        return { kind: 'type', label: 'Fill in the blank', sentence: ex.q, hint: ex.hint, answers: ex.answer, explain: ex.explain, say: ex.q.replace('___', ex.answer[0]) };
      case 'translate':
        return { kind: 'type', label: 'Translate into Spanish', prompt: ex.q, hint: ex.hint, answers: ex.answer, explain: ex.explain, say: display(ex.answer[0]) };
      case 'order':
        return { kind: 'order', label: 'Put the words in order', prompt: ex.q, answer: ex.answer, explain: ex.explain, say: ex.answer };
    }
    throw new Error('Unknown exercise type ' + ex.type);
  }

  function buildPractice(u) {
    const words = pick(u.vocab, Math.min(10, u.vocab.length));
    const pool = widePool(u);
    const vocabItems = [
      mcEsEn(words[0], pool), mcEnEs(words[1], pool),
      TTS.canListen() ? listenItem(words[2], pool) : mcEsEn(words[2], pool),
      mcEsEn(words[3], pool),
      typeEnEs(words[4]), typeEnEs(words[5]),
    ];
    const grammar = shuffle(u.exercises).map(exToItem);
    // Warm up with a match, then interleave vocabulary among grammar questions.
    const items = [matchItem(words.slice(5, 10).length === 5 ? words.slice(5, 10) : words.slice(0, 5))];
    const step = Math.max(1, Math.floor(grammar.length / vocabItems.length));
    let vi = 0;
    grammar.forEach((g, i) => { if (i % step === 0 && vi < vocabItems.length) items.push(vocabItems[vi++]); items.push(g); });
    while (vi < vocabItems.length) items.push(vocabItems[vi++]);
    return items;
  }

  // ── Session engine ───────────────────────────────────────────
  /* opts: { title, items, exitHref, onAnswer(item, ok, firstTry), onDone(summary) → html } */
  function runSession(opts) {
    const queue = opts.items.map((it, i) => Object.assign({}, it, { _i: i }));
    const first = new Array(opts.items.length).fill(null);
    const requeued = new Set();
    const missed = [];
    let pos = 0;
    let current = null;   // { check, lock } from the renderer
    let answered = null;  // result once checked

    $app.innerHTML = `<div class="session" aria-live="polite"></div>`;
    const root = $app.firstElementChild;

    function progress() { return pct(pos, queue.length); }

    function next() {
      document.querySelector('.feedback')?.remove();
      answered = null;
      if (pos >= queue.length) return finish();
      const item = queue[pos];
      root.innerHTML = html`
        <div class="session-top">
          <a class="x-btn" href="${opts.exitHref}" aria-label="Quit session" title="Quit">✕</a>
          <div class="bar" role="progressbar" aria-valuenow="${progress()}" aria-valuemax="100"><i style="width:${progress()}%"></i></div>
          <span class="small muted">${Math.min(pos + 1, queue.length)}/${queue.length}</span>
        </div>
        <div class="q"></div>
        <div style="margin-top:22px"><button class="btn primary block" id="check-btn" disabled>Check</button></div>`;
      const q = root.querySelector('.q');
      const checkBtn = root.querySelector('#check-btn');
      current = RENDER[item.kind](q, item, {
        ready: (r) => { checkBtn.disabled = !r; },
        finish: (result) => showResult(item, result),
      });
      checkBtn.addEventListener('click', doCheck);
      if (item.kind === 'match') checkBtn.parentElement.hidden = true;
      if (item.promptSay && S.state.settings.autoSpeak) setTimeout(() => TTS.speak(item.promptSay), 150);
      if (item.kind === 'listen') setTimeout(() => TTS.speak(item.audio), 200);
      current.focus && current.focus();
    }

    function doCheck() {
      if (answered || !current) return;
      const result = current.check();
      if (result) showResult(queue[pos], result);
    }

    function showResult(item, result) {
      if (answered) return;
      answered = result;
      current.lock && current.lock(result);
      const isFirst = first[item._i] === null;
      if (isFirst) {
        first[item._i] = result.ok;
        if (!result.ok) missed.push({ item, result });
      }
      opts.onAnswer && opts.onAnswer(item, result.ok, isFirst);
      if (result.ok && item.say && S.state.settings.autoSpeak && item.kind !== 'match') TTS.speak(item.say);

      const root2 = document.createElement('div');
      root2.className = 'feedback ' + (result.ok ? 'is-ok' : 'is-bad');
      let title, body = '';
      if (result.ok) {
        title = result.status === 'accent' ? 'Correct, but check the accents' : result.status === 'typo' ? 'Almost perfect: small typo' : PRAISE[Math.floor(Math.random() * PRAISE.length)];
        if (result.status === 'accent' || result.status === 'typo') body += `<div>Exact spelling: <span class="expected">${esc(result.expected)}</span></div>`;
        if (result.note) body += `<div>${result.note}</div>`;
      } else {
        title = item.kind === 'match' ? 'A few mix-ups' : 'Not quite';
        if (result.expected) body += `<div>Correct answer: <span class="expected">${esc(result.expected)}</span> ${item.say ? speakBtn(item.say) : ''}</div>`;
      }
      if (item.reveal) body += `<div class="explain">You heard: <b>${esc(item.reveal)}</b></div>`;
      if (item.explain) body += `<div class="explain">${esc(item.explain)}</div>`;
      if (!result.ok && item.kind !== 'match' && !requeued.has(item._i)) body += `<div class="explain">You’ll see this one again at the end.</div>`;
      root2.innerHTML = `<div class="feedback-inner"><div class="feedback-msg" role="alert"><b>${result.ok ? '✓' : '✗'} ${esc(title)}</b>${body}</div><button class="btn ${result.ok ? 'ok' : 'bad'}" id="continue-btn">Continue</button></div>`;
      document.body.appendChild(root2);
      const cont = root2.querySelector('#continue-btn');
      cont.addEventListener('click', advance);
      root.querySelector('#check-btn')?.parentElement.setAttribute('hidden', '');
      cont.focus({ preventScroll: true });
    }

    function advance() {
      const item = queue[pos];
      if (answered && !answered.ok && !requeued.has(item._i)) {
        requeued.add(item._i);
        queue.push(Object.assign({}, item, item.kind === 'mc' || item.kind === 'listen' ? { options: item.options.slice() } : {}));
      }
      pos++;
      next();
    }

    function finish() {
      current = null;
      const total = first.length;
      const right = first.filter(Boolean).length;
      const summary = { total, right, score: pct(right, total), missed };
      root.innerHTML = opts.onDone(summary);
      root.querySelector('.btn.primary')?.focus();
    }

    function onKey(e) {
      if (pos >= queue.length) return; // results screen: let links/buttons behave normally
      if (e.key === 'Enter') {
        if (answered) { e.preventDefault(); advance(); }
        else if (!root.querySelector('#check-btn')?.disabled) { e.preventDefault(); doCheck(); }
        return;
      }
      if (answered || !current || !current.key) return;
      if (e.target.matches && e.target.matches('input, textarea')) return;
      current.key(e);
    }
    document.addEventListener('keydown', onKey);
    teardown = () => { document.removeEventListener('keydown', onKey); document.querySelector('.feedback')?.remove(); };
    next();
  }

  // ── Renderers for each question kind ─────────────────────────
  // Each returns { check() → result | null, lock(result), focus?(), key?(e) }
  const ACCENTS = ['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü', '¿', '¡'];
  function accentBar(input) {
    const bar = document.createElement('div');
    bar.className = 'accents';
    bar.setAttribute('aria-label', 'Insert special characters');
    bar.innerHTML = ACCENTS.map((c) => `<button type="button" tabindex="-1" data-ch="${c}">${c}</button>`).join('');
    bar.addEventListener('mousedown', (e) => e.preventDefault()); // keep focus in the input
    bar.addEventListener('click', (e) => {
      const b = e.target.closest('[data-ch]');
      if (!b) return;
      const s = input.selectionStart ?? input.value.length, en = input.selectionEnd ?? input.value.length;
      input.value = input.value.slice(0, s) + b.dataset.ch + input.value.slice(en);
      input.setSelectionRange(s + 1, s + 1);
      input.dispatchEvent(new Event('input'));
      input.focus();
    });
    return bar;
  }
  function header(q, item, extra = '') {
    q.innerHTML = html`<div class="q-kind">${esc(item.label)}</div>${extra}`;
  }

  const RENDER = {
    mc(q, item, api) {
      const opts = shuffle(item.options);
      header(q, item, html`<div class="q-prompt">${item.promptSay ? speakBtn(item.promptSay) : ''}<span lang="${item.promptSay ? 'es' : ''}">${esc(item.prompt)}</span></div>${item.hint ? `<div class="q-hint">${esc(item.hint)}</div>` : ''}
        <div class="options" role="radiogroup">${opts.map((o, i) => `<button type="button" class="option" role="radio" aria-checked="false" data-v="${esc(o)}"><kbd>${i + 1}</kbd><span>${esc(o)}</span></button>`).join('')}</div>`);
      let sel = null;
      const buttons = [...q.querySelectorAll('.option')];
      const choose = (b) => {
        buttons.forEach((x) => { x.classList.toggle('selected', x === b); x.setAttribute('aria-checked', x === b); });
        sel = b.dataset.v; api.ready(true);
      };
      buttons.forEach((b) => b.addEventListener('click', () => { if (!q.dataset.locked) choose(b); }));
      return {
        check: () => (sel === null ? null : { ok: sel === item.correct, status: sel === item.correct ? 'correct' : 'wrong', expected: item.correct }),
        lock: () => {
          q.dataset.locked = '1';
          buttons.forEach((b) => { b.disabled = true; if (b.dataset.v === item.correct) b.classList.add('right'); else if (b.dataset.v === sel) b.classList.add('wrong'); });
        },
        key: (e) => { const n = parseInt(e.key, 10); if (n >= 1 && n <= buttons.length) choose(buttons[n - 1]); },
        focus: () => {},
      };
    },

    listen(q, item, api) {
      const r = RENDER.mc(q, Object.assign({}, item, { prompt: '', promptSay: null }), api);
      const box = document.createElement('div');
      box.className = 'listen-box';
      box.innerHTML = `${speakBtn(item.audio, 'big')}`;
      q.querySelector('.q-prompt').replaceWith(box);
      const slow = document.createElement('p');
      slow.className = 'small muted';
      slow.style.textAlign = 'center';
      slow.innerHTML = `Tap to hear it again.`;
      box.after(slow);
      return r;
    },

    type(q, item, api) {
      let input;
      if (item.sentence) {
        const [before, after] = item.sentence.split('___');
        header(q, item, html`<div class="fill-sentence" lang="es">${esc(before)}<input class="answer-input" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Missing word">${esc(after || '')}</div>${item.hint ? `<div class="q-hint">${esc(item.hint)}</div>` : ''}`);
        input = q.querySelector('input');
        const sizeIt = () => { input.style.width = Math.max(7, input.value.length + 2) + 'ch'; };
        input.addEventListener('input', sizeIt); sizeIt();
      } else {
        header(q, item, html`<div class="q-prompt">${esc(item.prompt)}</div>${item.hint ? `<div class="q-hint">${esc(item.hint)}</div>` : '<div class="q-hint"></div>'}
          <input class="answer-input" lang="es" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Type in Spanish…" aria-label="Your answer">`);
        input = q.querySelector('input');
      }
      (item.sentence ? q.querySelector('.fill-sentence') : input).after(accentBar(input));
      input.addEventListener('input', () => api.ready(input.value.trim().length > 0));
      return {
        check() {
          if (!input.value.trim()) return null;
          const r = SL.answers.check(input.value, item.answers);
          r.ok = SL.answers.isPass(r);
          if (r.ok && item.article && !ARTICLE.test(input.value.trim())) r.note = `Learn it with its article: <b>${esc(item.article)}</b>`;
          return r;
        },
        lock(r) { input.readOnly = true; input.classList.add(r.ok ? 'right' : 'wrong'); },
        focus: () => input.focus(),
      };
    },

    order(q, item, api) {
      const tokens = item.answer.split(' ');
      let bank = shuffle(tokens.map((t, i) => ({ t, i })));
      if (bank.map((b) => b.t).join(' ') === item.answer && tokens.length > 2) bank = bank.slice(1).concat(bank[0]);
      const line = [];
      header(q, item, html`<div class="q-prompt">${esc(item.prompt)}</div><div class="order-line" aria-label="Your sentence"></div><div class="order-bank"></div>`);
      const $line = q.querySelector('.order-line'), $bank = q.querySelector('.order-bank');
      let locked = false;
      function draw() {
        $line.innerHTML = line.map((b, k) => `<button type="button" class="tile" data-k="${k}" lang="es">${esc(b.t)}</button>`).join('');
        $bank.innerHTML = bank.map((b) => `<button type="button" class="tile ${line.includes(b) ? 'used' : ''}" data-i="${b.i}" lang="es">${esc(b.t)}</button>`).join('');
        api.ready(line.length > 0);
      }
      $bank.addEventListener('click', (e) => {
        const t = e.target.closest('[data-i]'); if (!t || locked) return;
        const b = bank.find((x) => x.i === +t.dataset.i); if (line.includes(b)) return;
        line.push(b); TTS.supported && S.state.settings.autoSpeak && TTS.speak(b.t); draw();
      });
      $line.addEventListener('click', (e) => {
        const t = e.target.closest('[data-k]'); if (!t || locked) return;
        line.splice(+t.dataset.k, 1); draw();
      });
      draw();
      return {
        check() {
          if (!line.length) return null;
          const r = SL.answers.check(line.map((b) => b.t).join(' '), [item.answer]);
          r.ok = r.status === 'correct';
          if (!r.ok) r.status = 'wrong';
          return r;
        },
        lock(r) { locked = true; $line.style.borderColor = r.ok ? 'var(--ok)' : 'var(--bad)'; },
        key(e) { if (e.key === 'Backspace' && line.length) { line.pop(); draw(); } },
      };
    },

    match(q, item, api) {
      const left = shuffle(item.pairs.map((p, i) => ({ t: p[0], i })));
      const right = shuffle(item.pairs.map((p, i) => ({ t: p[1], i })));
      header(q, item, html`<div class="q-prompt" style="font-size:1.1rem">Tap a Spanish word, then its meaning.</div>
        <div class="match"><div class="col">${left.map((x) => `<button type="button" class="tile" lang="es" data-side="l" data-i="${x.i}">${esc(x.t)}</button>`).join('')}</div>
        <div class="col">${right.map((x) => `<button type="button" class="tile" data-side="r" data-i="${x.i}">${esc(x.t)}</button>`).join('')}</div></div>`);
      let sel = null, mistakes = 0, matched = 0;
      q.querySelector('.match').addEventListener('click', (e) => {
        const t = e.target.closest('.tile');
        if (!t || t.classList.contains('done')) return;
        if (t.dataset.side === 'l') TTS.speak(t.textContent);
        if (!sel || sel.dataset.side === t.dataset.side) {
          q.querySelectorAll('.tile.sel').forEach((x) => x.classList.remove('sel'));
          sel = t; t.classList.add('sel'); return;
        }
        if (sel.dataset.i === t.dataset.i) {
          [sel, t].forEach((x) => { x.classList.remove('sel'); x.classList.add('done'); x.disabled = true; });
          matched++;
          if (matched === item.pairs.length) {
            const ok = mistakes <= 1;
            api.finish({ ok, status: ok ? 'correct' : 'wrong', expected: '', note: mistakes ? `${mistakes} mismatch${mistakes > 1 ? 'es' : ''}.` : 'All pairs matched first time.' });
          }
        } else {
          mistakes++;
          [sel, t].forEach((x) => { x.classList.remove('sel'); x.classList.add('miss'); setTimeout(() => x.classList.remove('miss'), 350); });
        }
        sel = null;
      });
      return { check: () => null, lock: () => {} };
    },
  };

  // ── Practice (unit) ──────────────────────────────────────────
  function viewPractice(id) {
    const u = unitById(id);
    if (!u || !S.isUnlocked(id)) { location.hash = '#path'; return; }
    let xp = 0;
    runSession({
      items: buildPractice(u),
      exitHref: '#unit-' + id,
      onAnswer(item, ok, firstTry) { if (ok && firstTry) xp += 2; },
      onDone({ total, right, score, missed }) {
        const passed = score >= PASS;
        const wasComplete = S.isComplete(id);
        if (passed) { xp += 20 + (score === 100 ? 10 : 0); S.completeUnit(id, score); }
        S.addXP(xp);
        updateBadge();
        const nextU = SL.units[S.unitIndex(id) + 1];
        return html`
          <div class="card results">
            <div class="emoji">${passed ? (score === 100 ? '🏆' : '🎉') : '💪'}</div>
            <h1>${passed ? (wasComplete ? '¡Muy bien!' : 'Unit complete!') : 'Keep practising'}</h1>
            <div class="big">${score}%</div>
            <p class="muted">${right} of ${total} right on the first try · +${xp} XP</p>
            <p>${passed
              ? (wasComplete ? 'Great refresher.' : `${u.vocab.length} new words were added to your review deck.${nextU ? ' The next unit is unlocked.' : ''}`)
              : `You need ${PASS}% to complete this unit. Reread the grammar notes and try again. You’ll get it.`}</p>
            <div class="btn-row" style="justify-content:center">
              ${passed && nextU ? `<a class="btn primary" href="#unit-${nextU.id}">Next: ${esc(nextU.title)} ›</a>` : ''}
              ${!passed ? `<a class="btn primary" href="#unit-${id}">Review the lesson</a>` : ''}
              <button class="btn" data-rerun>Practise again</button>
              <a class="btn" href="#home">Home</a>
            </div>
          </div>
          ${missed.length ? html`<div class="card mistakes" style="margin-top:14px"><h3>Worth another look</h3><ul>${missed.map(({ item, result }) => `<li><span class="muted">${esc(item.sentence || item.prompt || item.audio || 'Matching pairs')}</span>${result.expected ? ` → <b>${esc(result.expected)}</b>` : ''}</li>`).join('')}</ul></div>` : ''}`;
      },
    });
  }

  // ── Review (spaced repetition) ───────────────────────────────
  function cardItem(cid, pool, graded) {
    const { word } = S.cardWord(cid);
    const box = S.state.cards[cid].box;
    const extra = { cid, graded };
    if (box <= 1) return TTS.canListen() && Math.random() < 0.35 ? listenItem(word, pool, extra) : mcEsEn(word, pool, extra);
    if (box <= 3) return Math.random() < 0.5 ? mcEnEs(word, pool, extra) : typeEnEs(word, extra);
    return typeEnEs(word, extra);
  }
  function viewReview() {
    const due = S.dueCards();
    const learned = Object.keys(S.state.cards);
    if (!learned.length) {
      $app.innerHTML = `<div class="wrap"><div class="card empty"><div class="emoji">📭</div><h2>No words to review yet</h2><p class="muted">Complete your first unit and its words will show up here, scheduled with spaced repetition.</p><a class="btn primary" href="#path">Go to the path</a></div></div>`;
      return;
    }
    if (!due.length) {
      const nextDue = Object.values(S.state.cards).map((c) => c.due).sort()[0];
      $app.innerHTML = html`<div class="wrap"><div class="card empty"><div class="emoji">✅</div><h2>All caught up!</h2>
        <p class="muted">Next review: <b>${esc(new Date(nextDue + 'T12:00:00').toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' }))}</b>.</p>
        <p class="muted">Want more? Practise the words you find hardest. This won’t change their schedule.</p>
        <div class="btn-row" style="justify-content:center"><button class="btn primary" id="weak">Practise weak words</button><a class="btn" href="#path">Learn something new</a></div></div></div>`;
      $app.querySelector('#weak').addEventListener('click', () => startReview(weakest(10), false));
      return;
    }
    startReview(due.slice(0, S.state.settings.reviewSize), true);
  }
  function weakest(n) {
    return Object.entries(S.state.cards)
      .sort((a, b) => a[1].box - b[1].box || (b[1].misses || 0) - (a[1].misses || 0) || Math.random() - 0.5)
      .slice(0, n).map(([cid]) => cid);
  }
  function startReview(cids, graded) {
    const pool = cids.map((c) => S.cardWord(c).word).concat(SL.units.filter((u) => S.isComplete(u.id)).flatMap((u) => u.vocab));
    let xp = 0;
    runSession({
      items: shuffle(cids).map((cid) => cardItem(cid, pool, graded)),
      exitHref: '#home',
      onAnswer(item, ok, firstTry) {
        if (!firstTry) return;
        if (item.graded) S.gradeCard(item.cid, ok);
        if (ok) xp += 2;
      },
      onDone({ total, right, score, missed }) {
        S.addXP(xp);
        updateBadge();
        const remaining = S.dueCards().length;
        return html`<div class="card results">
          <div class="emoji">${score >= 80 ? '🧠' : '🌱'}</div>
          <h1>${graded ? 'Review done' : 'Practice done'}</h1>
          <div class="big">${right}/${total}</div>
          <p class="muted">+${xp} XP${graded ? ' · Words you missed will come back soon; the rest are scheduled further out.' : ''}</p>
          <div class="btn-row" style="justify-content:center">
            ${remaining ? `<button class="btn primary" data-rerun>Review ${remaining} more</button>` : `<a class="btn primary" href="#home">Home</a>`}
            <a class="btn" href="#words">See all words</a>
          </div></div>
          ${missed.length ? html`<div class="card mistakes" style="margin-top:14px"><h3>Missed this time</h3><ul>${missed.map(({ item }) => { const w = S.cardWord(item.cid).word; return `<li>${speakBtn(w[0])} <b>${esc(w[0])}</b> = ${esc(w[1])}</li>`; }).join('')}</ul></div>` : ''}`;
      },
    });
  }

  // ── Verbs: drill + conjugation tables ────────────────────────
  const PRON3 = ['él', 'ella', 'usted'], PRON6 = ['ellos', 'ellas', 'ustedes'];
  function viewVerbs() {
    const tenses = SL.conj.TENSES;
    const open = tenses.filter((t) => S.tenseUnlocked(t));
    let selVerb = SL.verbs[0].inf;
    try { selVerb = sessionStorage.getItem('verb-table') || selVerb; } catch (e) { /* ignore */ }
    const unitName = (id) => { const u = unitById(id); return u ? `Unit ${S.unitIndex(id) + 1}` : id; };

    $app.innerHTML = html`
      <div class="wrap">
        <h1>Verb trainer</h1>
        <p class="muted">Drill conjugations until they’re automatic. New tenses unlock as you reach them on the path.</p>
        <section class="card">
          <h3>Drill</h3>
          ${open.length ? html`
          <div class="field"><label>Tenses</label><div class="chips">
            ${tenses.map((t) => { const on = S.tenseUnlocked(t); return `<label class="chip ${on ? '' : 'disabled'}" title="${on ? esc(t.es) : 'Unlocks after ' + unitName(t.unlock)}"><input type="checkbox" name="tense" value="${t.id}" ${on ? '' : 'disabled'} ${t.id === open[open.length - 1].id ? 'checked' : ''}> ${esc(t.label)}${on ? '' : ' 🔒'}</label>`; }).join('')}
          </div></div>
          <div class="field"><label for="vset">Verbs</label>
            <select id="vset"><option value="all">All ${SL.verbs.length} verbs</option><option value="regular">Regular verbs only</option><option value="irregular">Irregular & stem-changing</option></select></div>
          <div class="field"><label for="vcount">Questions</label>
            <select id="vcount"><option>10</option><option selected>20</option><option>30</option></select></div>
          <div style="margin-top:16px"><button class="btn primary block" id="drill">Start drill</button></div>`
          : html`<div class="empty"><div class="emoji">🔒</div><p class="muted">The trainer opens after <b>${unitName('u6')}</b>, where you learn your first verb pattern.</p><a class="btn primary" href="#path">Go to the path</a></div>`}
        </section>

        <section class="card" style="margin-top:14px">
          <h3>Conjugation tables</h3>
          <div class="field"><label for="vtable">Verb</label>
            <select id="vtable">${SL.verbs.map((v) => `<option value="${esc(v.inf)}" ${v.inf === selVerb ? 'selected' : ''}>${esc(v.inf)} · ${esc(v.en)}</option>`).join('')}</select></div>
          <div class="conj-grid" id="tables" style="margin-top:14px"></div>
        </section>
      </div>`;

    const drawTables = () => {
      const v = $app.querySelector('#vtable').value;
      try { sessionStorage.setItem('verb-table', v); } catch (e) { /* ignore */ }
      $app.querySelector('#tables').innerHTML = tenses.map((t) => {
        const forms = SL.conj.table(v, t.id);
        return html`<div class="card"><h4>${esc(t.label)} ${speakBtn(forms.join(', '))}</h4><div class="locked-note">${esc(t.es)}${S.tenseUnlocked(t) ? '' : ' · ' + unitName(t.unlock)}</div>
          <table>${forms.map((f, i) => `<tr><td>${esc(SL.conj.PERSONS[i])}</td><td><b>${esc(f)}</b></td></tr>`).join('')}</table></div>`;
      }).join('');
    };
    $app.querySelector('#vtable').addEventListener('change', drawTables);
    drawTables();

    const drill = $app.querySelector('#drill');
    if (drill) drill.addEventListener('click', () => {
      const chosen = [...$app.querySelectorAll('input[name=tense]:checked')].map((i) => tenses.find((t) => t.id === i.value));
      if (!chosen.length) { toast('Pick at least one tense'); return; }
      const set = $app.querySelector('#vset').value;
      const n = +$app.querySelector('#vcount').value;
      const isRegular = (v) => !v.pres && !v.pret && !v.pretStem && !v.yo && !v.stem && !v.fut && !v.part && !v.imp && !v.subj;
      const verbs = SL.verbs.filter((v) => set === 'all' || (set === 'regular' ? isRegular(v) : !isRegular(v)));
      const persons = [0, 1, 2, 3, 4, 5].filter((p) => S.state.settings.vosotros || p !== 4);
      const items = [...Array(n)].map(() => {
        const v = verbs[Math.floor(Math.random() * verbs.length)];
        const t = chosen[Math.floor(Math.random() * chosen.length)];
        const p = persons[Math.floor(Math.random() * persons.length)];
        const forms = SL.conj.table(v, t.id);
        const pron = p === 2 ? PRON3[Math.floor(Math.random() * 3)] : p === 5 ? PRON6[Math.floor(Math.random() * 3)] : SL.conj.PERSONS[p];
        return {
          kind: 'type', label: `${t.label} · ${t.es}`, prompt: `${v.inf} → ${pron}`, hint: v.en,
          answers: [forms[p]], say: `${pron} ${forms[p]}`,
          explain: forms.filter((_, i) => persons.includes(i)).join(' · '),
        };
      });
      let xp = 0;
      runSession({
        items, exitHref: '#verbs',
        onAnswer(item, ok, firstTry) { if (ok && firstTry) xp += 1; },
        onDone({ total, right, score, missed }) {
          S.addXP(xp);
          return html`<div class="card results"><div class="emoji">${score >= 90 ? '⚡' : '🔤'}</div><h1>Drill complete</h1><div class="big">${score}%</div>
            <p class="muted">${right} of ${total} right on the first try · +${xp} XP</p>
            <div class="btn-row" style="justify-content:center"><a class="btn primary" href="#verbs">New drill</a><a class="btn" href="#home">Home</a></div></div>
            ${missed.length ? html`<div class="card mistakes" style="margin-top:14px"><h3>Practise these</h3><ul>${missed.map(({ item, result }) => `<li>${esc(item.label.split(' · ')[0])}: ${esc(item.prompt)} → <b>${esc(result.expected)}</b></li>`).join('')}</ul></div>` : ''}`;
        },
      });
    });
  }

  // ── Words ────────────────────────────────────────────────────
  function viewWords() {
    const all = SL.units.filter((u) => S.isUnlocked(u.id)).flatMap((u) => u.vocab.map((w, i) => ({ w, u, cid: u.id + ':' + i })));
    const locked = SL.units.filter((u) => !S.isUnlocked(u.id)).reduce((n, u) => n + u.vocab.length, 0);
    let filter = 'all', q = '';
    $app.innerHTML = html`
      <div class="wrap">
        <h1>Your words</h1>
        <p class="muted">${Object.keys(S.state.cards).length} learned · ${all.length} available${locked ? ` · ${locked} more in locked units` : ''}. Dots show how well each word is remembered.</p>
        <div class="grid search-row">
          <input type="search" id="wq" placeholder="Search Spanish or English…" aria-label="Search words">
          <select id="wf" aria-label="Filter"><option value="all">All available</option><option value="learned">Learned</option><option value="new">Not learned yet</option><option value="due">Due for review</option><option value="hard">Struggling</option><option value="mastered">Mastered</option></select>
        </div>
        <div id="wlist" style="margin-top:14px"></div>
      </div>`;
    const draw = () => {
      const d = S.today();
      const norm = (s) => SL.answers.normalize(s).normalize('NFD').replace(/[̀-ͯ]/g, '');
      const nq = norm(q);
      const rows = all.filter(({ w, cid }) => {
        const c = S.state.cards[cid];
        if (filter === 'learned' && !c) return false;
        if (filter === 'new' && c) return false;
        if (filter === 'due' && !(c && c.due <= d)) return false;
        if (filter === 'hard' && !(c && (c.misses || 0) >= 2 && c.box < 3)) return false;
        if (filter === 'mastered' && !(c && c.box >= SL.srs.MASTERED)) return false;
        return !nq || norm(w[0]).includes(nq) || norm(w[1]).includes(nq);
      });
      const groups = [];
      rows.forEach((r) => { const g = groups[groups.length - 1]; if (g && g.u === r.u) g.rows.push(r); else groups.push({ u: r.u, rows: [r] }); });
      $app.querySelector('#wlist').innerHTML = groups.length ? groups.map((g) => html`
        <h3 style="margin:18px 0 8px">${g.u.icon} ${esc(g.u.title)}</h3>
        <div class="vocab-list">${g.rows.map(({ w, cid }) => { const c = S.state.cards[cid]; return `<div class="vocab-row">${speakBtn(w[0])}<div><div class="es">${esc(w[0])}</div>${w[2] ? `<div class="note">${esc(w[2])}</div>` : ''}</div><div class="en">${esc(w[1])}</div><div class="lvl">${c ? masteryDots(c.box) : '<span class="small muted">new</span>'}</div></div>`; }).join('')}</div>`).join('')
        : `<div class="card empty"><div class="emoji">🔍</div><p class="muted">No words match.</p></div>`;
    };
    $app.querySelector('#wq').addEventListener('input', (e) => { q = e.target.value; draw(); });
    $app.querySelector('#wf').addEventListener('change', (e) => { filter = e.target.value; draw(); });
    draw();
  }

  // ── Settings ─────────────────────────────────────────────────
  function viewSettings() {
    const s = S.state.settings;
    $app.innerHTML = html`
      <div class="wrap">
        <h1>Settings</h1>
        <section class="card">
          <h3>Learning</h3>
          <label class="toggle"><span><b>Free mode</b><br><span class="small muted">Unlock every unit and verb tense. Use this if you already know some Spanish.</span></span><input type="checkbox" data-set="freeMode" ${s.freeMode ? 'checked' : ''}></label>
          <label class="toggle"><span><b>Include “vosotros”</b><br><span class="small muted">Used in Spain. Turn off to skip it in verb drills if you’re learning Latin American Spanish.</span></span><input type="checkbox" data-set="vosotros" ${s.vosotros ? 'checked' : ''}></label>
          <div class="toggle"><label for="goal"><b>Daily goal</b></label><select id="goal">${[10, 20, 30, 50, 80].map((g) => `<option value="${g}" ${g === s.goal ? 'selected' : ''}>${g} XP</option>`).join('')}</select></div>
          <div class="toggle"><label for="rsize"><b>Words per review</b></label><select id="rsize">${[10, 20, 30, 50].map((g) => `<option value="${g}" ${g === s.reviewSize ? 'selected' : ''}>${g}</option>`).join('')}</select></div>
        </section>

        <section class="card" style="margin-top:14px">
          <h3>Audio</h3>
          ${TTS.supported ? html`
          <label class="toggle"><span><b>Read Spanish aloud</b><br><span class="small muted">Speak words and answers automatically during practice.</span></span><input type="checkbox" data-set="autoSpeak" ${s.autoSpeak ? 'checked' : ''}></label>
          <div class="field" style="margin-top:12px"><label for="voice">Voice</label>
            <select id="voice">${TTS.voices.length ? TTS.voices.map((v) => `<option value="${esc(v.name)}" ${TTS.voice() === v ? 'selected' : ''}>${esc(v.name)} (${esc(v.lang)})</option>`).join('') : '<option>No Spanish voice found on this device</option>'}</select></div>
          <div class="field"><label for="rate">Speed <span class="muted" id="rate-val">${s.rate.toFixed(2)}×</span></label><input type="range" id="rate" min="0.5" max="1.2" step="0.05" value="${s.rate}"></div>
          <button class="btn small" data-say="Hola, ¿qué tal? Me llamo Lucía y aprendo español.">🔊 Test voice</button>
          ${TTS.voices.length ? '' : '<p class="small muted" style="margin-top:10px">Listening exercises are skipped until a Spanish voice is installed. Add one in your system’s text-to-speech settings.</p>'}`
          : '<p class="muted">This browser doesn’t support speech synthesis, so audio is turned off.</p>'}
        </section>

        <section class="card" style="margin-top:14px">
          <h3>Appearance</h3>
          <div class="toggle"><label for="theme"><b>Theme</b></label><select id="theme">${[['auto', 'Match system'], ['light', 'Light'], ['dark', 'Dark']].map(([v, l]) => `<option value="${v}" ${v === s.theme ? 'selected' : ''}>${l}</option>`).join('')}</select></div>
        </section>

        <section class="card" style="margin-top:14px">
          <h3>Your data</h3>
          <p class="small muted">Progress is saved in this browser only. To move it to another browser or device, copy a backup code here and paste it there.</p>
          <div class="btn-row">
            <button class="btn small" id="export">Copy backup code</button>
            <button class="btn small" id="show-import">Paste backup code</button>
            <label class="btn small" style="cursor:pointer">Import from file<input type="file" id="import" accept="application/json,.json" hidden></label>
          </div>
          <div id="backup-box" hidden style="margin-top:12px">
            <label for="backup-text" class="small"><b id="backup-label">Backup code</b></label>
            <textarea id="backup-text" rows="5" spellcheck="false" style="width:100%;margin-top:6px;padding:10px;border-radius:10px;border:1px solid var(--line);background:var(--surface);font:12px/1.4 ui-monospace,monospace"></textarea>
            <div class="btn-row" style="margin-top:8px"><button class="btn small primary" id="do-import" hidden>Restore this backup</button></div>
          </div>
          <div class="btn-row" style="margin-top:16px">
            <button class="btn small bad" id="reset">Reset everything</button>
            <span id="reset-confirm" hidden class="small"><b>Delete all progress, words and settings?</b> This can’t be undone.
              <button class="btn small bad" id="reset-yes">Yes, delete</button> <button class="btn small" id="reset-no">Cancel</button></span>
          </div>
        </section>
      </div>`;

    $app.querySelectorAll('[data-set]').forEach((el) => el.addEventListener('change', () => { S.setSetting(el.dataset.set, el.checked); toast('Saved'); }));
    const bindSelect = (id, key, conv = (x) => x, after) => {
      const el = $app.querySelector('#' + id);
      el && el.addEventListener('change', () => { S.setSetting(key, conv(el.value)); after && after(); toast('Saved'); });
    };
    bindSelect('goal', 'goal', Number);
    bindSelect('rsize', 'reviewSize', Number);
    bindSelect('voice', 'voice');
    bindSelect('theme', 'theme', String, applyTheme);
    const rate = $app.querySelector('#rate');
    rate && rate.addEventListener('input', () => { S.setSetting('rate', +rate.value); $app.querySelector('#rate-val').textContent = (+rate.value).toFixed(2) + '×'; });
    const box = $app.querySelector('#backup-box'), text = $app.querySelector('#backup-text');
    const doImport = $app.querySelector('#do-import'), label = $app.querySelector('#backup-label');
    $app.querySelector('#export').addEventListener('click', () => {
      const code = JSON.stringify(S.state);
      box.hidden = false; doImport.hidden = true; label.textContent = 'Your backup code';
      text.value = code; text.readOnly = true;
      const fallback = () => { text.focus(); text.select(); toast('Select all and copy the code'); };
      try {
        navigator.clipboard.writeText(code).then(() => toast('Backup code copied'), fallback);
      } catch (err) { fallback(); }
    });
    $app.querySelector('#show-import').addEventListener('click', () => {
      box.hidden = false; doImport.hidden = false; label.textContent = 'Paste your backup code';
      text.readOnly = false; text.value = ''; text.focus();
    });
    doImport.addEventListener('click', () => {
      try { S.importJSON(text.value.trim()); applyTheme(); toast('Progress restored'); location.hash = '#home'; route(); }
      catch (err) { toast('That code isn’t a valid backup. Copy it again and paste the whole code.'); }
    });
    $app.querySelector('#import').addEventListener('change', async (e) => {
      const f = e.target.files[0]; if (!f) return;
      try { S.importJSON(await f.text()); applyTheme(); toast('Progress imported'); route(); }
      catch (err) { toast('That file could not be imported'); }
    });
    const resetBtn = $app.querySelector('#reset'), resetBox = $app.querySelector('#reset-confirm');
    resetBtn.addEventListener('click', () => { resetBtn.hidden = true; resetBox.hidden = false; });
    $app.querySelector('#reset-no').addEventListener('click', () => { resetBtn.hidden = false; resetBox.hidden = true; });
    $app.querySelector('#reset-yes').addEventListener('click', () => { S.reset(); applyTheme(); toast('Progress reset'); location.hash = '#home'; route(); });
  }

  // ── Boot ─────────────────────────────────────────────────────
  applyTheme();
  window.addEventListener('hashchange', route);
  route();
})(globalThis.SL);
