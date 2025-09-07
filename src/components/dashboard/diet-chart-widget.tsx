import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Soup, GlassWater, Utensils } from 'lucide-react';

export function DietChartWidget() {
  const dietPlan = [
    {
      time: '6:00 AM',
      meal: 'Wake Up',
      details: 'Drink a glass of warm water with lemon',
      icon: <GlassWater className="h-5 w-5 text-accent" />,
    },
    {
      time: '8:00 AM',
      meal: 'Breakfast',
      details: 'Oats with fruits and nuts',
      icon: <Soup className="h-5 w-5 text-accent" />,
    },
    {
      time: '12:00 PM',
      meal: 'Lunch',
      details: 'Quinoa bowl with mixed vegetables and lentils',
      icon: <Utensils className="h-5 w-5 text-accent" />,
    },
    {
      time: '4:00 PM',
      meal: 'Snack',
      details: 'Green tea and a handful of almonds',
      icon: <GlassWater className="h-5 w-5 text-accent" />,
    },
    {
      time: '7:00 PM',
      meal: 'Dinner',
      details: 'Light vegetable soup with a side of brown rice',
      icon: <Soup className="h-5 w-5 text-accent" />,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Diet Chart</CardTitle>
        <CardDescription>
          A balanced plan for your Pitta-dominant prakriti.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Time</TableHead>
              <TableHead>Meal</TableHead>
              <TableHead className="hidden md:table-cell">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dietPlan.map((item) => (
              <TableRow key={item.time}>
                <TableCell>
                  <Badge variant="outline" className="text-sm">{item.time}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className='p-2 bg-muted rounded-full'>{item.icon}</div>
                    <span className="font-semibold">{item.meal}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{item.details}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
