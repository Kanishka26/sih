
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
import { type Recipe } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';

const VEGETARIAN_CATEGORIES = ['Vegetarian', 'Side', 'Dessert', 'Miscellaneous'];

export default function RecipeGuruPage() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipes() {
      setLoading(true);
      try {
        const listRes = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian');
        const listData = await listRes.json();
        
        // Fetch details for all meals to get their categories
        const recipePromises = listData.meals.map((meal: { idMeal: string }) =>
          fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`).then(res => res.json())
        );
        
        const results = await Promise.all(recipePromises);
        const allRecipes = results.map(result => result.meals[0]).filter(Boolean);

        // Filter for vegetarian recipes
        const vegetarianRecipes = allRecipes.filter(recipe => 
            VEGETARIAN_CATEGORIES.includes(recipe.strCategory)
        );

        setRecipes(vegetarianRecipes);

      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRecipes();
  }, []);
  
  const getIngredients = (recipe: Recipe) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== '') {
            ingredients.push(`${measure ? measure.trim() : ''} ${ingredient.trim()}`.trim());
        }
    }
    return ingredients;
  }

  const recipeDialogContent = selectedRecipe && (
     <>
        <DialogHeader>
            <div className="relative aspect-video mb-4">
            <Image
                src={selectedRecipe.strMealThumb}
                alt={selectedRecipe.strMeal}
                data-ai-hint={`${selectedRecipe.strCategory} dish`}
                fill
                className="object-cover rounded-md"
            />
            </div>
            <DialogTitle className="text-2xl font-headline">
            {selectedRecipe.strMeal}
            </DialogTitle>
            <DialogDescription>
                <Badge variant="secondary" className="mr-2">{selectedRecipe.strArea}</Badge>
                <Badge variant="outline">{selectedRecipe.strCategory}</Badge>
            </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 pr-6">
            <div className="grid gap-4 py-4">
                <div>
                    <h4 className="font-semibold mb-2">Ingredients</h4>
                    <ul className="list-disc list-inside text-muted-foreground">
                      {getIngredients(selectedRecipe).map((ing, i) => (
                        <li key={i}>{ing}</li>
                      ))}
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-2">Instructions</h4>
                    <div className="text-muted-foreground space-y-3 whitespace-pre-wrap">
                      {selectedRecipe.strInstructions}
                    </div>
                </div>
            </div>
        </ScrollArea>
        </>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">
          RecipeGuru (विधान गुरु)
        </h1>
        <p className="text-muted-foreground">
          Discover recipes from a curated database of Indian foods.
        </p>
      </div>

      <div className="space-y-12">
        <div>
            <h2 className="text-2xl font-headline font-semibold mb-4 capitalize">
              Featured Recipes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading ? (
                    Array.from({length: 9}).map((_, index) => (
                        <div key={index} className="h-full">
                            <Card className="flex flex-col h-full">
                                 <CardHeader className="p-0">
                                    <Skeleton className="aspect-video w-full rounded-t-lg" />
                                 </CardHeader>
                                 <CardContent className="p-4 flex-1">
                                    <Skeleton className="h-4 w-1/4 mb-2"/>
                                    <Skeleton className="h-6 w-3/4"/>
                                 </CardContent>
                                 <CardFooter className="p-4 pt-0">
                                    <Skeleton className="h-4 w-1/2"/>
                                 </CardFooter>
                            </Card>
                        </div>
                    ))
                ) : (
                    recipes.map((recipe) => (
                    <div key={recipe.idMeal} className="h-full">
                        <Card
                            className="flex flex-col cursor-pointer hover:shadow-lg transition-shadow h-full"
                            onClick={() => setSelectedRecipe(recipe)}
                        >
                            <CardHeader className="p-0">
                            <div className="relative aspect-video">
                                <Image
                                src={recipe.strMealThumb}
                                alt={recipe.strMeal}
                                data-ai-hint={`${recipe.strCategory} food`}
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
                                {recipe.strCategory}
                            </Badge>
                            <h3 className="font-semibold text-lg">
                                {recipe.strMeal}
                            </h3>
                            </CardContent>
                            <CardFooter className="p-4 pt-0">
                            <p className="text-sm text-muted-foreground">
                                Area: {recipe.strArea}
                            </p>
                            </CardFooter>
                        </Card>
                        </div>
                    ))
                )}
            </div>
          </div>
      </div>

      <Dialog
        open={!!selectedRecipe}
        onOpenChange={() => setSelectedRecipe(null)}
      >
        <DialogContent className="sm:max-w-[625px] h-[90vh] flex flex-col bg-card text-card-foreground">
          {recipeDialogContent}
        </DialogContent>
      </Dialog>
    </div>
  );
}
