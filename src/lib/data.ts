
export type Food = {
  id: string;
  name: string;
  calories: number;
  rasa: string;
  guna: string;
  category: string;
  virya: 'Hot' | 'Cold';
  vipaka: 'Sweet' | 'Sour' | 'Pungent';
};

export type Recipe = {
  mood: string;
  title: string;
  rasa: string;
  image: string;
  dataAiHint: string;
  description: string;
  ingredients: string[];
  instructions: string[];
};

export type Patient = {
    id: string;
    name: string;
    age: number;
    gender: 'male' | 'female' | 'other';
    prakriti: 'Vata' | 'Pitta' | 'Kapha' | 'Vata-Pitta' | 'Pitta-Kapha' | 'Vata-Kapha' | 'Tridoshic';
    dietaryHabits: string;
    bowelHabits: 'normal' | 'constipated' | 'loose';
    allergies: string[];
};

export type DietChart = {
    id: string;
    patientId: string;
    healthGoals: string;
    chartContent: string;
    createdAt: string;
};

export type User = {
    id: string;
    name: string;
    email: string;
    password?: string;
    role: 'doctor' | 'dietitian' | 'staff' | 'patient';
    prakriti?: 'Vata' | 'Pitta' | 'Kapha' | 'Vata-Pitta' | 'Pitta-Kapha' | 'Vata-Kapha' | 'Tridoshic';
}

export let foodDatabase: Food[] = [
    { id: 'apple', name: 'Apple', calories: 95, rasa: 'Sweet, Astringent', guna: 'Light, Cool', category: 'Fruit', virya: 'Cold', vipaka: 'Sweet' },
    { id: 'lentils', name: 'Lentils (Dal)', calories: 230, rasa: 'Sweet, Astringent', guna: 'Light, Dry', category: 'Legume', virya: 'Cold', vipaka: 'Sweet' },
    { id: 'brown-rice', name: 'Brown Rice', calories: 215, rasa: 'Sweet', guna: 'Heavy, Warm', category: 'Grain', virya: 'Hot', vipaka: 'Sweet' },
    { id: 'spinach', name: 'Spinach', calories: 7, rasa: 'Astringent, Bitter', guna: 'Light, Cool', category: 'Vegetable', virya: 'Cold', vipaka: 'Pungent' },
    { id: 'almonds', name: 'Almonds', calories: 164, rasa: 'Sweet', guna: 'Heavy, Oily, Hot', category: 'Nut', virya: 'Hot', vipaka: 'Sweet' },
    { id: 'ghee', name: 'Ghee', calories: 112, rasa: 'Sweet', guna: 'Oily, Heavy, Cool', category: 'Dairy', virya: 'Cold', vipaka: 'Sweet' },
    { id: 'turmeric', name: 'Turmeric', calories: 9, rasa: 'Pungent, Bitter, Astringent', guna: 'Light, Dry, Hot', category: 'Spice', virya: 'Hot', vipaka: 'Pungent' },
    { id: 'moong-dal', name: 'Moong Dal', calories: 147, rasa: 'Sweet, Astringent', guna: 'Light, Dry', category: 'Legume', virya: 'Cold', vipaka: 'Sweet'},
    { id: 'cucumber', name: 'Cucumber', calories: 16, rasa: 'Sweet, Astringent', guna: 'Light, Cool', category: 'Vegetable', virya: 'Cold', vipaka: 'Sweet' },
    { id: 'milk', name: 'Milk', calories: 103, rasa: 'Sweet', guna: 'Heavy, Oily, Cool', category: 'Dairy', virya: 'Cold', vipaka: 'Sweet' },
    { id: 'ginger', name: 'Ginger', calories: 4, rasa: 'Pungent, Sweet', guna: 'Light, Oily, Hot', category: 'Spice', virya: 'Hot', vipaka: 'Sweet' },
];

