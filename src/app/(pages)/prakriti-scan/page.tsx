
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Leaf, Flame, Wind } from 'lucide-react';

const questions = [
    // Part I: Physiological & Mental Traits
    {
        question: "How would you describe your mental activity?",
        options: ["Active, creative, and full of new ideas, but can be restless", "Focused, sharp, intelligent, and a good leader", "Calm, stable, and thoughtful"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        question: "How do you learn new things?",
        options: ["I grasp things quickly, but also forget quickly", "I have a sharp, penetrating memory and learn systematically", "I learn slowly, but my long-term memory is excellent"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        question: "What is your natural emotional tendency under stress?",
        options: ["I become anxious, worried, or fearful", "I become irritable, angry, and impatient", "I become withdrawn, quiet, and avoid conflict"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        question: "What is your appetite like?",
        options: ["Irregular, variable; I might forget to eat", "Strong and sharp; I get irritable if I miss a meal", "Slow but steady; I enjoy food and can skip meals without issue"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        question: "How is your digestion?",
        options: ["Variable; prone to gas, bloating, and constipation", "Strong and fast; can lead to acidity or loose stools", "Slow and heavy; I feel full for a long time after eating"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        question: "How do you handle your finances?",
        options: ["I spend money quickly and impulsively", "I spend on quality, luxury items and manage money well", "I am good at saving and accumulate wealth steadily"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        question: "Describe your sleep pattern.",
        options: ["Light, interrupted sleep; prone to insomnia", "I sleep soundly for a moderate duration, but can be disturbed by heat", "I enjoy deep, long, and heavy sleep and can feel groggy upon waking"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        question: "How do you speak?",
        options: ["I speak quickly and can be talkative", "My speech is clear, sharp, and convincing", "My speech is slow, melodic, and calm"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        question: "What are your dreams like?",
        options: ["Active and adventurous; dreams of flying, running", "Intense and colorful; dreams of fire, conflicts, or problem-solving", "Calm and watery; dreams of lakes, clouds, romance"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        question: "How is your energy level throughout the day?",
        options: ["Comes in bursts; variable energy, can get tired easily", "Strong and consistent, especially during the middle of the day", "Steady and enduring, but can be slow to get started"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
     {
        question: "How do you handle weather?",
        options: ["I dislike cold, dry, and windy weather", "I dislike hot, sunny weather and feel better in the cold", "I dislike damp, cool, and cloudy weather"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        question: "What's your stamina like?",
        options: ["Good for short bursts, but I tire easily", "Moderate and focused stamina", "Excellent, strong endurance and stamina"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },

    // Part II: Physical Traits
    {
        question: "What is your body frame and build?",
        options: ["Thin, light frame; find it hard to gain weight", "Medium, muscular build; well-proportioned", "Large, sturdy, and broad frame; tend to gain weight easily"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        question: "How would you describe your skin?",
        options: ["Dry, cool, thin, with visible veins, prone to roughness", "Warm, oily, sensitive; prone to rashes, acne, or moles", "Thick, oily, cool, and smooth"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        question: "How is your body temperature?",
        options: ["My hands and feet are often cold", "I often feel warm and may have a reddish complexion", "My skin is usually cool to the touch"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        question: "Describe your hair.",
        options: ["Dry, thin, brittle, or frizzy", "Fine, soft; may have premature graying or thinning", "Thick, oily, wavy, and lustrous"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        question: "What are your eyes like?",
        options: ["Small, active, can be dry; may be dark or black", "Medium-sized, sharp, and penetrating; light-colored (hazel, green)", "Large, calm, and attractive with thick lashes; usually blue or brown"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        question: "How are your joints?",
        options: ["Prominent, thin, and tend to crack or pop", "Medium-sized, loose, and flexible", "Large, well-lubricated, and sturdy"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        question: "What are your nails like?",
        options: ["Dry, rough, brittle; they break easily", "Soft, pink, and flexible", "Thick, strong, smooth, and shiny"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        question: "What are your teeth like?",
        options: ["Irregular, protruding, with receding gums", "Medium-sized, yellowish, prone to cavities", "Strong, white, and well-formed"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        question: "How much do you perspire?",
        options: ["Scant perspiration, even in hot weather", "I perspire a lot, especially when it's hot", "I perspire moderately, even without much exertion"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        question: "What is your thirst level?",
        options: ["Variable and sometimes I forget to drink water", "I get thirsty often and drink large amounts of water", "I rarely feel very thirsty"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        question: "Describe your lips.",
        options: ["Thin, dry, and often chapped", "Medium-sized, soft, and reddish", "Full, smooth, and slightly oily"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        question: "How do you walk?",
        options: ["A quick, light-footed pace", "A determined, purposeful stride", "A slow, steady, and graceful walk"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    }
];

const prakritiInfo = {
    Vata: {
        icon: <Wind className="w-12 h-12 text-primary" />,
        description: "Vata is characterized by the energy of movement. People with a dominant Vata dosha are often thin, energetic, and creative. They are known for their quick thinking but can also be prone to anxiety and dry skin."
    },
    Pitta: {
        icon: <Flame className="w-12 h-12 text-primary" />,
        description: "Pitta represents the energy of digestion and metabolism. Pitta-dominant individuals are often of medium build, with a sharp intellect and strong digestion. They can be ambitious and focused, but also prone to anger and inflammation."
    },
    Kapha: {
        icon: <Leaf className="w-12 h-12 text-primary" />,
        description: "Kapha is the energy of lubrication and structure. Those with a dominant Kapha dosha tend to have a sturdy build, calm temperament, and good stamina. They are caring and thoughtful but may struggle with weight gain and sluggishness."
    }
}

export default function PrakritiScanPage() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<string | null>(null);

  const handleAnswerChange = (questionIndex: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: value }));
  };

  const calculateResult = () => {
    const counts = { Vata: 0, Pitta: 0, Kapha: 0 };
    Object.entries(answers).forEach(([qIndex, option]) => {
      const question = questions[Number(qIndex)];
      const optionIndex = question.options.indexOf(option);
      const prakriti = question.prakriti[optionIndex] as keyof typeof counts;
      if (prakriti) {
        counts[prakriti]++;
      }
    });

    const dominantPrakriti = Object.keys(counts).reduce((a, b) =>
      counts[a as keyof typeof counts] > counts[b as keyof typeof counts] ? a : b
    );
    setResult(dominantPrakriti);
  };

  if (result) {
    const info = prakritiInfo[result as keyof typeof prakritiInfo];
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Card className="w-full max-w-md shadow-xl bg-card text-card-foreground">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full mb-4">
                {info.icon}
            </div>
            <CardTitle className="text-2xl">Your Prakriti is {result}!</CardTitle>
            <CardDescription>
              This is your dominant body constitution according to Ayurveda.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {info.description}
            </p>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button className="w-full" onClick={() => {
                setResult(null);
                setAnswers({});
            }}>Take the Test Again</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
       <div>
        <h1 className="text-3xl font-headline font-bold">
          PrakritiScan (प्रकृति स्कैन)
        </h1>
        <p className="text-muted-foreground">
            Answer these questions to discover your Ayurvedic body constitution
            (dosha).
        </p>
      </div>
      <Card>
        <CardContent className="space-y-8 p-6">
          {questions.map((q, index) => (
            <div key={index} className="space-y-4 p-4 border rounded-lg bg-background">
              <h3 className="font-semibold text-lg">{`${
                index + 1
              }. ${q.question}`}</h3>
              <RadioGroup
                onValueChange={(value) => handleAnswerChange(index, value)}
                className="space-y-2"
              >
                {q.options.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`q${index}-${option}`} />
                    <Label htmlFor={`q${index}-${option}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button
            onClick={calculateResult}
            disabled={Object.keys(answers).length !== questions.length}
            className="w-full"
          >
            Calculate My Prakriti
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
