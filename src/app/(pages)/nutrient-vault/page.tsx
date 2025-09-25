
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
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
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useMemo } from 'react';
import { foodDatabase, type Food } from '@/lib/data';
import { Button } from '@/components/ui/button';

const FOODS_PER_PAGE = 10;

export default function NutrientVaultPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const filteredFoods = useMemo(() => foodDatabase.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  ), [searchTerm]);

  const totalPages = Math.ceil(filteredFoods.length / FOODS_PER_PAGE);

  const currentFoods = useMemo(() => {
    const startIndex = (currentPage - 1) * FOODS_PER_PAGE;
    const endIndex = startIndex + FOODS_PER_PAGE;
    return filteredFoods.slice(startIndex, endIndex);
  }, [filteredFoods, currentPage]);

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
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on new search
              }}
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
                <TableHead>Virya (Potency)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentFoods.length > 0 ? currentFoods.map((food) => (
                <TableRow key={food.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    {food.name} <Badge variant="secondary">{food.category}</Badge>
                  </TableCell>
                  <TableCell>{food.calories}</TableCell>
                  <TableCell>{food.rasa}</TableCell>
                  <TableCell>{food.guna}</TableCell>
                  <TableCell>
                    <Badge variant={food.virya === 'Hot' ? 'destructive' : 'default'} className={food.virya === 'Cold' ? 'bg-blue-500 hover:bg-blue-600' : ''}>
                      {food.virya}
                    </Badge>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                        No results found.
                    </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        {totalPages > 1 && (
            <CardFooter className="flex items-center justify-center space-x-2 pt-4">
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
            </CardFooter>
        )}
      </Card>
    </div>
  );
}
