
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
import { Leaf, Flame, Wind, AlertTriangle, Upload, FileCheck2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const questions = [
    // Part I: Physical Traits
    {
        part: "Part I: Physical Traits",
        question: "What is your body frame and build?",
        options: ["Thin, light frame; find it hard to gain weight", "Medium, muscular build; well-proportioned", "Large, sturdy, and broad frame; tend to gain weight easily"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part I: Physical Traits",
        question: "How would you describe your weight?",
        options: ["Low, and I struggle to gain weight", "Stable, and I gain or lose weight with some effort", "I tend to gain weight easily and struggle to lose it"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part I: Physical Traits",
        question: "How would you describe your skin?",
        options: ["Dry, cool, thin, with visible veins, prone to roughness", "Warm, oily, sensitive; prone to rashes, acne, or moles", "Thick, oily, cool, and smooth"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part I: Physical Traits",
        question: "What is your skin's reaction to the sun?",
        options: ["Tans easily and can get very dark", "Burns easily, tans little", "Tans evenly without burning much"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part I: Physical Traits",
        question: "How is your body temperature?",
        options: ["My hands and feet are often cold", "I often feel warm and may have a reddish complexion", "My skin is usually cool to the touch but I feel comfortable"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part I: Physical Traits",
        question: "Describe your hair.",
        options: ["Dry, thin, brittle, or frizzy", "Fine, soft; may have premature graying or thinning", "Thick, oily, wavy, and lustrous"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
     {
        part: "Part I: Physical Traits",
        question: "What are your eyes like in size and appearance?",
        options: ["Small, active, can be dry; may be dark or black", "Medium-sized, sharp, and penetrating; light-colored (hazel, green)", "Large, calm, and attractive with thick lashes; usually blue or brown"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part I: Physical Traits",
        question: "What color are the whites of your eyes (sclera)?",
        options: ["Dull or bluish-white", "Yellowish or reddish", "Clear, pure white"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part I: Physical Traits",
        question: "How are your joints?",
        options: ["Prominent, thin, and tend to crack or pop", "Medium-sized, loose, and flexible", "Large, well-lubricated, and sturdy"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part I: Physical Traits",
        question: "What are your nails like?",
        options: ["Dry, rough, brittle; they break easily", "Soft, pink, and flexible", "Thick, strong, smooth, and shiny"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part I: Physical Traits",
        question: "Describe your lips.",
        options: ["Thin, dry, and often chapped", "Medium-sized, soft, and reddish", "Full, smooth, and slightly oily"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part I: Physical Traits",
        question: "What are your teeth like?",
        options: ["Irregular, protruding, with receding gums", "Medium-sized, yellowish, prone to cavities", "Strong, white, and well-formed"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part I: Physical Traits",
        question: "What is your face shape?",
        options: ["Long, angular, or oval", "Heart-shaped or triangular, with a defined jaw", "Round, full, or square"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part I: Physical Traits",
        question: "How do you walk?",
        options: ["A quick, light-footed pace", "A determined, purposeful stride", "A slow, steady, and graceful walk"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },

    // Part II: Physiological & Metabolic Traits
    {
        part: "Part II: Physiological & Metabolic Traits",
        question: "What is your appetite like?",
        options: ["Irregular, variable; I might forget to eat", "Strong and sharp; I get irritable if I miss a meal", "Slow but steady; I enjoy food and can skip meals without issue"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part II: Physiological & Metabolic Traits",
        question: "What is your thirst level?",
        options: ["Variable and sometimes I forget to drink water", "I get thirsty often and drink large amounts of water", "I rarely feel very thirsty"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part II: Physiological & Metabolic Traits",
        question: "How is your digestion?",
        options: ["Variable; prone to gas, bloating, and constipation", "Strong and fast; can lead to acidity or loose stools", "Slow and heavy; I feel full for a long time after eating"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part II: Physiological & Metabolic Traits",
        question: "How much do you perspire?",
        options: ["Scant perspiration, even in hot weather", "I perspire a lot, especially when it's hot", "I perspire moderately, even without much exertion"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part II: Physiological & Metabolic Traits",
        question: "Describe your sleep pattern.",
        options: ["Light, interrupted sleep; prone to insomnia", "I sleep soundly for a moderate duration, but can be disturbed by heat", "I enjoy deep, long, and heavy sleep and can feel groggy upon waking"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part II: Physiological & Metabolic Traits",
        question: "How is your energy level throughout the day?",
        options: ["Comes in bursts; variable energy, can get tired easily", "Strong and consistent, especially during the middle of the day", "Steady and enduring, but can be slow to get started"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part II: Physiological & Metabolic Traits",
        question: "What's your stamina like?",
        options: ["Good for short bursts, but I tire easily", "Moderate and focused stamina", "Excellent, strong endurance and stamina"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part II: Physiological & Metabolic Traits",
        question: "How do you handle weather?",
        options: ["I dislike cold, dry, and windy weather", "I dislike hot, sunny weather and feel better in the cold", "I dislike damp, cool, and cloudy weather"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part II: Physiological & Metabolic Traits",
        question: "What is your pulse like (if you know)?",
        options: ["Fast, thin, and irregular, like a snake (Sarpa Gati)", "Moderate, strong, and jumping, like a frog (Manduka Gati)", "Slow, broad, and steady, like a swan (Hamsa Gati)"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part II: Physiological & Metabolic Traits",
        question: "How do you react to spicy food?",
        options: ["I can handle it sometimes, but too much upsets my stomach", "I crave it and can handle very spicy food", "I generally avoid it as it feels too intense"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part II: Physiological & Metabolic Traits",
        question: "How about your bowel movements?",
        options: ["Dry, hard, and infrequent; prone to constipation", "Regular, but can be loose or frequent, especially if I eat spicy/oily food", "Regular, slow, and can be heavy or thick"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part II: Physiological & Metabolic Traits",
        question: "Which taste do you naturally prefer?",
        options: ["Sweet, Sour, and Salty tastes", "Sweet, Bitter, and Astringent tastes", "Pungent, Bitter, and Astringent tastes"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part II: Physiological & Metabolic Traits",
        question: "How strong is your immune system?",
        options: ["Variable; I seem to catch colds easily sometimes", "Strong, but I can be prone to fevers and infections", "Generally robust and I rarely get sick, but when I do, it's often with congestion"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part II: Physiological & Metabolic Traits",
        question: "How is your voice quality?",
        options: ["High-pitched, fast, and can be weak or hoarse", "Sharp, clear, and strong", "Deep, resonant, and calm"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },

    // Part III: Psychological & Emotional Traits
    {
        part: "Part III: Psychological & Emotional Traits",
        question: "How would you describe your mental activity?",
        options: ["Active, creative, and full of new ideas, but can be restless", "Focused, sharp, intelligent, and a good leader", "Calm, stable, and thoughtful"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part III: Psychological & Emotional Traits",
        question: "How do you learn new things?",
        options: ["I grasp things quickly, but also forget quickly", "I have a sharp, penetrating memory and learn systematically", "I learn slowly, but my long-term memory is excellent"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part III: Psychological & Emotional Traits",
        question: "What is your natural emotional tendency under stress?",
        options: ["I become anxious, worried, or fearful", "I become irritable, angry, and impatient", "I become withdrawn, quiet, and avoid conflict"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part III: Psychological & Emotional Traits",
        question: "How do you speak?",
        options: ["I speak quickly and can be talkative", "My speech is clear, sharp, and convincing", "My speech is slow, melodic, and calm"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part III: Psychological & Emotional Traits",
        question: "What are your dreams like?",
        options: ["Active and adventurous; dreams of flying, running", "Intense and colorful; dreams of fire, conflicts, or problem-solving", "Calm and watery; dreams of lakes, clouds, romance"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part III: Psychological & Emotional Traits",
        question: "How do you handle your finances?",
        options: ["I spend money quickly and impulsively", "I spend on quality, luxury items and manage money well", "I am good at saving and accumulate wealth steadily"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part III: Psychological & Emotional Traits",
        question: "What is your general mood?",
        options: ["Enthusiastic and changeable", "Purposeful and intense", "Easy-going and content"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part III: Psychological & Emotional Traits",
        question: "How do you approach decision-making?",
        options: ["I can be indecisive and change my mind often", "I am decisive and quick to make a choice", "I am methodical and can be slow to decide, but my decisions are firm"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part III: Psychological & Emotional Traits",
        question: "How do you react to change?",
        options: ["I embrace it and enjoy novelty", "I can adapt if it's for a good reason, but I prefer to be in control", "I resist it and prefer routine and stability"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part III: Psychological & Emotional Traits",
        question: "How is your faith or belief system?",
        options: ["Variable and can change", "Strong, determined, and can be fanatical", "Steady, deep, and loyal"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part III: Psychological & Emotional Traits",
        question: "How do you manage relationships?",
        options: ["I make friends easily but may not keep them long", "I choose my friends carefully and can be a passionate but demanding friend", "I am very loyal, dependable, and maintain friendships for life"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part III: Psychological & Emotional Traits",
        question: "What are your hobbies like?",
        options: ["I enjoy travel, art, and exciting activities", "I prefer competitive sports, debates, and leadership roles", "I enjoy relaxing activities like gardening, cooking, or being near water"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part III: Psychological & Emotional Traits",
        question: "What is your memory recall like?",
        options: ["Excellent short-term memory, but poor long-term recall", "Sharp and accurate memory for things I find important", "Slow to memorize, but excellent long-term recall"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part III: Psychological & Emotional Traits",
        question: "How do you handle criticism?",
        options: ["I take it personally and can get hurt easily", "I can become defensive and argumentative", "I am not easily offended and can be complacent"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part III: Psychological & Emotional Traits",
        question: "What level of organization do you prefer?",
        options: ["I can be messy and disorganized", "I am very organized, neat, and value order", "I tend to accumulate things but keep them in a reasonably organized way"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part III: Psychological & Emotional Traits",
        question: "How would you describe your level of compassion?",
        options: ["I feel empathy for others, but it can be fleeting", "I have strong convictions about right and wrong and fight for causes", "I am naturally nurturing, caring, and protective"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part III: Psychological & Emotional Traits",
        question: "How do you approach projects or tasks?",
        options: ["I'm great at starting things with enthusiasm, but may not finish them", "I'm a good planner and I see projects through to completion efficiently", "I work slowly and steadily, and always finish what I start"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part III: Psychological & Emotional Traits",
        question: "What is your attitude toward rules?",
        options: ["I enjoy bending the rules and finding creative solutions", "I believe rules are important for order and efficiency", "I am happy to follow rules and appreciate structure"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part III: Psychological & Emotional Traits",
        question: "How do you express affection?",
        options: ["Verbally and with excitement, but it can be inconsistent", "Passionately and directly", "With loyalty, devotion, and physical comfort"],
        prakriti: ["Vata", "Pitta", "Kapha"]
    },
    {
        part: "Part III: Psychological & Emotional Traits",
        question: "What is your relationship with the past?",
        options: ["I tend to forget the past and live in the moment", "I learn from the past to achieve future goals", "I hold on to memories and can be sentimental"],
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
  const [fileName, setFileName] = useState('');
  const { toast } = useToast();

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
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
        }
    };
    
    const handleUpload = () => {
        if (fileName) {
            toast({
                title: "Certificate Uploaded",
                description: `${fileName} has been saved to your profile.`,
            });
        } else {
            toast({
                title: "No file selected",
                description: "Please choose a file to upload.",
                variant: "destructive",
            });
        }
    };

  if (result) {
    const info = prakritiInfo[result as keyof typeof prakritiInfo];
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
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

  const parts = questions.reduce((acc, q) => {
      if (!acc[q.part]) {
          acc[q.part] = [];
      }
      acc[q.part].push(q);
      return acc;
  }, {} as Record<string, typeof questions>);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
       <div>
        <h1 className="text-3xl font-headline font-bold">
          PrakritiScan (प्रकृति स्कैन)
        </h1>
        <p className="text-muted-foreground">
            Answer these questions to discover your Ayurvedic body constitution
            (dosha). For the most accurate result, answer based on your lifelong tendencies, not just how you feel today.
        </p>
      </div>

       <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Disclaimer</AlertTitle>
          <AlertDescription>
            The results from this test are indicative and intended for educational purposes only. For an accurate diagnosis and personalized advice, please consult a qualified Ayurvedic practitioner.
          </AlertDescription>
        </Alert>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileCheck2 className="w-6 h-6 text-primary" />
                    Upload Certificate
                </CardTitle>
                <CardDescription>
                    Already have a Prakriti Parikshan certificate? Upload it here to save it to your profile.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                    <Input id="certificate-upload" type="file" onChange={handleFileChange} className="flex-1" />
                </div>
                 {fileName && <p className="text-sm text-muted-foreground">Selected file: {fileName}</p>}
            </CardContent>
            <CardFooter>
                 <Button className="w-full" onClick={handleUpload}>
                    <Upload className="mr-2" /> Upload and Save
                 </Button>
            </CardFooter>
        </Card>

      <Card>
        <CardContent className="space-y-12 p-6">
          {Object.entries(parts).map(([partName, partQuestions]) => (
            <div key={partName}>
                <div className="mb-6">
                    <h2 className="text-2xl font-headline font-semibold">{partName}</h2>
                    <Separator className="mt-2" />
                </div>
                <div className="space-y-8">
                {partQuestions.map((q, index) => {
                    const globalIndex = questions.indexOf(q);
                    return (
                        <div key={globalIndex} className="space-y-4 p-4 border rounded-lg bg-background">
                        <h3 className="font-semibold text-lg">{`${
                            globalIndex + 1
                        }. ${q.question}`}</h3>
                        <RadioGroup
                            onValueChange={(value) => handleAnswerChange(globalIndex, value)}
                            className="space-y-2"
                        >
                            {q.options.map((option) => (
                            <div key={option} className="flex items-center space-x-2">
                                <RadioGroupItem value={option} id={`q${globalIndex}-${option}`} />
                                <Label htmlFor={`q${globalIndex}-${option}`}>{option}</Label>
                            </div>
                            ))}
                        </RadioGroup>
                        </div>
                    );
                })}
                </div>
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
