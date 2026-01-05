import React from 'react';

export default function VoiceTest() {
  const handleSpeak = () => {
    const testText = 'This is a test of the Divine Get Down voice system.';
    const utterance = new SpeechSynthesisUtterance(testText);

    // Get available voices
    const voices = speechSynthesis.getVoices();
    console.log("🗣️ Available voices:", voices.map(v => v.name));

    // Choose a soothing one
    const preferredVoices = [
      'Google UK English Female',
      'Google US English',
      'Microsoft Aria',
      'Microsoft Zira',
      'Samantha',
      'Victoria',
      'Daniel'
    ];

    const selectedVoice =
      voices.find(v => preferredVoices.includes(v.name)) ||
      voices.find(v => v.lang.startsWith('en')) ||
      voices[0];

    if (!selectedVoice) {
      alert("No voice found.");
      return;
    }

    utterance.voice = selectedVoice;
    utterance.pitch = 1.1;
    utterance.rate = 0.9;
    utterance.volume = 1;

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Voice Test</h2>
      <button onClick={handleSpeak} style={{ padding: '1rem', fontSize: '1rem' }}>
        🔊 Click to Speak
      </button>
    </div>
  );
}
