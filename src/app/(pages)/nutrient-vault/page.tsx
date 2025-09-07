'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { useState } from 'react';

const foodDatabase = [
  { name: 'Apple', calories: 95, rasa: 'Sweet, Astringent', guna: 'Light, Cool', category: 'Fruit', potency: 'Cold' },
  { name: 'Lentils (Dal)', calories: 230, rasa: 'Sweet, Astringent', guna: 'Light, Dry', category: 'Legume', potency: 'Cold' },
  { name: 'Brown Rice', calories: 215, rasa: 'Sweet', guna: 'Heavy, Warm', category: 'Grain', potency: 'Hot' },
  { name: 'Spinach', calories: 7, rasa: 'Astringent, Bitter', guna: 'Light, Cool', category: 'Vegetable', potency: 'Cold' },
  { name: 'Almonds', calories: 164, rasa: 'Sweet', guna: 'Heavy, Oily, Hot', category: 'Nut', potency: 'Hot' },
  { name: 'Ghee', calories: 112, rasa: 'Sweet', guna: 'Oily, Heavy, Cool', category: 'Dairy', potency: 'Cold' },
  { name: 'Turmeric', calories: 9, rasa: 'Pungent, Bitter, Astringent', guna: 'Light, Dry, Hot', category: 'Spice', potency: 'Hot' },
  { name: 'Moong Dal', calories: 147, rasa: 'Sweet, Astringent', guna: 'Light, Dry', category: 'Legume', potency: 'Cold'},
  { name: 'Cucumber', calories: 16, rasa: 'Sweet, Astringent', guna: 'Light, Cool', category: 'Vegetable', potency: 'Cold' },
  { name: 'Milk', calories: 103, rasa: 'Sweet', guna: 'Heavy, Oily, Cool', category: 'Dairy', potency: 'Cold' },
  { name: 'Ginger', calories: 4, rasa: 'Pungent, Sweet', guna: 'Light, Oily, Hot', category: 'Spice', potency: 'Hot' },
];

export default function NutrientVaultPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredFoods = foodDatabase.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">
          NutrientVault (पोषण भंडार)
        </h1>
        <p className="text-muted-foreground">
          Explore our database of 5000+ foods with nutritional and Ayurvedic properties.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Food Database</CardTitle>
          <CardDescription>
            Search for a food item to see its details.
          </CardDescription>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search for foods..." 
              className="pl-8" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Food</TableHead>
                <TableHead>Calories (per serving)</TableHead>
                <TableHead>Rasa (Taste)</TableHead>
                <TableHead>Guna (Qualities)</TableHead>
                <TableHead>Potency</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFoods.map((food) => (
                <TableRow key={food.name}>
                  <TableCell className="font-medium flex items-center gap-2">
                    {food.name} <Badge variant="secondary">{food.category}</Badge>
                  </TableCell>
                  <TableCell>{food.calories}</TableCell>
                  <TableCell>{food.rasa}</TableCell>
                  <TableCell>{food.guna}</TableCell>
                  <TableCell>
                    <Badge variant={food.potency === 'Hot' ? 'destructive' : 'default'} className={food.potency === 'Cold' ? 'bg-blue-500 hover:bg-blue-600' : ''}>
                      {food.potency}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
