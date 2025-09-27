/**
 * Ayurvedic Recipe API integration for AhaarSetu
 * Focused on vegetarian, Ayurvedic-appropriate recipes
 */

// TheMealDB API - Vegetarian recipes only
export interface MealDBRecipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags?: string;
  strYoutube?: string;
  [key: string]: string | undefined;
}

export interface Recipe {
  id: string;
  title: string;
  image: string;
  category?: string;
  area?: string;
  instructions: string;
  ingredients: string[];
  tags?: string[];
  youtube?: string;
  ayurvedicProperties?: {
    vata?: 'increase' | 'decrease' | 'neutral';
    pitta?: 'increase' | 'decrease' | 'neutral';
    kapha?: 'increase' | 'decrease' | 'neutral';
  };
  source: 'mealdb' | 'ayurvedic';
}

class RecipeAPIService {
  private readonly MEALDB_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

  /**
   * Get vegetarian recipes from multiple categories
   */
  async getVegetarianRecipes(): Promise<Recipe[]> {
    try {
      const allRecipes: Recipe[] = [];
      
      // Fetch from multiple vegetarian-friendly categories
      const categories = ['Vegetarian', 'Dessert', 'Side', 'Starter'];
      
      for (const category of categories) {
        const response = await fetch(`${this.MEALDB_BASE_URL}/filter.php?c=${category}`);
        const data = await response.json();
        
        if (data.meals) {
          // Get detailed info for recipes from this category
          const detailedRecipes = await Promise.all(
            data.meals.slice(0, 15).map(async (meal: any) => {
              const detailResponse = await fetch(`${this.MEALDB_BASE_URL}/lookup.php?i=${meal.idMeal}`);
              const detailData = await detailResponse.json();
              if (detailData.meals && this.isVegetarianAppropriate(detailData.meals[0])) {
                return this.transformMealDBRecipe(detailData.meals[0]);
              }
              return null;
            })
          );
          
          const validRecipes = detailedRecipes.filter(recipe => recipe !== null) as Recipe[];
          allRecipes.push(...validRecipes);
        }
      }
      
      // Also get recipes by vegetarian-friendly areas
      const areas = ['Indian', 'British', 'Italian', 'Thai', 'Mexican'];
      for (const area of areas) {
        const response = await fetch(`${this.MEALDB_BASE_URL}/filter.php?a=${area}`);
        const data = await response.json();
        
        if (data.meals) {
          const detailedRecipes = await Promise.all(
            data.meals.slice(0, 8).map(async (meal: any) => {
              const detailResponse = await fetch(`${this.MEALDB_BASE_URL}/lookup.php?i=${meal.idMeal}`);
              const detailData = await detailResponse.json();
              if (detailData.meals && this.isVegetarianAppropriate(detailData.meals[0])) {
                return this.transformMealDBRecipe(detailData.meals[0]);
              }
              return null;
            })
          );
          
          const validRecipes = detailedRecipes.filter(recipe => recipe !== null) as Recipe[];
          allRecipes.push(...validRecipes);
        }
      }
      
      // Remove duplicates and return
      const uniqueRecipes = allRecipes.filter((recipe, index, self) => 
        index === self.findIndex(r => r.id === recipe.id)
      );
      
      return uniqueRecipes.slice(0, 60); // Return up to 60 unique recipes
    } catch (error) {
      console.error('MealDB API error:', error);
      return [];
    }
  }

