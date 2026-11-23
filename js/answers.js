/* Forgiving answer checking.
 * status: 'correct' | 'accent' (right except accent marks) | 'typo' (one-letter slip) | 'wrong'
 * Answers may contain optional parts in parentheses: "(yo) soy estudiante".
 */
(function (SL) {
  function normalize(s) {
    return String(s)
      .normalize('NFC')
      .toLowerCase()
      .replace(/[¿?¡!.,;:"“”«»]/g, ' ')
      .replace(/[’`´]/g, "'")
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Strip accents from vowels/ü but keep ñ (it is a different letter, not an accent).
  function stripAccents(s) {
    return s.replace(/ñ/g, '\u0001').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\u0001/g, 'ñ');
  }

  // "(yo) soy (un) estudiante" → all combinations with/without each optional part
  function expand(ans) {
    const m = ans.match(/\(([^)]*)\)/);
    if (!m) return [ans];
    const before = ans.slice(0, m.index), after = ans.slice(m.index + m[0].length);
    return [...expand(before + m[1] + after), ...expand(before + after)];
  }

  function display(ans) {
    return ans.replace(/\(([^)]*)\)\s*/g, '$1 ').replace(/\s+/g, ' ').trim();
  }

  function lev(a, b) {
    if (Math.abs(a.length - b.length) > 1) return 2;
    const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
    for (let j = 1; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++)
      for (let j = 1; j <= b.length; j++)
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[a.length][b.length];
  }

  function check(input, answers) {
    const given = normalize(input);
    const list = (Array.isArray(answers) ? answers : [answers]);
    if (!given) return { status: 'wrong', expected: display(list[0]) };
    let best = null;
    for (const raw of list) {
      for (const variant of expand(raw)) {
        const exp = normalize(variant);
        if (given === exp) return { status: 'correct', expected: display(raw) };
        if (stripAccents(given) === stripAccents(exp)) best = best || { status: 'accent', expected: display(raw) };
        else if (!best && stripAccents(exp).length >= 6 && lev(stripAccents(given), stripAccents(exp)) === 1)
          best = { status: 'typo', expected: display(raw) };
      }
    }
    return best || { status: 'wrong', expected: display(list[0]) };
  }

  SL.answers = { check, normalize, display, isPass: (r) => r.status !== 'wrong' };
})(globalThis.SL = globalThis.SL || {});
