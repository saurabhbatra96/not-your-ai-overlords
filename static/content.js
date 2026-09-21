/* Content for the static render. The Ghost theme is the source of truth for
   markup; this file stands in for the Ghost database.

   Voice, shapes, shelves and headline patterns follow the house style guide. */

const site = {
    title: 'Not Your A.I. Overlords',
    description: 'Deeply serious investigations of questions that do not matter \u2014 filed by a research bureau made entirely of yarn.',
    locale: 'en',
    logo: null,
    members_enabled: true,
};

const custom = {
    portrait: 'images/portrait.jpg',

    hero_line_start: 'We are',
    hero_line_italic: 'not',
    hero_line_end: 'your A.I. overlords.',
    hero_cta: 'Read the latest finding',

    bureau_1_image: 'images/portrait.jpg',
    bureau_1_role: 'Principal investigator, mostly of himself',
    bureau_2_image: 'images/prof-claude.jpg',
    bureau_2_role: 'Dept. of second opinions',
    bureau_3_image: 'images/dr-gpt.jpg',
    bureau_3_role: 'Chair of confident wrongness',
    bureau_4_image: 'images/shelf-guinea-pig.jpg',
    bureau_4_role: 'Provides the compute',

    newsletter_eyebrow: 'Correspondence / once a month',
    newsletter_heading: 'One finding a month, at most.',
    newsletter_body: 'No growth loops. Just an occasional bundle of observations, charts, and things that turned out not to be true.',
    footer_note: 'Made slowly in London',
};

/* Shelf marks. In Ghost these are the tag's own feature_image, uploaded in
   admin; here they are files in static/images/. */
const tagImages = {
    'Investigations': 'images/shelf-investigations.jpg',
    'Guinea Pig':     'images/shelf-guinea-pig.jpg',
    'Corpus':         'images/shelf-corpus.jpg',
    'Workbench':      'images/shelf-workbench.jpg',
    'Nulls':          'images/shelf-nulls.jpg',
};

const author = {name: 'Saurabh Batra', slug: 'saurabh', bio: 'Engineer. Runs the experiments, and is usually also the sample.'};

/* The chart in the lead investigation — house style: every point shown (n=7),
   one annotation carrying the joke, direct labels, n stated in the caption. */
const readingChart = `<figure class="chart">
<div class="chart__plot">
<svg viewBox="0 0 720 330" role="img" aria-label="Days spent on each of seven books about indecisiveness. Range: 3 to 19 days.">
  <g class="chart__grid">
    <line x1="210" y1="28" x2="210" y2="292"></line>
    <line x1="330" y1="28" x2="330" y2="292"></line>
    <line x1="450" y1="28" x2="450" y2="292"></line>
    <line x1="570" y1="28" x2="570" y2="292"></line>
    <line x1="690" y1="28" x2="690" y2="292"></line>
  </g>
  <g class="chart__axis">
    <text x="210" y="312" text-anchor="middle">0</text>
    <text x="330" y="312" text-anchor="middle">5</text>
    <text x="450" y="312" text-anchor="middle">10</text>
    <text x="570" y="312" text-anchor="middle">15</text>
    <text x="690" y="312" text-anchor="middle">20 days</text>
  </g>
  <g class="chart__rows">
    <g><text class="chart__label" x="196" y="50">The Paradox of Choice</text>
       <line class="chart__stem" x1="210" y1="46" x2="354" y2="46"></line>
       <circle class="chart__dot" cx="354" cy="46" r="5"></circle>
       <text class="chart__value" x="368" y="50">6</text></g>
    <g><text class="chart__label" x="196" y="86">Thinking, Fast and Slow</text>
       <line class="chart__stem" x1="210" y1="82" x2="666" y2="82"></line>
       <circle class="chart__dot" cx="666" cy="82" r="5"></circle>
       <text class="chart__value" x="680" y="86">19</text></g>
    <g><text class="chart__label" x="196" y="122">Decisive</text>
       <line class="chart__stem" x1="210" y1="118" x2="306" y2="118"></line>
       <circle class="chart__dot" cx="306" cy="118" r="5"></circle>
       <text class="chart__value" x="320" y="122">4</text></g>
    <g><text class="chart__label" x="196" y="158">How to Decide</text>
       <line class="chart__stem" x1="210" y1="154" x2="282" y2="154"></line>
       <circle class="chart__dot" cx="282" cy="154" r="5"></circle>
       <text class="chart__value" x="296" y="158">3</text>
       <text class="chart__note" x="330" y="158">the shortest book says decide immediately</text></g>
    <g><text class="chart__label" x="196" y="194">The Art of Thinking Clearly</text>
       <line class="chart__stem" x1="210" y1="190" x2="474" y2="190"></line>
       <circle class="chart__dot" cx="474" cy="190" r="5"></circle>
       <text class="chart__value" x="488" y="194">11</text></g>
    <g><text class="chart__label" x="196" y="230">Algorithms to Live By</text>
       <line class="chart__stem" x1="210" y1="226" x2="402" y2="226"></line>
       <circle class="chart__dot" cx="402" cy="226" r="5"></circle>
       <text class="chart__value" x="416" y="230">8</text></g>
    <g><text class="chart__label" x="196" y="266">Wait</text>
       <line class="chart__stem" x1="210" y1="262" x2="546" y2="262"></line>
       <circle class="chart__dot" cx="546" cy="262" r="5"></circle>
       <text class="chart__value" x="560" y="266">14</text></g>
  </g>
  <line class="chart__baseline" x1="210" y1="292" x2="690" y2="292"></line>
</svg>
</div>
<figcaption>n=7 books. Days between opening and finishing each one. Source: my own reading log, which I keep for reasons I have never examined.</figcaption>
</figure>`;

