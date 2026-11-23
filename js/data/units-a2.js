/* Level A2 — units 13–21. See units-a1.js for the unit shape. */
(function (SL) {
  SL.units = SL.units || [];
  SL.units.push(
    // ───────────────────────────────────────── 13
    {
      id: 'u13', level: 'A2', icon: '🥘',
      title: 'Gustar & food',
      summary: 'Say what you like and love. Gustar works backwards from English.',
      grammar: [
        {
          h: 'How gustar works',
          p: '<p><strong>Gustar</strong> means “to be pleasing to”. The thing you like is the subject, so the verb agrees with it: <strong>gusta</strong> for one thing or an action, <strong>gustan</strong> for several things. The person who likes it is shown by an indirect object pronoun.</p>',
          table: {
            head: ['Pronoun', 'one thing / verb', 'several things'],
            rows: [
              ['(a mí) me', 'me gusta el café', 'me gustan los gatos'],
              ['(a ti) te', 'te gusta bailar', 'te gustan las fresas'],
              ['(a él / ella / usted) le', 'le gusta la playa', 'le gustan los libros'],
              ['(a nosotros) nos', 'nos gusta viajar', 'nos gustan los perros'],
              ['(a vosotros) os', 'os gusta el cine', 'os gustan las películas'],
              ['(a ellos / ustedes) les', 'les gusta el queso', 'les gustan las verduras'],
            ],
          },
        },
        {
          h: 'Emphasis, clarity and agreement',
          p: '<p>Add <strong>a mí, a ti, a Juan…</strong> for emphasis or to clarify who <em>le/les</em> means. Respond with <strong>a mí también</strong> (me too) or <strong>a mí tampoco</strong> (me neither). <strong>Encantar</strong> (to love) and <strong>interesar</strong> (to interest) work the same way.</p>',
          ex: [['A María le encanta el chocolate.', 'María loves chocolate.'], ['No me gusta nada el pescado.', "I don't like fish at all."], ['—No me gusta el café. —A mí tampoco.', "—I don't like coffee. —Me neither."]],
        },
      ],
      vocab: [
        ['el pan', 'bread'], ['el agua', 'water', 'feminine: el agua fría'], ['la carne', 'meat'], ['el pescado', 'fish (food)'],
        ['el pollo', 'chicken'], ['la fruta', 'fruit'], ['la manzana', 'apple'], ['el queso', 'cheese'],
        ['el huevo', 'egg'], ['la leche', 'milk'], ['el arroz', 'rice'], ['las verduras', 'vegetables'],
        ['el desayuno', 'breakfast'], ['la comida', 'food / lunch'], ['la cena', 'dinner'], ['encantar', 'to love (things)'],
      ],
      exercises: [
        { type: 'fill', q: 'Me ___ el chocolate.', answer: ['gusta'] },
        { type: 'fill', q: 'Me ___ las manzanas.', answer: ['gustan'] },
        { type: 'fill', q: '¿A ti te ___ bailar?', answer: ['gusta'], explain: 'Infinitives take the singular gusta.' },
        { type: 'fill', q: 'A nosotros ___ gusta la playa.', answer: ['nos'] },
        { type: 'fill', q: 'A mis padres ___ gusta viajar.', answer: ['les'] },
        { type: 'mc', q: '“She loves coffee.”', options: ['A ella le encanta el café.', 'Ella encanta el café.', 'A ella la encanta el café.', 'A ella le encantan el café.'], answer: 0 },
        { type: 'mc', q: '“No me gusta el pescado.” — “Me neither.”', options: ['A mí tampoco.', 'A mí también.', 'Yo también no.', 'A mí no también.'], answer: 0 },
        { type: 'translate', q: 'I like rice.', answer: ['(A mí) me gusta el arroz.'] },
        { type: 'translate', q: 'Do you (tú) like vegetables?', answer: ['¿(A ti) te gustan las verduras?'] },
        { type: 'translate', q: 'He likes to cook.', answer: ['(A él) le gusta cocinar.'] },
        { type: 'order', q: 'We love Spanish food.', answer: 'Nos encanta la comida española.' },
      ],
    },

    // ───────────────────────────────────────── 14
    {
      id: 'u14', level: 'A2', icon: '🪥',
      title: 'Reflexive verbs & daily routine',
      summary: 'Me levanto, me ducho, me visto: talk about your day.',
      grammar: [
        {
          h: 'Reflexive pronouns',
          p: '<p>A reflexive verb describes an action done to oneself. Its infinitive ends in <strong>-se</strong>, and each person uses a matching pronoun before the verb.</p>',
          table: {
            head: ['Person', 'Pronoun', 'levantarse (to get up)'],
            rows: [
              ['yo', 'me', 'me levanto'], ['tú', 'te', 'te levantas'], ['él / ella / usted', 'se', 'se levanta'],
              ['nosotros', 'nos', 'nos levantamos'], ['vosotros', 'os', 'os levantáis'], ['ellos / ustedes', 'se', 'se levantan'],
            ],
          },
        },
        {
          h: 'Where the pronoun goes',
          p: '<p>The pronoun goes <strong>before</strong> a conjugated verb, or is <strong>attached</strong> to the end of an infinitive. Do one or the other, never both.</p>',
          ex: [['Me voy a duchar. / Voy a ducharme.', "I'm going to shower."], ['¿A qué hora te acuestas?', 'What time do you go to bed?'], ['Primero me ducho y después me visto.', 'First I shower and then I get dressed.']],
          tip: 'Some reflexives are also boot verbs: <em>despertarse → me despierto</em>, <em>acostarse → me acuesto</em>, <em>vestirse → me visto</em>.',
        },
      ],
      vocab: [
        ['levantarse', 'to get up'], ['despertarse', 'to wake up'], ['ducharse', 'to shower'], ['lavarse', 'to wash (oneself)'],
        ['cepillarse los dientes', 'to brush one’s teeth'], ['vestirse', 'to get dressed'], ['peinarse', 'to comb one’s hair'],
        ['afeitarse', 'to shave'], ['acostarse', 'to go to bed'], ['temprano', 'early'], ['tarde', 'late'],
        ['primero', 'first'], ['después', 'afterwards / then'], ['antes', 'before'],
      ],
      exercises: [
        { type: 'fill', q: 'Yo ___ levanto a las siete.', answer: ['me'] },
        { type: 'fill', q: '¿A qué hora ___ acuestas?', answer: ['te'] },
        { type: 'fill', q: 'Nosotros ___ duchamos por la mañana.', answer: ['nos'] },
        { type: 'fill', q: 'Ella ___ temprano.', answer: ['se despierta'], hint: 'despertarse' },
        { type: 'fill', q: 'Ellos ___ rápido.', answer: ['se visten'], hint: 'vestirse' },
        { type: 'mc', q: '“I’m going to shower.”', options: ['Voy a ducharme.', 'Me voy a ducharme.', 'Voy a me duchar.', 'Voy a duchar.'], answer: 0 },
        { type: 'mc', q: '“Me llamo Pablo” literally means…', options: ['I call myself Pablo.', 'Call me Pablo.', 'Pablo calls me.', 'I called Pablo.'], answer: 0 },
        { type: 'translate', q: 'I go to bed late.', answer: ['(Yo) me acuesto tarde.'] },
        { type: 'translate', q: 'She brushes her teeth.', answer: ['(Ella) se cepilla los dientes.', '(Ella) se lava los dientes.'] },
        { type: 'translate', q: 'We get up early.', answer: ['(Nosotros) nos levantamos temprano.'] },
        { type: 'order', q: 'First I shower and then I get dressed.', answer: 'Primero me ducho y después me visto.' },
      ],
    },

    // ───────────────────────────────────────── 15
    {
      id: 'u15', level: 'A2', icon: '🏠',
      title: 'Possessives, demonstratives & the home',
      summary: 'My, your, our; this, that and that one over there.',
      grammar: [
        {
          h: 'Possessive adjectives',
          p: '<p>Possessives agree with the thing <em>owned</em>, not the owner. Only <em>nuestro</em> and <em>vuestro</em> change for gender.</p>',
          table: {
            head: ['Owner', 'singular', 'plural'],
            rows: [
              ['yo', 'mi', 'mis'], ['tú', 'tu', 'tus'], ['él / ella / usted', 'su', 'sus'],
              ['nosotros', 'nuestro / nuestra', 'nuestros / nuestras'], ['vosotros', 'vuestro / vuestra', 'vuestros / vuestras'], ['ellos / ustedes', 'su', 'sus'],
            ],
          },
          tip: '<em>Su</em> can mean his, her, its, their or your (formal). Clarify with <em>de él, de ella, de usted</em>: <em>la casa de ella</em>. After <em>ser</em> use the long forms: <em>Es mío / mía / tuyo / suyo / nuestro</em>.',
        },
        {
          h: 'Demonstratives: this, that, that over there',
          table: {
            head: ['', 'm. sing.', 'f. sing.', 'm. pl.', 'f. pl.'],
            rows: [
              ['this / these', 'este', 'esta', 'estos', 'estas'],
              ['that / those', 'ese', 'esa', 'esos', 'esas'],
              ['that (over there)', 'aquel', 'aquella', 'aquellos', 'aquellas'],
            ],
          },
          p: '<p>For unknown things or ideas use the neuter forms <strong>esto, eso, aquello</strong>: <em>¿Qué es esto?</em></p>',
        },
      ],
      vocab: [
        ['la cocina', 'kitchen'], ['el dormitorio', 'bedroom'], ['el baño', 'bathroom'], ['el salón', 'living room'],
        ['el jardín', 'garden'], ['la cama', 'bed'], ['el sofá', 'sofa'], ['el armario', 'wardrobe / cupboard'],
        ['la lámpara', 'lamp'], ['el espejo', 'mirror'], ['la nevera', 'fridge'], ['el piso', 'flat / floor'],
        ['la llave', 'key'], ['al lado de', 'next to'],
      ],
      exercises: [
        { type: 'fill', q: '___ casa es grande.', answer: ['nuestra'], hint: 'Our' },
        { type: 'fill', q: '___ llaves están en la mesa.', answer: ['mis'], hint: 'My' },
        { type: 'fill', q: '¿Es ___ coche?', answer: ['tu'], hint: 'your (tú)' },
        { type: 'fill', q: '¿Qué es ___?', answer: ['esto'], hint: 'this (unknown thing)' },
        { type: 'mc', q: '“this mirror”', options: ['este espejo', 'esta espejo', 'esto espejo', 'estos espejo'], answer: 0 },
        { type: 'mc', q: '“those lamps (over there)”', options: ['aquellas lámparas', 'aquellos lámparas', 'aquella lámparas', 'estas lámparas'], answer: 0 },
        { type: 'mc', q: '“The key is mine.”', options: ['La llave es mía.', 'La llave es mío.', 'La llave es mi.', 'La llave es mí.'], answer: 0 },
        { type: 'translate', q: 'Their kitchen is small.', answer: ['Su cocina es pequeña.'] },
        { type: 'translate', q: 'these beds', answer: ['estas camas'] },
        { type: 'translate', q: 'our gardens', answer: ['nuestros jardines'] },
        { type: 'order', q: 'Our bedroom is next to the bathroom.', answer: 'Nuestro dormitorio está al lado del baño.' },
      ],
    },

    // ───────────────────────────────────────── 16
    {
      id: 'u16', level: 'A2', icon: '🧠',
      title: 'Irregular “yo” verbs; saber vs conocer',
      summary: 'Hago, pongo, salgo, conozco, sé, and two ways to “know”.',
      grammar: [
        {
          h: 'Verbs irregular only in yo',
          p: '<p>Many common verbs are irregular <em>only</em> in the yo form of the present. The other forms are regular.</p>',
          table: {
            head: ['Pattern', 'Verbs (yo form)'],
            rows: [
              ['-go', 'hacer → hago · poner → pongo · salir → salgo · traer → traigo'],
              ['-go + stem change', 'tener → tengo · venir → vengo · decir → digo'],
              ['-zco', 'conocer → conozco · conducir → conduzco · traducir → traduzco'],
              ['others', 'saber → sé · dar → doy · ver → veo · oír → oigo'],
            ],
          },
        },
        {
          h: 'Saber vs conocer',
          p: '<p><strong>Saber</strong> = to know facts, information, or <em>how to</em> do something (+ infinitive).<br><strong>Conocer</strong> = to know or be familiar with people, places and things. Before a person, add the <strong>personal a</strong>.</p>',
          ex: [['¿Sabes nadar?', 'Do you know how to swim?'], ['No sé la respuesta.', "I don't know the answer."], ['Conozco Madrid muy bien.', 'I know Madrid very well.'], ['¿Conoces a María?', 'Do you know María?']],
        },
      ],
      vocab: [
        ['hacer', 'to do / make'], ['poner', 'to put'], ['salir', 'to leave / go out'], ['traer', 'to bring'],
        ['decir', 'to say / tell'], ['oír', 'to hear'], ['conocer', 'to know (people, places)'], ['saber', 'to know (facts, how to)'],
        ['conducir', 'to drive'], ['dar', 'to give'], ['ver', 'to see'], ['traducir', 'to translate'],
        ['la verdad', 'truth'], ['el ruido', 'noise'],
      ],
      exercises: [
        { type: 'fill', q: 'Yo ___ la cena.', answer: ['hago'], hint: 'hacer' },
        { type: 'fill', q: 'Yo ___ a las ocho.', answer: ['salgo'], hint: 'salir' },
        { type: 'fill', q: 'Yo no ___ la respuesta.', answer: ['sé'], hint: 'saber' },
        { type: 'fill', q: 'Yo ___ a tu hermano.', answer: ['conozco'], hint: 'conocer' },
        { type: 'fill', q: 'Yo ___ la mesa.', answer: ['pongo'], hint: 'poner (to set the table)' },
        { type: 'mc', q: '“Do you know how to swim?”', options: ['¿Sabes nadar?', '¿Conoces nadar?', '¿Sabes a nadar?', '¿Conoces a nadar?'], answer: 0 },
        { type: 'mc', q: '“I know Madrid very well.”', options: ['Conozco Madrid muy bien.', 'Sé Madrid muy bien.', 'Sabo Madrid muy bien.', 'Conozo Madrid muy bien.'], answer: 0 },
        { type: 'mc', q: '“Do you know María?”', options: ['¿Conoces a María?', '¿Conoces María?', '¿Sabes a María?', '¿Sabes María?'], answer: 0, explain: 'People need the personal “a”.' },
        { type: 'translate', q: 'I always tell the truth.', answer: ['(Yo) siempre digo la verdad.'], hint: 'always = siempre' },
        { type: 'translate', q: 'I hear a noise.', answer: ['(Yo) oigo un ruido.'] },
        { type: 'order', q: 'I bring the bread.', answer: 'Yo traigo el pan.' },
      ],
    },

    // ───────────────────────────────────────── 17
    {
      id: 'u17', level: 'A2', icon: '🛍️',
      title: 'Object pronouns & shopping',
      summary: 'It, them, to him, to her: lo, la, le, and “se lo”.',
      grammar: [
        {
          h: 'Direct and indirect object pronouns',
          p: '<p>A <strong>direct object</strong> receives the action (<em>I buy <u>it</u></em>). An <strong>indirect object</strong> is the person something is given or said <em>to</em> (<em>I give <u>him</u> the book</em>).</p>',
          table: {
            head: ['', 'Direct (it, them, him…)', 'Indirect (to him, to her…)'],
            rows: [
              ['me', 'me', 'me'], ['you', 'te', 'te'], ['him / her / it / you (Ud.)', 'lo / la', 'le'],
              ['us', 'nos', 'nos'], ['you all', 'os', 'os'], ['them / you all (Uds.)', 'los / las', 'les'],
            ],
          },
        },
        {
          h: 'Position and double pronouns',
          p: '<p>Pronouns go <strong>before</strong> a conjugated verb or <strong>attach</strong> to an infinitive. With two pronouns, indirect comes first. <strong>Le/les become se</strong> before <em>lo, la, los, las</em>.</p>',
          ex: [['¿La camisa? La compro.', "The shirt? I'll buy it."], ['Le doy el libro a Juan.', 'I give the book to Juan.'], ['Se lo doy.', 'I give it to him.'], ['Voy a comprarla. / La voy a comprar.', "I'm going to buy it."]],
          tip: 'When a pronoun is attached and the stress would move, add an accent: <em>probármela</em>, <em>dámelo</em>.',
        },
      ],
      vocab: [
        ['la camisa', 'shirt'], ['los pantalones', 'trousers'], ['el vestido', 'dress'], ['la falda', 'skirt'],
        ['los zapatos', 'shoes'], ['la chaqueta', 'jacket'], ['el abrigo', 'coat'], ['la camiseta', 'T-shirt'],
        ['la talla', 'size (clothes)'], ['el precio', 'price'], ['caro', 'expensive'], ['barato', 'cheap'],
        ['llevar', 'to wear / carry'], ['probarse', 'to try on'],
      ],
      exercises: [
        { type: 'fill', q: '¿La camisa? ___ compro.', answer: ['la'], hint: "I'll buy it." },
        { type: 'fill', q: '¿Los zapatos? No ___ tengo.', answer: ['los'] },
        { type: 'fill', q: '___ doy el libro a Juan.', answer: ['le'] },
        { type: 'fill', q: '¿El vestido? ___ doy a mi madre.', answer: ['se lo'], hint: 'I give it to my mother.', explain: 'le + lo → se lo' },
        { type: 'fill', q: 'Voy a comprar___.', answer: ['la'], hint: 'it (la chaqueta)' },
        { type: 'mc', q: '“Can I try it on?” (la chaqueta)', options: ['¿Puedo probármela?', '¿Puedo probármelo?', '¿Puedo me la probar?', '¿Puedo la probarme?'], answer: 0 },
        { type: 'mc', q: '“I give them to her.” (los zapatos)', options: ['Se los doy.', 'Le los doy.', 'Los le doy.', 'Se les doy.'], answer: 0 },
        { type: 'translate', q: 'I see it. (el coche)', answer: ['(Yo) lo veo.'] },
        { type: 'translate', q: 'How much does this shirt cost?', answer: ['¿Cuánto cuesta esta camisa?'] },
        { type: 'translate', q: 'The shoes are cheap.', answer: ['Los zapatos son baratos.'] },
        { type: 'order', q: 'The jacket is very expensive.', answer: 'La chaqueta es muy cara.' },
      ],
    },

    // ───────────────────────────────────────── 18
    {
      id: 'u18', level: 'A2', icon: '⏪',
      title: 'Past tense: regular preterite',
      summary: 'Talk about finished actions: hablé, comí, viví.',
      grammar: [
        {
          h: 'Regular preterite endings',
          p: '<p>The preterite describes actions completed at a specific moment in the past. -er and -ir verbs share the same endings.</p>',
          table: {
            head: ['Person', 'hablar', 'comer', 'vivir'],
            rows: [
              ['yo', 'hablé', 'comí', 'viví'], ['tú', 'hablaste', 'comiste', 'viviste'], ['él / ella / usted', 'habló', 'comió', 'vivió'],
              ['nosotros', 'hablamos', 'comimos', 'vivimos'], ['vosotros', 'hablasteis', 'comisteis', 'vivisteis'], ['ellos / ustedes', 'hablaron', 'comieron', 'vivieron'],
            ],
          },
          tip: 'The accents matter: <em>hablo</em> = I speak, <em>habló</em> = he spoke.',
        },
        {
          h: 'Spelling changes in the yo form',
          p: '<p>To keep the sound, verbs ending in <strong>-car, -gar, -zar</strong> change spelling in the yo form: <strong>buscar → busqué</strong>, <strong>llegar → llegué</strong>, <strong>empezar → empecé</strong>.</p>',
        },
        {
          h: 'Time markers',
          p: '<p><em>ayer</em> (yesterday), <em>anoche</em> (last night), <em>la semana pasada</em> (last week), <em>el año pasado</em> (last year), <em>hace dos días</em> (two days ago).</p>',
          ex: [['Ayer trabajé mucho.', 'Yesterday I worked a lot.'], ['Llegué hace una hora.', 'I arrived an hour ago.'], ['¿Ya comiste?', 'Have you eaten already?']],
        },
      ],
      vocab: [
        ['anoche', 'last night'], ['anteayer', 'the day before yesterday'], ['la semana pasada', 'last week'],
        ['el año pasado', 'last year'], ['hace dos días', 'two days ago'], ['ya', 'already'], ['todavía no', 'not yet'],
        ['de repente', 'suddenly'], ['luego', 'then / later'], ['por fin', 'finally'], ['llegar', 'to arrive'],
        ['buscar', 'to look for'], ['el correo', 'email / mail'], ['olvidar', 'to forget'],
      ],
      exercises: [
        { type: 'fill', q: 'Ayer yo ___ con mi madre.', answer: ['hablé'], hint: 'hablar' },
        { type: 'fill', q: 'Ella ___ paella anoche.', answer: ['comió'], hint: 'comer' },
        { type: 'fill', q: 'Nosotros ___ en Roma el año pasado.', answer: ['vivimos'], hint: 'vivir' },
        { type: 'fill', q: 'Yo ___ tarde.', answer: ['llegué'], hint: 'llegar' },
        { type: 'fill', q: 'Yo ___ las llaves.', answer: ['busqué'], hint: 'buscar' },
        { type: 'fill', q: '¿Tú ___ el correo?', answer: ['escribiste'], hint: 'escribir' },
        { type: 'fill', q: 'Ellos ___ la tienda.', answer: ['abrieron'], hint: 'abrir' },
        { type: 'mc', q: '“I started the course last week.”', options: ['Empecé el curso la semana pasada.', 'Empezé el curso la semana pasada.', 'Empiezé el curso la semana pasada.', 'Empezó el curso la semana pasada.'], answer: 0 },
        { type: 'translate', q: 'We bought a car last year.', answer: ['(Nosotros) compramos un coche el año pasado.'] },
        { type: 'translate', q: 'two days ago', answer: ['hace dos días'] },
        { type: 'order', q: 'Yesterday I worked a lot.', answer: 'Ayer trabajé mucho.' },
      ],
    },

    // ───────────────────────────────────────── 19
    {
      id: 'u19', level: 'A2', icon: '✈️',
      title: 'Irregular preterite & travel',
      summary: 'Fui, estuve, tuve, hice: the most common past forms.',
      grammar: [
        {
          h: 'Ser and ir share one preterite',
          p: '<p><strong>fui, fuiste, fue, fuimos, fuisteis, fueron</strong>. Context tells you whether it means “went” or “was”.</p>',
          ex: [['Fui a Perú.', 'I went to Peru.'], ['Fue un viaje increíble.', 'It was an incredible trip.']],
        },
        {
          h: 'Strong stems (no accents!)',
          p: '<p>These verbs take a new stem and special endings: <strong>-e, -iste, -o, -imos, -isteis, -ieron</strong>, with no written accents.</p>',
          table: {
            head: ['Verb', 'Stem', 'yo / él'],
            rows: [
              ['estar', 'estuv-', 'estuve / estuvo'], ['tener', 'tuv-', 'tuve / tuvo'], ['poder', 'pud-', 'pude / pudo'],
              ['poner', 'pus-', 'puse / puso'], ['saber', 'sup-', 'supe / supo'], ['querer', 'quis-', 'quise / quiso'],
              ['venir', 'vin-', 'vine / vino'], ['hacer', 'hic-', 'hice / hizo'],
              ['decir', 'dij-', 'dije / dijo · dijeron'], ['traer', 'traj-', 'traje / trajo · trajeron'],
            ],
          },
          tip: 'J-stems drop the i in the ellos form: <em>dijeron, trajeron, condujeron</em>.',
        },
        {
          h: 'Other changes',
          p: '<p><strong>dar</strong> → di, dio · <strong>ver</strong> → vi, vio. Boot verbs ending in <strong>-ir</strong> change in the 3rd person: <em>pedir → pidió, pidieron; dormir → durmió, durmieron</em>. Between vowels, i becomes y: <em>leer → leyó, leyeron</em>.</p>',
        },
      ],
      vocab: [
        ['el viaje', 'trip'], ['el avión', 'plane'], ['el tren', 'train'], ['el aeropuerto', 'airport'],
        ['el billete', 'ticket', 'Latin America: el boleto'], ['el pasaporte', 'passport'], ['la maleta', 'suitcase'],
        ['el hotel', 'hotel'], ['las vacaciones', 'holidays / vacation'], ['el vuelo', 'flight'], ['perder', 'to lose / miss'],
        ['reservar', 'to book'], ['hacer la maleta', 'to pack'], ['el extranjero', 'abroad'],
      ],
      exercises: [
        { type: 'fill', q: 'El año pasado yo ___ a Perú.', answer: ['fui'], hint: 'ir' },
        { type: 'fill', q: 'Nosotros ___ en un hotel bonito.', answer: ['estuvimos'], hint: 'estar' },
        { type: 'fill', q: '¿Qué ___ tú el fin de semana?', answer: ['hiciste'], hint: 'hacer' },
        { type: 'fill', q: 'Ella ___ la maleta.', answer: ['hizo'], hint: 'hacer' },
        { type: 'fill', q: 'Ellos ___ la verdad.', answer: ['dijeron'], hint: 'decir' },
        { type: 'fill', q: 'Yo no ___ dormir en el avión.', answer: ['pude'], hint: 'poder' },
        { type: 'fill', q: 'Él ___ diez horas.', answer: ['durmió'], hint: 'dormir' },
        { type: 'mc', q: '“Who brought the tickets?”', options: ['¿Quién trajo los billetes?', '¿Quién traió los billetes?', '¿Quién trajó los billetes?', '¿Quién trajeron los billetes?'], answer: 0 },
        { type: 'translate', q: 'I lost my passport.', answer: ['(Yo) perdí mi pasaporte.'] },
        { type: 'translate', q: 'We went to the airport.', answer: ['(Nosotros) fuimos al aeropuerto.'] },
        { type: 'order', q: 'They came by train.', answer: 'Vinieron en tren.' },
      ],
    },

    // ───────────────────────────────────────── 20
    {
      id: 'u20', level: 'A2', icon: '🧸',
      title: 'The imperfect: memories & childhood',
      summary: 'Used to, was …-ing, and descriptions in the past.',
      grammar: [
        {
          h: 'Forming the imperfect',
          p: '<p>The easiest past tense: only <strong>three</strong> irregular verbs.</p>',
          table: {
            head: ['Person', 'hablar', 'comer / vivir', 'ser', 'ir', 'ver'],
            rows: [
              ['yo', 'hablaba', 'comía', 'era', 'iba', 'veía'], ['tú', 'hablabas', 'comías', 'eras', 'ibas', 'veías'],
              ['él / ella / usted', 'hablaba', 'comía', 'era', 'iba', 'veía'], ['nosotros', 'hablábamos', 'comíamos', 'éramos', 'íbamos', 'veíamos'],
              ['vosotros', 'hablabais', 'comíais', 'erais', 'ibais', 'veíais'], ['ellos / ustedes', 'hablaban', 'comían', 'eran', 'iban', 'veían'],
            ],
          },
        },
        {
          h: 'When to use it',
          p: '<p>Use the imperfect for <strong>habits</strong> (used to), <strong>descriptions</strong> (people, places, weather, feelings), <strong>age and time</strong> in the past, and actions <strong>in progress</strong> (was …-ing).</p>',
          ex: [['De niño, jugaba en el parque.', 'As a child, I used to play in the park.'], ['Mi abuela era muy simpática.', 'My grandmother was very nice.'], ['Cuando tenía diez años, vivíamos en un pueblo.', 'When I was ten, we lived in a village.'], ['Eran las nueve.', 'It was nine o’clock.']],
          tip: 'Signal words: <em>siempre, a menudo, a veces, todos los días, de niño, mientras</em>.',
        },
      ],
      vocab: [
        ['de niño', 'as a child', 'f. de niña'], ['la infancia', 'childhood'], ['el juguete', 'toy'], ['la muñeca', 'doll'],
        ['el pueblo', 'village / town'], ['el vecino', 'neighbour'], ['siempre', 'always'], ['a menudo', 'often'],
        ['a veces', 'sometimes'], ['nunca', 'never'], ['mientras', 'while'], ['todos los días', 'every day'],
        ['el perro', 'dog'], ['juntos', 'together'],
      ],
      exercises: [
        { type: 'fill', q: 'De niño, yo ___ en el parque.', answer: ['jugaba'], hint: 'jugar' },
        { type: 'fill', q: 'Nosotros ___ en un pueblo pequeño.', answer: ['vivíamos'], hint: 'vivir' },
        { type: 'fill', q: 'Mi abuela ___ muy simpática.', answer: ['era'], hint: 'ser' },
        { type: 'fill', q: 'Siempre ___ a la playa en verano.', answer: ['íbamos'], hint: 'ir (nosotros)' },
        { type: 'fill', q: '¿Tú ___ mucha televisión?', answer: ['veías'], hint: 'ver' },
        { type: 'fill', q: 'Ellos ___ un perro.', answer: ['tenían'], hint: 'tener' },
        { type: 'mc', q: '“I used to read a lot.”', options: ['Leía mucho.', 'Leí mucho.', 'Leo mucho.', 'Leyé mucho.'], answer: 0 },
        { type: 'mc', q: '“When I was ten years old…”', options: ['Cuando tenía diez años…', 'Cuando tuve diez años…', 'Cuando era diez años…', 'Cuando tengo diez años…'], answer: 0 },
        { type: 'translate', q: 'We always played together.', answer: ['(Nosotros) siempre jugábamos juntos.'] },
        { type: 'translate', q: 'I used to have a doll.', answer: ['(Yo) tenía una muñeca.'] },
        { type: 'order', q: 'My neighbour had a big garden.', answer: 'Mi vecino tenía un jardín grande.' },
      ],
    },

    // ───────────────────────────────────────── 21
    {
      id: 'u21', level: 'A2', icon: '📖',
      title: 'Preterite vs imperfect: telling stories',
      summary: 'Background vs events: how Spanish narrates the past.',
      grammar: [
        {
          h: 'Two past tenses, two jobs',
          table: {
            head: ['Imperfect = the scene', 'Preterite = the events'],
            rows: [
              ['background, description', 'completed actions'],
              ['habits, repeated actions', 'single events, a sequence'],
              ['actions in progress', 'interrupting actions'],
              ['time, age, weather, feelings', 'actions in a bounded period (ayer, dos horas…)'],
            ],
          },
          ex: [['Leía cuando sonó el teléfono.', 'I was reading when the phone rang.'], ['Hacía sol y estábamos en la playa. De repente, empezó a llover.', 'It was sunny and we were at the beach. Suddenly, it started to rain.'], ['Ayer llovió todo el día.', 'Yesterday it rained all day.']],
        },
        {
          h: 'Verbs that change meaning',
          table: {
            head: ['Verb', 'Imperfect', 'Preterite'],
            rows: [
              ['conocer', 'conocía = knew', 'conocí = met (for the first time)'],
              ['saber', 'sabía = knew', 'supe = found out'],
              ['querer', 'quería = wanted', 'quise = tried · no quise = refused'],
              ['poder', 'podía = was able to', 'pude = managed to'],
            ],
          },
        },
      ],
      vocab: [
        ['cuando', 'when'], ['entonces', 'then / so'], ['llover', 'to rain'], ['nevar', 'to snow'],
        ['hacer sol', 'to be sunny'], ['sonar', 'to ring / sound'], ['ocurrir', 'to happen'], ['la historia', 'story / history'],
        ['el accidente', 'accident'], ['romper', 'to break'], ['caerse', 'to fall (down)'], ['asustado', 'scared'],
        ['así que', 'so (therefore)'], ['el vaso', 'glass (for drinking)'],
      ],
      exercises: [
        { type: 'mc', q: 'Yo ___ la tele cuando sonó el teléfono.', options: ['veía', 'vi', 'veo', 'veré'], answer: 0, explain: 'Action in progress, interrupted → imperfect.' },
        { type: 'mc', q: '___ las ocho cuando llegué.', options: ['Eran', 'Fueron', 'Era', 'Son'], answer: 0, explain: 'Time in the past → imperfect.' },
        { type: 'fill', q: 'Ayer ___ todo el día.', answer: ['llovió'], hint: 'llover', explain: 'A bounded period (yesterday, all day) → preterite.' },
        { type: 'fill', q: 'Cuando era niño, ___ mucho en invierno.', answer: ['nevaba'], hint: 'nevar', explain: 'Repeated/habitual → imperfect.' },
        { type: 'fill', q: 'Anoche ___ a mi novia.', answer: ['conocí'], hint: 'conocer (met)' },
        { type: 'fill', q: 'Mientras yo ___, él llegó.', answer: ['cocinaba'], hint: 'cocinar' },
        { type: 'mc', q: '“I found out the truth.”', options: ['Supe la verdad.', 'Sabía la verdad.'], answer: 0 },
        { type: 'mc', q: '“She was tired, so she went to bed.”', options: ['Estaba cansada, así que se acostó.', 'Estuvo cansada, así que se acostaba.', 'Era cansada, así que se acostó.', 'Estaba cansada, así que se acostaba.'], answer: 0 },
        { type: 'translate', q: 'It was raining when we left.', answer: ['Llovía cuando salimos.', 'Estaba lloviendo cuando salimos.'] },
        { type: 'translate', q: 'I was scared.', answer: ['(Yo) estaba asustado.', '(Yo) estaba asustada.'] },
        { type: 'order', q: 'Suddenly the glass broke.', answer: 'De repente se rompió el vaso.' },
      ],
    },
  );
})(globalThis.SL = globalThis.SL || {});
