
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
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { type Recipe } from '@/lib/data';

export default function RecipeGuruPage() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    async function fetchRecipes() {
      const res = await fetch('/api/recipes');
      const data = await res.json();
      setRecipes(data);
    }
    fetchRecipes();
  }, []);

  const recipesByMood = recipes.reduce((acc, recipe) => {
    if (!acc[recipe.mood]) {
      acc[recipe.mood] = [];
    }
    acc[recipe.mood].push(recipe);
    return acc;
  }, {} as Record<string, Recipe[]>);

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

      <div className="space-y-12">
        {Object.entries(recipesByMood).map(([mood, moodRecipes]) => (
          <div key={mood}>
            <h2 className="text-2xl font-headline font-semibold mb-4 capitalize">
              {mood} Recipes
            </h2>
            <Carousel
              opts={{
                align: 'start',
              }}
              className="w-full"
            >
              <CarouselContent>
                {moodRecipes.map((recipe, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                       <Card
                        className="flex flex-col cursor-pointer hover:shadow-lg transition-shadow h-full"
                        onClick={() => setSelectedRecipe(recipe)}
                      >
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
                          <Badge
                            variant="secondary"
                            className="mb-2 capitalize"
                          >
                            {recipe.mood}
                          </Badge>
                          <h3 className="font-semibold text-lg">
                            {recipe.title}
                          </h3>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          <p className="text-sm text-muted-foreground">
                            Rasa: {recipe.rasa}
                          </p>
                        </CardFooter>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        ))}
      </div>

      <Dialog
        open={!!selectedRecipe}
        onOpenChange={() => setSelectedRecipe(null)}
      >
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
                <DialogTitle className="text-2xl font-headline">
                  {selectedRecipe.title}
                </DialogTitle>
                <DialogDescription>
                  {selectedRecipe.description}
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="flex-1 pr-6">
                <div className="grid gap-4 py-4">
                  <div>
                    <h4 className="font-semibold mb-2">Ingredients</h4>
                    <ul className="list-disc list-inside text-muted-foreground">
                      {selectedRecipe.ingredients.map((ing) => (
                        <li key={ing}>{ing}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Instructions</h4>
                    <ol className="list-decimal list-inside text-muted-foreground space-y-1">
                      {selectedRecipe.instructions.map((inst) => (
                        <li key={inst}>{inst}</li>
                      ))}
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