const posts = [
    {
        slug: 'seven-books-about-indecisiveness',
        title: 'Reading seven books about indecisiveness is a fairly elegant way to keep not deciding',
        tag: 'Investigations',
        tags: ['Investigations'],
        date: '2026-09-16',
        excerpt: 'n=7 books, 65 days, 2,310 pages, and one decision still unmade.',
        html: `<p>There is a decision I have been not making since February. I am not going to tell you what it is, because the shape of it is irrelevant and because describing it would constitute, in a small way, progress.</p>

<p>In March I bought a book about how to make decisions. By August I had bought six more.</p>

<h2>What I actually measured</h2>

<p>Seven books, each bought specifically to resolve one outstanding decision. For each I logged the purchase date, the date I opened it, the date I finished it, the page count, and whether the decision had been made at any point during or after.</p>

<p>That last column contains seven identical values.</p>

${readingChart}

<p>The books took between three and nineteen days. The three-day book, <em>How to Decide</em>, is the one that most forcefully recommends deciding immediately. I read it fourth.</p>

<h2>What I think it means</h2>

<p>The honest reading is that buying a book about a decision is a way of doing something that feels adjacent to the decision while remaining, in every measurable sense, entirely outside it.</p>

<blockquote>Research is the only form of procrastination that produces a receipt.</blockquote>

<p>Each book had a framework. Six of the seven frameworks required, as a first step, writing down the options. I have written down the options nine times across four notebooks. The lists are substantially identical. One of them is laminated.</p>

<h3>Confounds, of which there are several</h3>

<ul>
<li><strong>The decision may be genuinely hard.</strong> Nothing here separates avoidance from difficulty, and a reader who wanted to be kind to me would point that out.</li>
<li><strong>Reading time is not deciding time.</strong> I could have been deciding on the train. I was not, but I could have been.</li>
<li><strong>n=7</strong>, one subject, no control, and the subject knew what was being measured throughout. This is the weakest possible design and it still found something.</li>
</ul>

<h2>The part I did not enjoy</h2>

<p>Somewhere around book five I started noticing that I was choosing the next book carefully. Comparing editions. Reading reviews of books about how to stop reading reviews.</p>

<p>The decision remains unmade. There is an eighth book in a tab I have not closed.<sup>1</sup></p>

<p class="footnote"><sup>1</sup> It is about overthinking. It has 384 pages.</p>`,
    },
    {
        slug: 'workout-music-nine-people',
        title: 'Nine people, three genres, and no effect on anything I could measure',
        tag: 'Guinea Pig',
        tags: ['Guinea Pig'],
        date: '2026-08-28',
        excerpt: 'n=9, three genres, 27 treadmill sessions, one heart rate monitor that kept falling off.',
        html: `<p>Everyone has a theory about what to listen to while exercising, and every theory is held with a confidence that the underlying evidence does not support. I decided to test mine on other people, which is the only ethical way to be wrong.</p>

<h2>Pre-registration</h2>

<p>Written before any data was collected, and reproduced here unedited, because a protocol you are allowed to revise afterwards is not a protocol.</p>

<blockquote><strong>Hypothesis.</strong> Tempo above 140bpm produces a measurably higher average heart rate during steady-state treadmill running than tempo below 100bpm.<br>
<strong>Protocol.</strong> Nine volunteers, three sessions each, 20 minutes at self-selected pace. Genre assigned in rotating order. Heart rate sampled every 5 seconds.<br>
<strong>Falsified if.</strong> Mean heart rate difference between the high and low tempo conditions is under 3bpm.</blockquote>

<h2>What happened</h2>

<p>The mean difference was 1.4bpm. The hypothesis is falsified by the criterion I wrote down in advance, which is an annoying thing to have done to yourself.</p>

<p>Self-selected pace turns out to be the entire story. People ran at the speed they were going to run at, and their hearts responded to the running rather than to the music. Two participants independently described the fast condition as "stressful" and then ran exactly as fast as before.</p>

<h3>The monitor</h3>

<p>The chest strap fell off four times across 27 sessions, always on the same participant, always during the third song. I have excluded those intervals and noted here that I have done so, rather than quietly trimming them, which was tempting.</p>

<h2>What I would do differently</h2>

<ul>
<li>Control pace, or stop pretending heart rate is the interesting variable. Perceived exertion was where the signal probably lives.</li>
<li>More than three sessions each. With n=9 and three conditions, a 1.4bpm difference is indistinguishable from the monitor's own noise.</li>
<li>Not tell participants what was being tested. Two of them tried to help.</li>
</ul>

<p>The data is in the linked sheet. If you find something in it that I missed, I would genuinely like to know, and I will say so here.</p>`,
    },
    {
        slug: 'every-productivity-book-wake-up-earlier',
        title: 'Every productivity book recommends waking up earlier, including the one about sleep',
        tag: 'Corpus',
        tags: ['Corpus'],
        date: '2026-08-11',
        excerpt: 'n=12 books, 41 distinct recommendations counted, 9 of them mutually exclusive.',
        html: `<p>The plan was to read twelve productivity books and count what they actually tell you to do. Not to evaluate them — to tabulate them, the way you would tabulate anything that claims to be a system.</p>

<h2>Counting rules, fixed in advance</h2>

<p>A recommendation counted if it was stated imperatively and at least once outside a chapter summary. Anecdotes did not count. "Consider whether" did not count. This is stricter than it sounds and it removed about a third of what felt like advice while reading.</p>

<h2>The count</h2>

<p>Forty-one distinct recommendations across twelve books. Eleven books recommend waking up earlier. The twelfth is about sleep, and recommends waking up earlier, on a consistent schedule, which is the same instruction wearing a lab coat.</p>

<p>Nine pairs are mutually exclusive. Three books instruct you to batch your email; two instruct you to handle each message once, on arrival. Both positions are argued from first principles, and neither book acknowledges that the other exists.</p>

<blockquote>A genre in which every entry is a complete system, and no entry cites another, is not a field. It is a set of parallel universes with a shared cover designer.</blockquote>

<h2>The verdicts</h2>

<p>Two of the twelve are worth your time, and both are worth it for the same reason: they are the only ones that state a condition under which their advice would not apply. Everything else is unfalsifiable, which is the genre's defining feature rather than an accident of any particular author.</p>

<p>The full table of forty-one recommendations, tagged by book and by whether anything contradicts it, is in the linked sheet.</p>`,
    },
    {
        slug: 'logging-treadmill-sessions-without-an-api',
        title: 'How to log 27 treadmill sessions when nothing involved has an API',
        tag: 'Workbench',
        tags: ['Workbench'],
        date: '2026-07-24',
        excerpt: 'Three vendor exports, one scraper, and a CSV with 41 columns, 38 of them empty.',
        html: `<p>The music study needed heart rate data from nine people using four different devices. This is the part of the work that does not appear in the write-up, and it took longer than the study.</p>

<h2>What the vendors provide</h2>

<p>Two of the four offer a CSV export, buried two levels into a settings page and rate-limited to one request per hour for no reason anyone could explain to me. One offers a PDF. One offers a screenshot feature.</p>

<p>The PDF was the interesting problem. It contains a chart image and no numbers, so the data exists only as pixels. I spent an evening writing something to read values off the rendered line before noticing that the same account's web dashboard fetches the underlying series as JSON to draw that chart, and that the endpoint is not authenticated beyond a session cookie.</p>

<h2>The shape of the mess</h2>

<p>Four devices, four sampling rates, three timestamp formats, and two different opinions about whether a dropped signal should be a null, a zero, or the previous value repeated. The last one matters enormously and is documented by none of them.</p>

<pre><code>device_a: 1Hz,  ISO-8601 UTC,     null on dropout
device_b: 0.2Hz, epoch millis,     0 on dropout
device_c: 1Hz,  local time, no TZ, last value held
device_d: ?,    "14:32:07",        unclear</code></pre>

<p>Device C is the one that quietly lies. A held value looks exactly like a person with a very steady heart rate, and it is invisible unless you go looking for runs of identical samples. There were 340 such runs.</p>

<h2>What I would build next time</h2>

<p>A single ingest step that normalises to one sample rate and one dropout convention before anything else touches the data, with the raw file kept untouched alongside. I did this halfway through, having already analysed a week of data that turned out to be four percent held values.</p>

<p>The scraper and the normaliser are both in the repo. Neither is good.</p>`,
    },
    {
        slug: 'tabs-open-predicts-nothing',
        title: 'The number of tabs I have open predicts nothing, including how many tabs I will open tomorrow',
        tag: 'Nulls',
        tags: ['Nulls'],
        date: '2026-07-08',
        excerpt: 'n=61 days, 14,000 samples, r=0.04 against every variable I had.',
        html: `<p>I had a theory that open tab count was a leading indicator of something — stress, unfinished work, how scattered a day was going to be. It samples itself, it needs no discipline to collect, and it felt like it meant something.</p>

<h2>The protocol</h2>

<p>A background script sampled tab count every five minutes for 61 days. Against it: daily self-rated focus (1–5, recorded at 21:00), commits pushed, hours in meetings, and sleep duration from the same unreliable device as the music study.</p>

<h2>The result</h2>

<p>Nothing. The largest absolute correlation with anything was 0.04, against meeting hours, which is noise. Tab count does not even autocorrelate meaningfully day to day — yesterday's count tells you almost nothing about today's.</p>

<p>The one real pattern is a sawtooth with a period of about nine days, which corresponds exactly to how often I get annoyed enough to close everything.</p>

<h2>Why this is here</h2>

<p>Because a site that only publishes the studies that worked is describing a fictional process. This one cost 61 days of sampling and produced one sentence of finding, and the sentence is "no".</p>

<p>The sawtooth is somewhat interesting on its own and I am not going to investigate it, because that is how the last four months started.</p>`,
    },
];

