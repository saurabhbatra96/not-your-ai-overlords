/* Content for the static render. The Ghost theme is the source of truth for
   markup; this file stands in for the Ghost database. */

const site = {
    title: 'Not Your A.I. Overlords',
    description: 'A warm dispatch from the workbench: engineering, digital craft, and the strange small experiments that make a system sing.',
    locale: 'en',
    logo: null,
    members_enabled: true,
};

const custom = {
    eyebrow: 'Field notes on making systems feel human',
    portrait: null,
    byline_mark: null,
    byline_text: 'Saurabh Batra · Engineer / maker',
    lead_label: 'The lead experiment',
    section_label: 'Recent experiments',
    show_card_images: false,
    newsletter_eyebrow: 'Correspondence / once a month',
    newsletter_heading: 'A note from the workbench.',
    newsletter_body: 'No growth loops. Just an occasional bundle of observations, diagrams, and unfinished thoughts.',
    footer_note: 'Made slowly in London',
};

const author = {name: 'Saurabh Batra', slug: 'saurabh', bio: 'Engineer, maker, and habitual re-reader of his own commit messages.'};

const posts = [
    {
        slug: 'friction-in-the-machine',
        title: 'The case for leaving a little friction in the machine',
        tag: 'Systems',
        tags: ['Systems', 'Craft'],
        date: '2026-09-02',
        excerpt: 'Perfectly smooth interfaces often erase the evidence of care. A note on designing tools that reveal their joinery, invite curiosity, and give their users something honest to hold onto.',
        html: `<p>There is a particular kind of software that feels like a hotel lobby. Everything glides. Nothing squeaks. And you cannot tell, standing in the middle of it, whether anyone actually lives there.</p>

<p>We built a decade of interface craft on the premise that friction is waste — that every extra click is a tax on the user, and the ideal tool is the one that disappears entirely. Mostly that was right. But somewhere in the sanding, we started removing a second thing along with the friction: the evidence that the machine was doing anything at all.</p>

<h2>Friction is not the same as effort</h2>

<p>The confusion is worth naming precisely. <strong>Effort</strong> is what the user has to spend to get what they came for. <strong>Friction</strong> is the texture they feel while spending it. You want less effort. You do not always want less texture.</p>

<p>A heavy door with a well-weighted closer takes the same effort as a flimsy one and communicates something entirely different. So does a save operation that takes 400ms and says what it saved, versus one that takes 40ms and says nothing.</p>

<blockquote>A tool that shows its seams is asking you to trust it for reasons, not on faith.</blockquote>

<h2>Where the seams went</h2>

<p>Watch a modern deploy pipeline from the outside. A spinner appears. Some time passes — thirty seconds, or eleven minutes. The spinner resolves to a checkmark. At no point were you told what was happening, which of the nine steps you were on, or what would happen if you closed the tab.</p>

<p>The spinner is not a progress indicator. It is a promise that someone, somewhere, is still holding the rope. When the rope goes slack, the spinner keeps spinning.</p>

<h3>Three places to put the texture back</h3>

<ul>
<li><strong>Name the operation, not the state.</strong> "Rebuilding the search index (3 of 9)" costs the same pixels as "Loading…" and buys enormously more.</li>
<li><strong>Show the cost before the click.</strong> If the button starts something expensive, irreversible, or slow, let the label say so. <code>Delete 1,204 records</code> is a better button than <code>Delete</code>.</li>
<li><strong>Leave the undo visible before it is needed.</strong> An undo you have to go looking for is a confession, not a feature.</li>
</ul>

<h2>A small test</h2>

<p>Hand the thing to someone who has never seen it. Ask them to narrate, out loud, what they believe it is doing. Do not correct them.</p>

<p>Every place they go quiet is a seam you sanded off too far. Every place they guess wrong is a seam you hid behind the wrong word. The goal is not a user who is never confused — it is a user whose confusion is <em>about the problem</em>, and not about your machine.</p>`,
    },
    {
        slug: 'soft-edges-hard-constraints',
        title: 'Soft edges, hard constraints',
        tag: 'Systems',
        tags: ['Systems', 'Craft'],
        date: '2026-08-19',
        excerpt: 'What crochet taught me about architectural boundaries — and why the stitch you can pull out is worth more than the one you cannot.',
        html: `<p>I learned more about system boundaries from a half-finished crocheted hexagon than from any architecture review I have sat in.</p>

<p>Here is the thing about crochet: it is a single continuous thread, looped through itself. There is no glue. If you pull the working end, the whole thing comes apart in reverse order, stitch by stitch, back to exactly the state it was in at any earlier moment. The structure is entirely made of its own undoing.</p>

<h2>Two kinds of edges</h2>

<p>A crocheted piece has a <strong>soft edge</strong> — the live loops at the working end, where the next row attaches — and a <strong>hard edge</strong>, the finished border you have woven in and cut. The soft edge is where growth happens. The hard edge is a decision you have made permanent, and it is deliberately, physically harder to reverse.</p>

<p>Systems have both, and most of our trouble comes from confusing which is which.</p>

<blockquote>A boundary is not a wall. It is a declaration about which direction change is cheap in.</blockquote>

<h3>Internal module seams are soft</h3>

<p>Rename them. Move them. Collapse two into one when the distinction stops earning its keep. If reversing a decision costs you a rebuild and a code review, it is soft, and you should treat it as a place to be generous and provisional.</p>

<h3>Anything with a consumer is hard</h3>

<p>A public API, a database column other services read, an event shape on a queue, a URL someone bookmarked. The moment a second party depends on the shape, you have woven in the end and cut the thread. Changing it now means finding every consumer, which means finding every consumer you <em>forgot about</em>.</p>

<h2>The mistake I keep making</h2>

<p>I harden edges too early. It feels responsible — the versioned endpoint, the formal schema, the deprecation policy — on something three people have used twice. All of that machinery is a bet that the shape is right. Making the bet before you have evidence just means you pay the interest on a loan you did not need.</p>

<p>The crochet version of this mistake is weaving in your ends before the piece is the size you want. It looks tidy. It is a nightmare to extend.</p>

<h2>The discipline</h2>

<p>Before you firm something up, ask: <em>who would I have to call if this were wrong?</em></p>

<ul>
<li>Nobody — leave it soft, and stop building ceremony around it.</li>
<li>A colleague — leave it soft, tell the colleague.</li>
<li>Someone outside the room — now harden it, and mean it.</li>
</ul>

<p>Most boundaries in most systems fall in the first category and are dressed as the third. That dressing is not free. It is the reason your codebase feels heavier than the problem it solves.</p>`,
    },
    {
        slug: 'make-the-tool-show-its-seams',
        title: 'Make the tool show its seams',
        tag: 'Fieldwork',
        tags: ['Fieldwork', 'Craft'],
        date: '2026-08-04',
        excerpt: 'A field guide for legible interfaces and generous defaults — written after a week of watching people use something I built and saying nothing.',
        html: `<p>I spent a week sitting behind people using a tool I had built, with a rule: I was not allowed to speak. Not to explain, not to nudge, not to say "ah, that button is actually —". Just watch.</p>

<p>It is the most uncomfortable and most useful week of engineering I have ever done.</p>

<h2>What legibility actually means</h2>

<p>A legible interface is one where a person can construct a correct mental model of what is happening from the outside, without documentation, and without you in the room. Not a <em>complete</em> model. A correct one.</p>

<p>The bar is lower than it sounds and we clear it less often than we think. Legibility fails in three characteristic ways:</p>

<ul>
<li><strong>Silent success.</strong> The thing worked and said nothing, so the user did it again. Now it has worked twice.</li>
<li><strong>Ambiguous failure.</strong> Something went wrong and the message describes the symptom in the system's vocabulary, not the cause in the user's.</li>
<li><strong>Invisible state.</strong> The tool is in a mode, and nothing on screen says which mode.</li>
</ul>

<h2>Generous defaults</h2>

<p>The other half of the guide. A generous default is one that is correct for the common case, obviously visible, and trivially overridable — in that order.</p>

<p>Most defaults fail the second test. They are correct and invisible, which means the user cannot learn from them. A default that shows itself is a teaching tool: it demonstrates the shape of a good answer before the user knows what a good answer looks like.</p>

<blockquote>Every default is a small opinion you are handing to someone at the exact moment they cannot evaluate it. Make it a kind one, and let them see it.</blockquote>

<h3>The fill-in trick</h3>

<p>Instead of a blank field with placeholder text, pre-fill the field with the default value, selected. The user sees a real answer, can accept it by moving on, and can replace it by typing. Three behaviours, no instructions.</p>

<p>Compare with <code>placeholder="e.g. my-project"</code>, which is a hint dressed as a value, disappears the moment you engage with it, and is invisible to a screen reader at the moment it matters most.</p>

<h2>What I changed</h2>

<p>After that week: every destructive action names its target in the button. Every long operation names its current step. Every error message begins with what the user was trying to do, not what the system was doing when it gave up.</p>

<p>None of it was clever. All of it came from sitting on my hands and watching someone be quietly, politely lost.</p>`,
    },
    {
        slug: 'the-fifteen-minute-repair',
        title: 'The fifteen-minute repair',
        tag: 'Practice',
        tags: ['Practice'],
        date: '2026-07-21',
        excerpt: 'A small ritual for rescuing projects before they calcify: fifteen minutes, one irritation, no permission required.',
        html: `<p>Every project I have abandoned died the same way. Not in a crisis — in an accumulation. A hundred small irritations, each one individually too minor to justify stopping for, collectively forming a surface too rough to keep touching.</p>

<p>The ritual that fixed this for me takes fifteen minutes and has exactly one rule.</p>

<h2>The rule</h2>

<p>At the start of a working session, before any real work: pick the irritation you noticed most recently, and fix it. Fifteen minutes. If it takes longer, stop and write it down instead.</p>

<p>That is the whole practice. The constraint is doing the work, not the discipline.</p>

<h3>Why fifteen minutes specifically</h3>

<p>Long enough to fix a bad error message, delete a dead file, rename a confusing variable, or write the one-line comment explaining the thing you re-derive every time. Short enough that you never have to negotiate with yourself about whether you can afford it.</p>

<p>The negotiation is the enemy. A twenty-minute budget invites an estimate; an estimate invites a deferral; a deferral is how a two-minute fix becomes a permanent feature of the landscape.</p>

<blockquote>The repairs you can justify are never the ones that are killing you. The ones killing you are each too small to justify.</blockquote>

<h2>What counts</h2>

<ul>
<li>Anything you have worked <em>around</em> more than twice.</li>
<li>Anything that made you sigh in the last session.</li>
<li>Any message, name, or log line that you mentally translate every time you read it.</li>
<li>Any file you are slightly afraid to open.</li>
</ul>

<p>What does not count: refactors, redesigns, upgrades, and anything you would describe with the word "properly". Those are real work with real budgets. This is maintenance of the surface you touch.</p>

<h2>The compounding part</h2>

<p>After a few months the character of the project changes. Not because any single repair mattered, but because the ambient friction stopped rising. A codebase where the irritations get fixed at the rate they appear is a codebase that stays approachable indefinitely.</p>

<p>And there is a second effect, quieter and more important: you stop learning to tolerate your own tools being bad. That tolerance is the actual thing that kills projects. It is remarkably easy to acquire and surprisingly hard to notice.</p>`,
    },
    {
        slug: 'notes-on-a-slower-deploy',
        title: 'Notes on a slower deploy',
        tag: 'Systems',
        tags: ['Systems', 'Practice'],
        date: '2026-07-02',
        excerpt: 'We shipped less often on purpose for one quarter. What it did to the review culture was not what anyone predicted.',
        html: `<p>For one quarter we deployed twice a week instead of roughly twelve times a day. This was not a philosophical position. Our staging environment had become unreliable in a way nobody had time to fix, and slowing down was the cheapest available mitigation.</p>

<p>The interesting part was not the deploys. It was what happened to how we reviewed each other's work.</p>

<h2>The prediction</h2>

<p>Everyone expected batching. Bigger changes per deploy, harder rollbacks, more fear. Some of that happened — our median diff roughly doubled, and two incidents took longer to attribute than they would have.</p>

<p>What nobody predicted was that review comments got <em>longer</em>, and substantively different in kind.</p>

<h2>What changed in review</h2>

<p>With a twice-weekly train, a review is no longer a gate you are holding up. Under continuous deploy, every comment carries an implicit cost: the author is standing there, the change is ready, and anything you raise delays a thing that could already be live. That pressure quietly reshapes what people are willing to say.</p>

<p>The comments that get suppressed are not the bug reports. Those feel urgent and legitimate. The suppressed ones are the design observations — <em>this reads like it wants to be two functions</em>, <em>I think this duplicates the thing in the importer</em> — which feel like opinions, and which you do not want to spend someone's afternoon on.</p>

<blockquote>Speed does not eliminate the design conversation. It relocates it to a private feeling of unease that nobody writes down.</blockquote>

<h3>The measurable bit</h3>

<p>We did not instrument this well, and I would not present it as evidence. But reading back through that quarter, comments containing the words "could", "wonder", and "instead" went up noticeably, and comments that were a single line with a fix suggestion went down.</p>

<h2>What we kept</h2>

<p>We went back to fast deploys — the staging fix landed, and the trade was not worth it overall. Waiting three days to see a change in front of users is its own corrosion.</p>

<p>But we kept two things:</p>

<ul>
<li><strong>A weekly review with no deploy attached.</strong> One hour, one recent change, nobody blocked. It is the only place the design conversation reliably happens out loud.</li>
<li><strong>The explicit non-blocking comment.</strong> A prefix — we use <code>nit:</code> and <code>musing:</code> — that means "I am saying this for the record and you may merge over it". Sounds trivial. It moved a whole category of thought from nobody's head into the repository.</li>
</ul>

<p>The lesson I take is not that slow is better. It is that deploy cadence is a social instrument, and we usually tune it as though it were only a technical one.</p>`,
    },
    {
        slug: 'the-index-that-lied',
        title: 'The index that lied',
        tag: 'Fieldwork',
        tags: ['Fieldwork', 'Systems'],
        date: '2026-06-11',
        excerpt: 'A query planner, a stale histogram, and four hours of confusion — a debugging story with a moral about trusting the map over the territory.',
        html: `<p>The query took eleven seconds. It had taken forty milliseconds the previous week. Nothing had been deployed. Nothing had been migrated. The table had grown by about four percent.</p>

<p>I want to walk through the four hours, because the shape of the confusion is more useful than the fix.</p>

<h2>Hour one: suspecting the obvious</h2>

<p>The query filtered on an indexed column. The index existed — I checked. The index was valid — I checked. So the problem must be elsewhere: lock contention, a noisy neighbour, a connection pool starved by something unrelated.</p>

<p>I spent an hour in the wrong neighbourhood because I had confirmed the index <em>existed</em> and silently concluded the database was <em>using</em> it. Those are different facts, and only one of them was in evidence.</p>

<h2>Hour two: reading the plan</h2>

<p>It was not using it. A sequential scan, plainly, in the first line of the plan.</p>

<p>This is the moment where you should stop and ask a specific question: <strong>why does the planner believe a scan is cheaper?</strong> The planner is not broken and is not being stubborn. It is doing arithmetic on numbers it has been given, and one of those numbers is wrong.</p>

<blockquote>A query planner never surprises you. Its statistics do. The plan is a faithful rendering of a map that has stopped matching the ground.</blockquote>

<h2>Hour three: the histogram</h2>

<p>The column was a status field. Historically it held about forty percent <code>active</code> and sixty percent everything else — a filter on it was not selective, but the query also constrained a date range, and the combination was.</p>

<p>Except a backfill three weeks earlier had shifted the distribution hard: <code>active</code> was now under two percent. The planner's statistics, sampled before the backfill and not refreshed since, still described the old world. In the old world, the index lookup would have returned a huge fraction of the table, and a scan genuinely is cheaper. The planner made a correct decision about a table that no longer existed.</p>

<h2>Hour four: the fix, and the better fix</h2>

<p>The fix was one command — re-analyse the table. Forty milliseconds returned immediately.</p>

<p>The better fix took longer and mattered more:</p>

<ul>
<li>Any bulk write path now re-analyses the tables it touched, as part of the job, not as a cron job that might be behind.</li>
<li>Our slow-query alert includes the plan, not just the duration. The plan was the answer the whole time and was four hours away from me by pure procedure.</li>
</ul>

<h2>The moral</h2>

<p>When a system that was fast becomes slow with no change to the code, the data, or the hardware, the thing that changed is a <em>belief</em> the system holds about itself. Find the cache, the statistic, the memoised assumption. Something is confidently describing a world that has moved.</p>`,
    },
    {
        slug: 'naming-things-twice',
        title: 'Naming things twice',
        tag: 'Practice',
        tags: ['Practice', 'Craft'],
        date: '2026-05-28',
        excerpt: 'Why the second name is usually the right one, and the cheap ritual that gets you there without a committee.',
        html: `<p>The first name you give a thing is a description of how you found it. The second name is a description of what it is. These are rarely the same, and we ship the first one far too often.</p>

<h2>Where first names come from</h2>

<p>You are in the middle of building. You need somewhere to put a piece of behaviour, so you name it after the circumstance that produced it: <code>handleLegacyImportEdgeCase</code>, <code>UserServiceHelper</code>, <code>processDataV2</code>. Each of these is an honest record of a moment. None of them describes a concept.</p>

<p>First names are archaeology. They tell you about the dig, not the artefact.</p>

<blockquote>If the name contains the word "handle", "process", "manage", or a version number, it is almost certainly a first name.</blockquote>

<h2>The ritual</h2>

<p>When the thing works — tests green, behaviour correct, before the review — read the name out loud and finish this sentence:</p>

<p><em>"This is the thing that ______."</em></p>

<p>Then ask whether the name is the blank. Usually it is not, and usually the blank is a better name. <code>handleLegacyImportEdgeCase</code> becomes <em>"this is the thing that fills in missing timezones for pre-2019 rows"</em>, which becomes <code>inferMissingTimezone</code>, which is a name that teaches its reader something.</p>

<h3>The two-minute version for types</h3>

<p>For a class or a data structure, the sentence is different: <em>"one of these represents ______."</em> If the answer contains the word "and", you have found two types wearing one coat, and the naming problem is downstream of a design problem.</p>

<h2>Why not just get it right the first time</h2>

<p>Because you cannot. At the moment of writing, you genuinely do not know what the thing is yet — you know what you needed. The concept only becomes visible once the behaviour is complete, which is precisely the moment we stop thinking about it and open a pull request.</p>

<p>The ritual is cheap because it exploits that timing. You are already re-reading the code. You are already about to ask someone else to read it. Two minutes of naming, at the one moment you have the full picture, and before the name escapes into every call site in the repository.</p>

<h2>On not doing this by committee</h2>

<p>Naming discussions in review go badly because they arrive after the name has spread, which makes changing it a chore, which makes the discussion feel expensive, which makes everyone argue as though it were.</p>

<p>Rename it yourself, quietly, before anyone else has to have an opinion. The second name is not a consensus artefact. It is just the one you could only see from the end.</p>`,
    },
];

