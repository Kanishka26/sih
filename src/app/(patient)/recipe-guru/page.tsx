
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
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ChevronLeft, ChevronRight, Clock, Users, Plus } from 'lucide-react';
import { recipeAPI, type Recipe } from '@/lib/recipe-api';
import { useUser } from '@/context/user-context';

const RECIPES_PER_PAGE = 12;

export default function RecipeGuruPage() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searching, setSearching] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    async function fetchInitialRecipes() {
      setLoading(true);
      try {
        // Get Ayurvedic recipes based on user's prakriti if available
        if (user?.prakriti) {
          const ayurvedicRecipes = await recipeAPI.getAyurvedicRecipes(user.prakriti);
          setAllRecipes(ayurvedicRecipes);
        } else {
          // Default to vegetarian recipes
          const defaultRecipes = await recipeAPI.getVegetarianRecipes();
          setAllRecipes(defaultRecipes);
        }
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchInitialRecipes();
  }, [user?.prakriti]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setSearching(true);
    setCurrentPage(1);
    
    try {
      const searchResults = await recipeAPI.searchRecipes(searchTerm);
      setAllRecipes(searchResults);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setSearching(false);
    }
  };

  const loadMoreRecipes = async () => {
    setLoadingMore(true);
    try {
      // Get additional vegetarian recipes
      const moreRecipes = await recipeAPI.getVegetarianRecipes();
      
      // Filter out recipes we already have
      const newRecipes = moreRecipes.filter(newRecipe => 
        !allRecipes.some(existing => existing.id === newRecipe.id)
      );
      
      setAllRecipes(prev => [...prev, ...newRecipes]);
    } catch (error) {
      console.error("Failed to load more recipes:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  const filteredRecipes = useMemo(() => {
    return allRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
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
    return recipe.ingredients || [];
  }

  const recipeDialogContent = selectedRecipe && (
     <ScrollArea className="max-h-[90vh]">
        <div className="p-6">
            <DialogHeader className="mb-4">
                <DialogTitle className="text-3xl font-headline">
                    {selectedRecipe.title}
                </DialogTitle>
                <DialogDescription className="flex flex-wrap gap-2 mt-2">
                    {selectedRecipe.category && (
                      <Badge variant="secondary">
                        {selectedRecipe.category}
                      </Badge>
                    )}
                    {selectedRecipe.area && (
                      <Badge variant="outline">
                        {selectedRecipe.area} Cuisine
                      </Badge>
                    )}
                    <Badge variant="secondary" className="text-green-600">
                      ✓ Vegetarian
                    </Badge>
                    {selectedRecipe.ayurvedicProperties && (
                      <>
                        {selectedRecipe.ayurvedicProperties.vata === 'decrease' && (
                          <Badge variant="outline" className="text-green-600">
                            Balances Vata
                          </Badge>
                        )}
                        {selectedRecipe.ayurvedicProperties.pitta === 'decrease' && (
                          <Badge variant="outline" className="text-blue-600">
                            Balances Pitta
                          </Badge>
                        )}
                        {selectedRecipe.ayurvedicProperties.kapha === 'decrease' && (
                          <Badge variant="outline" className="text-orange-600">
                            Balances Kapha
                          </Badge>
                        )}
                      </>
                    )}
                    {selectedRecipe.tags && selectedRecipe.tags.slice(0, 3).map((tag, i) => (
                      <Badge key={i} variant="secondary">{tag}</Badge>
                    ))}
                </DialogDescription>
            </DialogHeader>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="relative aspect-video">
                        <Image
                            src={selectedRecipe.image}
                            alt={selectedRecipe.title}
                            data-ai-hint={`${selectedRecipe.title} recipe`}
                            fill
                            className="object-cover rounded-md"
                        />
                    </div>
                    
                    {selectedRecipe.ayurvedicProperties && (
                      <div className="bg-muted p-4 rounded-md">
                        <h4 className="font-semibold mb-2">Ayurvedic Properties</h4>
                        <div className="space-y-2 text-sm">
                          {selectedRecipe.ayurvedicProperties.vata === 'decrease' && (
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                              <span>Helps balance Vata dosha (reduces dryness, promotes grounding)</span>
                            </div>
                          )}
                          {selectedRecipe.ayurvedicProperties.pitta === 'decrease' && (
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                              <span>Helps balance Pitta dosha (cooling, reduces inflammation)</span>
                            </div>
                          )}
                          {selectedRecipe.ayurvedicProperties.kapha === 'decrease' && (
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                              <span>Helps balance Kapha dosha (stimulating, reduces sluggishness)</span>
                            </div>
                          )}
                          {!selectedRecipe.ayurvedicProperties.vata && !selectedRecipe.ayurvedicProperties.pitta && !selectedRecipe.ayurvedicProperties.kapha && (
                            <div className="text-muted-foreground">
                              Tridoshic - Generally balancing for all doshas
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
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
                      {selectedRecipe.instructions}
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
          Discover authentic vegetarian recipes aligned with Ayurvedic principles for your dosha balance.
        </p>
      </div>

      <div className="flex gap-2 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for recipes (e.g., 'dal', 'biryani', 'curry')..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button 
            onClick={handleSearch} 
            disabled={searching || !searchTerm.trim()}
            className="shrink-0"
          >
            {searching ? 'Searching...' : 'Search'}
          </Button>
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
              <div key={recipe.id} className="h-full">
                  <Card
                      className="flex flex-col cursor-pointer hover:shadow-lg transition-shadow h-full"
                      onClick={() => setSelectedRecipe(recipe)}
                  >
                      <CardHeader className="p-0">
                      <div className="relative aspect-video">
                          <Image
                          src={recipe.image}
                          alt={recipe.title}
                          data-ai-hint={`${recipe.title} recipe`}
                          fill
                          className="object-cover rounded-t-lg"
                          />
                      </div>
                      </CardHeader>
                      <CardContent className="p-4 flex-1">
                        <div className="flex flex-wrap gap-1 mb-2">
                          {recipe.category && (
                            <Badge variant="secondary" className="text-xs">
                              {recipe.category}
                            </Badge>
                          )}
                          {recipe.area && (
                            <Badge variant="outline" className="text-xs">
                              {recipe.area}
                            </Badge>
                          )}
                          <Badge variant="secondary" className="text-xs">
                            Vegetarian ✓
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-lg line-clamp-2">
                            {recipe.title}
                        </h3>
                        {recipe.ayurvedicProperties && (
                          <div className="flex gap-1 mt-2">
                            {recipe.ayurvedicProperties.vata === 'decrease' && (
                              <Badge variant="outline" className="text-xs text-green-600">
                                Vata ↓
                              </Badge>
                            )}
                            {recipe.ayurvedicProperties.pitta === 'decrease' && (
                              <Badge variant="outline" className="text-xs text-blue-600">
                                Pitta ↓
                              </Badge>
                            )}
                            {recipe.ayurvedicProperties.kapha === 'decrease' && (
                              <Badge variant="outline" className="text-xs text-orange-600">
                                Kapha ↓
                              </Badge>
                            )}
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <div className="flex flex-wrap gap-1">
                          {recipe.tags?.slice(0, 2).map((tag, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
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

      {/* Load More Button */}
      <div className="flex justify-center pt-6">
        <Button
          variant="outline"
          onClick={loadMoreRecipes}
          disabled={loadingMore}
          className="px-8 py-2 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50"
        >
          {loadingMore ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
              Loading More Recipes...
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Load More Ayurvedic Recipes
            </>
          )}
        </Button>
      </div>


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