const pages = [
    {
        slug: 'about',
        title: 'About',
        excerpt: 'A workbench, a newsletter, and a standing refusal to pick an important subject.',
        html: `<p>This is a site about investigating things that do not matter, using methods that do.</p>

<p>The premise is narrow on purpose. Take a question nobody needs answered — what you should listen to while running, how many books about indecisiveness one person can buy — and then answer it properly. State the sample size. Publish the data. Name the confounds before someone else does.</p>

<p>The comedy, if there is any, comes entirely from the gap between the seriousness of the method and the triviality of the question. Nothing here is a parody of research. The method is real; only the subject is silly.</p>

<h2>The shelves</h2>

<ul>
<li><strong>Investigations</strong> — the flagship pieces. A stupid question, a real dataset, an honest answer.</li>
<li><strong>Guinea Pig</strong> — self-experiments and protocols, pre-registered, usually on me.</li>
<li><strong>Corpus</strong> — books and papers read as data rather than reviewed.</li>
<li><strong>Workbench</strong> — how the measuring actually happened, including the parts that broke.</li>
<li><strong>Nulls</strong> — findings that were not. Published anyway, which is the whole point.</li>
</ul>

<h2>The bureau</h2>

<p>Prof. Overlord runs the experiments. Prof. Claude and Dr. GPT collaborate, in the sense that they disagree with him and with each other. The Intern provides the compute.</p>

<p>They are introduced properly at the foot of the front page. They appear in the pictures and occasionally in a footnote, and they do not deliver findings, hold opinions, or speak for anybody real.</p>

<h2>The name</h2>

<p>It started as a joke about a genre. The prevailing story about machines is that they are either coming to save us or coming to replace us, and both versions put the machine at the centre of the sentence.</p>

<blockquote>Not your A.I. overlords. Just a person, some data, and a question that did not need asking.</blockquote>

<h2>Honesty notes</h2>

<p>Every number on this site is real or is labelled in the same sentence as invented. The illustrations are generated with Midjourney and are disclosed as such. The writing is mine, which given the name seems like the minimum.</p>

<p>There is a newsletter, roughly monthly. No growth loops.</p>`,
    },
];

const navigation = [
    {label: 'Archive', url: 'findings/'},
    {label: 'About', url: 'about/'},
];

const secondaryNavigation = [
    {label: 'Archive', url: 'findings/'},
];

/* Interim article heroes: the crocheted objects left over once shelves went
   internal. One piece deliberately has none \u2014 an empty hero reads as
   "not made yet", which is true. Swap each for its own generated image. */
const INTERIM_HEROES = {
    'seven-books-about-indecisiveness': 'images/shelf-corpus.jpg',
    'every-productivity-book-wake-up-earlier': 'images/shelf-investigations.jpg',
    'logging-treadmill-sessions-without-an-api': 'images/shelf-workbench.jpg',
    'tabs-open-predicts-nothing': 'images/shelf-nulls.jpg',
};
posts.forEach(p => {
    const hero = INTERIM_HEROES[p.slug];
    if (!hero) return;
    p.feature_image = hero;
    p.feature_image_alt = '';
    p.feature_image_caption = 'Stand-in. Each piece gets its own generated hero \u2014 the subject, crocheted, on the desk.';
});

module.exports = {site, custom, author, posts, pages, navigation, secondaryNavigation, tagImages};
