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
