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
  {
    question: 'What is your body frame?',
    options: ['Thin, light frame', 'Medium build', 'Large, sturdy frame'],
    prakriti: ['Vata', 'Pitta', 'Kapha'],
  },
  {
    question: 'How is your skin?',
    options: ['Dry, rough, thin', 'Sensitive, reddish, warm', 'Thick, oily, cool'],
    prakriti: ['Vata', 'Pitta', 'Kapha'],
  },
  {
    question: 'Describe your hair.',
    options: ['Dry, thin, brittle', 'Fine, soft, premature graying', 'Thick, oily, wavy'],
    prakriti: ['Vata', 'Pitta', 'Kapha'],
  },
  {
    question: 'What is your appetite like?',
    options: ['Irregular, variable', 'Strong, sharp, unbearable', 'Slow but steady'],
    prakriti: ['Vata', 'Pitta', 'Kapha'],
  },
  {
    question: 'How is your mood generally?',
    options: ['Enthusiastic, lively, but changes quickly', 'Intelligent, sharp, but can be irritable', 'Calm, stable, but can be lethargic'],
    prakriti: ['Vata', 'Pitta', 'Kapha'],
  },
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
