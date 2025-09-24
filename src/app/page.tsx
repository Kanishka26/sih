'use client';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
} from 'lucide-react';

const features = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    description: 'Your personal wellness overview.',
    icon: <LayoutDashboard className="h-10 w-10 text-primary" />,
  },
  {
    href: '/prakriti-scan',
    label: 'PrakritiScan',
    description: 'Discover your Ayurvedic body type.',
    icon: <HeartPulse className="h-10 w-10 text-primary" />,
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
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold">
          Welcome to AhaarSetu
        </h1>
        <p className="text-lg text-muted-foreground">
          Your modern companion for an Ayurvedic lifestyle.
        </p>
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
  );
}
