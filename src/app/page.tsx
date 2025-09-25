
'use client';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  HeartPulse,
  Scale,
  ClipboardEdit,
  ChefHat,
  BookOpen,
  ClipboardList,
  SunSnow,
  Stethoscope,
  Camera,
  Wind,
  Flame,
  Leaf,
  ArrowRight,
  Users,
} from 'lucide-react';
import { Logo } from '@/components/logo';

const features = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    description: 'Your personal wellness overview.',
    icon: <LayoutDashboard className="h-10 w-10 text-primary" />,
  },
  {
    href: '/rasa-balance',
    label: 'RasaBalance',
    description: 'Track the six tastes in your meals.',
    icon: <Scale className="h-10 w-10 text-primary" />,
  },
  {
    href: '/diet-genie',
    label: 'DietGenie',
    description: 'Generate a personalized diet chart.',
    icon: <ClipboardEdit className="h-10 w-10 text-primary" />,
  },
  {
    href: '/recipe-guru',
    label: 'RecipeGuru',
    description: 'Explore healthy Ayurvedic recipes.',
    icon: <ChefHat className="h-10 w-10 text-primary" />,
  },
  {
    href: '/nutrient-vault',
    label: 'NutrientVault',
    description: 'Browse our food database.',
    icon: <BookOpen className="h-10 w-10 text-primary" />,
  },
  {
    href: '/health-log',
    label: 'HealthLog',
    description: 'Log your daily habits and symptoms.',
    icon: <ClipboardList className="h-10 w-10 text-primary" />,
  },
  {
    href: '/seasonal-bhojan',
    label: 'SeasonalBhojan',
    description: 'Get seasonal food recommendations.',
    icon: <SunSnow className="h-10 w-10 text-primary" />,
  },
  {
    href: '/dietician-connect',
    label: 'Dietician Connect',
    description: 'Chat with expert dieticians.',
    icon: <Stethoscope className="h-10 w-10 text-primary" />,
  },
  {
    href: '/nutriscan',
    label: 'NutriScan',
    description: 'Analyze your meal from an image.',
    icon: <Camera className="h-10 w-10 text-primary" />,
  },
  {
    href: '/prakriti-scan',
    label: 'PrakritiScan',
    description: 'Discover your Ayurvedic body type.',
    icon: <HeartPulse className="h-10 w-10 text-primary" />,
  },
  {
    href: '/dietician-dashboard',
    label: 'Dietician Hub',
    description: 'Manage your patients and their progress.',
    icon: <Users className="h-10 w-10 text-primary" />,
  }
];

const doshas = [
    {
        name: "Vata (Air + Ether)",
        icon: <Wind className="w-10 h-10 text-primary" />,
        description: "Characterized by qualities of being light, cold, dry, and mobile. Vata types are often creative, energetic, and lively but can be prone to anxiety, dry skin, and irregular digestion."
    },
    {
        name: "Pitta (Fire + Water)",
        icon: <Flame className="w-10 h-10 text-primary" />,
        description: "Represents the energy of transformation and metabolism. Pitta individuals are typically sharp, intelligent, and driven, but can experience overheating, irritability, and skin inflammation."
    },
    {
        name: "Kapha (Earth + Water)",
        icon: <Leaf className="w-10 h-10 text-primary" />,
        description: "Embodies structure, stability, and lubrication. Kapha types are calm, loving, and steady, but may face challenges with weight gain, sluggishness, and congestion when out of balance."
    }
]

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 flex justify-between items-center border-b bg-background/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <Logo className="w-9 h-9 text-primary" />
          <span className="font-headline text-2xl font-bold tracking-tight">
            AhaarSetu
          </span>
        </div>
      </header>
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="space-y-12 max-w-7xl mx-auto">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-headline font-bold">
              Balance Your Body, Nourish Your Life
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              "When diet is wrong, medicine is of no use. When diet is correct, medicine is of no need." - Ayurvedic Proverb
            </p>
          </div>

          <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-headline font-bold">Discover Your Unique Constitution (Prakriti)</h2>
                <p className="text-muted-foreground mt-2">Ayurveda teaches that we are all made of a unique combination of three mind-body principles, or doshas.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {doshas.map(dosha => (
                <Card key={dosha.name} className="flex flex-col text-center">
                    <CardHeader>
                        <div className="mx-auto bg-primary/10 p-4 rounded-full mb-3 w-fit">
                            {dosha.icon}
                        </div>
                        <CardTitle>{dosha.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <p className="text-muted-foreground">{dosha.description}</p>
                    </CardContent>
                </Card>
              ))}
            </div>
             <div className="text-center">
                <Button asChild size="lg">
                    <Link href="/prakriti-scan">
                        Take the PrakritiScan Test Now <ArrowRight className="ml-2" />
                    </Link>
                </Button>
            </div>
          </div>

          <div className="space-y-8">
            <div className="text-center">
                 <h2 className="text-3xl font-headline font-bold">Explore Our Wellness Tools</h2>
                 <p className="text-muted-foreground mt-2">Everything you need for a balanced, Ayurvedic lifestyle.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {features.map((feature) => (
                <Link href={feature.href} key={feature.href} passHref>
                    <Card className="h-full flex flex-col hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <CardHeader className="flex-col items-center text-center">
                        <div className="p-4 bg-primary/10 rounded-full mb-3">
                        {feature.icon}
                        </div>
                        <CardTitle className="text-xl">{feature.label}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center text-muted-foreground flex-1">
                        <p>{feature.description}</p>
                    </CardContent>
                    </Card>
                </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t py-4 px-4 sm:px-6">
        <p className="text-center text-sm text-muted-foreground">
          🌿 AhaarSetu – Ayurveda Diet
        </p>
      </footer>
    </div>
  );
}
