// src/components/PrayerBook.jsx
import React from 'react';
import './PrayerBook.css';

const SECTIONS = [
  {
    id: 'morning',
    tag: 'Morning',
    title: 'Morning Reset – Start in His Rhythm',
    verse:
      '“This is the day that the LORD has made; let us rejoice and be glad in it.” — Psalm 118:24',
    prayer: `
Father, thank You for the breath in my lungs this morning.
I lay down yesterday’s weight and today’s expectations at Your feet.
Realign my heart with Your rhythm — slow me down on the inside,
even if the world is moving fast on the outside.
Let every step I take today move in sync with Your will.
Guard my mind from distraction, my body from burnout,
and my spirit from fear.
I receive Your joy, Your clarity, and Your covering.
In Jesus’ name, amen.
    `,
    prompts: [
      'Take 3 slow breaths. On each exhale, thank God for one specific thing.',
      'Gently roll your shoulders and whisper: “I move with You today.”',
    ],
  },
  {
    id: 'anxiety',
    tag: 'In the Battle',
    title: 'When Anxiety Tries to Take Over',
    verse:
      '“Cast all your anxiety on Him because He cares for you.” — 1 Peter 5:7',
    prayer: `
Jesus, I bring You every anxious thought trying to steal my peace.
You see the tightness in my chest and the noise in my mind.
Right now, I choose to hand You the fears I’ve been carrying alone.
Breathe Your perfect love into the places that feel heavy and tangled.
Remind me that I am held, not forgotten.
That You go before me, stand beside me, and live within me.
I choose Your peace over panic.
In Your name, amen.
    `,
    prompts: [
      'Place your hand over your heart. Inhale for 4, hold for 4, exhale for 6 — repeat 4 times.',
      'On each exhale, say quietly: “Jesus, I give this to You.”',
    ],
  },
  {
    id: 'identity',
    tag: 'Identity',
    title: 'Remembering Who You Are in Christ',
    verse:
      '“See what great love the Father has lavished on us, that we should be called children of God!” — 1 John 3:1',
    prayer: `
Father, remind me who I am in You.
Silence every lying voice that says I am not enough,
too broken, too late, or too far gone.
Your Word says I am chosen, loved, and set apart.
I receive that truth again today.
Write it deeper than my doubts, deeper than my past.
Let my movements, my words, and my decisions flow from this identity:
I am Yours.
In Jesus’ name, amen.
    `,
    prompts: [
      'Stand tall, open your chest, and imagine a crown of light resting gently on your head.',
      'Say out loud: “I am a child of God. That is who I am.”',
    ],
  },
  {
    id: 'night',
    tag: 'Night',
    title: 'Night Wind-Down – Laying It All Down',
    verse:
      '“In peace I will lie down and sleep, for you alone, LORD, make me dwell in safety.” — Psalm 4:8',
    prayer: `
Lord, I bring You this day — the wins, the losses, the moments I’m proud of
and the ones I wish I could redo.
Thank You for carrying me through it all.
I release every unfinished task, every lingering thought,
and every unspoken worry into Your hands.
Cover my home, my loved ones, and my mind with Your peace.
Let my sleep be deep, healing, and protected.
Meet me in my dreams and restore my soul.
In Jesus’ name, amen.
    `,
    prompts: [
      'While sitting or lying down, breathe slowly and imagine placing each worry into Jesus’ hands.',
      'Gently stretch your neck and shoulders, letting your body know: “It’s safe to rest now.”',
    ],
  },
  {
    id: 'protection',
    tag: 'Protection',
    title: 'Covering Your Home & Loved Ones',
    verse:
      '“The LORD will watch over your coming and going both now and forevermore.” — Psalm 121:8',
    prayer: `
Lord, I lift my home and the people I love into Your care.
Place Your angels around every doorway, window, and wall.
Let this space be filled with Your presence and Your peace.
Protect us from physical harm, spiritual attack, and hidden danger.
Expose anything that is not from You and remove it.
Let this house be a place of worship, healing, and joy.
In Jesus’ name, amen.
    `,
    prompts: [
      'Walk slowly through one room and thank God for it as you go.',
      'Stretch your arms wide and imagine light filling the whole space.',
    ],
  },
  {
    id: 'creative',
    tag: 'Creative Flow',
    title: 'When You Want to Create with God',
    verse:
      '“For in Him we live and move and have our being.” — Acts 17:28',
    prayer: `
Holy Spirit, breathe on my creativity.
I don’t want to create from pressure, ego, or comparison,
but from intimacy with You.
Use my gifts — my movement, my words, my ideas —
to point people back to Your heart.
Clear out creative blocks, fear of judgment, and perfectionism.
Let what I make carry Your presence.
Turn my art into worship.
In Jesus’ name, amen.
    `,
    prompts: [
      'Loosen your body with a simple groove — a head nod, a sway, a small two-step.',
      'Ask: “God, what do You want to create with me today?” and write down the first gentle idea.',
    ],
  },
];

export default function PrayerBook() {
  return (
    <div className="prayerbook">
      <div className="prayerbook-header">
        <h2>Prayer Book – Sacred Rhythm</h2>
        <p>
          A living collection of prayers, scriptures, and simple movement prompts
          you can return to daily. Tap into the You-niversal Groove with God —
          morning, noon, and night.
        </p>
      </div>

      <div className="prayerbook-grid">
        {SECTIONS.map((section) => (
          <article key={section.id} className="prayer-card">
            <div className="prayer-tag">{section.tag}</div>
            <h3 className="prayer-title">{section.title}</h3>
            <p className="prayer-verse">{section.verse}</p>

            <pre className="prayer-text">
{section.prayer.trim()}
            </pre>

            {section.prompts?.length > 0 && (
              <div className="prayer-prompts">
                <h4>Move &amp; Breathe:</h4>
                <ul>
                  {section.prompts.map((prompt, idx) => (
                    <li key={idx}>{prompt}</li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
