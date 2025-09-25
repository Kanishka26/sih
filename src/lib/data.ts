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
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strTags: string | null;
    strYoutube: string;
    [key: string]: string | null; // For strIngredient and strMeasure
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
    { id: 'banana', name: 'Banana', calories: 105, rasa: 'Sweet', guna: 'Heavy, Cool', category: 'Fruit', virya: 'Cold', vipaka: 'Sweet' },
    { id: 'chickpeas', name: 'Chickpeas', calories: 269, rasa: 'Sweet, Astringent', guna: 'Light, Dry', category: 'Legume', virya: 'Cold', vipaka: 'Sweet' },
    { id: 'quinoa', name: 'Quinoa', calories: 222, rasa: 'Sweet, Astringent', guna: 'Light, Dry', category: 'Grain', virya: 'Cold', vipaka: 'Pungent' },
    { id: 'broccoli', name: 'Broccoli', calories: 55, rasa: 'Astringent, Bitter', guna: 'Light, Dry', category: 'Vegetable', virya: 'Cold', vipaka: 'Pungent' },
    { id: 'walnuts', name: 'Walnuts', calories: 185, rasa: 'Sweet', guna: 'Heavy, Oily', category: 'Nut', virya: 'Hot', vipaka: 'Sweet' },
    { id: 'yogurt', name: 'Yogurt', calories: 150, rasa: 'Sour, Sweet', guna: 'Heavy, Oily', category: 'Dairy', virya: 'Hot', vipaka: 'Sour' },
    { id: 'cumin', name: 'Cumin', calories: 7, rasa: 'Pungent', guna: 'Light, Dry', category: 'Spice', virya: 'Hot', vipaka: 'Pungent' },
    { id: 'mango', name: 'Mango', calories: 202, rasa: 'Sweet', guna: 'Heavy, Oily', category: 'Fruit', virya: 'Hot', vipaka: 'Sweet' },
    { id: 'kidney-beans', name: 'Kidney Beans', calories: 225, rasa: 'Sweet, Astringent', guna: 'Heavy, Dry', category: 'Legume', virya: 'Cold', vipaka: 'Sweet' },
    { id: 'oats', name: 'Oats', calories: 154, rasa: 'Sweet', guna: 'Heavy, Oily', category: 'Grain', virya: 'Hot', vipaka: 'Sweet' },
    { id: 'carrot', name: 'Carrot', calories: 41, rasa: 'Sweet, Pungent', guna: 'Light, Dry', category: 'Vegetable', virya: 'Hot', vipaka: 'Sweet' },
    { id: 'cashews', name: 'Cashews', calories: 157, rasa: 'Sweet', guna: 'Heavy, Oily', category: 'Nut', virya: 'Hot', vipaka: 'Sweet' },
    { id: 'buttermilk', name: 'Buttermilk', calories: 98, rasa: 'Sour, Astringent', guna: 'Light, Dry', category: 'Dairy', virya: 'Cold', vipaka: 'Sour' },
    { id: 'coriander', name: 'Coriander', calories: 4, rasa: 'Pungent, Bitter, Astringent', guna: 'Light, Dry', category: 'Spice', virya: 'Cold', vipaka: 'Pungent' },
    { id: 'pomegranate', name: 'Pomegranate', calories: 234, rasa: 'Sour, Sweet, Astringent', guna: 'Light, Oily', category: 'Fruit', virya: 'Cold', vipaka: 'Sour' },
    { id: 'black-beans', name: 'Black Beans', calories: 227, rasa: 'Sweet, Astringent', guna: 'Heavy, Dry', category: 'Legume', virya: 'Cold', vipaka: 'Sweet' },
    { id: 'barley', name: 'Barley', calories: 193, rasa: 'Sweet, Astringent', guna: 'Light, Dry', category: 'Grain', virya: 'Cold', vipaka: 'Sweet' },
    { id: 'cauliflower', name: 'Cauliflower', calories: 25, rasa: 'Sweet, Astringent', guna: 'Light, Dry', category: 'Vegetable', virya: 'Cold', vipaka: 'Pungent' },
    { id: 'pistachios', name: 'Pistachios', calories: 159, rasa: 'Sweet', guna: 'Heavy, Oily', category: 'Nut', virya: 'Hot', vipaka: 'Sweet' },
    { id: 'paneer', name: 'Paneer (Cheese)', calories: 265, rasa: 'Sweet', guna: 'Heavy, Oily', category: 'Dairy', virya: 'Cold', vipaka: 'Sweet' },
    { id: 'fennel', name: 'Fennel', calories: 27, rasa: 'Sweet, Pungent', guna: 'Light, Dry', category: 'Spice', virya: 'Cold', vipaka: 'Sweet' },
    { id: 'grapes', name: 'Grapes', calories: 104, rasa: 'Sweet, Sour', guna: 'Heavy, Oily', category: 'Fruit', virya: 'Cold', vipaka: 'Sweet' },
    { id: 'millet', name: 'Millet', calories: 207, rasa: 'Sweet, Astringent', guna: 'Light, Dry', category: 'Grain', virya: 'Hot', vipaka: 'Pungent' },
    { id: 'beetroot', name: 'Beetroot', calories: 59, rasa: 'Sweet', guna: 'Heavy', category: 'Vegetable', virya: 'Hot', vipaka: 'Sweet' },
    { id: 'pumpkin-seeds', name: 'Pumpkin Seeds', calories: 126, rasa: 'Sweet', guna: 'Heavy, Oily', category: 'Nut', virya: 'Hot', vipaka: 'Sweet' },
    { id: 'cardamom', name: 'Cardamom', calories: 6, rasa: 'Pungent, Sweet', guna: 'Light, Dry', category: 'Spice', virya: 'Cold', vipaka: 'Pungent' },
    { id: 'orange', name: 'Orange', calories: 62, rasa: 'Sour, Sweet', guna: 'Light, Hot', category: 'Fruit', virya: 'Hot', vipaka: 'Sour' },
    { id: 'white-rice', name: 'White Rice', calories: 205, rasa: 'Sweet', guna: 'Heavy', category: 'Grain', virya: 'Cold', vipaka: 'Sweet' },
    { id: 'potato', name: 'Potato', calories: 163, rasa: 'Sweet, Astringent', guna: 'Heavy, Dry', category: 'Vegetable', virya: 'Cold', vipaka: 'Sweet' },
    { id: 'sunflower-seeds', name: 'Sunflower Seeds', calories: 164, rasa: 'Sweet', guna: 'Heavy, Oily', category: 'Nut', virya: 'Hot', vipaka: 'Sweet' },
    { id: 'cinnamon', name: 'Cinnamon', calories: 6, rasa: 'Pungent, Sweet, Astringent', guna: 'Light, Dry', category: 'Spice', virya: 'Hot', vipaka: 'Pungent' },
    { id: 'dates', name: 'Dates', calories: 66, rasa: 'Sweet', guna: 'Heavy, Oily', category: 'Fruit', virya: 'Cold', vipaka: 'Sweet' },
    { id: 'wheat', name: 'Wheat', calories: 157, rasa: 'Sweet', guna: 'Heavy, Oily', category: 'Grain', virya: 'Cold', vipaka: 'Sweet' },
    { id: 'sweet-potato', name: 'Sweet Potato', calories: 112, rasa: 'Sweet', guna: 'Heavy', category: 'Vegetable', virya: 'Hot', vipaka: 'Sweet' },
    { id: 'sesame-seeds', name: 'Sesame Seeds', calories: 100, rasa: 'Sweet', guna: 'Heavy, Oily', category: 'Nut', virya: 'Hot', vipaka: 'Sweet' },
    { id: 'cloves', name: 'Cloves', calories: 6, rasa: 'Pungent', guna: 'Light, Oily', category: 'Spice', virya: 'Hot', vipaka: 'Pungent' },
    { id: 'figs', name: 'Figs', calories: 74, rasa: 'Sweet', guna: 'Heavy', category: 'Fruit', virya: 'Cold', vipaka: 'Sweet' },
    { id: 'corn', name: 'Corn', calories: 177, rasa: 'Sweet', guna: 'Light, Dry', category: 'Grain', virya: 'Hot', vipaka: 'Sweet' },
    { id: 'okra', name: 'Okra', calories: 33, rasa: 'Sweet, Astringent', guna: 'Light, Oily', category: 'Vegetable', virya: 'Cold', vipaka: 'Sweet' },
    { id: 'black-pepper', name: 'Black Pepper', calories: 5, rasa: 'Pungent', guna: 'Light, Dry', category: 'Spice', virya: 'Hot', vipaka: 'Pungent' },
];

export let recipes: any[] = [];

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
    email: 'doctor@sentinix.com',
    password: 'password',
    role: 'doctor',
    prakriti: 'Pitta'
  }
]
