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
import { Leaf } from 'lucide-react';

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
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md text-center shadow-xl">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full mb-4">
                <Leaf className="w-12 h-12 text-primary" />
            </div>
            <CardTitle className="text-2xl">Your Prakriti is {result}!</CardTitle>
            <CardDescription>
              This is your dominant body constitution according to Ayurveda.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Based on your answers, your primary dosha is {result}. We will now
              personalize your diet and lifestyle suggestions.
            </p>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button className="w-full" onClick={() => {
                setResult(null);
                setAnswers({});
            }}>Take the Test Again</Button>
            <Button variant="ghost">Learn More About {result}</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-headline">
            PrakritiScan (प्रकृति स्कैन)
          </CardTitle>
          <CardDescription>
            Answer these questions to discover your Ayurvedic body constitution
            (dosha).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {questions.map((q, index) => (
            <div key={index} className="space-y-4 p-4 border rounded-lg bg-card">
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
