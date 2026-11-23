/* Leitner-style spaced repetition.
 * Box 0 = new/lapsed (due now). Each correct answer moves a card up one box and
 * schedules it further out; a miss sends it back to box 0.
 */
(function (SL) {
  const INTERVALS = [0, 1, 3, 7, 16, 35, 90]; // days, indexed by box
  const MASTERED = 5;

  function addDays(iso, n) {
    const d = new Date(iso + 'T12:00:00Z');
    d.setUTCDate(d.getUTCDate() + n);
    return d.toISOString().slice(0, 10);
  }

  function today() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  function newCard(day) {
    return { box: 0, due: day || today(), seen: 0, misses: 0 };
  }

  function grade(card, correct, day) {
    day = day || today();
    const c = Object.assign({}, card, { seen: (card.seen || 0) + 1 });
    if (correct) {
      c.box = Math.min(card.box + 1, INTERVALS.length - 1);
      c.due = addDays(day, INTERVALS[c.box]);
    } else {
      c.box = 0;
      c.misses = (card.misses || 0) + 1;
      c.due = day;
    }
    return c;
  }

  const isDue = (card, day) => card.due <= (day || today());

  SL.srs = { INTERVALS, MASTERED, newCard, grade, isDue, today, addDays };
})(globalThis.SL = globalThis.SL || {});
