
import React, { useState, useEffect, useRef } from 'react';
import { Language, Message } from '../types';
import { getGeminiAdvisorResponse, generateSpeech } from '../services/gemini';
import { ICONS } from '../constants';

const VoiceAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Namaste! I am your AgriSmart Advisor. How can I help you with your farm today?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState<Language>(Language.ENGLISH);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Audio handling
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const responseText = await getGeminiAdvisorResponse(text, language);
      if (responseText) {
        const aiMessage: Message = { role: 'model', text: responseText };
        setMessages(prev => [...prev, aiMessage]);
        
        // Auto-speak the AI response
        handleTTS(responseText);
      }
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleTTS = async (text: string) => {
    try {
      const audioBase64 = await generateSpeech(text, language);
      if (audioBase64) {
        // Simple way to play base64 audio in browser
        const audio = new Audio(`data:audio/pcm;base64,${audioBase64}`);
        // Note: Real PCM data needs proper decoding as shown in the system instruction examples
        // But for this simple demo, we'll assume a wrapper or standard audio file format if possible
        // Actually, let's implement the proper PCM playback if we had a dedicated PCM decoder
        // Since we need to follow the provided decode helper:
        
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        }
        
        const ctx = audioContextRef.current;
        const binary = atob(audioBase64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
        
        const dataInt16 = new Int16Array(bytes.buffer);
        const buffer = ctx.createBuffer(1, dataInt16.length, 24000);
        const channelData = buffer.getChannelData(0);
        for (let i = 0; i < dataInt16.length; i++) {
          channelData[i] = dataInt16[i] / 32768.0;
        }
        
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start();
      }
    } catch (error) {
      console.warn("TTS Playback failed:", error);
    }
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = language;
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      handleSend(transcript);
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-12rem)] flex flex-col bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Advisor Header */}
      <div className="p-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white">
            {ICONS.AIAdvisor}
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm">AI Farming Assistant</h3>
            <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></span>
              Online Advisory
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="text-xs font-bold bg-white border border-slate-200 rounded-lg px-2 py-1 outline-none"
          >
            <option value={Language.ENGLISH}>English</option>
            <option value={Language.HINDI}>हिन्दी (Hindi)</option>
            <option value={Language.MARATHI}>मराठी (Marathi)</option>
          </select>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`
              max-w-[85%] px-5 py-3 rounded-3xl text-sm leading-relaxed
              ${msg.role === 'user' 
                ? 'bg-green-600 text-white rounded-tr-none shadow-md shadow-green-100' 
                : 'bg-slate-100 text-slate-800 rounded-tl-none'}
            `}>
              {msg.text}
              {msg.role === 'model' && (
                <button 
                  onClick={() => handleTTS(msg.text)}
                  className="mt-2 block text-green-600 font-bold text-[10px] uppercase hover:underline"
                >
                  Listen Again
                </button>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-100 px-5 py-3 rounded-3xl rounded-tl-none flex gap-1 items-center">
              <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></div>
              <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-50 bg-slate-50/30">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(inputText); }}
          className="flex items-center gap-3"
        >
          <button
            type="button"
            onClick={startListening}
            className={`
              w-12 h-12 rounded-full flex items-center justify-center transition-all
              ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-green-100 text-green-600 hover:bg-green-200'}
            `}
          >
            {ICONS.AIAdvisor}
          </button>
          <input
            type="text"
            placeholder="Ask something (e.g., Best crops for rainy season?)"
            className="flex-1 bg-white border border-slate-200 rounded-2xl px-6 py-3 text-sm outline-none focus:ring-2 focus:ring-green-500 transition-all"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            type="submit"
            className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors shadow-lg shadow-green-100"
          >
            <svg className="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default VoiceAssistant;
