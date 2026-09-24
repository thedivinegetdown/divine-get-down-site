import { SITE } from './site';
import { STILLNESS_SCROLL_CONTENT } from './stillnessScroll';
import { YOUTUBE_SHORTS } from './youtube';

const scripture = (quote, reference, href) => ({
  type: 'scripture',
  quote,
  reference,
  href,
});

const paragraph = (text) => ({ type: 'paragraph', text });
const prompt = (text) => ({ type: 'prompt', text });
const read = (reference, href, suffix = '.') => ({
  type: 'read',
  reference,
  href,
  suffix,
});

const youtubeShortUrl = (id) => `https://www.youtube.com/shorts/${id}`;

export const DRAW_NEAR_CONTENT = {
  metadata: {
    title: 'Draw Near: Returning Your Heart to Jesus | The Divine Get Down',
    description:
      'A Scripture-rooted invitation to approach God through Jesus with honest prayer, receive his words, and follow him in ordinary life.',
    path: '/draw-near',
  },
  integration: {
    slug: 'draw-near',
    shortTitle: 'Draw Near',
    fullTitle: 'Draw Near: Returning Your Heart to Jesus',
    subtitle: 'Returning Your Heart to Jesus',
    description:
      'A Scripture-rooted invitation to approach God through Jesus with honest prayer, receive his words, and follow him in ordinary life.',
    resourceType: 'Guided Scripture reflection and prayer',
    pathway: 'Draw Near to Jesus',
    topics: [
      'Drawing near to God',
      'weariness',
      'prayer',
      'grace',
      'repentance',
      'abiding in Christ',
      'Christian stillness',
      'love and obedience',
    ],
    scriptureReferences: [
      'Matthew 11:25–30',
      'Psalm 42',
      'Hebrews 4:14–16',
      'Hebrews 10:10–25',
      'James 4:1–10',
      'John 15:1–12',
    ],
    estimatedReadingTime:
      '14–16 minutes, with additional time for Scripture reading, prayer, and pauses',
    access: 'Free',
    primaryCta: 'Read Draw Near',
  },
  hero: {
    brand: SITE.name,
    title: 'Draw Near',
    subtitle: 'Returning Your Heart to Jesus',
    format: 'Free Scripture Reflection',
    readTime: '14–16 Min Read',
  },
  introduction: [
    'There are times when you sit down to pray and discover how crowded your attention has become. A conversation returns. Something unfinished presses forward. You reach for words and find that you are tired.',
    'At other times, the difficulty is quieter. You remember when Scripture seemed easier to receive. You still believe, but you miss the gladness that once accompanied belief.',
    'You can bring this actual life to Jesus.',
    'These pages offer a place to attend to his invitation, hear his Word, and answer him honestly. Read at a pace that allows you to pray. You can pause wherever a passage deserves your attention.',
  ],
  translationNote:
    'Scripture quotations are from the World English Bible (WEB). Reflections and prayers are original responses to the passages.',
  sections: [
    {
      id: 'you-can-come-near',
      number: 1,
      title: 'You Can Come Near',
      blocks: [
        paragraph('Begin with the person who invites you.'),
        scripture(
          '“Come to me, all you who labor and are heavily burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart; and you will find rest for your souls. For my yoke is easy, and my burden is light.”',
          'Matthew 11:28–30',
          'https://ebible.org/engwebp/MAT11.htm',
        ),
        paragraph(
          'Jesus speaks to people carrying weight. His invitation meets them while they are burdened. They do not have to arrive rested.',
        ),
        paragraph('Notice, too, where he directs them: to himself.'),
        paragraph(
          'Immediately before this invitation, Jesus speaks of his unique relationship with the Father and his authority to make the Father known. The one offering rest is the Son who brings us to God. His gentleness belongs together with his authority. He is worthy of our trust and our obedience.',
        ),
        paragraph(
          'A yoke belonged to the world of work and service. When Jesus invites us to take his yoke and learn from him, he calls us into life under his care and direction. The rest he gives includes learning to follow him. He does not promise a life without difficulty.',
        ),
        paragraph(
          'That matters when drawing near feels like one more thing you ought to accomplish. You may have turned prayer into a private measure of whether you are doing well enough. A missed morning becomes evidence against you; a distracted prayer feels hardly worth offering.',
        ),
        paragraph(
          'Listen again to the invitation. Jesus calls burdened people to come and learn from him. You can begin before you have repaired your concentration or found the right words.',
        ),
        paragraph(
          'If you are still discovering who Jesus is, you can begin by listening carefully to what he says about himself. Bring your questions into prayer. Ask for help to understand and trust him. You do not need to pretend that every question has already been settled.',
        ),
        paragraph(
          'For now, allow his invitation to address you personally. There is room to approach him with the life you actually have.',
        ),
      ],
    },
    {
      id: 'notice-where-you-are',
      number: 2,
      title: 'Notice Where You Are',
      blocks: [
        read('Psalm 42', 'https://ebible.org/engwebp/PSA042.htm'),
        paragraph(
          'The writer of Psalm 42 thirsts for the living God. He remembers joining others in worship, with joy and thanksgiving. In the present, he weeps, endures the taunts of enemies, and asks why God seems to have forgotten him.',
        ),
        paragraph(
          'Memory makes the ache sharper. He knows what it was to rejoice with God’s people. He cannot simply summon that experience again.',
        ),
        paragraph(
          'Yet his distress becomes prayer. He continues addressing God, remembering God, and urging his own soul to hope in God. The psalm holds sorrow and trust together without making either disappear.',
        ),
        paragraph('This gives us a faithful way to begin: tell the truth in God’s presence.'),
        paragraph(
          'You might be exhausted by responsibilities that cannot be put aside. You might be grieving. You might have filled every available silence because being quiet has become uncomfortable. Or you may be unable to explain why prayer feels difficult.',
        ),
        paragraph('You do not need to settle the cause before you speak.'),
        paragraph(
          'A feeling of distance does not, by itself, tell you why you feel distant. Psalm 42 does not invite us to assign the same explanation to every weary person. It gives us words for longing and shows us a sufferer continuing to turn toward God.',
        ),
        paragraph('Consider one question:'),
        prompt('What do I need to say honestly to God about where I am today?'),
        {
          type: 'richParagraph',
          parts: [
            'An ordinary sentence is enough: ',
            { type: 'emphasis', text: 'I miss the joy I remember.' },
            ' Or, ',
            { type: 'emphasis', text: 'I am carrying more than I know how to name.' },
          ],
        },
        paragraph(
          'You can let that sentence stand. God does not require you to turn it into a polished account of your spiritual life.',
        ),
      ],
    },
    {
      id: 'remember-who-jesus-is',
      number: 3,
      title: 'Remember Who Jesus Is',
      blocks: [
        read('Hebrews 4:14–16', 'https://ebible.org/engwebp/HEB04.htm'),
        paragraph(
          'When we look inward for too long, prayer can become a question about our own adequacy. We wonder whether we are sincere enough, focused enough, or sufficiently changed to approach God.',
        ),
        paragraph('Hebrews directs our attention to Jesus.'),
        paragraph(
          'He is the Son of God and our great high priest. A priest represents people before God; Jesus brings his people into God’s presence. He also understands human weakness. He was truly tempted, yet remained without sin.',
        ),
        paragraph('His holiness does not make him incapable of compassion.'),
        paragraph(
          'The passage therefore calls us to approach God confidently, seeking mercy and grace in our need. That confidence rests on who Jesus is. We come because we have a faithful high priest.',
        ),
        {
          type: 'richParagraph',
          parts: [
            'Later, Hebrews makes the foundation even clearer: Jesus offered himself for sins, and our access to God is through his blood. The invitation to draw near follows what Christ has done for us. Our effort does not create the way into God’s presence. ',
            {
              type: 'link',
              text: 'Hebrews 10:10–22',
              href: 'https://ebible.org/engwebp/HEB10.htm',
            },
          ],
        },
        paragraph(
          'You can take your need seriously without making it the most important truth about this moment. Jesus Christ is Lord. He has given himself for sinners. He lives and reigns. He is able to receive the prayer you struggle to form.',
        ),
        paragraph('Consider:'),
        prompt('When I approach God, what am I relying on to make me welcome?'),
        paragraph(
          'If your answer has become a good week, an unbroken prayer routine, or a strong feeling of devotion, return your attention to Christ.',
        ),
        paragraph(
          'Practices can help us attend to him. Their value lies in that service. The foundation beneath our prayer is Jesus himself.',
        ),
      ],
    },
    {
      id: 'draw-near-with-an-honest-heart',
      number: 4,
      title: 'Draw Near With an Honest Heart',
      blocks: [
        scripture(
          '“Draw near to God, and he will draw near to you.”',
          'James 4:8, opening sentence',
          'https://ebible.org/engwebp/JAS04.htm',
        ),
        paragraph(
          'This invitation carries a promise. It also belongs to a passage that deserves to be heard as a whole.',
        ),
        paragraph(
          'In James 4:1–10, James addresses quarrels, coveting, selfish motives, and divided loyalty to God. He calls his readers to submit to God, turn from sin, and humble themselves. Drawing near includes a genuine return of heart and conduct.',
        ),
        paragraph('Within that searching passage, James also says that God gives more grace.'),
        paragraph(
          'Grace gives us reason to stop hiding. We can acknowledge what is wrong and ask God to change us.',
        ),
        paragraph(
          'If you recognize a particular sin, name it plainly. You may have spoken cruelly and continued defending it. You may have held on to a dishonest account because admitting the truth would cost you something. Bring the real matter before God. Ask his forgiveness and help to turn from it.',
        ),
        paragraph('Repentance includes willingness to obey where that truth leads.'),
        paragraph(
          'At the same time, do not invent a charge against yourself merely because you feel tired or emotionally flat. James is confronting actual wrongdoing and divided allegiance. A wandering thought during prayer is not, on its own, evidence that you have rejected God.',
        ),
        paragraph(
          'Let Scripture help you distinguish between a burden to bring and a sin to confess. Both belong in prayer, but they call for different responses.',
        ),
        paragraph('Ask simply:'),
        prompt('Is there something I know I need to confess or surrender to God?'),
        paragraph('You can answer honestly without conducting an endless search for hidden faults.'),
        paragraph(
          'James’s promise gives hope to the person turning toward God. It should not be reduced to a technique for producing a sensation of nearness. The passage calls us into a humble, responsive relationship with the living God.',
        ),
        paragraph(
          'Come with your need. Come willing to be corrected. Trust the grace that makes an honest return possible.',
        ),
      ],
    },
    {
      id: 'sit-with-the-word',
      number: 5,
      title: 'Sit With the Word',
      blocks: [
        read('John 15:1–12', 'https://ebible.org/engwebp/JHN15.htm', ' slowly.'),
        paragraph('Jesus gives his disciples an image of dependence: a vine and its branches.'),
        scripture(
          '“Remain in me, and I in you. As the branch can’t bear fruit by itself unless it remains in the vine, so neither can you, unless you remain in me.”',
          'John 15:4',
        ),
        paragraph('A branch receives its life from the vine. Its fruit grows from that living connection.'),
        paragraph(
          'Jesus uses this image to teach his disciples how deeply they need him. Their life and fruitfulness depend on remaining in him. The Father tends the branches; Jesus’ words remain with his people; prayer, obedience, and love belong to this relationship.',
        ),
        paragraph('This is a fuller picture of drawing near than a single peaceful moment.'),
        paragraph(
          'A quiet moment can help us attend to Christ. Remaining in him extends into how we live after we stand up. His words address our decisions. His commands shape our relationships. We continue bringing our needs to him and depending on his help.',
        ),
        paragraph(
          'Jesus speaks seriously about the danger of life apart from him. His warning deserves to be heard. But the passage does not give us a test in which low energy or muted feelings prove that a person has been cut off. It calls us to dependence on Christ and a life shaped by his words.',
        ),
        paragraph(
          'Notice the movement into love. Jesus speaks of his love for the disciples, calls them to remain in that love, and connects remaining with keeping his commandments. In verse 12, he commands them to love one another as he has loved them.',
        ),
        paragraph('The life received from Christ is meant to bear fruit in love.'),
        paragraph(
          'Read verses 9–12 once more. Attend to what Jesus says before trying to apply it. Who is speaking? What does he give? What does he ask?',
        ),
        paragraph('Then consider:'),
        prompt(
          'What would it mean to depend on Jesus in the ordinary life waiting for me after this prayer?',
        ),
        paragraph(
          'Let the answer be particular. There may be a conversation in which you need his help to be patient, or a responsibility you have been carrying as though everything depends on you.',
        ),
        paragraph(
          'Jesus also speaks of his joy. Receive that as part of his purpose for his disciples. You do not need to manufacture an intense emotion to demonstrate that you have understood him.',
        ),
        paragraph('For now, stay with his words. Let them teach you what he is like and how to follow him.'),
      ],
    },
    {
      id: 'pray',
      number: 6,
      title: 'Pray',
      treatment: 'prayer',
      blocks: [
        paragraph(
          'Use this prayer slowly, making the words your own where you can. Pause to speak plainly about your own circumstances.',
        ),
        { type: 'prayerOpening', text: 'Lord Jesus Christ,' },
        paragraph(
          'You are the Son of God, and you are Lord. You invite the weary to come to you. I come with the attention I have today, with the words I can find, and with the things I do not yet know how to say.',
        ),
        paragraph(
          'You know what has occupied my mind. You know the responsibilities I carry, the conversations I keep revisiting, and the concerns that come forward whenever I try to be quiet. Help me bring these things into your presence honestly.',
        ),
        paragraph(
          'I confess that I have sometimes measured your welcome by my own consistency. I have looked at how well I prayed before remembering whom I was praying to. Turn my attention toward you. Teach me to rely on your mercy and on what you have done for sinners.',
        ),
        paragraph(
          'Thank you for giving yourself for us. Thank you that I may approach the Father through you. Let this truth become the ground of my confidence when I feel weak or ashamed.',
        ),
        paragraph(
          'Where I have sinned, help me confess without excuses. Where I have caused harm, give me humility to acknowledge it and wisdom to take responsibility. Where I resist your commands, make me willing to obey. I need your grace both to see clearly and to turn.',
        ),
        paragraph(
          'Help me also to be truthful about my limits. Teach me to bring weariness to you without disguising it as strength. Give me patience when my feelings are slow to change and understanding is incomplete.',
        ),
        paragraph(
          'Let your words remain in me. Bring them to mind when I am hurried, defensive, or afraid. Shape what I desire and what I ask for. Teach me to pray with trust in your wisdom, including when I do not understand your answer.',
        ),
        paragraph(
          'By your Spirit, grow in me a love that reaches other people. Help me listen carefully, speak truthfully, and give attention to those I am tempted to overlook. Let my life bear fruit that honors the Father.',
        ),
        paragraph('I bring you the concern that feels heaviest today.'),
        { type: 'pause', text: 'Pause here to name it.' },
        paragraph(
          'Please give me the help I need. Show me what is mine to do, and teach me to entrust what I cannot control to your care.',
        ),
        paragraph(
          'Lord Jesus, I want to know you and follow you. Keep teaching me to remain in your love, to receive your correction, and to depend on your grace.',
        ),
        paragraph('I place this day before you.'),
        { type: 'prayerClosing', text: 'Amen.' },
      ],
    },
    {
      id: 'be-still-before-god',
      number: 7,
      title: 'Be Still Before God',
      treatment: 'stillness',
      blocks: [
        paragraph('You can now allow a little space for quiet attention.'),
        paragraph(
          'Christian stillness has someone at its center: the living God whom we approach through Jesus Christ. Here, being still means attending to Scripture and remaining before God in prayer. There is no special state you need to reach.',
        ),
        paragraph(
          'Settle into a position that is comfortable enough to read. Keep your eyes open if that helps. If possible, put aside one source of interruption for the next few minutes.',
        ),
        {
          type: 'richParagraph',
          parts: [
            'Return to ',
            {
              type: 'link',
              text: 'John 15:4',
              href: 'https://ebible.org/engwebp/JHN15.htm',
            },
            '. Read the verse slowly, remembering the vine and its branches.',
          ],
        },
        paragraph(
          'Allow a brief silence. Consider your dependence on Jesus in one part of your life. You might answer him with these words:',
        ),
        { type: 'pause', text: 'Lord Jesus, help me depend on you here.' },
        paragraph(
          'Remain quiet for as long as is helpful. When an unfinished task or concern comes to mind, you can acknowledge it in a short prayer and return to the passage. Wandering attention gives you another opportunity to turn toward the words before you.',
        ),
        paragraph(
          'You do not need to force your mind empty, look for a sign, or interpret each thought as a message from God. Scripture gives this time its substance and direction.',
        ),
        paragraph(
          'If silence is difficult today, read the verse aloud again and speak your prayer aloud. You can attend to God that way too.',
        ),
        paragraph(
          'Let this time end naturally. A sense of peace may come; your feelings may also remain much as they were. You can still give thanks for Christ’s words and ask for help to live by them.',
        ),
      ],
    },
    {
      id: 'take-one-faithful-step',
      number: 8,
      title: 'Take One Faithful Step',
      treatment: 'nextStep',
      blocks: [
        {
          type: 'richParagraph',
          parts: [
            'Jesus’ command to love one another gives our time in prayer a direction beyond ourselves. ',
            {
              type: 'link',
              text: 'John 15:12',
              href: 'https://ebible.org/engwebp/JHN15.htm',
            },
          ],
        },
        {
          type: 'richParagraph',
          parts: [
            'For today, let your next step be this: ',
            {
              type: 'strong',
              text: 'give patient attention to one person in your next ordinary conversation.',
            },
          ],
        },
        paragraph(
          'Allow them to finish speaking. Listen to what they actually say before preparing your reply. Ask Jesus to help you answer with truth and kindness.',
        ),
        paragraph(
          'This is a modest action, but it may require real dependence. You could be tired. You could disagree. You could discover how quickly you want to defend yourself or move on.',
        ),
        paragraph('Bring that need to Christ as it arises.'),
        paragraph(
          'Patient attention does not require you to agree with what is wrong or avoid a necessary boundary. Love can be truthful and clear. The step is to treat the person before you with the care you are learning from Jesus.',
        ),
        paragraph(
          'You do not need to redesign your whole life before responding to what you have read. Let this one encounter become a place where his words matter.',
        ),
        paragraph(
          'Obedience grows concrete when we follow him among the people and responsibilities already before us.',
        ),
      ],
    },
    {
      id: 'return-again',
      number: 9,
      title: 'Return Again',
      blocks: [
        paragraph('There will be other days when prayer feels difficult.'),
        paragraph(
          'You may return to these passages with gratitude and ease. You may return while distracted, disappointed, or uncertain what to say. The need to depend on Christ continues through all of these conditions.',
        ),
        {
          type: 'richParagraph',
          parts: [
            'Hebrews brings together three invitations: draw near to God, hold firmly to the hope we confess, and encourage one another toward love and good works. Our hope rests on the faithfulness of the one who promised. ',
            {
              type: 'link',
              text: 'Hebrews 10:19–25',
              href: 'https://ebible.org/engwebp/HEB10.htm',
            },
          ],
        },
        paragraph(
          'This means your life with God belongs within the life of his people. Shared worship, Scripture, and the prayers of other believers can help sustain you when your own words are few. You are allowed to receive encouragement as well as give it.',
        ),
        paragraph(
          'When you return to prayer, you can begin with what is true: Jesus is Lord. Through him, you may approach God for mercy and grace. His words are worth hearing. His commands are worth following.',
        ),
        paragraph(
          'You may need to confess. You may need to lament. You may have thanks to give. Bring these responses to him as they arise.',
        ),
        paragraph(
          'The purpose of these pages is fulfilled when your attention moves through them to Jesus.',
        ),
        {
          type: 'closing',
          text: 'Come to him with your weariness. Learn from him. Remain in his love.',
        },
      ],
    },
  ],
  relatedResources: [
    {
      id: YOUTUBE_SHORTS.seekHim.id,
      title: YOUTUBE_SHORTS.seekHim.title,
      href: youtubeShortUrl(YOUTUBE_SHORTS.seekHim.id),
      external: true,
      label: 'YouTube Short',
    },
    {
      id: YOUTUBE_SHORTS.walkInLove.id,
      title: YOUTUBE_SHORTS.walkInLove.title,
      href: youtubeShortUrl(YOUTUBE_SHORTS.walkInLove.id),
      external: true,
      label: 'YouTube Short',
    },
    {
      id: 'stillness-scroll',
      title: STILLNESS_SCROLL_CONTENT.resourceName,
      href: SITE.links.stillness,
      external: false,
      label: 'Guided Scroll',
    },
  ],
};