  /**
   * Search vegetarian recipes by name
   */
  async searchVegetarianRecipes(query: string): Promise<Recipe[]> {
    try {
      const response = await fetch(`${this.MEALDB_BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      if (!data.meals) return [];
      
      // Filter for vegetarian-appropriate recipes
      const vegetarianMeals = data.meals.filter((meal: MealDBRecipe) => 
        this.isVegetarianAppropriate(meal)
      );
      
      return vegetarianMeals.map((meal: MealDBRecipe) => this.transformMealDBRecipe(meal));
    } catch (error) {
      console.error('MealDB search error:', error);
      return [];
    }
  }

  /**
   * Get recipes by Ayurvedic ingredient
   */
  async searchByAyurvedicIngredient(ingredient: string): Promise<Recipe[]> {
    try {
      const response = await fetch(`${this.MEALDB_BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`);
      const data = await response.json();
      
      if (!data.meals) return [];
      
      // Get detailed info for each recipe and filter for vegetarian
      const detailedRecipes = await Promise.all(
        data.meals.slice(0, 10).map(async (meal: any) => {
          const detailResponse = await fetch(`${this.MEALDB_BASE_URL}/lookup.php?i=${meal.idMeal}`);
          const detailData = await detailResponse.json();
          if (detailData.meals && this.isVegetarianAppropriate(detailData.meals[0])) {
            return this.transformMealDBRecipe(detailData.meals[0]);
          }
          return null;
        })
      );
      
      return detailedRecipes.filter(recipe => recipe !== null) as Recipe[];
    } catch (error) {
      console.error('MealDB ingredient search error:', error);
      return [];
    }
  }

  /**
   * Main search function for Ayurvedic recipes
   */
  async searchRecipes(query: string): Promise<Recipe[]> {
    // Try direct search first
    const directResults = await this.searchVegetarianRecipes(query);
    
    // If we have good results, return them
    if (directResults.length >= 3) {
      return directResults;
    }
    
    // Try ingredient search as fallback
    const ingredientResults = await this.searchByAyurvedicIngredient(query);
    
    // Combine and deduplicate
    const allResults = [...directResults, ...ingredientResults];
    const uniqueResults = allResults.filter((recipe, index, self) => 
      index === self.findIndex(r => r.id === recipe.id)
    );
    
    return uniqueResults.slice(0, 12);
  }

  /**
   * Get Ayurvedic recipe suggestions based on prakriti
   */
  async getAyurvedicRecipes(prakriti: string): Promise<Recipe[]> {
    const ayurvedicIngredients = this.getAyurvedicIngredients(prakriti);
    const allRecipes: Recipe[] = [];
    
    // Get more recipes by expanding ingredient search
    for (const ingredient of ayurvedicIngredients) {
      const recipes = await this.searchByAyurvedicIngredient(ingredient);
      allRecipes.push(...recipes.slice(0, 4)); // Get more recipes per ingredient
    }
    
    // Also get general vegetarian recipes to supplement
    const generalRecipes = await this.getVegetarianRecipesByIngredients([
      'rice', 'lentils', 'vegetables', 'spices', 'coconut', 'ginger', 'turmeric'
    ]);
    allRecipes.push(...generalRecipes);
    
    // Remove duplicates and return
    const uniqueRecipes = allRecipes.filter((recipe, index, self) => 
      index === self.findIndex(r => r.id === recipe.id)
    );
    
    return uniqueRecipes.slice(0, 40); // Return more recipes
  }

  /**
   * Get vegetarian recipes by common ingredients
   */
  async getVegetarianRecipesByIngredients(ingredients: string[]): Promise<Recipe[]> {
    const allRecipes: Recipe[] = [];
    
    for (const ingredient of ingredients.slice(0, 4)) {
      try {
        const response = await fetch(`${this.MEALDB_BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`);
        const data = await response.json();
        
        if (data.meals) {
          const detailedRecipes = await Promise.all(
            data.meals.slice(0, 6).map(async (meal: any) => {
              const detailResponse = await fetch(`${this.MEALDB_BASE_URL}/lookup.php?i=${meal.idMeal}`);
              const detailData = await detailResponse.json();
              if (detailData.meals && this.isVegetarianAppropriate(detailData.meals[0])) {
                return this.transformMealDBRecipe(detailData.meals[0]);
              }
              return null;
            })
          );
          
          const validRecipes = detailedRecipes.filter(recipe => recipe !== null) as Recipe[];
          allRecipes.push(...validRecipes);
        }
      } catch (error) {
        console.error(`Error fetching recipes for ${ingredient}:`, error);
      }
    }
    
    return allRecipes;
  }

  /**
   * Check if a meal is appropriate for vegetarian Ayurvedic diet
   */
  private isVegetarianAppropriate(meal: MealDBRecipe): boolean {
    const title = meal.strMeal.toLowerCase();
    const instructions = meal.strInstructions?.toLowerCase() || '';
    
    // Exclude obvious non-vegetarian items
    const nonVegKeywords = [
      'chicken', 'beef', 'pork', 'lamb', 'fish', 'salmon', 'tuna', 'shrimp', 
      'meat', 'bacon', 'ham', 'turkey', 'duck', 'crab', 'lobster', 'prawn',
      'mutton', 'goat', 'rabbit', 'venison'
    ];
    
    const hasNonVeg = nonVegKeywords.some(keyword => 
      title.includes(keyword) || instructions.includes(keyword)
    );
    
    return !hasNonVeg;
  }

  private transformMealDBRecipe(meal: MealDBRecipe): Recipe {
    // Extract ingredients from MealDB format
    const ingredients: string[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${measure || ''} ${ingredient}`.trim());
      }
    }

    return {
      id: meal.idMeal,
      title: meal.strMeal,
      image: meal.strMealThumb,
      category: meal.strCategory,
      area: meal.strArea,
      instructions: meal.strInstructions,
      ingredients,
      tags: meal.strTags ? meal.strTags.split(',').map(tag => tag.trim()) : [],
      youtube: meal.strYoutube,
      ayurvedicProperties: this.getAyurvedicProperties(meal.strMeal, ingredients),
      source: 'mealdb'
    };
  }

  /**
   * Determine Ayurvedic properties based on ingredients and recipe name
   */
  private getAyurvedicProperties(recipeName: string, ingredients: string[]): {
    vata?: 'increase' | 'decrease' | 'neutral';
    pitta?: 'increase' | 'decrease' | 'neutral';
    kapha?: 'increase' | 'decrease' | 'neutral';
  } {
    const title = recipeName.toLowerCase();
    const allIngredients = ingredients.join(' ').toLowerCase();
    
    let vata: 'increase' | 'decrease' | 'neutral' = 'neutral';
    let pitta: 'increase' | 'decrease' | 'neutral' = 'neutral';
    let kapha: 'increase' | 'decrease' | 'neutral' = 'neutral';
    
    // Vata balancing ingredients
    if (allIngredients.includes('ghee') || allIngredients.includes('rice') || 
        allIngredients.includes('ginger') || allIngredients.includes('cinnamon')) {
      vata = 'decrease';
    }
    
    // Pitta balancing ingredients
    if (allIngredients.includes('coconut') || allIngredients.includes('cucumber') || 
        allIngredients.includes('mint') || allIngredients.includes('cilantro')) {
      pitta = 'decrease';
    }
    
    // Kapha balancing ingredients
    if (allIngredients.includes('turmeric') || allIngredients.includes('pepper') || 
        allIngredients.includes('garlic') || title.includes('spicy')) {
      kapha = 'decrease';
    }
    
    return { vata, pitta, kapha };
  }

  private getAyurvedicIngredients(prakriti: string): string[] {
    const ingredientMap: Record<string, string[]> = {
      'Vata': [
        'rice', 'ghee', 'milk', 'ginger', 'cinnamon', 'almonds', 'oats', 'avocado', 
        'sweet potato', 'dates', 'sesame', 'cashews', 'cardamom', 'vanilla'
      ],
      'Pitta': [
        'coconut', 'cucumber', 'mint', 'fennel', 'cilantro', 'lime', 'rose', 
        'sweet fruits', 'lettuce', 'zucchini', 'melon', 'grapes', 'dill', 'parsley'
      ],
      'Kapha': [
        'turmeric', 'black pepper', 'ginger', 'garlic', 'spinach', 'kale', 
        'legumes', 'quinoa', 'barley', 'chili', 'mustard', 'cloves', 'coriander'
      ],
      'Vata-Pitta': [
        'rice', 'ghee', 'coconut', 'cilantro', 'fennel', 'cardamom', 'almonds', 
        'sweet fruits', 'oats', 'dates'
      ],
      'Pitta-Kapha': [
        'coconut', 'turmeric', 'spinach', 'cucumber', 'quinoa', 'mint', 
        'fennel', 'cilantro', 'lime'
      ],
      'Vata-Kapha': [
        'ginger', 'rice', 'turmeric', 'ghee', 'cinnamon', 'cardamom', 
        'garlic', 'black pepper'
      ],
      'Tridoshic': [
        'rice', 'ghee', 'turmeric', 'ginger', 'coconut', 'cilantro', 
        'fennel', 'cardamom', 'almonds', 'spinach'
      ]
    };

    return ingredientMap[prakriti] || ingredientMap['Tridoshic'];
  }
}

export const recipeAPI = new RecipeAPIService();