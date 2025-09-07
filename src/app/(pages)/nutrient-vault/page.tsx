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

const foodDatabase = [
  { name: 'Apple', calories: 95, rasa: 'Sweet, Astringent', guna: 'Light, Cool', category: 'Fruit' },
  { name: 'Lentils (Dal)', calories: 230, rasa: 'Sweet, Astringent', guna: 'Light, Dry', category: 'Legume' },
  { name: 'Brown Rice', calories: 215, rasa: 'Sweet', guna: 'Heavy, Warm', category: 'Grain' },
  { name: 'Spinach', calories: 7, rasa: 'Astringent, Bitter', guna: 'Light, Cool', category: 'Vegetable' },
  { name: 'Almonds', calories: 164, rasa: 'Sweet', guna: 'Heavy, Oily, Hot', category: 'Nut' },
  { name: 'Ghee', calories: 112, rasa: 'Sweet', guna: 'Oily, Heavy, Cool', category: 'Dairy' },
  { name: 'Turmeric', calories: 9, rasa: 'Pungent, Bitter, Astringent', guna: 'Light, Dry, Hot', category: 'Spice' },
];

export default function NutrientVaultPage() {
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
            <Input placeholder="Search for foods..." className="pl-8" />
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {foodDatabase.map((food) => (
                <TableRow key={food.name}>
                  <TableCell className="font-medium flex items-center gap-2">
                    {food.name} <Badge variant="secondary">{food.category}</Badge>
                  </TableCell>
                  <TableCell>{food.calories}</TableCell>
                  <TableCell>{food.rasa}</TableCell>
                  <TableCell>{food.guna}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
