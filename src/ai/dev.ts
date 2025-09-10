
import { config } from 'dotenv';
config();

import '../server';
import '@/ai/flows/generate-ayurveda-diet-chart.ts';
import '@/ai/flows/suggest-seasonal-foods.ts';
import '@/ai/flows/chat-with-dietician.ts';
import '@/ai/flows/analyze-food-image.ts';
