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
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const dieticians = [
  {
    name: 'Dr. Anjali Sharma',
    hospital: 'Apollo Hospital, Delhi',
    specialization: 'Clinical Nutrition',
    image: 'https://picsum.photos/seed/doc1/400/400',
    dataAiHint: 'female doctor portrait',
  },
  {
    name: 'Dr. Rohan Verma',
    hospital: 'Fortis Hospital, Mumbai',
    specialization: 'Pediatric Nutrition',
    image: 'https://picsum.photos/seed/doc2/400/400',
    dataAiHint: 'male doctor portrait',
  },
  {
    name: 'Dr. Priya Singh',
    hospital: 'Max Healthcare, Bangalore',
    specialization: 'Sports Nutrition',
    image: 'https://picsum.photos/seed/doc3/400/400',
    dataAiHint: 'female doctor smiling',
  },
  {
    name: 'Dr. Sameer Patel',
    hospital: 'Artemis Hospital, Gurgaon',
    specialization: 'Ayurvedic Dietetics',
    image: 'https://picsum.photos/seed/doc4/400/400',
    dataAiHint: 'male doctor smiling',
  },
  {
    name: 'Dr. Meera Desai',
    hospital: 'Narayana Health, Kolkata',
    specialization: 'Geriatric Nutrition',
    image: 'https://picsum.photos/seed/doc5/400/400',
    dataAiHint: 'doctor portrait',
  },
  {
    name: 'Dr. Vikram Rathore',
    hospital: 'Medanta, Lucknow',
    specialization: 'Weight Management',
    image: 'https://picsum.photos/seed/doc6/400/400',
    dataAiHint: 'doctor face',
  },
];

export default function DieticianConnectPage() {
  const { toast } = useToast();

  const handleConnect = (name: string) => {
    toast({
      title: 'Connecting...',
      description: `Your request to connect with ${name} has been sent.`,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">
          Dietician Connect (आहार विशेषज्ञ से जुड़ें)
        </h1>
        <p className="text-muted-foreground">
          Find and connect with expert dieticians from top hospitals.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {dieticians.map((dietician) => (
          <Card key={dietician.name} className="flex flex-col">
            <CardHeader className="items-center text-center p-6">
              <div className="relative w-32 h-32 mb-4">
                <Image
                  src={dietician.image}
                  alt={dietician.name}
                  data-ai-hint={dietician.dataAiHint}
                  fill
                  className="rounded-full object-cover border-4 border-primary/20"
                />
              </div>
              <CardTitle className="text-xl">{dietician.name}</CardTitle>
              <CardDescription>{dietician.hospital}</CardDescription>
            </CardHeader>
            <CardContent className="text-center flex-1">
              <Badge variant="secondary">{dietician.specialization}</Badge>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => handleConnect(dietician.name)}
              >
                <Phone className="mr-2 h-4 w-4" />
                Connect Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
