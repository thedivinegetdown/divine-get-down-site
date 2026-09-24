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

export const TAKE_HEART_CONTENT = {
  review: {
    biblicalContentGate: 'pass',
    canonicalSha256: '5f9cd50f00688a5ed7616facb0041e696be7c9909ec76796c3d7f4150f1b94be',
    reviewedReferences: [
      'John 16:25–33',
      '2 Corinthians 4:1–18',
      'Hebrews 11:32–40',
      'Hebrews 12:1–3',
      'Romans 8:18–39',
    ],
  },
  metadata: {
    title: 'Take Heart: When the Road Feels Heavy | The Divine Get Down',
    description:
      'A Scripture-rooted reflection for the long road of discouragement, receiving strength from God and persevering in the hope and love of Jesus Christ.',
    path: SITE.links.takeHeart,
  },
  integration: {
    slug: 'take-heart',
    shortTitle: 'Take Heart',
    fullTitle: 'Take Heart: When the Road Feels Heavy',
    subtitle: 'When the Road Feels Heavy',
    description:
      'A Scripture-rooted reflection for the long road of discouragement, receiving strength from God and persevering in the hope and love of Jesus Christ.',
    resourceType: 'Guided Scripture reflection and prayer',
    pathway: 'Receive Scripture-Centered Encouragement',
    topics: [
      'Encouragement',
      'discouragement',
      'suffering',
      'perseverance',
      'weakness and dependence',
      'resurrection hope',
      'God’s love in Christ',
      'prayer',
      'faithful obedience',
      'Christian fellowship',
    ],
    scriptureReferences: [
      'John 16:25–33, with 16:1–24 as context',
      '2 Corinthians 4:7–18, with 4:1–6 as context',
      'Hebrews 12:1–3, with Hebrews 11:32–40 as context',
      'Romans 8:31–39, with 8:18–30 as context',
    ],
    estimatedReadingTime:
      '15–17 minutes, with additional time for reading the complete passages, prayer, and pauses',
    access: 'Free',
    primaryCta: 'Read Take Heart',
  },
  hero: {
    brand: SITE.name,
    title: 'Take Heart',
    subtitle: 'When the Road Feels Heavy',
    format: 'Free Scripture Reflection',
    readTime: '15–17 Min Read',
  },
  introduction: [
    'Some difficulties become heavy through their repetition.',
    'You wake to a responsibility that was there yesterday. You pray about a situation you have prayed about for months. You continue doing something good, but the change you hoped to see remains difficult to find.',
    'Alongside the original burden, another question can begin to form: how long can I keep going?',
    'Scripture speaks to people who know that question. It tells of opposition, bodily weakness, delayed fulfillment, and believers who need help to endure. It also directs them toward someone worthy of their continuing trust: Jesus Christ.',
    'These pages follow four passages about trouble, endurance, and hope. Read slowly enough to notice what each passage actually promises. You can bring your disappointment with you. You can ask for relief. You can also receive encouragement while the difficulty remains.',
  ],
  translationNote:
    'Scripture quotations are from the World English Bible (WEB), Classic edition. Reflections, prompts, and prayer are original responses to Scripture.',
  sections: [
    {
      id: 'peace-while-trouble-is-real',
      number: 1,
      title: 'Peace While Trouble Is Real',
      blocks: [
        read('John 16:25–33', 'https://ebible.org/eng-web/JHN16.htm'),
        paragraph(
          'Jesus speaks these words as his death approaches. Earlier in the chapter, he has warned his disciples about persecution, including exclusion and death. He has spoken about leaving them, returning to the Father, and sending the Spirit. Their sorrow has a real cause.',
        ),
        paragraph(
          'Near the end of the conversation, the disciples express confidence in their belief. Jesus tells them that they will scatter and leave him alone. He knows how much more fragile they are than they understand.',
        ),
        paragraph('Then he says:'),
        scripture(
          '“I have told you these things, that in me you may have peace. In the world you have trouble; but cheer up! I have overcome the world.”',
          'John 16:33, WEB',
          'https://ebible.org/eng-web/JHN16.htm',
        ),
        paragraph(
          'In ordinary conversation, telling someone to cheer up can sound like asking them to stop being sad. Here, the words belong to Jesus\' account of the trouble his followers will face and the victory that belongs to him. He gives them a reason for courage in himself.',
        ),
        paragraph('Notice where he places peace: in him.'),
        paragraph(
          'He does not tell the disciples that their surroundings will become peaceful. He prepares them for the opposite. His words will help them remember, when opposition comes, that their suffering has not taken him by surprise or overturned his authority.',
        ),
        paragraph(
          'That distinction matters when a long difficulty begins to feel like evidence against your faith. You may have expected following Jesus to make the road more understandable. You may have prayed sincerely and still received news you dreaded. Trouble can leave you asking whether you misunderstood his care.',
        ),
        paragraph('Jesus\' own words make room for trouble within the life of discipleship.'),
        paragraph(
          'His victory gives Christian hope its foundation. The world that opposes him cannot finally defeat him or undo his saving work. As the passages ahead make clear, the crucified Jesus has been raised and reigns. We receive his encouragement knowing that the cross was followed by resurrection.',
        ),
        paragraph(
          'This does not explain every painful event. It tells us who remains Lord within a world where painful events occur.',
        ),
        paragraph(
          'You can acknowledge the weight of this season before him. A truthful prayer may include disappointment, confusion, and the desire for something to change. You do not have to make your situation sound easier in order to speak faithfully about Christ.',
        ),
        prompt(
          'Reflect: What have I begun to conclude about Jesus because this difficulty has lasted? How does his promise of peace amid trouble address that conclusion?',
        ),
      ],
    },
    {
      id: 'the-strength-is-gods',
      number: 2,
      title: 'The Strength Is God\'s',
      blocks: [
        read(
          '2 Corinthians 4:7–18',
          'https://ebible.org/eng-web/2CO04.htm',
          ', beginning with verses 1–6 for context.',
        ),
        paragraph(
          'Paul is describing the ministry entrusted to him and his fellow workers. They proclaim Jesus Christ as Lord and serve others for his sake. The treasure they carry is the light of the knowledge of God\'s glory in Christ.',
        ),
        paragraph('The messengers themselves are fragile.'),
        scripture(
          '“But we have this treasure in clay vessels, that the exceeding greatness of the power may be of God and not from ourselves.”',
          '2 Corinthians 4:7, WEB',
          'https://ebible.org/eng-web/2CO04.htm',
        ),
        paragraph(
          'Paul describes pressure, perplexity, pursuit, and being struck down. He speaks of carrying the dying of Jesus in his body so that Jesus\' life may also be revealed. His ministry exposes him to death while bringing the gospel\'s life to others.',
        ),
        paragraph(
          'This is a costly account of service. Paul is explaining how God\'s power is displayed through vulnerable people who belong to the crucified and risen Lord.',
        ),
        paragraph(
          'Our circumstances are not identical to Paul\'s apostolic ministry. Yet his account corrects the assumption that God\'s work must always look like human strength. A servant\'s frailty does not make the gospel less true. Dependence on God belongs within faithful service.',
        ),
        paragraph(
          'You may have been treating your available energy as a verdict on your spiritual life. There are responsibilities you once carried easily that now require help. There are days when you have little to say beyond asking God to sustain you.',
        ),
        paragraph('Weakness alone is not evidence that you have failed him.'),
        paragraph(
          'Paul\'s confidence reaches beyond his ability to survive another hard day. In verse 14, he grounds it in the God who raised Jesus and will raise his people. He looks toward being brought into God\'s presence together with the believers he serves.',
        ),
        paragraph('That resurrection hope governs what follows:'),
        scripture(
          '“For our light affliction, which is for the moment, works for us more and more exceedingly an eternal weight of glory,”',
          '2 Corinthians 4:17, WEB',
          'https://ebible.org/eng-web/2CO04.htm',
        ),
        paragraph(
          'Hear this as Paul\'s testimony about suffering he actually bears. His description of affliction as light and momentary is a comparison with the immense, enduring glory to come. It does not erase the pressure, danger, or bodily decline he has just described.',
        ),
        paragraph(
          'We should never use his words to tell a grieving person that their pain is insignificant or that they have mourned long enough.',
        ),
        paragraph(
          'Paul sees present suffering within a future that death cannot close. God is at work even here, and the end of the story is resurrection life with Christ. The inward renewal of verse 16 belongs alongside outward decline; it cannot be measured simply by feeling energetic or emotionally restored.',
        ),
        paragraph(
          'You can ask for strength without pretending you already possess it. You can accept practical help while continuing to trust God. You can grieve what has been lost while learning to look toward what he has promised.',
        ),
        prompt(
          'Reflect: Where have I made being strong a condition of being faithful? What help am I finding difficult to receive?',
        ),
      ],
    },
    {
      id: 'consider-the-one-who-endured',
      number: 3,
      title: 'Consider the One Who Endured',
      blocks: [
        richParagraph(
          'Read ',
          link('Hebrews 12:1–3', 'https://ebible.org/eng-web/HEB12.htm'),
          ', remembering ',
          link('Hebrews 11:32–40', 'https://ebible.org/eng-web/HEB11.htm'),
          '.',
        ),
        paragraph(
          'The people remembered in Hebrews 11 did not all experience the same earthly outcome. Some escaped danger. Others suffered imprisonment and death. Both groups are included among those commended for faith.',
        ),
        paragraph(
          'Their testimony prevents us from equating faithfulness with a particular visible result. Deliverance is a gift to receive with thanks. Those who continue trusting God without receiving that deliverance have not thereby been shown to possess an inferior faith.',
        ),
        paragraph(
          'With these witnesses in view, Hebrews calls believers to lay aside every weight and entangling sin, and to run with perseverance. The direction of their attention is explicit:',
        ),
        scripture(
          '“looking to Jesus, the author and perfecter of faith, who for the joy that was set before him endured the cross, despising its shame, and has sat down at the right hand of the throne of God.”',
          'Hebrews 12:2, WEB',
          'https://ebible.org/eng-web/HEB12.htm',
        ),
        paragraph(
          'Jesus endured real hostility and the shame of crucifixion. He is now enthroned. The passage asks weary believers to consider him carefully so that they do not lose heart.',
        ),
        paragraph(
          'His endurance gives us more than a comparison against which to judge ourselves. He is the author and perfecter of faith, the Lord toward whom the whole race is directed. Our hope depends on him. We follow with our attention on the one who has gone through death and now reigns.',
        ),
        paragraph(
          'The race here is the life of persevering faith. It is not a command to preserve every undertaking, remain in every role, or produce more despite exhaustion. A particular responsibility may need to change. A plan may need to end. Faithfulness to Jesus is larger than the continuation of a particular project.',
        ),
        paragraph(
          'The call to lay aside sin is also real. Discouragement can accompany temptations to deceive, retaliate, or abandon what we know is right. If you recognize such a choice, bring that specific matter before God. Seek his forgiveness and help to turn from it. Being hurt does not make every response to hurt faithful.',
        ),
        paragraph(
          'But the passage does not identify weariness itself as proof of wrongdoing. It addresses people who need encouragement to endure.',
        ),
        paragraph(
          'Some hindrances also deserve examination. The insistence on appearing capable can make it difficult to admit a need. The desire to be approved by everyone can pull against obedience. Consider what actually impedes your following of Jesus, without treating every limitation as something you should overcome by effort.',
        ),
        paragraph(
          'The repeated invitation is to look toward him. Repentance, dependence, and endurance belong together in a life sustained by God\'s grace.',
        ),
        prompt(
          'Reflect: As I consider Jesus, is there a particular sin to turn from or a hindrance to lay aside? What would following him require, even if the result remains unseen?',
        ),
      ],
    },
    {
      id: 'loved-in-the-midst-of-these-things',
      number: 4,
      title: 'Loved in the Midst of These Things',
      blocks: [
        read(
          'Romans 8:31–39',
          'https://ebible.org/eng-web/ROM08.htm',
          ', with verses 18–30 in view.',
        ),
        paragraph(
          'Romans 8 reaches its declaration of inseparable love through an honest account of suffering. Creation groans. Believers groan while waiting for the redemption of their bodies. Hope includes patient waiting for what they do not yet see.',
        ),
        paragraph(
          'Within that waiting, the Spirit helps them in weakness and intercedes when they do not know how to pray as they ought. God\'s care is already active where their own words are insufficient.',
        ),
        paragraph(
          'Paul also speaks of God working all things for good for those who love him and are called according to his purpose. The next verse describes that purpose in terms of being conformed to the image of his Son. The passage carries that purpose toward glory.',
        ),
        paragraph(
          'We cannot replace this promised good with a guarantee that our preferred circumstances will arrive. Paul is describing God\'s saving purpose for his people through suffering and into their final future with Christ.',
        ),
        paragraph(
          'Then he directs attention to what God has already done. God gave his own Son. Christ died, was raised, and now intercedes for his people at God\'s right hand. The security of those who belong to him rests on his saving work.',
        ),
        paragraph(
          'Paul names oppression, anguish, persecution, hunger, exposure, danger, and the sword. These are actual threats to human life. His confidence holds in the midst of them:',
        ),
        scripture(
          '“For I am persuaded that neither death, nor life, nor angels, nor principalities, nor things present, nor things to come, nor powers, nor height, nor depth, nor any other created thing will be able to separate us from God\'s love which is in Christ Jesus our Lord.”',
          'Romans 8:38–39, WEB',
          'https://ebible.org/eng-web/ROM08.htm',
        ),
        paragraph(
          'Being loved by Christ does not make these experiences painless. It means that even these experiences cannot sever his people from God\'s love in him. Death itself cannot accomplish that separation.',
        ),
        paragraph(
          'There may be much about the coming months that you cannot know. You can ask for healing, provision, reconciliation, and relief. You can work toward what is good while admitting that the outcome is beyond your command.',
        ),
        paragraph(
          'As you wait, your standing before God need not be measured by how useful, resilient, or hopeful you feel. The Christian\'s security is in Jesus Christ, who died, rose, and intercedes.',
        ),
        paragraph(
          'Your grief can remain grief. Your hope can reach beyond the limits of what you can presently see. Both can be brought before the God whose Spirit helps you pray.',
        ),
        prompt(
          'Reflect: What earthly outcome am I most afraid of losing? What does this passage assure those in Christ will remain, even where the outcome is uncertain?',
        ),
      ],
    },
    {
      id: 'remain-with-the-word',
      number: 5,
      title: 'Remain With the Word',
      treatment: 'stillness',
      blocks: [
        richParagraph(
          'Keep ',
          link('Romans 8:31–39', 'https://ebible.org/eng-web/ROM08.htm'),
          ' open for a few unhurried minutes.',
        ),
        paragraph(
          'Read the passage once, attending to what God has done. Notice the giving of the Son, Christ\'s death and resurrection, and his continuing intercession. Let the assurance at the end remain connected to these acts of God.',
        ),
        paragraph(
          'Then read verses 35–39 again. Notice that the difficulties are named rather than passed over. Bring one part of your own difficulty into prayer without trying to decide how it will end.',
        ),
        paragraph('You might pray:'),
        { type: 'pause', text: 'Father, I do not know what will happen here. Help me trust the love you have shown in Jesus Christ.' },
        paragraph(
          'Allow a little silence after those words. Keep the text before you. If attention wanders, return to a sentence about Christ and consider what it says.',
        ),
        paragraph(
          'This pause is simply a way to attend to Scripture and answer God. You are free to read aloud or remain quiet. No particular feeling needs to arrive before you finish.',
        ),
        paragraph(
          'Before moving on, name one truth from the passage that you can carry into the unresolved situation. Let it remain a truth about God, even if your feelings take time to follow.',
        ),
      ],
    },
    {
      id: 'a-prayer-for-the-long-road',
      number: 6,
      title: 'A Prayer for the Long Road',
      treatment: 'prayer',
      blocks: [
        paragraph(
          'Pray these words as they express your need, pausing wherever you want to speak more personally.',
        ),
        { type: 'prayerOpening', text: 'Father,' },
        paragraph(
          'I come to you through Jesus Christ. You gave your Son for us. You raised him from the dead. He is Lord, and my hope rests in him.',
        ),
        paragraph(
          'I am weary of carrying what has lasted so long. Some days I can name the burden clearly. On other days I only know that ordinary things have become harder. You know the full weight of what I bring.',
        ),
        paragraph(
          'I ask you for help in the situation itself. Bring relief where there is suffering, provision where there is need, and truth where there is confusion. Protect those who are being harmed. Give wisdom to those whose decisions affect others. I place before you the change I have been longing to see.',
        ),
        { type: 'pause', text: 'Pause to name that request.' },
        paragraph(
          'While I wait, keep teaching me to trust you. I find it hard when I cannot see progress. Help me distinguish between what you have promised and what I have hoped would happen. Give me courage to keep asking, and humility to entrust the answer to you.',
        ),
        paragraph(
          'Thank you that your power does not depend on my appearing strong. Help me receive the care I need. Give me honesty with the people who can pray with me and share what I am carrying.',
        ),
        paragraph(
          'Where discouragement has led me into sin, bring that clearly before me. Forgive my wrongdoing and make me willing to turn from it. Help me take responsibility for harm I have caused. Keep pain from becoming an excuse to stop loving others.',
        ),
        paragraph(
          'Direct my attention again to Jesus. He endured the cross and now sits at your right hand. When I am tempted to abandon what is faithful, help me consider him. Sustain my obedience by your grace.',
        ),
        paragraph(
          'Holy Spirit, help me in the weakness I cannot put into words. Teach me to pray within the life I actually have. Keep my hope rooted in Christ when the future feels difficult to imagine.',
        ),
        paragraph(
          'Let the promise of resurrection widen my view without making me careless toward present sorrow. Give me tenderness toward other people who are suffering. Help me welcome their honesty and stay near when I cannot offer an explanation.',
        ),
        paragraph(
          'Father, strengthen me for the next act of faithfulness. I cannot see the whole road. Help me walk before you today, trusting the love from which no created thing can separate your people.',
        ),
        paragraph('Through Jesus Christ our Lord,'),
        { type: 'prayerClosing', text: 'Amen.' },
      ],
    },
    {
      id: 'let-someone-help-you-persevere',
      number: 7,
      title: 'Let Someone Help You Persevere',
      treatment: 'nextStep',
      blocks: [
        richParagraph(
          'For one faithful next step, ',
          strong(
            'ask a trusted fellow Christian to pray with you about the specific place where you are growing weary.',
          ),
        ),
        paragraph(
          'Choose someone who will take both Scripture and your circumstances seriously. You could say:',
        ),
        richParagraph(
          emphasis(
            'I am finding it hard to keep going in this part of my life. Would you read Romans 8:31–39 with me and pray that I will trust Christ and respond faithfully?',
          ),
        ),
        paragraph(
          'Tell them enough of the actual difficulty to let them care for you. You can be clear about whether you need prayer, a listening ear, or practical help. If no trusted person comes readily to mind, consider approaching a pastor or mature believer in a local church.',
        ),
        paragraph(
          'This is one application of passages addressed to God\'s people together. Paul expects to share resurrection life with the believers he serves. Hebrews calls believers to run with perseverance together. Receiving encouragement belongs within that shared life.',
        ),
        paragraph(
          'You may need help discerning what obedience requires. Remaining faithful to Jesus can include receiving protection, changing an unsustainable responsibility, or admitting that you cannot carry something alone. Perseverance in Christ does not require concealing harm or refusing help.',
        ),
        paragraph('Let one person know where prayer and companionship are needed.'),
      ],
    },
    {
      id: 'take-heart',
      number: 8,
      title: 'Take Heart',
      blocks: [
        paragraph(
          'The road may still feel heavy when you leave these pages. There may be a duty waiting, an absence you feel, or an answer that has not come.',
        ),
        paragraph('Return to what these passages have placed before you.'),
        paragraph(
          'Jesus has overcome the world. God\'s power is at work through fragile people. The crucified Lord is risen and enthroned. Those who belong to him are held within a love that suffering and death cannot sever.',
        ),
        paragraph(
          'These truths give you somewhere to stand while you ask for help, grieve what is painful, and keep following him.',
        ),
        paragraph(
          'You do not yet know every turn the road will take. Scripture gives you a sure hope beyond them: resurrection life with Christ.',
        ),
        {
          type: 'closing',
          text: 'Take heart in him. Bring him the weariness that remains. Receive the help he gives through his Word and his people. With your attention on Jesus, take the next faithful step.',
        },
      ],
    },
  ],
};
