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
import { Soup, GlassWater } from 'lucide-react';

export function DietChartWidget() {
  const dietPlan = [
    {
      time: '6:00 AM',
      meal: 'Wake Up',
      details: 'Drink a glass of warm water with lemon',
      icon: <GlassWater className="h-5 w-5 text-primary" />,
    },
    {
      time: '8:00 AM',
      meal: 'Breakfast',
      details: 'Oats with fruits and nuts',
      icon: <Soup className="h-5 w-5 text-primary" />,
    },
    {
      time: '12:00 PM',
      meal: 'Lunch',
      details: 'Quinoa bowl with mixed vegetables and lentils',
      icon: <Soup className="h-5 w-5 text-primary" />,
    },
    {
      time: '4:00 PM',
      meal: 'Snack',
      details: 'Green tea and a handful of almonds',
      icon: <GlassWater className="h-5 w-5 text-primary" />,
    },
    {
      time: '7:00 PM',
      meal: 'Dinner',
      details: 'Light vegetable soup with a side of brown rice',
      icon: <Soup className="h-5 w-5 text-primary" />,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Personalized Diet Chart</CardTitle>
        <CardDescription>
          Based on your Pitta prakriti.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Time</TableHead>
              <TableHead>Meal</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dietPlan.map((item) => (
              <TableRow key={item.time}>
                <TableCell className="font-medium">
                  <Badge variant="outline">{item.time}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span className="font-semibold">{item.meal}</span>
                  </div>
                </TableCell>
                <TableCell>{item.details}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
