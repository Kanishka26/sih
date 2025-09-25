
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
import { useState, useEffect, useMemo } from 'react';
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

const RECIPES_PER_PAGE = 9;

export default function RecipeGuruPage() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchRecipes() {
      setLoading(true);
      try {
        const listRes = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian');
        const listData = await listRes.json();
        
        const recipeStubs = listData.meals || [];

        // Fetch details for all meals
        const recipePromises = recipeStubs.map((meal: { idMeal: string }) =>
          fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`).then(res => res.json())
        );
        
        const results = await Promise.all(recipePromises);
        const recipesFromApi = results.map(result => result.meals[0]).filter(Boolean);

        setAllRecipes(recipesFromApi);

      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRecipes();
  }, []);

  const filteredRecipes = useMemo(() => {
    return allRecipes.filter(recipe =>
        recipe.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allRecipes, searchTerm]);

  const totalPages = Math.ceil(filteredRecipes.length / RECIPES_PER_PAGE);

  const currentRecipes = useMemo(() => {
    const startIndex = (currentPage - 1) * RECIPES_PER_PAGE;
    const endIndex = startIndex + RECIPES_PER_PAGE;
    return filteredRecipes.slice(startIndex, endIndex);
  }, [filteredRecipes, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);
  
  const getIngredients = (recipe: Recipe) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredientKey = `strIngredient${i}` as keyof Recipe;
        const measureKey = `strMeasure${i}` as keyof Recipe;
        const ingredient = recipe[ingredientKey];
        const measure = recipe[measureKey];
        if (ingredient && ingredient.trim() !== '') {
            ingredients.push(`${measure ? measure.trim() : ''} ${ingredient.trim()}`.trim());
        }
    }
    return ingredients;
  }

  const recipeDialogContent = selectedRecipe && (
     <ScrollArea className="max-h-[90vh]">
        <div className="p-6">
            <DialogHeader className="mb-4">
                <DialogTitle className="text-3xl font-headline">
                    {selectedRecipe.strMeal}
                </DialogTitle>
                <DialogDescription>
                    {selectedRecipe.strArea && <Badge variant="secondary" className="mr-2">{selectedRecipe.strArea}</Badge>}
                    {selectedRecipe.strCategory && <Badge variant="outline">{selectedRecipe.strCategory}</Badge>}
                </DialogDescription>
            </DialogHeader>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="relative aspect-video">
                        <Image
                            src={selectedRecipe.strMealThumb}
                            alt={selectedRecipe.strMeal}
                            data-ai-hint={`${selectedRecipe.strCategory} dish`}
                            fill
                            className="object-cover rounded-md"
                        />
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg mb-2">Ingredients</h4>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                          {getIngredients(selectedRecipe).map((ing, i) => (
                            <li key={i}>{ing}</li>
                          ))}
                        </ul>
                    </div>
                </div>
                <div className="space-y-4">
                    <h4 className="font-semibold text-lg mb-2">Instructions</h4>
                    <div className="text-muted-foreground space-y-3 whitespace-pre-wrap">
                      {selectedRecipe.strInstructions}
                    </div>
                </div>
            </div>
        </div>
      </ScrollArea>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">
          RecipeGuru (विधान गुरु)
        </h1>
        <p className="text-muted-foreground">
          Discover recipes from a curated database of vegetarian foods.
        </p>
      </div>

      <div className="relative max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search for recipes..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
      </div>

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
            currentRecipes.map((recipe) => (
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
                      {recipe.strCategory && <Badge
                          variant="secondary"
                          className="mb-2 capitalize"
                      >
                          {recipe.strCategory}
                      </Badge>}
                      <h3 className="font-semibold text-lg">
                          {recipe.strMeal}
                      </h3>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">
                          {recipe.strArea}
                      </p>
                      </CardFooter>
                  </Card>
                  </div>
              ))
          )}
      </div>
      {!loading && filteredRecipes.length === 0 && (
          <div className="text-center text-muted-foreground py-12">
              <p className="text-lg font-semibold">No Recipes Found</p>
              <p>Try adjusting your search term.</p>
          </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}


      <Dialog
        open={!!selectedRecipe}
        onOpenChange={() => setSelectedRecipe(null)}
      >
        <DialogContent className="sm:max-w-4xl p-0 bg-card text-card-foreground">
          {recipeDialogContent}
        </DialogContent>
      </Dialog>
    </div>
  );
}
