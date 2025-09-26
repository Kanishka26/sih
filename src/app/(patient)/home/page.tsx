'use client';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  HeartPulse,
  Scale,
  ClipboardEdit,
  ChefHat,
  BookOpen,
  ClipboardList,
  SunSnow,
  Stethoscope,
  Camera,
  LayoutDashboard,
  ArrowRight,
  Wind,
  Flame,
  Leaf,
} from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const features = [
  { href: '/dashboard', label: {en: 'Dashboard', hi: 'डैशबोर्ड'}, icon: LayoutDashboard, description: 'View your personalized health summary and widgets.' },
  { href: '/prakriti-scan', label: {en: 'PrakritiScan', hi: 'प्रकृति स्कैन'}, icon: HeartPulse, description: 'Discover your unique Ayurvedic body constitution (dosha).' },
  { href: '/rasa-balance', label: {en: 'RasaBalance', hi: 'रस संतुलन'}, icon: Scale, description: 'Analyze the six tastes in your meals to maintain balance.' },
  { href: '/diet-genie', label: {en: 'DietGenie', hi: 'आहार जिन्न'}, icon: ClipboardEdit, description: 'Instantly generate a personalized Ayurvedic diet chart.' },
  { href: '/recipe-guru', label: {en: 'RecipeGuru', hi: 'विधान गुरु'}, icon: ChefHat, description: 'Explore a vast library of healthy and delicious recipes.' },
  { href: '/nutrient-vault', label: {en: 'NutrientVault', hi: 'पोषण भंडार'}, icon: BookOpen, description: 'Look up foods to see their nutritional and Ayurvedic properties.' },
  { href: '/health-log', label: {en: 'HealthLog', hi: 'स्वास्थ्य लॉग'}, icon: ClipboardList, description: 'Keep a daily log of your meals, symptoms, and habits.' },
  { href: '/seasonal-bhojan', label: {en: 'SeasonalBhojan', hi: 'ऋतु आहार'}, icon: SunSnow, description: 'Get food recommendations based on the current season.' },
  { href: '/dietician-connect', label: {en: 'Dietician Connect', hi: 'आहार विशेषज्ञ से जुड़ें'}, icon: Stethoscope, description: 'Chat with expert dieticians for professional advice.' },
  { href: '/nutriscan', label: {en: 'NutriScan', hi: 'पोषण स्कैन'}, icon: Camera, description: 'Analyze your meal\'s nutrition by simply taking a photo.' },
];

const doshas = [
    {
        name: "Vata",
        icon: Wind,
        textColor: "text-teal-500",
        bgColor: "bg-teal-500",
        description: "The energy of movement, composed of Space and Air. It governs breathing, muscle movement, and nerve impulses.",
        symptoms: ["Dry skin and hair", "Constipation and gas", "Anxiety and restlessness", "Light, interrupted sleep", "Dislike of cold and wind"]
    },
    {
        name: "Pitta",
        icon: Flame,
        textColor: "text-rose-500",
        bgColor: "bg-rose-500",
        description: "The energy of digestion and metabolism, composed of Fire and Water. It governs digestion, absorption, and body temperature.",
        symptoms: ["Acidity and heartburn", "Skin rashes and acne", "Irritability and impatience", "Sharp, excessive hunger", "Dislike of heat"]
    },
    {
        name: "Kapha",
        icon: Leaf,
        textColor: "text-yellow-500",
        bgColor: "bg-yellow-500",
        description: "The energy of lubrication and structure, composed of Earth and Water. It governs immunity, strength, and stability.",
        symptoms: ["Weight gain", "Congestion and allergies", "Lethargy and sluggishness", "Oily skin and hair", "Slow digestion"]
    }
];

export default function HomePage() {
  const { t } = useLanguage();
  const router = useRouter();


  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold">Welcome to AhaarSetu</h1>
        <p className="text-muted-foreground text-lg mt-2">
          Your comprehensive guide to Ayurvedic wellness.
        </p>
      </div>

       <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6 text-center">
          <blockquote className="text-xl italic text-primary-foreground/90">
            “When diet is wrong, medicine is of no use. When diet is correct, medicine is of no need.”
          </blockquote>
          <p className="text-sm text-muted-foreground mt-2">- Ayurvedic Proverb</p>
        </CardContent>
      </Card>
      
      <div className="space-y-6">
        <h2 className="text-3xl font-headline font-bold text-center">Understanding the Doshas</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {doshas.map((dosha) => (
                <Card key={dosha.name} className="flex flex-col">
                    <CardHeader className="items-center text-center">
                        <div className="p-3 bg-primary/10 rounded-full">
                           <dosha.icon className={cn("w-10 h-10", dosha.textColor)} />
                        </div>
                        <CardTitle className="mt-2">{dosha.name}</CardTitle>
                        <CardDescription className="text-center">{dosha.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <h4 className="font-semibold mb-3 text-center">Common Characteristics</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            {dosha.symptoms.map(symptom => (
                                <li key={symptom} className="flex items-center gap-2">
                                    <div className={cn("w-1.5 h-1.5 rounded-full", dosha.bgColor)} />
                                    <span>{symptom}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            ))}
         </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-headline font-bold text-center">Explore Our Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
            <Card key={feature.href} className="flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader className="flex-row items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                    <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <CardTitle>{t(feature.label)}</CardTitle>
                </div>
                </CardHeader>
                <CardContent className="flex-1">
                <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
                <CardFooter>
                <Button asChild className="w-full">
                    <Link href={feature.href}>
                    Go to {t(feature.label)}
                    <ArrowRight className="ml-2"/>
                    </Link>
                </Button>
                </CardFooter>
            </Card>
            ))}
        </div>
      </div>

    </div>
  );
}