/* Level A1 — units 1–12.
 * Unit shape:
 *   grammar:   [{ h, p (HTML), table?: {head, rows}, ex?: [[es, en]], tip? }]
 *   vocab:     [[spanish, english, note?]]
 *   exercises: mc {q, options, answer(index)} | fill {q with ___, answer[], hint?}
 *              translate {q (English), answer[]} | order {q (English), answer (Spanish)}
 *              — all may carry `explain`.
 */
(function (SL) {
  SL.units = SL.units || [];
  SL.units.push(
    // ───────────────────────────────────────── 1
    {
      id: 'u1', level: 'A1', icon: '👋',
      title: 'Hello! Greetings & pronouns',
      summary: 'Say hello and goodbye, introduce yourself, and meet the subject pronouns.',
      grammar: [
        {
          h: 'Greeting people: tú or usted?',
          p: '<p>Spanish has two ways to say <em>you</em>. Use <strong>tú</strong> with friends, family, children and people your age. Use <strong>usted</strong> with strangers, older people, and in professional situations. When in doubt, start with <em>usted</em>. People will tell you if you can switch to <em>tú</em>.</p>',
          ex: [
            ['¡Hola! ¿Cómo estás?', 'Hi! How are you? (informal)'],
            ['Buenos días, ¿cómo está usted?', 'Good morning, how are you? (formal)'],
            ['Me llamo Ana. ¿Y tú?', 'My name is Ana. And you?'],
            ['Mucho gusto.', 'Nice to meet you.'],
          ],
        },
        {
          h: 'Subject pronouns',
          p: '<p>These are the words for <em>I, you, he, she, we, they</em>. Groups take the masculine form (<em>nosotros, ellos</em>) unless everyone in them is female.</p>',
          table: {
            head: ['Singular', '', 'Plural', ''],
            rows: [
              ['yo', 'I', 'nosotros / nosotras', 'we'],
              ['tú', 'you (informal)', 'vosotros / vosotras', 'you all (informal, Spain)'],
              ['él', 'he', 'ellos', 'they (m. or mixed)'],
              ['ella', 'she', 'ellas', 'they (f.)'],
              ['usted (Ud.)', 'you (formal)', 'ustedes (Uds.)', 'you all'],
            ],
          },
          tip: 'Spanish usually leaves out the pronoun, because the verb ending already shows who is doing the action: <em>Hablo español</em> = I speak Spanish. Pronouns are used for emphasis or contrast.',
        },
        {
          h: 'Upside-down punctuation',
          p: '<p>Questions and exclamations are opened with <strong>¿</strong> and <strong>¡</strong> and closed with <strong>?</strong> and <strong>!</strong>. They mark where the question begins, which matters because word order often stays the same as a statement.</p>',
          ex: [['¿Hablas español?', 'Do you speak Spanish?'], ['¡Qué bien!', 'How great!']],
        },
      ],
      vocab: [
        ['hola', 'hello'], ['adiós', 'goodbye'], ['buenos días', 'good morning'],
        ['buenas tardes', 'good afternoon'], ['buenas noches', 'good evening / good night'],
        ['por favor', 'please'], ['gracias', 'thank you'], ['de nada', "you're welcome"],
        ['perdón', 'sorry / excuse me'], ['sí', 'yes'], ['hasta luego', 'see you later'],
        ['mucho gusto', 'nice to meet you'], ['¿qué tal?', "how's it going?"], ['me llamo', 'my name is'],
      ],
      exercises: [
        { type: 'mc', q: 'How do you say “good afternoon”?', options: ['buenas tardes', 'buenos días', 'buenas noches', 'hasta luego'], answer: 0 },
        { type: 'mc', q: 'You are meeting your new manager for the first time. Which “you” do you use?', options: ['usted', 'tú', 'vosotros', 'él'], answer: 0, explain: 'Usted is the polite, formal “you”.' },
        { type: 'mc', q: '“nosotras” means…', options: ['we (all female)', 'you all', 'they (female)', 'we (mixed group)'], answer: 0 },
        { type: 'mc', q: '“ellos” can refer to…', options: ['a group of men, or a mixed group', 'only women', 'you all', 'we'], answer: 0, explain: 'The masculine plural covers mixed groups.' },
        { type: 'fill', q: '___ llamo Pedro.', answer: ['me'], hint: 'My name is Pedro.' },
        { type: 'fill', q: 'Buenos ___, señora García.', answer: ['días'], hint: 'Good morning, Mrs García.' },
        { type: 'mc', q: 'Which is written correctly?', options: ['¿Cómo estás?', 'Cómo estás?', '¿Cómo estás¿', '?Cómo estás?'], answer: 0 },
        { type: 'translate', q: 'Thank you very much.', answer: ['Muchas gracias.'] },
        { type: 'translate', q: 'Nice to meet you.', answer: ['Mucho gusto.', 'Encantado.', 'Encantada.'] },
        { type: 'order', q: 'My name is Lucía.', answer: 'Me llamo Lucía.' },
        { type: 'order', q: 'Good morning, how are you? (formal)', answer: 'Buenos días, ¿cómo está usted?' },
      ],
    },

    // ───────────────────────────────────────── 2
    {
      id: 'u2', level: 'A1', icon: '📚',
      title: 'Nouns, gender & articles',
      summary: 'Every noun is masculine or feminine. Learn el, la, un, una and how to make plurals.',
      grammar: [
        {
          h: 'Masculine or feminine?',
          p: '<p>Every Spanish noun has a grammatical gender. Most nouns ending in <strong>-o</strong> are masculine and most ending in <strong>-a</strong> are feminine. Nouns ending in <strong>-ción, -sión, -dad, -tad</strong> are feminine. For nouns ending in <strong>-e</strong> or a consonant you have to memorise the gender.</p>',
          ex: [['el libro', 'the book'], ['la mesa', 'the table'], ['la canción', 'the song'], ['la ciudad', 'the city']],
          tip: 'Common exceptions: <em>el día</em> (day), <em>el mapa</em>, <em>el problema</em>, <em>el idioma</em> are masculine; <em>la mano</em> (hand), <em>la foto</em>, <em>la moto</em> are feminine.',
        },
        {
          h: 'Articles: the / a',
          table: {
            head: ['', 'Masculine', 'Feminine'],
            rows: [
              ['the (singular)', 'el', 'la'],
              ['the (plural)', 'los', 'las'],
              ['a / an', 'un', 'una'],
              ['some', 'unos', 'unas'],
            ],
          },
          tip: 'Learn every noun together with its article: say “el coche”, not just “coche”.',
        },
        {
          h: 'Making plurals',
          p: '<p>Add <strong>-s</strong> after a vowel, <strong>-es</strong> after a consonant. A final <strong>-z</strong> becomes <strong>-ces</strong>. Accents can appear or disappear to keep the stress in place.</p>',
          ex: [['la casa → las casas', 'house → houses'], ['la ciudad → las ciudades', 'city → cities'], ['el lápiz → los lápices', 'pencil → pencils'], ['la canción → las canciones', 'song → songs']],
        },
      ],
      vocab: [
        ['el libro', 'book'], ['la mesa', 'table'], ['la silla', 'chair'], ['la casa', 'house'],
        ['el coche', 'car'], ['la puerta', 'door'], ['la ventana', 'window'], ['el teléfono', 'phone'],
        ['el bolígrafo', 'pen'], ['el día', 'day'], ['la mano', 'hand'], ['la ciudad', 'city'],
        ['la canción', 'song'], ['el lápiz', 'pencil'],
      ],
      exercises: [
        { type: 'mc', q: 'Which article goes with “problema”?', options: ['el', 'la'], answer: 0, explain: 'Words ending in -ma from Greek (problema, sistema, tema, idioma) are masculine.' },
        { type: 'mc', q: 'Plural of “la ciudad”', options: ['las ciudades', 'las ciudads', 'las ciudadas', 'los ciudades'], answer: 0 },
        { type: 'mc', q: 'Plural of “el lápiz”', options: ['los lápices', 'los lápizes', 'los lápizs', 'las lápices'], answer: 0, explain: 'z → c before -es.' },
        { type: 'fill', q: '___ mano', answer: ['la'], hint: 'the hand' },
        { type: 'fill', q: '___ libros', answer: ['los'], hint: 'the books' },
        { type: 'fill', q: '___ día', answer: ['el'], hint: 'the day' },
        { type: 'fill', q: '___ canciones', answer: ['unas'], hint: 'some songs' },
        { type: 'translate', q: 'the house', answer: ['la casa'] },
        { type: 'translate', q: 'a window', answer: ['una ventana'] },
        { type: 'translate', q: 'the days', answer: ['los días'] },
        { type: 'order', q: 'the chairs and the tables', answer: 'las sillas y las mesas' },
      ],
    },

    // ───────────────────────────────────────── 3
    {
      id: 'u3', level: 'A1', icon: '🪪',
      title: 'Ser: who you are',
      summary: 'The verb “to be” for identity, origin, profession and nationality.',
      grammar: [
        {
          h: 'Conjugating ser (to be)',
          table: {
            head: ['Person', 'ser', 'English'],
            rows: [
              ['yo', 'soy', 'I am'], ['tú', 'eres', 'you are'], ['él / ella / usted', 'es', 'he/she is, you are'],
              ['nosotros', 'somos', 'we are'], ['vosotros', 'sois', 'you all are'], ['ellos / ellas / ustedes', 'son', 'they/you all are'],
            ],
          },
        },
        {
          h: 'When to use ser',
          p: '<p><strong>Ser</strong> describes what something <em>is</em>: identity, origin, nationality, profession, and lasting characteristics. Use <strong>ser de</strong> for origin.</p>',
          ex: [['Soy Marta.', 'I am Marta.'], ['Somos de Colombia.', 'We are from Colombia.'], ['Él es médico.', 'He is a doctor.'], ['¿Eres inglés?', 'Are you English?']],
          tip: 'Don’t use <em>un/una</em> with an unmodified profession: <em>Soy profesora</em>, not <em>Soy una profesora</em>.',
        },
        {
          h: 'Negatives and questions',
          p: '<p>Put <strong>no</strong> directly before the verb. To ask a yes/no question, simply raise your intonation, or put the subject after the verb.</p>',
          ex: [['No soy de aquí.', "I'm not from here."], ['¿Usted es profesor? / ¿Es usted profesor?', 'Are you a teacher?']],
        },
      ],
      vocab: [
        ['el estudiante', 'student', 'f. la estudiante'], ['el profesor', 'teacher', 'f. la profesora'],
        ['el médico', 'doctor', 'f. la médica'], ['el ingeniero', 'engineer', 'f. la ingeniera'],
        ['el abogado', 'lawyer', 'f. la abogada'], ['español', 'Spanish', 'f. española'],
        ['mexicano', 'Mexican', 'f. mexicana'], ['inglés', 'English', 'f. inglesa'],
        ['alemán', 'German', 'f. alemana'], ['el amigo', 'friend', 'f. la amiga'],
        ['de', 'from / of'], ['¿de dónde?', 'where from?'], ['también', 'also / too'], ['no', 'no / not'],
      ],
      exercises: [
        { type: 'fill', q: 'Yo ___ de México.', answer: ['soy'] },
        { type: 'fill', q: 'Nosotros ___ estudiantes.', answer: ['somos'] },
        { type: 'fill', q: '¿Tú ___ profesor?', answer: ['eres'] },
        { type: 'fill', q: 'Ellas ___ amigas.', answer: ['son'] },
        { type: 'fill', q: 'Vosotros ___ españoles.', answer: ['sois'] },
        { type: 'mc', q: '“She is a doctor.”', options: ['Ella es médica.', 'Ella es una médica.', 'Ella son médica.', 'Ella eres médica.'], answer: 0, explain: 'No article before a profession on its own.' },
        { type: 'mc', q: '“We are not from Spain.”', options: ['No somos de España.', 'Somos no de España.', 'Somos de no España.', 'No son de España.'], answer: 0 },
        { type: 'translate', q: 'I am a student.', answer: ['(Yo) soy estudiante.'] },
        { type: 'translate', q: 'Where are you from? (informal)', answer: ['¿De dónde eres (tú)?'] },
        { type: 'translate', q: 'He is German.', answer: ['(Él) es alemán.'] },
        { type: 'order', q: 'Are you a teacher? (formal)', answer: '¿Es usted profesor?' },
      ],
    },

    // ───────────────────────────────────────── 4
    {
      id: 'u4', level: 'A1', icon: '🎨',
      title: 'Adjectives & colours',
      summary: 'Describe things. Adjectives agree with their noun in gender and number.',
      grammar: [
        {
          h: 'Agreement',
          p: '<p>Adjectives change to match the noun they describe. Adjectives in <strong>-o</strong> have four forms. Adjectives ending in <strong>-e</strong> or a consonant only change for plural.</p>',
          table: {
            head: ['', 'Masc. sing.', 'Fem. sing.', 'Masc. pl.', 'Fem. pl.'],
            rows: [
              ['-o', 'rojo', 'roja', 'rojos', 'rojas'],
              ['-e', 'verde', 'verde', 'verdes', 'verdes'],
              ['consonant', 'azul', 'azul', 'azules', 'azules'],
              ['nationality', 'español', 'española', 'españoles', 'españolas'],
            ],
          },
        },
        {
          h: 'Position',
          p: '<p>Most adjectives go <strong>after</strong> the noun: <em>un coche rojo</em>. A few common ones often go before. <strong>Bueno</strong> and <strong>malo</strong> drop their -o before a masculine singular noun, and <strong>grande</strong> becomes <strong>gran</strong> and means “great”.</p>',
          ex: [['un buen amigo', 'a good friend'], ['un mal día', 'a bad day'], ['una gran ciudad', 'a great city'], ['una ciudad grande', 'a big city']],
          tip: '<em>Muy</em> = very: <em>La casa es muy bonita.</em>',
        },
      ],
      vocab: [
        ['grande', 'big'], ['pequeño', 'small'], ['alto', 'tall'], ['bajo', 'short (height)'],
        ['bonito', 'pretty / nice'], ['feo', 'ugly'], ['nuevo', 'new'], ['viejo', 'old'],
        ['bueno', 'good'], ['malo', 'bad'], ['simpático', 'nice / friendly'], ['muy', 'very'],
        ['rojo', 'red'], ['azul', 'blue'], ['verde', 'green'], ['blanco', 'white'], ['negro', 'black'], ['amarillo', 'yellow'],
      ],
      exercises: [
        { type: 'fill', q: 'La casa es ___.', answer: ['blanca'], hint: 'white' },
        { type: 'fill', q: 'Los coches son ___.', answer: ['rojos'], hint: 'red' },
        { type: 'fill', q: 'Las sillas son ___.', answer: ['verdes'], hint: 'green' },
        { type: 'fill', q: 'Ella es muy ___.', answer: ['alta'], hint: 'tall' },
        { type: 'mc', q: '“the blue doors”', options: ['las puertas azules', 'las puertas azuls', 'la puertas azul', 'las azul puertas'], answer: 0 },
        { type: 'mc', q: '“a good friend”', options: ['un buen amigo', 'un bueno amigo', 'un amigo buen', 'una buena amigo'], answer: 0, explain: 'bueno → buen before a masculine singular noun.' },
        { type: 'mc', q: '“Madrid is a great city.”', options: ['Madrid es una gran ciudad.', 'Madrid es una grande ciudad.', 'Madrid es una ciudad gran.', 'Madrid es un gran ciudad.'], answer: 0 },
        { type: 'translate', q: 'The book is new.', answer: ['El libro es nuevo.'] },
        { type: 'translate', q: 'The tables are small.', answer: ['Las mesas son pequeñas.'] },
        { type: 'translate', q: 'a German car', answer: ['un coche alemán'] },
        { type: 'order', q: 'The teacher (f.) is very nice.', answer: 'La profesora es muy simpática.' },
      ],
    },

    // ───────────────────────────────────────── 5
    {
      id: 'u5', level: 'A1', icon: '🔢',
      title: 'Numbers & “hay”',
      summary: 'Count from 0 to 100 and say what there is with “hay”.',
      grammar: [
        {
          h: '0–29',
          p: '<p>0 cero · 1 uno · 2 dos · 3 tres · 4 cuatro · 5 cinco · 6 seis · 7 siete · 8 ocho · 9 nueve · 10 diez · 11 once · 12 doce · 13 trece · 14 catorce · 15 quince</p><p>16–19 and 21–29 are written as one word: <strong>dieciséis, diecisiete, dieciocho, diecinueve, veinte, veintiuno, veintidós…</strong></p>',
        },
        {
          h: '30–100',
          p: '<p>From 31 on, join tens and units with <strong>y</strong>: <em>treinta y uno, cuarenta y cinco</em>. Tens: 30 treinta · 40 cuarenta · 50 cincuenta · 60 sesenta · 70 setenta · 80 ochenta · 90 noventa · 100 <strong>cien</strong>.</p>',
          tip: '<em>Uno</em> becomes <em>un</em> before a masculine noun and <em>una</em> before a feminine one: <em>veintiún libros, veintiuna sillas</em>. 100 on its own is <em>cien</em>; 101–199 use <em>ciento</em>: <em>ciento dos</em>.',
        },
        {
          h: 'Hay = there is / there are',
          p: '<p><strong>Hay</strong> never changes. It works for singular and plural. Ask how many with <strong>¿Cuántos…? / ¿Cuántas…?</strong>, which agrees with the noun.</p>',
          ex: [['Hay un problema.', 'There is a problem.'], ['Hay tres coches.', 'There are three cars.'], ['¿Cuántas sillas hay?', 'How many chairs are there?']],
        },
      ],
      vocab: [
        ['cero', 'zero'], ['uno', 'one'], ['dos', 'two'], ['tres', 'three'], ['cuatro', 'four'],
        ['cinco', 'five'], ['seis', 'six'], ['siete', 'seven'], ['ocho', 'eight'], ['nueve', 'nine'],
        ['diez', 'ten'], ['quince', 'fifteen'], ['veinte', 'twenty'], ['cincuenta', 'fifty'], ['cien', 'one hundred'],
        ['hay', 'there is / there are'], ['¿cuántos?', 'how many?'],
      ],
      exercises: [
        { type: 'mc', q: '17', options: ['diecisiete', 'dieciséis', 'setenta', 'diecinueve'], answer: 0 },
        { type: 'mc', q: '45', options: ['cuarenta y cinco', 'cincuenta y cuatro', 'cuatro y cinco', 'cuarenta cinco'], answer: 0 },
        { type: 'mc', q: '70', options: ['setenta', 'sesenta', 'siete', 'diecisiete'], answer: 0 },
        { type: 'mc', q: '“There is a problem.”', options: ['Hay un problema.', 'Es un problema.', 'Hay una problema.', 'Están un problema.'], answer: 0 },
        { type: 'fill', q: 'Hay ___ libros en la mesa.', answer: ['veintiún'], hint: '21', explain: 'veintiuno → veintiún before a masculine noun.' },
        { type: 'fill', q: '¿Cuántas sillas ___?', answer: ['hay'], hint: 'How many chairs are there?' },
        { type: 'fill', q: 'Son ___ euros.', answer: ['cien'], hint: '100' },
        { type: 'translate', q: 'There are three cars.', answer: ['Hay tres coches.'] },
        { type: 'translate', q: 'thirty-two', answer: ['treinta y dos'] },
        { type: 'order', q: 'How many students are there?', answer: '¿Cuántos estudiantes hay?' },
      ],
    },

    // ───────────────────────────────────────── 6
    {
      id: 'u6', level: 'A1', icon: '🗣️',
      title: 'Present tense: -ar verbs',
      summary: 'Your first verb pattern: hablar, trabajar, estudiar and friends.',
      grammar: [
        {
          h: 'Three verb families',
          p: '<p>Spanish infinitives end in <strong>-ar</strong>, <strong>-er</strong> or <strong>-ir</strong>. To conjugate a regular verb, remove the ending and add the ending for the person. -ar is the largest family.</p>',
          table: {
            head: ['Person', 'Ending', 'hablar (to speak)'],
            rows: [
              ['yo', '-o', 'hablo'], ['tú', '-as', 'hablas'], ['él / ella / usted', '-a', 'habla'],
              ['nosotros', '-amos', 'hablamos'], ['vosotros', '-áis', 'habláis'], ['ellos / ustedes', '-an', 'hablan'],
            ],
          },
        },
        {
          h: 'What the present covers',
          p: '<p>The Spanish present covers English <em>I speak</em>, <em>I am speaking</em> and <em>I do speak</em>. It is also used for plans in the near future.</p>',
          ex: [['Trabajo en un banco.', 'I work in a bank.'], ['¿Qué estudias?', 'What are you studying?'], ['Mañana viajamos a Sevilla.', "Tomorrow we're travelling to Seville."], ['No necesito nada.', "I don't need anything."]],
          tip: 'To make a sentence negative, put <em>no</em> before the verb. There is no Spanish equivalent of “do/does”.',
        },
      ],
      vocab: [
        ['hablar', 'to speak'], ['trabajar', 'to work'], ['estudiar', 'to study'], ['comprar', 'to buy'],
        ['escuchar', 'to listen (to)'], ['mirar', 'to look at / watch'], ['cocinar', 'to cook'], ['bailar', 'to dance'],
        ['cantar', 'to sing'], ['tomar', 'to take / drink'], ['necesitar', 'to need'], ['llamar', 'to call'],
        ['viajar', 'to travel'], ['caminar', 'to walk'], ['mucho', 'a lot'],
      ],
      exercises: [
        { type: 'fill', q: 'Yo ___ inglés.', answer: ['hablo'], hint: 'hablar' },
        { type: 'fill', q: 'Nosotros ___ en Madrid.', answer: ['trabajamos'], hint: 'trabajar' },
        { type: 'fill', q: '¿Tú ___ español?', answer: ['estudias'], hint: 'estudiar' },
        { type: 'fill', q: 'Ellos ___ muy bien.', answer: ['bailan'], hint: 'bailar' },
        { type: 'fill', q: 'Ana ___ los domingos.', answer: ['cocina'], hint: 'cocinar' },
        { type: 'fill', q: 'Vosotros ___ música.', answer: ['escucháis'], hint: 'escuchar' },
        { type: 'mc', q: '“We don’t need a car.”', options: ['No necesitamos un coche.', 'Necesitamos no un coche.', 'No necesitan un coche.', 'No necesito un coche.'], answer: 0 },
        { type: 'translate', q: 'I study Spanish.', answer: ['(Yo) estudio español.'] },
        { type: 'translate', q: 'They travel a lot.', answer: ['(Ellos) viajan mucho.', '(Ellas) viajan mucho.'] },
        { type: 'translate', q: 'She sings and dances.', answer: ['(Ella) canta y baila.'] },
        { type: 'order', q: 'Do you (tú) speak English and Spanish?', answer: '¿Hablas inglés y español?' },
      ],
    },

    // ───────────────────────────────────────── 7
    {
      id: 'u7', level: 'A1', icon: '🍽️',
      title: 'Present tense: -er & -ir verbs',
      summary: 'Comer, vivir and the other two regular verb families.',
      grammar: [
        {
          h: '-er and -ir endings',
          p: '<p>-er and -ir verbs share almost all their endings. They only differ in the <strong>nosotros</strong> and <strong>vosotros</strong> forms.</p>',
          table: {
            head: ['Person', 'comer (to eat)', 'vivir (to live)'],
            rows: [
              ['yo', 'como', 'vivo'], ['tú', 'comes', 'vives'], ['él / ella / usted', 'come', 'vive'],
              ['nosotros', 'comemos', 'vivimos'], ['vosotros', 'coméis', 'vivís'], ['ellos / ustedes', 'comen', 'viven'],
            ],
          },
          ex: [['¿Dónde vives?', 'Where do you live?'], ['Bebemos café por la mañana.', 'We drink coffee in the morning.'], ['Leo un libro.', "I'm reading a book."]],
        },
      ],
      vocab: [
        ['comer', 'to eat'], ['beber', 'to drink'], ['aprender', 'to learn'], ['leer', 'to read'],
        ['correr', 'to run'], ['comprender', 'to understand'], ['vender', 'to sell'], ['vivir', 'to live'],
        ['escribir', 'to write'], ['abrir', 'to open'], ['recibir', 'to receive'], ['compartir', 'to share'],
        ['decidir', 'to decide'], ['la carta', 'letter'],
      ],
      exercises: [
        { type: 'fill', q: 'Nosotros ___ en Barcelona.', answer: ['vivimos'], hint: 'vivir' },
        { type: 'fill', q: 'Tú ___ mucho café.', answer: ['bebes'], hint: 'beber' },
        { type: 'fill', q: 'Ellos ___ cartas.', answer: ['escriben'], hint: 'escribir' },
        { type: 'fill', q: 'Vosotros ___ en casa.', answer: ['coméis'], hint: 'comer' },
        { type: 'fill', q: 'Yo ___ español.', answer: ['aprendo'], hint: 'aprender' },
        { type: 'fill', q: 'Nosotros ___ a las dos.', answer: ['comemos'], hint: 'comer' },
        { type: 'mc', q: '“We open the door.”', options: ['Abrimos la puerta.', 'Abremos la puerta.', 'Abrimos el puerta.', 'Abren la puerta.'], answer: 0, explain: '-ir verbs use -imos for nosotros.' },
        { type: 'translate', q: 'I read a book.', answer: ['(Yo) leo un libro.'] },
        { type: 'translate', q: 'She lives in Madrid.', answer: ['(Ella) vive en Madrid.'] },
        { type: 'translate', q: 'They sell cars.', answer: ['(Ellos) venden coches.', '(Ellas) venden coches.'] },
        { type: 'order', q: 'We drink coffee in the morning.', answer: 'Bebemos café por la mañana.' },
      ],
    },

    // ───────────────────────────────────────── 8
    {
      id: 'u8', level: 'A1', icon: '📍',
      title: 'Estar & ser vs estar',
      summary: 'The other “to be”: location, feelings and temporary states.',
      grammar: [
        {
          h: 'Conjugating estar',
          table: {
            head: ['Person', 'estar'],
            rows: [['yo', 'estoy'], ['tú', 'estás'], ['él / ella / usted', 'está'], ['nosotros', 'estamos'], ['vosotros', 'estáis'], ['ellos / ustedes', 'están']],
          },
        },
        {
          h: 'Ser vs estar',
          p: '<p><strong>Ser</strong> = what something <em>is</em> (description, occupation, characteristics, time, origin, relationships).<br><strong>Estar</strong> = how or where something <em>is</em> (location, feelings, conditions, temporary states).</p>',
          ex: [['Madrid está en España.', 'Madrid is in Spain.'], ['Estoy cansado.', "I'm tired."], ['Mi hermano es alto.', 'My brother is tall.'], ['La fiesta es en mi casa.', 'The party is at my house.']],
          tip: 'Events use <em>ser</em> for location (<em>La fiesta es aquí</em>), but people and things use <em>estar</em>.',
        },
        {
          h: 'Adjectives that change meaning',
          table: {
            head: ['Adjective', 'with ser', 'with estar'],
            rows: [['aburrido', 'boring', 'bored'], ['listo', 'clever', 'ready'], ['malo', 'bad', 'ill'], ['rico', 'rich', 'tasty']],
          },
        },
      ],
      vocab: [
        ['cansado', 'tired'], ['contento', 'happy'], ['triste', 'sad'], ['enfermo', 'sick'],
        ['nervioso', 'nervous'], ['enfadado', 'angry'], ['ocupado', 'busy'], ['aburrido', 'bored / boring'],
        ['listo', 'ready / clever'], ['aquí', 'here'], ['allí', 'there'], ['cerca de', 'near'], ['lejos de', 'far from'],
        ['¿dónde?', 'where?'],
      ],
      exercises: [
        { type: 'fill', q: 'Yo ___ cansado hoy.', answer: ['estoy'] },
        { type: 'fill', q: 'Madrid ___ en España.', answer: ['está'] },
        { type: 'fill', q: 'Carlos ___ médico.', answer: ['es'], explain: 'Profession → ser.' },
        { type: 'fill', q: 'Nosotros ___ muy contentos.', answer: ['estamos'] },
        { type: 'fill', q: 'La fiesta ___ en mi casa.', answer: ['es'], explain: 'Location of an event → ser.' },
        { type: 'mc', q: '“The class is boring.”', options: ['La clase es aburrida.', 'La clase está aburrida.'], answer: 0, explain: 'ser aburrido = boring; estar aburrido = bored.' },
        { type: 'mc', q: '“I’m ready.”', options: ['Estoy listo.', 'Soy listo.'], answer: 0, explain: 'estar listo = ready; ser listo = clever.' },
        { type: 'mc', q: '¿Dónde ___ los baños?', options: ['están', 'son', 'es', 'está'], answer: 0 },
        { type: 'translate', q: 'We are tired.', answer: ['(Nosotros) estamos cansados.', '(Nosotras) estamos cansadas.'] },
        { type: 'translate', q: 'The bank is far from here.', answer: ['El banco está lejos de aquí.'], hint: 'bank = el banco' },
        { type: 'order', q: 'Why are you (tú) sad?', answer: '¿Por qué estás triste?' },
      ],
    },

    // ───────────────────────────────────────── 9
    {
      id: 'u9', level: 'A1', icon: '👨‍👩‍👧',
      title: 'Tener & the family',
      summary: 'To have, how old you are, “I’m hungry” and “I have to”.',
      grammar: [
        {
          h: 'Conjugating tener',
          table: {
            head: ['Person', 'tener'],
            rows: [['yo', 'tengo'], ['tú', 'tienes'], ['él / ella / usted', 'tiene'], ['nosotros', 'tenemos'], ['vosotros', 'tenéis'], ['ellos / ustedes', 'tienen']],
          },
          tip: 'Notice the -go in <em>tengo</em> and the e → ie change in <em>tienes, tiene, tienen</em>. You will meet both patterns again.',
        },
        {
          h: 'Expressions with tener',
          p: '<p>Where English says “I <em>am</em> hungry”, Spanish says “I <em>have</em> hunger”.</p>',
          table: {
            head: ['Spanish', 'English'],
            rows: [
              ['tener … años', 'to be … years old'], ['tener hambre', 'to be hungry'], ['tener sed', 'to be thirsty'],
              ['tener frío / calor', 'to be cold / hot'], ['tener sueño', 'to be sleepy'], ['tener miedo', 'to be afraid'],
              ['tener prisa', 'to be in a hurry'], ['tener razón', 'to be right'], ['tener que + infinitive', 'to have to do something'],
            ],
          },
          ex: [['Tengo treinta años.', "I'm thirty."], ['¿Tienes hambre?', 'Are you hungry?'], ['Tenemos que estudiar.', 'We have to study.']],
        },
        {
          h: 'Preview: my, your, his/her',
          p: '<p><strong>mi</strong> (my), <strong>tu</strong> (your), <strong>su</strong> (his/her/your formal). Add -s for plural nouns: <em>mis padres, tus hermanos</em>.</p>',
        },
      ],
      vocab: [
        ['la familia', 'family'], ['el padre', 'father'], ['la madre', 'mother'], ['los padres', 'parents'],
        ['el hermano', 'brother'], ['la hermana', 'sister'], ['el hijo', 'son'], ['la hija', 'daughter'],
        ['el abuelo', 'grandfather'], ['la abuela', 'grandmother'], ['el tío', 'uncle'], ['la tía', 'aunt'],
        ['el primo', 'cousin', 'f. la prima'], ['el esposo', 'husband'], ['la esposa', 'wife'],
      ],
      exercises: [
        { type: 'fill', q: 'Yo ___ dos hermanos.', answer: ['tengo'] },
        { type: 'fill', q: '¿Cuántos años ___ tú?', answer: ['tienes'] },
        { type: 'fill', q: 'Nosotros ___ hambre.', answer: ['tenemos'] },
        { type: 'fill', q: 'Ellos ___ que estudiar.', answer: ['tienen'] },
        { type: 'mc', q: '“I’m cold.”', options: ['Tengo frío.', 'Soy frío.', 'Hay frío.', 'Tengo fría.'], answer: 0 },
        { type: 'mc', q: '“She is 20 years old.”', options: ['Ella tiene veinte años.', 'Ella es veinte años.', 'Ella está veinte años.', 'Ella hay veinte años.'], answer: 0 },
        { type: 'mc', q: '“You’re right.” (tú)', options: ['Tienes razón.', 'Eres razón.', 'Estás razón.', 'Tiene razón tú.'], answer: 0 },
        { type: 'translate', q: 'My mother has three sisters.', answer: ['Mi madre tiene tres hermanas.'] },
        { type: 'translate', q: 'I have to work.', answer: ['(Yo) tengo que trabajar.'] },
        { type: 'translate', q: 'We are thirsty.', answer: ['(Nosotros) tenemos sed.'] },
        { type: 'order', q: 'My grandparents live in Seville.', answer: 'Mis abuelos viven en Sevilla.' },
      ],
    },

    // ───────────────────────────────────────── 10
    {
      id: 'u10', level: 'A1', icon: '🏙️',
      title: 'Ir: going places & plans',
      summary: 'Where you’re going, al/del, and the easy future: ir a + infinitive.',
      grammar: [
        {
          h: 'Conjugating ir (to go)',
          table: {
            head: ['Person', 'ir'],
            rows: [['yo', 'voy'], ['tú', 'vas'], ['él / ella / usted', 'va'], ['nosotros', 'vamos'], ['vosotros', 'vais'], ['ellos / ustedes', 'van']],
          },
        },
        {
          h: 'Contractions: al and del',
          p: '<p><strong>a + el = al</strong> and <strong>de + el = del</strong>. Spanish only has these two contractions. <em>a la, a los, de la</em> stay separate.</p>',
          ex: [['Voy al parque.', "I'm going to the park."], ['Vamos a la playa.', "We're going to the beach."], ['Es el coche del profesor.', "It's the teacher's car."]],
        },
        {
          h: 'ir a + infinitive = going to',
          p: '<p>The most common way to talk about future plans. <strong>Vamos a…</strong> can also mean “Let’s…”.</p>',
          ex: [['Voy a estudiar esta noche.', "I'm going to study tonight."], ['¿Qué vas a hacer mañana?', 'What are you going to do tomorrow?'], ['¡Vamos a bailar!', "Let's dance!"]],
        },
      ],
      vocab: [
        ['el supermercado', 'supermarket'], ['el banco', 'bank'], ['el restaurante', 'restaurant'], ['la escuela', 'school'],
        ['el parque', 'park'], ['la playa', 'beach'], ['el cine', 'cinema'], ['la tienda', 'shop'],
        ['el hospital', 'hospital'], ['la biblioteca', 'library'], ['la estación', 'station'], ['el museo', 'museum'],
        ['mañana', 'tomorrow'], ['¿adónde?', 'where (to)?'],
      ],
      exercises: [
        { type: 'fill', q: 'Yo ___ al parque.', answer: ['voy'] },
        { type: 'fill', q: 'Nosotros ___ a la playa mañana.', answer: ['vamos'] },
        { type: 'fill', q: 'Voy ___ cine.', answer: ['al'], hint: 'to the' },
        { type: 'fill', q: 'Es el libro ___ profesor.', answer: ['del'], hint: 'of the' },
        { type: 'fill', q: '¿Adónde ___ tú?', answer: ['vas'] },
        { type: 'mc', q: '“I’m going to travel to Mexico.”', options: ['Voy a viajar a México.', 'Voy viajar a México.', 'Voy a viajo a México.', 'Vamos a viajar a México.'], answer: 0 },
        { type: 'mc', q: '“We go to the library.”', options: ['Vamos a la biblioteca.', 'Vamos al biblioteca.', 'Vamos a el biblioteca.', 'Van a la biblioteca.'], answer: 0 },
        { type: 'translate', q: 'They are going to the museum.', answer: ['(Ellos) van al museo.', '(Ellas) van al museo.'] },
        { type: 'translate', q: "Let's go to the beach!", answer: ['¡Vamos a la playa!'] },
        { type: 'translate', q: 'I am going to eat.', answer: ['(Yo) voy a comer.'] },
        { type: 'order', q: 'What are you (tú) going to do tomorrow?', answer: '¿Qué vas a hacer mañana?' },
      ],
    },

    // ───────────────────────────────────────── 11
    {
      id: 'u11', level: 'A1', icon: '🕒',
      title: 'Questions, days & time',
      summary: 'Question words, days of the week and telling the time.',
      grammar: [
        {
          h: 'Question words',
          p: '<p>All question words carry an accent mark.</p>',
          table: {
            head: ['Spanish', 'English'],
            rows: [
              ['¿qué?', 'what?'], ['¿quién? / ¿quiénes?', 'who?'], ['¿dónde? / ¿adónde? / ¿de dónde?', 'where? / where to? / where from?'],
              ['¿cuándo?', 'when?'], ['¿cómo?', 'how?'], ['¿cuánto/a? / ¿cuántos/as?', 'how much? / how many?'],
              ['¿cuál? / ¿cuáles?', 'which?'], ['¿por qué?', 'why?'],
            ],
          },
          tip: '<em>¿Por qué?</em> (two words, accent) = why? <em>Porque</em> (one word, no accent) = because.',
        },
        {
          h: 'Days of the week',
          p: '<p>lunes · martes · miércoles · jueves · viernes · sábado · domingo. Days are written in lowercase. <em>El lunes</em> = on Monday; <em>los lunes</em> = on Mondays.</p>',
        },
        {
          h: 'Telling the time',
          p: '<p>Use <strong>es la una</strong> for 1 o’clock and <strong>son las…</strong> for every other hour. Add minutes with <strong>y</strong>, subtract with <strong>menos</strong>. Use <strong>a las…</strong> for “at”.</p>',
          ex: [['¿Qué hora es?', 'What time is it?'], ['Es la una y cuarto.', "It's quarter past one."], ['Son las tres y media.', "It's half past three."], ['Son las ocho menos diez.', "It's ten to eight."], ['La clase es a las nueve.', 'The class is at nine.']],
        },
      ],
      vocab: [
        ['lunes', 'Monday'], ['martes', 'Tuesday'], ['miércoles', 'Wednesday'], ['jueves', 'Thursday'],
        ['viernes', 'Friday'], ['sábado', 'Saturday'], ['domingo', 'Sunday'], ['hoy', 'today'],
        ['ayer', 'yesterday'], ['la semana', 'week'], ['el fin de semana', 'weekend'], ['¿qué hora es?', 'what time is it?'],
        ['¿cuándo?', 'when?'], ['¿por qué?', 'why?'], ['porque', 'because'],
      ],
      exercises: [
        { type: 'mc', q: '¿___ te llamas?', options: ['Cómo', 'Qué', 'Cuál', 'Quién'], answer: 0, explain: '¿Cómo te llamas? = What is your name? (lit. How do you call yourself?)' },
        { type: 'fill', q: '¿___ es tu cumpleaños?', answer: ['cuándo'], hint: 'When is your birthday?' },
        { type: 'fill', q: '¿___ vives?', answer: ['dónde'], hint: 'Where do you live?' },
        { type: 'mc', q: '“Why do you study? — Because I like it.”', options: ['¿Por qué estudias? — Porque me gusta.', '¿Porque estudias? — Por qué me gusta.', '¿Por qué estudias? — Por qué me gusta.', '¿Porqué estudias? — Porque me gusta.'], answer: 0 },
        { type: 'mc', q: '3:30', options: ['Son las tres y media.', 'Es las tres y media.', 'Son las tres y cuarto.', 'Son tres y media.'], answer: 0 },
        { type: 'mc', q: '1:15', options: ['Es la una y cuarto.', 'Son las una y cuarto.', 'Es una y cuarto.', 'Es la una y media.'], answer: 0 },
        { type: 'fill', q: 'La clase es ___ las nueve.', answer: ['a'], hint: 'at nine' },
        { type: 'translate', q: 'on Mondays', answer: ['los lunes'] },
        { type: 'translate', q: 'What time is it?', answer: ['¿Qué hora es?'] },
        { type: 'translate', q: 'Today is Friday.', answer: ['Hoy es viernes.'] },
        { type: 'order', q: 'Who is your teacher?', answer: '¿Quién es tu profesor?' },
      ],
    },

    // ───────────────────────────────────────── 12
    {
      id: 'u12', level: 'A1', icon: '🥾',
      title: 'Stem-changing “boot” verbs',
      summary: 'querer → quiero, poder → puedo, pedir → pido.',
      grammar: [
        {
          h: 'The boot pattern',
          p: '<p>In some verbs the stem vowel changes when it is stressed: <strong>e → ie</strong>, <strong>o → ue</strong>, or <strong>e → i</strong>. The change happens in every form <em>except</em> nosotros and vosotros. If you draw a line around the forms that change, it looks like a boot.</p>',
          table: {
            head: ['Person', 'querer (e→ie)', 'poder (o→ue)', 'pedir (e→i)'],
            rows: [
              ['yo', 'quiero', 'puedo', 'pido'], ['tú', 'quieres', 'puedes', 'pides'], ['él / ella / usted', 'quiere', 'puede', 'pide'],
              ['nosotros', 'queremos', 'podemos', 'pedimos'], ['vosotros', 'queréis', 'podéis', 'pedís'], ['ellos / ustedes', 'quieren', 'pueden', 'piden'],
            ],
          },
        },
        {
          h: 'Common boot verbs',
          p: '<p><strong>e → ie:</strong> querer, pensar, empezar, preferir, entender, cerrar<br><strong>o → ue:</strong> poder, dormir, volver, encontrar, costar<br><strong>u → ue:</strong> jugar (the only one)<br><strong>e → i:</strong> pedir, servir, repetir, seguir</p>',
          ex: [['¿Cuánto cuesta?', 'How much does it cost?'], ['La película empieza a las ocho.', 'The film starts at eight.'], ['Jugamos al fútbol.', 'We play football.']],
          tip: '<em>Poder</em>, <em>querer</em> and <em>preferir</em> are followed directly by an infinitive: <em>Puedo ir</em> = I can go.',
        },
      ],
      vocab: [
        ['querer', 'to want / love'], ['pensar', 'to think'], ['empezar', 'to begin'], ['preferir', 'to prefer'],
        ['entender', 'to understand'], ['cerrar', 'to close'], ['poder', 'to be able to / can'], ['dormir', 'to sleep'],
        ['volver', 'to return'], ['encontrar', 'to find'], ['costar', 'to cost'], ['jugar', 'to play (games, sports)'],
        ['pedir', 'to ask for / order'], ['repetir', 'to repeat'],
      ],
      exercises: [
        { type: 'fill', q: 'Yo ___ un café.', answer: ['quiero'], hint: 'querer' },
        { type: 'fill', q: 'Nosotros ___ ir mañana.', answer: ['podemos'], hint: 'poder', explain: 'No stem change for nosotros.' },
        { type: 'fill', q: '¿Cuánto ___ el libro?', answer: ['cuesta'], hint: 'costar' },
        { type: 'fill', q: 'Ellos ___ ocho horas.', answer: ['duermen'], hint: 'dormir' },
        { type: 'fill', q: 'Tú ___ una pizza.', answer: ['pides'], hint: 'pedir' },
        { type: 'fill', q: 'La clase ___ a las nueve.', answer: ['empieza'], hint: 'empezar' },
        { type: 'fill', q: 'Nosotros ___ al fútbol.', answer: ['jugamos'], hint: 'jugar' },
        { type: 'mc', q: '“Do you understand?” (tú)', options: ['¿Entiendes?', '¿Entendes?', '¿Entiende?', '¿Entiendas?'], answer: 0 },
        { type: 'translate', q: 'I prefer tea.', answer: ['(Yo) prefiero (el) té.'] },
        { type: 'translate', q: 'Can you repeat, please? (usted)', answer: ['¿Puede (usted) repetir, por favor?'] },
        { type: 'order', q: 'We return home at six.', answer: 'Volvemos a casa a las seis.' },
      ],
    },
  );
})(globalThis.SL = globalThis.SL || {});
