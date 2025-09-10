'use client';

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
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

type Recipe = {
  mood: string;
  title: string;
  rasa: string;
  image: string;
  dataAiHint: string;
  description: string;
  ingredients: string[];
  instructions: string[];
};

const moods = ['All', 'Calming', 'Crunchy', 'Aromatic', 'Grounding', 'Energizing'];

const recipes: Recipe[] = [
  { 
    mood: 'Calming', 
    title: 'Soothing Mung Dal Soup', 
    rasa: 'Sweet, Salty', 
    image: 'https://picsum.photos/400/300?random=1', 
    dataAiHint: 'dal soup',
    description: 'A light and nourishing soup, perfect for calming the digestive system and promoting a sense of well-being.',
    ingredients: ['1 cup Yellow Mung Dal', '4 cups Water', '1 tsp Ghee', '1/2 tsp Turmeric', 'Pinch of Asafoetida (Hing)', 'Salt to taste'],
    instructions: ['Rinse dal and soak for 30 minutes.', 'In a pot, heat ghee and add hing and turmeric.', 'Add dal and water, bring to a boil.', 'Simmer until dal is soft, then add salt.']
  },
  { 
    mood: 'Grounding', 
    title: 'Hearty Root Vegetable Stew', 
    rasa: 'Sweet, Astringent', 
    image: 'https://picsum.photos/400/300?random=2', 
    dataAiHint: 'vegetable stew',
    description: 'A warm and substantial stew made with root vegetables to help you feel centered and grounded.',
    ingredients: ['1 cup cubed Carrots', '1 cup cubed Sweet Potatoes', '1/2 cup Green Beans', '1 tsp Ginger, grated', 'Cumin seeds, Coriander powder', '4 cups Vegetable Broth'],
    instructions: ['Sauté spices in a little oil.', 'Add vegetables and stir for a few minutes.', 'Pour in broth and simmer until vegetables are tender.']
  },
  { 
    mood: 'Aromatic', 
    title: 'Spiced Turmeric-Ginger Tea', 
    rasa: 'Pungent, Bitter', 
    image: 'https://picsum.photos/400/300?random=3', 
    dataAiHint: 'herbal tea',
    description: 'An aromatic and invigorating tea that stimulates digestion and warms the body.',
    ingredients: ['1 inch Ginger, sliced', '1/2 tsp Turmeric powder', '1 Cinnamon stick', '2 cups Water', 'Honey to taste'],
    instructions: ['Boil all ingredients (except honey) for 10 minutes.', 'Strain and add honey before serving.']
  },
  { 
    mood: 'Crunchy', 
    title: 'Quinoa and Toasted Almond Salad', 
    rasa: 'Astringent, Sweet', 
    image: 'https://picsum.photos/400/300?random=4', 
    dataAiHint: 'quinoa salad',
    description: 'A refreshing and crunchy salad that is both satisfying and light.',
    ingredients: ['1 cup cooked Quinoa', '1/4 cup Toasted Almonds', '1/4 cup chopped Cucumber', 'Lemon juice, Olive oil', 'Fresh parsley'],
    instructions: ['Combine all ingredients in a bowl.', 'Dress with lemon juice and olive oil.', 'Toss well and serve.']
  },
  { 
    mood: 'Calming', 
    title: 'Warm Spiced Milk', 
    rasa: 'Sweet', 
    image: 'https://picsum.photos/400/300?random=5', 
    dataAiHint: 'spiced milk',
    description: 'A comforting and easy-to-digest drink that promotes restful sleep.',
    ingredients: ['1 cup Milk (dairy or non-dairy)', 'Pinch of Cardamom', 'Pinch of Nutmeg', '1 tsp Maple Syrup (optional)'],
    instructions: ['Gently warm the milk.', 'Stir in the spices and sweetener.', 'Serve warm before bedtime.']
  },
  { 
    mood: 'Grounding', 
    title: 'Baked Sweet Potato with Ghee', 
    rasa: 'Sweet', 
    image: 'https://picsum.photos/400/300?random=6', 
    dataAiHint: 'sweet potato',
    description: 'A simple, sweet, and satisfying dish that is nourishing and grounding for Vata dosha.',
    ingredients: ['1 large Sweet Potato', '1 tbsp Ghee', 'Pinch of Cinnamon'],
    instructions: ['Preheat oven to 400°F (200°C).', 'Pierce the sweet potato and bake for 45-60 minutes.', 'Slice open, drizzle with ghee, and sprinkle with cinnamon.']
  },
];

export default function RecipeGuruPage() {
  const [selectedMood, setSelectedMood] = useState('All');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const filteredRecipes = recipes.filter(recipe => {
    if (selectedMood === 'All') return true;
    return recipe.mood === selectedMood;
  });

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
          <Button
            key={mood}
            variant={selectedMood === mood ? 'default' : 'outline'}
            onClick={() => setSelectedMood(mood)}
            className="capitalize"
          >
            {mood}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <Card key={recipe.title} className="flex flex-col cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedRecipe(recipe)}>
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
              <Badge variant="secondary" className="mb-2 capitalize">{recipe.mood}</Badge>
              <h3 className="font-semibold text-lg">{recipe.title}</h3>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <p className="text-sm text-muted-foreground">Rasa: {recipe.rasa}</p>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedRecipe} onOpenChange={() => setSelectedRecipe(null)}>
        <DialogContent className="sm:max-w-[625px] h-[90vh] flex flex-col bg-card text-card-foreground">
            {selectedRecipe && (
                <>
                    <DialogHeader>
                        <div className="relative aspect-video mb-4">
                             <Image
                                src={selectedRecipe.image}
                                alt={selectedRecipe.title}
                                data-ai-hint={selectedRecipe.dataAiHint}
                                fill
                                className="object-cover rounded-md"
                            />
                        </div>
                        <DialogTitle className="text-2xl font-headline">{selectedRecipe.title}</DialogTitle>
                        <DialogDescription>{selectedRecipe.description}</DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="flex-1 pr-6">
                        <div className="grid gap-4 py-4">
                            <div>
                                <h4 className="font-semibold mb-2">Ingredients</h4>
                                <ul className="list-disc list-inside text-muted-foreground">
                                    {selectedRecipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">Instructions</h4>
                                 <ol className="list-decimal list-inside text-muted-foreground space-y-1">
                                    {selectedRecipe.instructions.map(inst => <li key={inst}>{inst}</li>)}
                                </ol>
                            </div>
                        </div>
                    </ScrollArea>
                </>
            )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