export let recipes: Recipe[] = [
  {
    mood: 'Calming',
    title: 'Soothing Mung Dal Soup',
    rasa: 'Sweet, Salty',
    image: 'https://picsum.photos/seed/mung-dal-soup/400/300',
    dataAiHint: 'bowl of yellow mung dal soup',
    description:
      'A light and nourishing soup, perfect for calming the digestive system and promoting a sense of well-being.',
    ingredients: [
      '1 cup Yellow Mung Dal',
      '4 cups Water',
      '1 tsp Ghee',
      '1/2 tsp Turmeric',
      'Pinch of Asafoetida (Hing)',
      'Salt to taste',
    ],
    instructions: [
      'Rinse dal and soak for 30 minutes.',
      'In a pot, heat ghee and add hing and turmeric.',
      'Add dal and water, bring to a boil.',
      'Simmer until dal is soft, then add salt.',
    ],
  },
  {
    mood: 'Calming',
    title: 'Warm Spiced Milk',
    rasa: 'Sweet',
    image: 'https://picsum.photos/seed/spiced-milk-glass/400/300',
    dataAiHint: 'warm milk in a glass with spices',
    description:
      'A comforting and easy-to-digest drink that promotes restful sleep.',
    ingredients: [
      '1 cup Milk (dairy or non-dairy)',
      'Pinch of Cardamom',
      'Pinch of Nutmeg',
      '1 tsp Maple Syrup (optional)',
    ],
    instructions: [
      'Gently warm the milk.',
      'Stir in the spices and sweetener.',
      'Serve warm before bedtime.',
    ],
  },
  {
    mood: 'Grounding',
    title: 'Hearty Root Vegetable Stew',
    rasa: 'Sweet, Astringent',
    image: 'https://picsum.photos/seed/vegetable-stew-bowl/400/300',
    dataAiHint: 'bowl of hearty vegetable stew',
    description:
      'A warm and substantial stew made with root vegetables to help you feel centered and grounded.',
    ingredients: [
      '1 cup cubed Carrots',
      '1 cup cubed Sweet Potatoes',
      '1/2 cup Green Beans',
      '1 tsp Ginger, grated',
      'Cumin seeds, Coriander powder',
      '4 cups Vegetable Broth',
    ],
    instructions: [
      'Sauté spices in a little oil.',
      'Add vegetables and stir for a few minutes.',
      'Pour in broth and simmer until vegetables are tender.',
    ],
  },
  {
    mood: 'Grounding',
    title: 'Baked Sweet Potato with Ghee',
    rasa: 'Sweet',
    image: 'https://picsum.photos/seed/baked-sweet-potato/400/300',
    dataAiHint: 'baked sweet potato with butter',
    description:
      'A simple, sweet, and satisfying dish that is nourishing and grounding for Vata dosha.',
    ingredients: [
      '1 large Sweet Potato',
      '1 tbsp Ghee',
      'Pinch of Cinnamon',
    ],
    instructions: [
      'Preheat oven to 400°F (200°C).',
      'Pierce the sweet potato and bake for 45-60 minutes.',
      'Slice open, drizzle with ghee, and sprinkle with cinnamon.',
    ],
  },
  {
    mood: 'Aromatic',
    title: 'Spiced Turmeric-Ginger Tea',
    rasa: 'Pungent, Bitter',
    image: 'https://picsum.photos/seed/turmeric-ginger-tea/400/300',
    dataAiHint: 'cup of ginger tea with lemon',
    description:
      'An aromatic and invigorating tea that stimulates digestion and warms the body.',
    ingredients: [
      '1 inch Ginger, sliced',
      '1/2 tsp Turmeric powder',
      '1 Cinnamon stick',
      '2 cups Water',
      'Honey to taste',
    ],
    instructions: [
      'Boil all ingredients (except honey) for 10 minutes.',
      'Strain and add honey before serving.',
    ],
  },
  {
    mood: 'Crunchy',
    title: 'Quinoa and Toasted Almond Salad',
    rasa: 'Astringent, Sweet',
    image: 'https://picsum.photos/seed/quinoa-salad-bowl/400/300',
    dataAiHint: 'quinoa salad in a bowl',
    description: 'A refreshing and crunchy salad that is both satisfying and light.',
    ingredients: [
      '1 cup cooked Quinoa',
      '1/4 cup Toasted Almonds',
      '1/4 cup chopped Cucumber',
      'Lemon juice, Olive oil',
      'Fresh parsley',
    ],
    instructions: [
      'Combine all ingredients in a bowl.',
      'Dress with lemon juice and olive oil.',
      'Toss well and serve.',
    ],
  },
];

export let patients: Patient[] = [
    {
        id: 'pat1',
        name: 'Riya Sharma',
        age: 34,
        gender: 'female',
        prakriti: 'Pitta',
        dietaryHabits: 'Vegetarian, prefers spicy food.',
        bowelHabits: 'normal',
        allergies: ['Peanuts']
    },
    {
        id: 'pat2',
        name: 'Amit Singh',
        age: 45,
        gender: 'male',
        prakriti: 'Kapha',
        dietaryHabits: 'Non-vegetarian, eats late at night.',
        bowelHabits: 'constipated',
        allergies: []
    },
     {
        id: 'pat3',
        name: 'Sunita Joshi',
        age: 28,
        gender: 'female',
        prakriti: 'Vata',
        dietaryHabits: 'Skips meals often, drinks a lot of coffee.',
        bowelHabits: 'loose',
        allergies: ['Gluten']
    }
];

export let dietCharts: DietChart[] = [
    {
        id: 'chart1',
        patientId: 'pat1',
        healthGoals: 'Pitta balance and improved digestion.',
        chartContent: 'Detailed diet chart for Riya Sharma focusing on cooling foods...',
        createdAt: new Date().toISOString()
    }
];

export let users: User[] = [
  {
    id: 'user1',
    name: 'Dr. Mehta',
    email: 'doctor@ahaarsetu.com',
    password: 'password',
    role: 'doctor',
    prakriti: 'Pitta'
  }
]
