/* Level B1 — units 22–28. See units-a1.js for the unit shape. */
(function (SL) {
  SL.units = SL.units || [];
  SL.units.push(
    // ───────────────────────────────────────── 22
    {
      id: 'u22', level: 'B1', icon: '⛰️',
      title: 'Comparisons, nature & weather',
      summary: 'More than, less than, as … as, the best, and the weather.',
      grammar: [
        {
          h: 'Comparatives',
          table: {
            head: ['Structure', 'Example'],
            rows: [
              ['más + adj + que', 'El mar es más grande que el lago.'],
              ['menos + adj + que', 'La isla es menos cara que la ciudad.'],
              ['tan + adj + como', 'Esta montaña es tan alta como aquella.'],
              ['tanto/a/os/as + noun + como', 'Hoy hace tanto calor como ayer.'],
            ],
          },
          tip: 'Irregular comparatives: <em>bueno → mejor</em>, <em>malo → peor</em>, <em>mayor</em> (older), <em>menor</em> (younger).',
        },
        {
          h: 'Superlatives',
          p: '<p><strong>el / la / los / las + (noun) + más + adjective + de</strong>. Note it is <em>de</em>, not <em>en</em>, for “in”. For “extremely”, add <strong>-ísimo</strong>: <em>bonito → bonitísimo</em>, <em>caro → carísimo</em>.</p>',
          ex: [['Es el río más largo de España.', "It's the longest river in Spain."], ['Es el mejor restaurante de la ciudad.', "It's the best restaurant in the city."]],
        },
        {
          h: 'Talking about the weather',
          p: '<p>Use <strong>hace</strong> for many weather expressions: <em>hace calor / frío / sol / viento / buen tiempo / mal tiempo</em>. For rain and snow use the verbs: <em>llueve</em>, <em>nieva</em>. Ask with <em>¿Qué tiempo hace?</em></p>',
        },
      ],
      vocab: [
        ['el río', 'river'], ['la montaña', 'mountain'], ['el mar', 'sea'], ['el lago', 'lake'],
        ['el bosque', 'forest'], ['la isla', 'island'], ['el cielo', 'sky'], ['el árbol', 'tree'],
        ['la flor', 'flower'], ['el tiempo', 'weather / time'], ['hace calor', "it's hot"], ['hace frío', "it's cold"],
        ['llueve', "it's raining"], ['mejor', 'better / best'], ['peor', 'worse / worst'],
      ],
      exercises: [
        { type: 'fill', q: 'El mar es ___ grande que el lago.', answer: ['más'] },
        { type: 'fill', q: 'Esta montaña es tan alta ___ aquella.', answer: ['como'] },
        { type: 'fill', q: 'Mi hermano es ___ que yo.', answer: ['mayor'], hint: 'older' },
        { type: 'fill', q: 'Hoy hace ___ calor como ayer.', answer: ['tanto'], hint: 'as much heat as' },
        { type: 'mc', q: '“the best restaurant in the city”', options: ['el mejor restaurante de la ciudad', 'el más bueno restaurante de la ciudad', 'el restaurante mejor que la ciudad', 'el mejor restaurante que la ciudad'], answer: 0 },
        { type: 'mc', q: '“extremely pretty” (bonito)', options: ['bonitísimo', 'muy bonitísimo', 'bonitoísimo', 'más bonito'], answer: 0 },
        { type: 'mc', q: '“This river is the longest in Spain.”', options: ['Este río es el más largo de España.', 'Este río es el más largo en España.', 'Este río es más largo que España.', 'Este río es el largo más de España.'], answer: 0 },
        { type: 'translate', q: 'Madrid is bigger than Toledo.', answer: ['Madrid es más grande que Toledo.'] },
        { type: 'translate', q: "It's cold today.", answer: ['Hoy hace frío.', 'Hace frío hoy.'] },
        { type: 'translate', q: 'This film is worse than the book.', answer: ['Esta película es peor que el libro.'], hint: 'film = la película' },
        { type: 'order', q: 'The island is less expensive than the city.', answer: 'La isla es menos cara que la ciudad.' },
      ],
    },

    // ───────────────────────────────────────── 23
    {
      id: 'u23', level: 'B1', icon: '💼',
      title: 'Por vs para & the world of work',
      summary: 'Two words for “for”, and how to talk about your job.',
      grammar: [
        {
          h: 'Para: goals and destinations',
          p: '<p>Think of <strong>para</strong> as pointing <em>forward</em> to an end point.</p>',
          table: {
            head: ['Use', 'Example'],
            rows: [
              ['purpose: in order to', 'Estudio para ser médico.'], ['destination', 'Salgo para Madrid.'],
              ['recipient', 'Este regalo es para ti.'], ['deadline', 'Lo necesito para el lunes.'],
              ['employer', 'Trabajo para una empresa alemana.'], ['opinion', 'Para mí, es importante.'],
            ],
          },
        },
        {
          h: 'Por: causes, routes and exchanges',
          p: '<p>Think of <strong>por</strong> as looking <em>back</em> to a cause, or moving <em>through</em> something.</p>',
          table: {
            head: ['Use', 'Example'],
            rows: [
              ['cause / reason', 'Gracias por tu ayuda.'], ['through / along', 'Caminamos por el parque.'],
              ['exchange / price', 'Pagué 20 euros por la camisa.'], ['means', 'Hablo con él por teléfono.'],
              ['duration', 'Trabajé allí por dos años.'], ['per / rate', 'dos veces por semana'],
            ],
          },
          tip: 'Fixed expressions: <em>por favor, por fin, por eso</em> (that’s why), <em>por supuesto</em> (of course), <em>por ejemplo</em>.',
        },
      ],
      vocab: [
        ['el trabajo', 'job / work'], ['la empresa', 'company'], ['la oficina', 'office'], ['el jefe', 'boss', 'f. la jefa'],
        ['la reunión', 'meeting'], ['el sueldo', 'salary'], ['la entrevista', 'interview'], ['el horario', 'schedule / hours'],
        ['contratar', 'to hire'], ['ganar', 'to earn / win'], ['el compañero de trabajo', 'coworker'],
        ['jubilarse', 'to retire'], ['por eso', "that's why"], ['por supuesto', 'of course'],
      ],
      exercises: [
        { type: 'fill', q: 'Este regalo es ___ ti.', answer: ['para'] },
        { type: 'fill', q: 'Gracias ___ tu ayuda.', answer: ['por'] },
        { type: 'fill', q: 'Estudio ___ ser médico.', answer: ['para'] },
        { type: 'fill', q: 'Caminamos ___ el parque.', answer: ['por'] },
        { type: 'fill', q: 'Trabajo ___ una empresa alemana.', answer: ['para'] },
        { type: 'fill', q: 'Pagué 20 euros ___ la camisa.', answer: ['por'] },
        { type: 'fill', q: 'Necesito el informe ___ el lunes.', answer: ['para'], hint: 'deadline' },
        { type: 'mc', q: '“twice a week”', options: ['dos veces por semana', 'dos veces para semana', 'dos vez por semana', 'dos veces para la semana'], answer: 0 },
        { type: 'mc', q: '“That’s why I’m tired.”', options: ['Por eso estoy cansado.', 'Para eso estoy cansado.', 'Porque eso estoy cansado.', 'Por eso soy cansado.'], answer: 0 },
        { type: 'translate', q: 'For me, work is important.', answer: ['Para mí, el trabajo es importante.'] },
        { type: 'translate', q: 'I talk to my boss by phone.', answer: ['(Yo) hablo con mi jefe por teléfono.', '(Yo) hablo con mi jefa por teléfono.'] },
        { type: 'order', q: 'The meeting is for tomorrow.', answer: 'La reunión es para mañana.' },
      ],
    },

    // ───────────────────────────────────────── 24
    {
      id: 'u24', level: 'B1', icon: '🔮',
      title: 'Future & conditional',
      summary: 'What will happen and what would happen.',
      grammar: [
        {
          h: 'The simple future',
          p: '<p>Add the endings to the <strong>whole infinitive</strong>: <strong>-é, -ás, -á, -emos, -éis, -án</strong>. They are the same for -ar, -er and -ir.</p>',
          ex: [['Mañana lloverá.', 'It will rain tomorrow.'], ['Viviremos en Chile.', 'We will live in Chile.']],
          tip: 'In conversation, <em>ir a + infinitive</em> is more common for plans. The simple future also expresses guesses: <em>¿Dónde estará Juan?</em> = I wonder where Juan is.',
        },
        {
          h: 'The conditional',
          p: '<p>Same idea, with the endings <strong>-ía, -ías, -ía, -íamos, -íais, -ían</strong>. Use it for <em>would</em>, polite requests and advice.</p>',
          ex: [['Me gustaría viajar.', 'I would like to travel.'], ['¿Podría ayudarme?', 'Could you help me?'], ['Yo que tú, diría la verdad.', 'If I were you, I would tell the truth.']],
        },
        {
          h: 'Irregular stems (both tenses)',
          table: {
            head: ['Verb', 'Stem', 'Future', 'Conditional'],
            rows: [
              ['tener', 'tendr-', 'tendré', 'tendría'], ['poder', 'podr-', 'podré', 'podría'], ['salir', 'saldr-', 'saldré', 'saldría'],
              ['venir', 'vendr-', 'vendré', 'vendría'], ['poner', 'pondr-', 'pondré', 'pondría'], ['saber', 'sabr-', 'sabré', 'sabría'],
              ['hacer', 'har-', 'haré', 'haría'], ['decir', 'dir-', 'diré', 'diría'], ['querer', 'querr-', 'querré', 'querría'],
              ['haber', 'habr-', 'habrá', 'habría'],
            ],
          },
        },
      ],
      vocab: [
        ['el futuro', 'future'], ['el plan', 'plan'], ['el sueño', 'dream / sleepiness'], ['algún día', 'someday'],
        ['pronto', 'soon'], ['el próximo año', 'next year'], ['dentro de', 'in (time from now)'], ['probablemente', 'probably'],
        ['me gustaría', 'I would like'], ['ahorrar', 'to save (money)'], ['mudarse', 'to move (house)'], ['cambiar', 'to change'],
        ['el mundo', 'world'], ['la vida', 'life'],
      ],
      exercises: [
        { type: 'fill', q: 'Mañana ___.', answer: ['lloverá'], hint: 'llover (future)' },
        { type: 'fill', q: 'El próximo año nosotros ___ a Chile.', answer: ['viajaremos'], hint: 'viajar (future)' },
        { type: 'fill', q: 'Yo ___ más tiempo en verano.', answer: ['tendré'], hint: 'tener (future)' },
        { type: 'fill', q: '¿Qué ___ tú?', answer: ['harás'], hint: 'hacer (future)' },
        { type: 'fill', q: '¿___ ayudarme, por favor?', answer: ['podría'], hint: 'poder, usted (conditional)' },
        { type: 'fill', q: 'Yo que tú, ___ la verdad.', answer: ['diría'], hint: 'decir (conditional)' },
        { type: 'fill', q: 'Me ___ vivir en la playa.', answer: ['gustaría'], hint: 'gustar (conditional)' },
        { type: 'mc', q: '“They will come soon.”', options: ['Vendrán pronto.', 'Venirán pronto.', 'Vendrían pronto.', 'Venderán pronto.'], answer: 0 },
        { type: 'mc', q: '“It’s probably three o’clock.” (a guess)', options: ['Serán las tres.', 'Son las tres.', 'Será las tres.', 'Fueron las tres.'], answer: 0, explain: 'The future of probability expresses a guess about the present.' },
        { type: 'translate', q: 'Someday I will live in Spain.', answer: ['Algún día viviré en España.'] },
        { type: 'order', q: 'We would like to change our life.', answer: 'Nos gustaría cambiar nuestra vida.' },
      ],
    },

    // ───────────────────────────────────────── 25
    {
      id: 'u25', level: 'B1', icon: '🏆',
      title: 'Present perfect: experiences',
      summary: 'Have you ever…? I have never… We have already…',
      grammar: [
        {
          h: 'haber + past participle',
          p: '<p>Form the present perfect with the present of <strong>haber</strong> plus a past participle: <strong>-ar → -ado</strong>, <strong>-er/-ir → -ido</strong>. The participle never changes.</p>',
          table: {
            head: ['Person', 'haber', 'example'],
            rows: [['yo', 'he', 'he hablado'], ['tú', 'has', 'has comido'], ['él / ella / usted', 'ha', 'ha vivido'], ['nosotros', 'hemos', 'hemos visto'], ['vosotros', 'habéis', 'habéis hecho'], ['ellos / ustedes', 'han', 'han vuelto']],
          },
        },
        {
          h: 'Irregular participles',
          p: '<p>hacer → <strong>hecho</strong> · decir → <strong>dicho</strong> · ver → <strong>visto</strong> · escribir → <strong>escrito</strong> · poner → <strong>puesto</strong> · volver → <strong>vuelto</strong> · abrir → <strong>abierto</strong> · romper → <strong>roto</strong> · morir → <strong>muerto</strong> · descubrir → <strong>descubierto</strong></p>',
        },
        {
          h: 'When to use it',
          p: '<p>For life experiences and for past actions in a time period that is still going on (today, this week, this year). Nothing can go between <em>haber</em> and the participle. Pronouns go before <em>haber</em>.</p>',
          ex: [['¿Has estado alguna vez en México?', 'Have you ever been to Mexico?'], ['Nunca he probado el sushi.', 'I have never tried sushi.'], ['Esta mañana he hecho ejercicio.', 'This morning I have exercised.'], ['Se lo hemos dicho.', 'We have told him.']],
          tip: 'Spain uses this tense a lot for things that happened today. Much of Latin America prefers the preterite: <em>Esta mañana hice ejercicio</em>.',
        },
      ],
      vocab: [
        ['alguna vez', 'ever'], ['nunca', 'never'], ['todavía no', 'not yet'], ['ya', 'already'],
        ['esta mañana', 'this morning'], ['este año', 'this year'], ['hasta ahora', 'so far'], ['probar', 'to try / taste'],
        ['descubrir', 'to discover'], ['la experiencia', 'experience'], ['increíble', 'incredible'], ['conseguir', 'to achieve / get'],
        ['últimamente', 'lately'], ['montar a caballo', 'to ride a horse'],
      ],
      exercises: [
        { type: 'fill', q: 'Yo ___ paella muchas veces.', answer: ['he comido'], hint: 'comer' },
        { type: 'fill', q: '¿___ alguna vez en México?', answer: ['has estado'], hint: 'estar, tú' },
        { type: 'fill', q: 'Nosotros todavía no ___ la película.', answer: ['hemos visto'], hint: 'ver' },
        { type: 'fill', q: 'Ella ___ un libro.', answer: ['ha escrito'], hint: 'escribir' },
        { type: 'fill', q: '¿Quién ___ la ventana?', answer: ['ha roto'], hint: 'romper' },
        { type: 'fill', q: 'Esta mañana ___ ejercicio.', answer: ['he hecho'], hint: 'hacer, yo' },
        { type: 'fill', q: 'Ellos ya ___.', answer: ['han vuelto'], hint: 'volver' },
        { type: 'mc', q: '“I have never tried sushi.”', options: ['Nunca he probado el sushi.', 'No he nunca probado el sushi.', 'He nunca probado el sushi.', 'Nunca ha probado el sushi.'], answer: 0 },
        { type: 'mc', q: '“We have told it to him.”', options: ['Se lo hemos dicho.', 'Hemos se lo dicho.', 'Le lo hemos dicho.', 'Se lo hemos decido.'], answer: 0 },
        { type: 'translate', q: 'Have you (tú) ever been to Spain?', answer: ['¿Has estado alguna vez en España?', '¿Alguna vez has estado en España?'] },
        { type: 'order', q: 'I have opened the door.', answer: 'He abierto la puerta.' },
      ],
    },

    // ───────────────────────────────────────── 26
    {
      id: 'u26', level: 'B1', icon: '🩺',
      title: 'Commands & health',
      summary: 'Give instructions and advice: ¡Habla! ¡Ven! ¡No comas eso!',
      grammar: [
        {
          h: 'Affirmative tú commands',
          p: '<p>Use the <strong>él/ella</strong> form of the present: <em>hablar → habla</em>, <em>comer → come</em>, <em>escribir → escribe</em>.</p>',
          table: {
            head: ['Verb', 'tú command'],
            rows: [['decir', 'di'], ['hacer', 'haz'], ['ir', 've'], ['poner', 'pon'], ['salir', 'sal'], ['ser', 'sé'], ['tener', 'ten'], ['venir', 'ven']],
          },
        },
        {
          h: 'Usted, ustedes and all negative commands',
          p: '<p>Take the yo form, drop the -o, and add the <strong>“opposite” vowel</strong>: -ar verbs take <strong>-e</strong>, -er/-ir verbs take <strong>-a</strong>. These are present subjunctive forms, which you will study next.</p>',
          table: {
            head: ['Verb', 'usted', 'ustedes', 'no (tú)'],
            rows: [['tomar', 'tome', 'tomen', 'no tomes'], ['comer', 'coma', 'coman', 'no comas'], ['hacer (hago)', 'haga', 'hagan', 'no hagas'], ['ir', 'vaya', 'vayan', 'no vayas']],
          },
        },
        {
          h: 'Pronouns with commands',
          p: '<p>Pronouns <strong>attach</strong> to affirmative commands, often with a written accent. They go <strong>before</strong> negative commands.</p>',
          ex: [['¡Siéntate!', 'Sit down!'], ['Dímelo.', 'Tell me (it).'], ['¡No me lo digas!', "Don't tell me!"], ['Descansa y bebe mucha agua.', 'Rest and drink lots of water.']],
        },
      ],
      vocab: [
        ['la cabeza', 'head'], ['el estómago', 'stomach'], ['la espalda', 'back'], ['la garganta', 'throat'],
        ['el brazo', 'arm'], ['la pierna', 'leg'], ['el pie', 'foot'], ['el dolor', 'pain'],
        ['doler', 'to hurt', 'me duele la cabeza'], ['la fiebre', 'fever'], ['la receta', 'prescription / recipe'],
        ['descansar', 'to rest'], ['la pastilla', 'pill'], ['la farmacia', 'pharmacy'],
      ],
      exercises: [
        { type: 'fill', q: '¡___ más despacio!', answer: ['habla'], hint: 'hablar, tú' },
        { type: 'fill', q: '¡___ aquí!', answer: ['ven'], hint: 'venir, tú' },
        { type: 'fill', q: '¡___ los deberes!', answer: ['haz'], hint: 'hacer, tú' },
        { type: 'fill', q: '¡___ la verdad!', answer: ['di'], hint: 'decir, tú' },
        { type: 'fill', q: '___ esta pastilla.', answer: ['tome'], hint: 'tomar, usted' },
        { type: 'fill', q: '¡No ___ eso!', answer: ['comas'], hint: 'comer, tú (negative)' },
        { type: 'fill', q: '___ mucho.', answer: ['descansen'], hint: 'descansar, ustedes' },
        { type: 'mc', q: '“Sit down!” (tú)', options: ['¡Siéntate!', '¡Siéntete!', '¡Te sienta!', '¡Sienta te!'], answer: 0 },
        { type: 'mc', q: '“Don’t tell me!” (tú)', options: ['¡No me lo digas!', '¡No dímelo!', '¡No me lo dices!', '¡No digas me lo!'], answer: 0 },
        { type: 'translate', q: 'My head hurts.', answer: ['Me duele la cabeza.'] },
        { type: 'order', q: 'Rest and drink lots of water. (tú)', answer: 'Descansa y bebe mucha agua.' },
      ],
    },

    // ───────────────────────────────────────── 27
    {
      id: 'u27', level: 'B1', icon: '🌠',
      title: 'Subjunctive: wishes, emotions & advice',
      summary: 'Quiero que vengas. Ojalá haga sol. Espero que estés bien.',
      grammar: [
        {
          h: 'Forming the present subjunctive',
          p: '<p>Take the <strong>yo</strong> form of the present, drop the -o, and add the opposite vowel endings. Irregular yo forms carry over: <em>tengo → tenga, hago → haga, conozco → conozca</em>.</p>',
          table: {
            head: ['Person', 'hablar', 'comer', 'vivir', 'tener'],
            rows: [
              ['yo', 'hable', 'coma', 'viva', 'tenga'], ['tú', 'hables', 'comas', 'vivas', 'tengas'], ['él / ella / usted', 'hable', 'coma', 'viva', 'tenga'],
              ['nosotros', 'hablemos', 'comamos', 'vivamos', 'tengamos'], ['vosotros', 'habléis', 'comáis', 'viváis', 'tengáis'], ['ellos / ustedes', 'hablen', 'coman', 'vivan', 'tengan'],
            ],
          },
          tip: 'Fully irregular: <em>ser → sea</em>, <em>estar → esté</em>, <em>ir → vaya</em>, <em>saber → sepa</em>, <em>dar → dé</em>, <em>haber → haya</em>.',
        },
        {
          h: 'When to use it',
          p: '<p>The subjunctive appears in a <strong>que</strong>-clause when the main clause expresses a <strong>wish</strong>, an <strong>emotion</strong>, or a <strong>request or recommendation</strong>, and the two clauses have <strong>different subjects</strong>. With the same subject, use the infinitive.</p>',
          ex: [['Quiero ir. / Quiero que vayas.', 'I want to go. / I want you to go.'], ['Ojalá haga buen tiempo.', 'Hopefully the weather will be nice.'], ['Me alegro de que estés aquí.', "I'm glad you're here."], ['Te recomiendo que vayas al médico.', 'I recommend that you go to the doctor.'], ['Es importante que lleguemos temprano.', "It's important that we arrive early."]],
        },
      ],
      vocab: [
        ['esperar', 'to hope / wait'], ['ojalá', 'hopefully / I wish'], ['alegrarse', 'to be glad'], ['sentir', 'to feel / be sorry'],
        ['recomendar', 'to recommend'], ['sugerir', 'to suggest'], ['aconsejar', 'to advise'], ['preocuparse', 'to worry'],
        ['molestar', 'to bother'], ['el deseo', 'wish'], ['la suerte', 'luck'], ['es importante', "it's important"],
        ['es necesario', "it's necessary"], ['aprobar', 'to pass (an exam)'],
      ],
      exercises: [
        { type: 'fill', q: 'Quiero que tú ___ a la fiesta.', answer: ['vengas'], hint: 'venir' },
        { type: 'fill', q: 'Ojalá ___ buen tiempo mañana.', answer: ['haga'], hint: 'hacer' },
        { type: 'fill', q: 'Espero que ustedes ___ bien.', answer: ['estén'], hint: 'estar' },
        { type: 'fill', q: 'Me alegro de que ___ feliz.', answer: ['seas'], hint: 'ser, tú' },
        { type: 'fill', q: 'Te recomiendo que ___ al médico.', answer: ['vayas'], hint: 'ir' },
        { type: 'fill', q: 'Es importante que nosotros ___ temprano.', answer: ['lleguemos'], hint: 'llegar' },
        { type: 'fill', q: 'Mis padres quieren que yo ___ medicina.', answer: ['estudie'], hint: 'estudiar' },
        { type: 'mc', q: '“I want to go.”', options: ['Quiero ir.', 'Quiero que voy.', 'Quiero que vaya.', 'Quiero yo ir.'], answer: 0, explain: 'Same subject → infinitive.' },
        { type: 'mc', q: '“I hope you pass the exam.”', options: ['Espero que apruebes el examen.', 'Espero que apruebas el examen.', 'Espero aprobar el examen.', 'Espero que aprobarás el examen.'], answer: 0 },
        { type: 'translate', q: 'I hope you (tú) have luck.', answer: ['Espero que tengas suerte.', 'Ojalá tengas suerte.'] },
        { type: 'order', q: 'It is necessary that you (tú) rest.', answer: 'Es necesario que descanses.' },
      ],
    },

    // ───────────────────────────────────────── 28
    {
      id: 'u28', level: 'B1', icon: '🤔',
      title: 'Subjunctive: doubt, time & purpose',
      summary: 'Dudo que…, cuando llegues…, para que…: the subjunctive in more contexts.',
      grammar: [
        {
          h: 'Doubt and denial vs certainty',
          table: {
            head: ['Subjunctive (doubt)', 'Indicative (certainty)'],
            rows: [
              ['Dudo que venga.', 'Creo que viene.'], ['No creo que tenga razón.', 'Estoy seguro de que tiene razón.'],
              ['No es verdad que sea caro.', 'Es verdad que es caro.'], ['Es posible que llueva.', 'Es obvio que llueve.'],
            ],
          },
        },
        {
          h: 'Time clauses about the future',
          p: '<p>After <strong>cuando, en cuanto, hasta que, después de que</strong>, use the subjunctive when the action has <em>not happened yet</em>. For habits or the past, use the indicative. <strong>Antes de que</strong> and <strong>para que</strong> always take the subjunctive.</p>',
          ex: [['Cuando llegues, llámame.', 'When you arrive, call me.'], ['Cuando llego a casa, ceno.', 'When I get home, I have dinner. (habit)'], ['Te lo explico para que lo entiendas.', "I'm explaining it so that you understand."]],
        },
        {
          h: 'Unknown or non-existent things',
          p: '<p>When you describe something you are looking for but that may not exist, use the subjunctive.</p>',
          ex: [['Busco un piso que tenga jardín.', "I'm looking for a flat that has a garden."], ['No hay nadie que sepa la respuesta.', 'There is nobody who knows the answer.']],
        },
      ],
      vocab: [
        ['dudar', 'to doubt'], ['creer', 'to believe / think'], ['quizás', 'perhaps'], ['es posible', "it's possible"],
        ['es probable', "it's likely"], ['seguro', 'sure / safe'], ['en cuanto', 'as soon as'], ['hasta que', 'until'],
        ['antes de que', 'before'], ['para que', 'so that'], ['aunque', 'although / even if'], ['la duda', 'doubt'],
        ['la opinión', 'opinion'], ['estar de acuerdo', 'to agree'],
      ],
      exercises: [
        { type: 'fill', q: 'Dudo que él ___ la respuesta.', answer: ['sepa'], hint: 'saber' },
        { type: 'fill', q: 'Creo que ella ___ razón.', answer: ['tiene'], hint: 'tener', explain: 'creer que expresses belief → indicative.' },
        { type: 'fill', q: 'No creo que ___ hoy.', answer: ['llueva'], hint: 'llover' },
        { type: 'fill', q: 'Cuando ___, llámame.', answer: ['llegues'], hint: 'llegar, tú' },
        { type: 'fill', q: 'Te llamo en cuanto ___ del trabajo.', answer: ['salga'], hint: 'salir, yo' },
        { type: 'fill', q: 'Busco un piso que ___ jardín.', answer: ['tenga'], hint: 'tener' },
        { type: 'fill', q: 'Te lo explico para que lo ___.', answer: ['entiendas'], hint: 'entender, tú' },
        { type: 'mc', q: '“I’m sure he’s coming.”', options: ['Estoy seguro de que viene.', 'Estoy seguro de que venga.', 'Dudo que viene.', 'Estoy seguro de que vendría.'], answer: 0 },
        { type: 'mc', q: 'Cuando ___ dinero, compraré una casa.', options: ['tenga', 'tengo', 'tendré', 'tenía'], answer: 0, explain: 'Future time clause → subjunctive.' },
        { type: 'translate', q: "It's possible that it will rain tomorrow.", answer: ['Es posible que llueva mañana.'] },
        { type: 'order', q: "I don't think he is right.", answer: 'No creo que tenga razón.' },
      ],
    },
  );
})(globalThis.SL = globalThis.SL || {});
