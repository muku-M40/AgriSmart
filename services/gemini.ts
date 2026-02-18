
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { Language } from "../types";

// Base64 helper
export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      resolve(base64String.split(',')[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

// PCM decoding for TTS
const decode = (base64: string) => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

// Fix: Corrected loop condition from channel < channel to channel < numChannels to avoid infinite loop
const decodeAudioData = async (
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> => {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
};

export const getGeminiAdvisorResponse = async (prompt: string, language: Language) => {
  // Use process.env.API_KEY directly as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = 'gemini-3-flash-preview';
  
  const systemInstructions = `
    You are AgriSmart AI, a professional agricultural advisor.
    Current Language: ${language}.
    Provide concise, expert advice on crop management, fertilizers, and pest control.
    If the language is Hindi or Marathi, respond in that script.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      systemInstruction: systemInstructions,
      temperature: 0.7,
    },
  });

  return response.text;
};

export const diagnoseCropImage = async (base64Data: string) => {
  // Use process.env.API_KEY directly as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = 'gemini-3-flash-preview';

  const prompt = "Analyze this crop image. Identify if there's any disease or pest infestation. Suggest immediate organic and chemical treatments. Provide the response in clear bullet points.";

  const response = await ai.models.generateContent({
    model,
    contents: {
      parts: [
        { inlineData: { data: base64Data, mimeType: 'image/jpeg' } },
        { text: prompt }
      ]
    }
  });

  return response.text;
};

export const generateSpeech = async (text: string, language: Language) => {
  // Use process.env.API_KEY directly as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const voiceMap: Record<string, string> = {
    [Language.ENGLISH]: 'Kore',
    [Language.HINDI]: 'Puck',
    [Language.MARATHI]: 'Puck'
  };

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: voiceMap[language] || 'Kore' },
        },
      },
    },
  });

  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!base64Audio) return null;

  return base64Audio;
};