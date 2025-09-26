import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Function to get API key with fallbacks
function getApiKey() {
  const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!key) {
    // Fallback: try to read from the actual environment variable name
    const fallbackKey = 'AIzaSyD1rQf7dHQiPesG4KD-EwrAQX91C54Zxto';
    console.warn('Using fallback API key. Consider setting GEMINI_API_KEY environment variable.');
    return fallbackKey;
  }
  return key;
}

export const ai = genkit({
  plugins: [googleAI({
    apiKey: getApiKey(),
  })],
  model: 'googleai/gemini-2.5-flash',
});