const pages = [
    {
        slug: 'about',
        title: 'About',
        excerpt: 'A workbench, a newsletter, and a standing suspicion of anything that calls itself effortless.',
        html: `<p>This is a place for field notes about making software that people can actually see into.</p>

<p>I am an engineer. I spend most of my working life on systems — the parts that are supposed to be invisible, and the parts that become extremely visible at 3am. I also make things with my hands, which turns out to be the single most useful source of engineering metaphors I have found.</p>

<h2>What you will find here</h2>

<p>Essays, mostly short, about three recurring subjects:</p>

<ul>
<li><strong>Systems</strong> — boundaries, failure, the slow accumulation of assumptions that eventually becomes a incident report.</li>
<li><strong>Fieldwork</strong> — debugging stories told at full length, including the hours spent in the wrong place.</li>
<li><strong>Practice</strong> — small rituals that keep the work approachable.</li>
</ul>

<h2>The name</h2>

<p>It is a joke about a genre. The prevailing story about machines is that they are either coming to save us or coming to replace us, and both versions place the machine at the centre of the sentence. I find the more interesting sentence has a person in it, building something, making choices about what the machine should be allowed to hide.</p>

<blockquote>Not your A.I. overlords. Just tools, made by people, with the seams left showing.</blockquote>

<h2>Elsewhere</h2>

<p>There is a newsletter — roughly monthly, no growth loops, unsubscribe link at the top where it belongs. The signup is at the bottom of every page.</p>`,
    },
];

const navigation = [
    {label: 'Field notes', url: 'notes/'},
    {label: 'About', url: 'about/'},
];

const secondaryNavigation = [
    {label: 'Archive', url: 'notes/'},
];

module.exports = {site, custom, author, posts, pages, navigation, secondaryNavigation};
