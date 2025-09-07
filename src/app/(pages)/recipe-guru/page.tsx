import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const moods = ['Calming', 'Crunchy', 'Aromatic', 'Grounding'];

const recipes = [
  { mood: 'Calming', title: 'Soothing Mung Dal Soup', rasa: 'Sweet, Salty', image: 'https://picsum.photos/400/300?random=1', dataAiHint: 'dal soup' },
  { mood: 'Grounding', title: 'Hearty Root Vegetable Stew', rasa: 'Sweet, Astringent', image: 'https://picsum.photos/400/300?random=2', dataAiHint: 'vegetable stew' },
  { mood: 'Aromatic', title: 'Spiced Turmeric-Ginger Tea', rasa: 'Pungent, Bitter', image: 'https://picsum.photos/400/300?random=3', dataAiHint: 'herbal tea' },
  { mood: 'Crunchy', title: 'Quinoa and Toasted Almond Salad', rasa: 'Astringent, Sweet', image: 'https://picsum.photos/400/300?random=4', dataAiHint: 'quinoa salad' },
  { mood: 'Calming', title: 'Warm Spiced Milk', rasa: 'Sweet', image: 'https://picsum.photos/400/300?random=5', dataAiHint: 'spiced milk' },
  { mood: 'Grounding', title: 'Baked Sweet Potato with Ghee', rasa: 'Sweet', image: 'https://picsum.photos/400/300?random=6', dataAiHint: 'sweet potato' },
];

export default function RecipeGuruPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">
          RecipeGuru (विधान गुरु)
        </h1>
        <p className="text-muted-foreground">
          Discover recipes based on your mood and Ayurvedic principles.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {moods.map((mood) => (
          <Button key={mood} variant="outline">
            {mood}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <Card key={recipe.title} className="flex flex-col">
            <CardHeader className="p-0">
              <div className="relative aspect-video">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  data-ai-hint={recipe.dataAiHint}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4 flex-1">
              <Badge variant="secondary" className="mb-2">{recipe.mood}</Badge>
              <h3 className="font-semibold text-lg">{recipe.title}</h3>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <p className="text-sm text-muted-foreground">Rasa: {recipe.rasa}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
