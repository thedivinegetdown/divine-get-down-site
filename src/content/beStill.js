import { SITE } from './site';

const paragraph = (text) => ({ type: 'paragraph', text });
const prompt = (text) => ({ type: 'prompt', text });
const scripture = (quote, reference, href) => ({
  type: 'scripture',
  quote,
  reference,
  href,
});
const read = (reference, href, suffix = '.') => ({
  type: 'read',
  reference,
  href,
  suffix,
});
const richParagraph = (...parts) => ({ type: 'richParagraph', parts });
const link = (text, href) => ({ type: 'link', text, href });
const emphasis = (text) => ({ type: 'emphasis', text });
const strong = (text) => ({ type: 'strong', text });

export const BE_STILL_CONTENT = {
  review: {
    biblicalContentGate: 'pass',
    reviewedReferences: [
      'Psalm 46',
      'Romans 5:1–11',
      '1 Peter 5:5–11',
      'Philippians 1:12–14',
      'Philippians 4:1–9',
    ],
  },
  metadata: {
    title: 'Be Still: When Your Mind Won’t Be Quiet | The Divine Get Down',
    description:
      'A Scripture-rooted reflection for bringing crowded thoughts and unresolved concerns before God, trusting his care through Jesus Christ, and returning to ordinary faithfulness.',
    path: '/be-still',
  },
  integration: {
    slug: 'be-still',
    shortTitle: 'Be Still',
    fullTitle: 'Be Still: When Your Mind Won’t Be Quiet',
    subtitle: 'When Your Mind Won’t Be Quiet',
    description:
      'A Scripture-rooted reflection for bringing crowded thoughts and unresolved concerns before God, trusting his care through Jesus Christ, and returning to ordinary faithfulness.',
    resourceType: 'Guided Scripture reflection, prayer, and stillness practice',
    pathway: 'Find Peace in God’s Presence',
    topics: [
      'God’s presence',
      'Christian stillness',
      'worry and uncertainty',
      'prayer',
      'thanksgiving',
      'humility',
      'trust',
      'peace in Christ',
      'faithful obedience',
    ],
    scriptureReferences: [
      'Psalm 46',
      'Romans 5:1–11',
      '1 Peter 5:5–11',
      'Philippians 1:12–14',
      'Philippians 4:1–9',
    ],
    estimatedReadingTime:
      '14–16 minutes, with additional time for Bible reading, prayer, and pauses',
    access: 'Free',
    primaryCta: 'Read Be Still',
  },
  hero: {
    brand: SITE.name,
    title: 'Be Still',
    subtitle: 'When Your Mind Won’t Be Quiet',
    format: 'Free Scripture Reflection',
    readTime: '14–16 Min Read',
  },
  introduction: [
    'Some concerns become louder when the room grows quiet.',
    'An unanswered message. Someone you love. A decision with no clear outcome. Something you cannot finish today and cannot quite leave alone.',
    'You sit down to pray, and all of it seems to sit down with you.',
    'Begin there.',
    'You can speak to God before you have sorted through everything occupying your attention. You can ask for help while the situation is unresolved and your thoughts are still crowded.',
    'These pages offer room to remember who God is, bring your concerns before him, and attend to his Word. Read slowly enough to respond. If a passage leads you into prayer, stay with it. You can return to the remaining pages another time.',
    'The purpose is to seek the living God through Jesus Christ. Quiet may help you listen, but Christ himself is the one you need.',
  ],
  translationNote:
    'Scripture quotations are from the World English Bible (WEB). The reflections, prayer, and suggested practice are original responses to Scripture.',
  sections: [
    {
      id: 'a-refuge-amid-the-upheaval',
      number: 1,
      title: 'A Refuge Amid the Upheaval',
      blocks: [
        read('Psalm 46', 'https://ebible.org/engwebp/PSA046.htm'),
        paragraph('Psalm 46 opens with trouble already in view.'),
        paragraph(
          'The earth changes. Mountains shake. Waters roar. Later, nations rage and kingdoms move. The psalm gives us a world whose apparent stability cannot be taken for granted.',
        ),
        paragraph('Within that upheaval, God is his people’s refuge and strength.'),
        paragraph(
          'The song also describes God’s city, made secure by his presence, and invites us to behold his works. He brings warfare to an end. Weapons are broken. The powers that terrify people do not possess final authority.',
        ),
        paragraph('Then God speaks:'),
        scripture(
          '“Be still, and know that I am God. I will be exalted among the nations. I will be exalted on the earth.”',
          'Psalm 46:10',
          'https://ebible.org/engwebp/PSA046.htm',
        ),
        paragraph(
          'Hear the whole declaration. God’s command belongs to this scene of conflict, judgment, and sovereign power. It calls for the cessation of striving before the God who will be exalted throughout the earth. It cannot be reduced to advice about finding a quiet mood.',
        ),
        paragraph('The psalm ends by affirming that this mighty God is with his people.'),
        paragraph('That is where its comfort rests.'),
        paragraph(
          'When we bring this psalm into personal prayer, we begin by acknowledging the God it reveals. The quiet practice later in these pages is an application of attentive trust, not a technique prescribed by this verse.',
        ),
        paragraph(
          'Your own concerns may be much smaller than the upheaval described here. They still matter. A difficult conversation can occupy a whole afternoon. Waiting for news can make ordinary tasks feel unusually heavy.',
        ),
        paragraph('But the concern occupying your attention is not the measure of God’s power.'),
        paragraph(
          'You may be able to describe the problem in great detail while finding it difficult to remember anything else. Let the psalm widen your attention. The problem is real. So are God’s strength, authority, and faithfulness.',
        ),
        prompt(
          'What does this psalm show me about God that I have been overlooking while attending to my concern?',
        ),
        paragraph(
          'You do not have to answer quickly. Read the opening and closing verses again. Notice where the people of God locate their security.',
        ),
        paragraph('Their refuge is God himself.'),
        richParagraph(
          'For the Christian, approaching this God rests on what Jesus Christ has done. Paul teaches that those justified by faith have peace with God through our Lord Jesus Christ. To be justified is to be counted righteous before God. Through the death of his Son, God reconciles people who were his enemies; their hope rests in the living Christ. ',
          link('Romans 5:1–11', 'https://ebible.org/engwebp/ROM05.htm'),
        ),
        paragraph(
          'This peace with God concerns our reconciled relationship with him. It is distinct from the peace he gives as we bring our daily concerns to him.',
        ),
        paragraph('A settled feeling cannot reconcile us to God. Jesus Christ is our Lord and Savior.'),
        paragraph(
          'If you are still exploring faith, give attention to him here. You can ask God to help you understand the mercy shown in Christ and respond with repentance and faith. The invitation of these pages leads to a person, not simply to a more peaceful moment.',
        ),
      ],
    },
    {
      id: 'place-your-concern-under-his-care',
      number: 2,
      title: 'Place Your Concern Under His Care',
      blocks: [
        read(
          '1 Peter 5:5–11',
          'https://ebible.org/engwebp/1PE05.htm',
          ', giving particular attention to verses 6–7.',
        ),
        paragraph(
          'Peter addresses believers who know suffering. He calls them to humility toward one another and under God’s mighty hand, trusting God to lift them up in his time.',
        ),
        paragraph('Within that call comes this instruction:'),
        scripture(
          '“casting all your worries on him, because he cares for you.”',
          '1 Peter 5:7',
          'https://ebible.org/engwebp/1PE05.htm',
        ),
        paragraph('Casting our worries on God belongs with humbling ourselves before him.'),
        paragraph(
          'We acknowledge that we depend on him. We cannot govern every circumstance, secure every outcome, or determine the timing of his help.',
        ),
        paragraph(
          'Yet humility does not require us to become silent about what hurts. Peter directs our concerns toward God precisely because God cares.',
        ),
        paragraph('His authority and his care belong together.'),
        paragraph(
          'Begin with the concern that is pressing hardest today. You do not need to uncover every possible reason for it. Give it an honest name.',
        ),
        paragraph(
          'Perhaps there is a fact you need to acknowledge: a bill is due, a relationship is strained, someone is unwell. There may also be an outcome you fear but do not yet know.',
        ),
        paragraph('You can bring both to God while being truthful about the difference.'),
        richParagraph(
          emphasis(
            'Father, this is what has happened. This is what I am afraid might happen. I need your help with both.',
          ),
        ),
        paragraph('Those are words you may use in prayer, not a formula you need to repeat.'),
        prompt(
          'What am I asking God to care for, and what outcome have I been trying to secure through my own constant attention?',
        ),
        paragraph(
          'Thinking carefully can serve a real responsibility. Returning repeatedly to a concern can also leave us with no new information and no further action to take. Prayer gives us somewhere to bring what remains unresolved.',
        ),
        paragraph(
          'Entrusting a person to God does not mean loving them less. Entrusting a responsibility to him does not remove the responsibility. We ask for wisdom to act while admitting that our reach is limited.',
        ),
        paragraph('Peter’s words also leave room for waiting. God’s timing belongs to God.'),
        paragraph(
          'If the concern returns after you have prayed, you can bring it again. Its return does not, by itself, prove that your earlier prayer was insincere.',
        ),
        paragraph(
          'You are learning to depend on someone whose care is greater than your ability to keep everything in view.',
        ),
      ],
    },
    {
      id: 'let-prayer-include-both-need-and-thanks',
      number: 3,
      title: 'Let Prayer Include Both Need and Thanks',
      blocks: [
        read('Philippians 4:4–9', 'https://ebible.org/engwebp/PHP04.htm'),
        paragraph(
          'Paul’s instruction comes within the life of a real congregation. Earlier in the chapter, he appeals for agreement between fellow workers. He calls the believers to rejoice in the Lord, show gentleness, and bring their requests to God with thanksgiving.',
        ),
        richParagraph(
          'Paul himself writes as a prisoner. His words about joy and peace come from within difficulty. ',
          link('Philippians 1:12–14', 'https://ebible.org/engwebp/PHP01.htm'),
        ),
        paragraph(
          'Rejoicing in the Lord directs our gladness toward who he is and what he has done. Even when circumstances give us reason to grieve, Christ remains worthy of our gratitude.',
        ),
        paragraph(
          'Paul also commands his readers not to be anxious. We should let that instruction address us honestly. Where worry draws us into distrust, or where we insist on controlling what belongs to God, we need his correction and help to turn.',
        ),
        paragraph(
          'But the command does not authorize us to assign the same spiritual explanation to every experience of distress. A crowded mind or a difficult day does not give us enough information to pronounce judgment on someone’s faith.',
        ),
        paragraph('Notice the direction Paul gives: bring your requests to God.'),
        paragraph(
          'You are allowed to ask for actual help. Ask for provision, wisdom, reconciliation, endurance, or a changed circumstance. You can tell God what you hope for while submitting your request to his wisdom.',
        ),
        paragraph('Thanksgiving belongs in the same prayer.'),
        paragraph(
          'You do not have to describe something painful as good. You can thank God for the mercy of Christ while grieving a loss. You can acknowledge help already received while asking for help still needed.',
        ),
        paragraph(
          'Thanksgiving allows the truth about God’s gifts to stand alongside the truth about your need.',
        ),
        prompt(
          'What can I honestly ask God for today? What can I honestly thank him for, even while I wait?',
        ),
        paragraph('Paul attaches a promise to this instruction:'),
        scripture(
          '“And the peace of God, which surpasses all understanding, will guard your hearts and your thoughts in Christ Jesus.”',
          'Philippians 4:7',
          'https://ebible.org/engwebp/PHP04.htm',
        ),
        paragraph('Receive this as a real promise of God’s guarding peace in Christ.'),
        paragraph(
          'The promise does not say that every request will receive the answer we prefer, or that every painful feeling will immediately end. It gives us reason to depend on God in the midst of what we cannot settle.',
        ),
        paragraph('You can ask him for this peace without trying to produce it yourself.'),
        paragraph(
          'And when prayer ends, you do not need to inspect your emotions for evidence that you prayed correctly. Give thanks for whatever relief comes. If distress remains, continue seeking his help.',
        ),
        paragraph('The Lord to whom you prayed remains worthy of your trust.'),
      ],
    },
    {
      id: 'give-your-attention-to-what-is-true',
      number: 4,
      title: 'Give Your Attention to What Is True',
      blocks: [
        {
          ...read('Philippians 4:8–9', 'https://ebible.org/engwebp/PHP04.htm'),
          prefix: 'Return to ',
        },
        paragraph('Paul continues from prayer into the life of the mind and the practice of faith.'),
        paragraph(
          'He directs believers toward what is true, honorable, just, pure, lovely, commendable, excellent, and worthy of praise. Then he calls them to put into practice what they have learned and received through his teaching and example.',
        ),
        paragraph(
          'This is a morally serious invitation. Truth and goodness are meant to shape both our attention and our conduct.',
        ),
        paragraph('For someone carrying uncertainty, the first word deserves particular care: true.'),
        paragraph(
          'A feared possibility may require sensible preparation. It is still a possibility. We can acknowledge uncertainty without treating every imagined outcome as established fact.',
        ),
        paragraph(
          'Truth also includes what Scripture teaches about God. He is worthy of worship. In Christ, he has shown mercy to sinners. He calls his people to prayer and obedience. Our incomplete knowledge of tomorrow does not undo these things.',
        ),
        paragraph(
          'The rest of Paul’s instruction broadens our attention further. There is goodness worth noticing and practicing: an honest word, a just decision, patient service, something beautiful received with gratitude.',
        ),
        paragraph('You do not need to deny suffering to recognize these gifts.'),
        paragraph(
          'Nor does thinking about what is good cause a desired outcome to happen. Paul calls us to attend to what deserves our attention and then to live accordingly.',
        ),
        prompt('As I face this concern, what would truthfulness and goodness require of me?'),
        paragraph(
          'The answer may be modest. Admit what you do not know. Correct something you have overstated. Give proper attention to a person affected by your decision.',
        ),
        paragraph('Your mind may still feel busy while you choose to act faithfully.'),
        paragraph('God’s Word can guide your next response before every thought has settled.'),
      ],
    },
    {
      id: 'a-prayer-for-what-remains-unresolved',
      number: 5,
      title: 'A Prayer for What Remains Unresolved',
      treatment: 'prayer',
      blocks: [
        paragraph(
          'Pray these words where they express your heart. Pause to speak about your own circumstances.',
        ),
        { type: 'prayerOpening', text: 'Father,' },
        paragraph(
          'You are God over the world I can see and over all that lies beyond my understanding. Nations rise and fall before you. Your strength does not diminish when my confidence does.',
        ),
        paragraph('I acknowledge your authority over this day.'),
        paragraph(
          'I come to you through Jesus Christ, your Son and my Lord. Thank you for his death for sinners and for the life and hope I have in him. Teach me to rest my confidence in your mercy rather than in the steadiness of my feelings.',
        ),
        paragraph(
          'You know the concern that keeps returning to my attention. I bring it before you now.',
        ),
        { type: 'pause', text: 'Pause to name it.' },
        paragraph(
          'Please help. Give what is needed. Where there is harm, bring help and protection. Where there is confusion, grant wisdom. Where something can be repaired, make a faithful way forward.',
        ),
        paragraph(
          'I ask for your kindness in this situation, and I place my request under your wisdom.',
        ),
        paragraph(
          'I do not know everything that will happen. I cannot make another person choose rightly. I cannot hold the future in place by thinking about it long enough.',
        ),
        paragraph(
          'Help me accept my limits without becoming careless about the responsibilities you have given me.',
        ),
        paragraph(
          'Where I have distrusted you, forgive me. Where fear has become an excuse for dishonesty, harshness, or refusing what I know is right, lead me to repentance. Give me courage to acknowledge wrong and make amends where I can.',
        ),
        paragraph(
          'Meet me also in the weariness that is simply weariness. Help me speak honestly about the help I need and receive the care of others with humility.',
        ),
        paragraph('Thank you for the good you have already given.'),
        { type: 'pause', text: 'Pause to name a particular mercy.' },
        paragraph(
          'Let gratitude remain truthful. I do not want to hide my sorrow or overlook your kindness. Teach me to bring both before you.',
        ),
        paragraph(
          'Guard my heart and thoughts in Christ Jesus. Keep teaching me to receive what is true, love what is good, and practice what I have learned from your Word.',
        ),
        paragraph(
          'When I cannot see the outcome, help me obey in the part of life before me. When there is nothing further for me to do tonight, help me leave the unfinished matter in your care.',
        ),
        paragraph(
          'Remember those whose needs are bound up with mine. Give me love that looks beyond my own relief. Make me willing to serve, to listen, and to accept help.',
        ),
        paragraph('You are worthy of my trust while I wait.'),
        paragraph(
          'Keep my attention returning to Jesus. Let this time of prayer deepen my dependence on him and shape the way I live when I rise.',
        ),
        paragraph('I entrust myself and those I love to you.'),
        paragraph('In Jesus’ name,'),
        { type: 'prayerClosing', text: 'Amen.' },
      ],
    },
    {
      id: 'a-little-space-before-god',
      number: 6,
      title: 'A Little Space Before God',
      treatment: 'stillness',
      blocks: [
        richParagraph(
          'Keep ',
          link('1 Peter 5:6–7', 'https://ebible.org/engwebp/1PE05.htm'),
          ' open before you.',
        ),
        paragraph(
          'Sit in a way that allows you to read comfortably. If you can, put aside one source of interruption. There is no required posture or length of silence.',
        ),
        paragraph('Read both verses slowly.'),
        paragraph(
          'Attend first to God’s mighty hand. Consider his authority and your dependence on him. Then attend to the reason Peter gives for bringing your worries: God cares for you.',
        ),
        paragraph('Let those truths give substance to a brief silence.'),
        paragraph('You may answer with a simple prayer:'),
        { type: 'pause', text: 'Father, I place this concern under your care. Help me trust and obey you here.' },
        paragraph('Allow a little time before adding more words.'),
        paragraph(
          'If the concern returns, name it briefly to God. Then look again at the passage. You can move between reading, prayer, and silence without needing to preserve an uninterrupted stretch of concentration.',
        ),
        paragraph(
          'The aim is attentive trust before the biblical God. Your thoughts do not need to become empty, and you do not need to reach an unusual spiritual state.',
        ),
        paragraph(
          'You also do not need to search your passing thoughts for a private message from God. What Scripture says about his power and care is enough to attend to here.',
        ),
        paragraph(
          'If silent reading is difficult, read the verses aloud. Let the words themselves hold your attention. A short spoken prayer can be a faithful response.',
        ),
        paragraph('End this time by acknowledging the care Peter describes.'),
        paragraph(
          'You may feel more settled. You may remain aware of the same pressure. Either way, you have something solid to return to: the character of the God to whom you have prayed.',
        ),
      ],
    },
    {
      id: 'return-to-one-faithful-responsibility',
      number: 7,
      title: 'Return to One Faithful Responsibility',
      treatment: 'nextStep',
      blocks: [
        paragraph('Philippians 4:9 carries what we receive into what we practice.'),
        richParagraph(
          'For today, choose ',
          strong('one honest action within a responsibility you already have'),
          '.',
        ),
        paragraph(
          'It might be sending a needed update about an unfinished commitment: what is complete, what remains, and what you can realistically do next. Give the truth without promising more than you can deliver.',
        ),
        paragraph(
          'Let that serve as the shape of the step: something ordinary, truthful, and within your actual responsibility.',
        ),
        paragraph(
          'You do not need to solve the whole situation before acting. Ask God for help, do the part that is yours, and allow the response to remain beyond your control.',
        ),
        paragraph(
          'If the action must wait until tomorrow, let it wait until then. Faithfulness does not require you to find new work merely because you have finished praying.',
        ),
        paragraph(
          'There will be matters you cannot advance tonight. An office is closed. Another person needs time. The information has not arrived. You have reached the limit of what you can usefully do.',
        ),
        paragraph('You can acknowledge that limit before God.'),
        paragraph('His care continues where your action ends.'),
      ],
    },
    {
      id: 'rest-with-the-matter-still-in-his-hands',
      number: 8,
      title: 'Rest With the Matter Still in His Hands',
      blocks: [
        paragraph(
          'Some prayers are followed by an answer we can recognize quickly. Others become prayers we carry through a long season.',
        ),
        paragraph(
          'These passages give us a way to keep returning: acknowledge God as our refuge, humble ourselves under his care, bring our requests with thanksgiving, and receive his Word as guidance for life.',
        ),
        paragraph(
          'You can return with the same concern. You can also ask a trusted fellow believer to pray with you. The passages we have read were given to God’s people together; you do not have to practice trust in isolation.',
        ),
        paragraph('As you leave these pages, remember whom you have approached.'),
        paragraph(
          'Jesus Christ is Lord. Through him, those who trust in him have peace with God. Your hope rests in his saving work and his living care, even when your attention is tired and your circumstances remain unfinished.',
        ),
        paragraph('Let the next hour be an hour lived before him.'),
        paragraph('Do what faithfulness requires. Receive the help available to you. Leave the outcome with God.'),
        {
          type: 'closing',
          text: 'You can rest while there is still something to pray about.',
        },
      ],
    },
  ],
};
