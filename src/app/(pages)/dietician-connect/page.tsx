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
import { Phone, Send, Bot, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { chatWithDieticianAction } from '@/lib/actions';
import { type ChatWithDieticianInput } from '@/ai/flows/chat-with-dietician';

type Dietician = {
  name: string;
  hospital: string;
  specialization: string;
  qualifications: string;
  image: string;
  dataAiHint: string;
};

const dieticians: Dietician[] = [
  {
    name: 'Dr. Anjali Sharma',
    hospital: 'Apollo Hospital, Delhi',
    specialization: 'Clinical Nutrition',
    qualifications: 'M.Sc. (Food & Nutrition), RD',
    image: 'https://picsum.photos/seed/doc1/400/400',
    dataAiHint: 'female doctor portrait',
  },
  {
    name: 'Dr. Rohan Verma',
    hospital: 'Fortis Hospital, Mumbai',
    specialization: 'Pediatric Nutrition',
    qualifications: 'M.Sc. (Pediatric Nutrition), RD',
    image: 'https://picsum.photos/seed/doc2/400/400',
    dataAiHint: 'male doctor portrait',
  },
  {
    name: 'Dr. Priya Singh',
    hospital: 'Max Healthcare, Bangalore',
    specialization: 'Sports Nutrition',
    qualifications: 'PG Diploma (Sports Nutrition), RD',
    image: 'https://picsum.photos/seed/doc3/400/400',
    dataAiHint: 'female doctor smiling',
  },
  {
    name: 'Dr. Sameer Patel',
    hospital: 'Artemis Hospital, Gurgaon',
    specialization: 'Ayurvedic Dietetics',
    qualifications: 'BAMS, M.Sc. (Ayurvedic Dietetics)',
    image: 'https://picsum.photos/seed/doc4/400/400',
    dataAiHint: 'male doctor smiling',
  },
  {
    name: 'Dr. Meera Desai',
    hospital: 'Narayana Health, Kolkata',
    specialization: 'Geriatric Nutrition',
    qualifications: 'M.Sc. (Geriatric Nutrition), CDE',
    image: 'https://picsum.photos/seed/doc5/400/400',
    dataAiHint: 'doctor portrait',
  },
  {
    name: 'Dr. Vikram Rathore',
    hospital: 'Medanta, Lucknow',
    specialization: 'Weight Management',
    qualifications: 'M.Sc. (Nutrition), CWC',
    image: 'https://picsum.photos/seed/doc6/400/400',
    dataAiHint: 'doctor face',
  },
];

type Message = {
  role: 'user' | 'model';
  parts: { text: string }[];
};


export default function DieticianConnectPage() {
    const { toast } = useToast();
    const [selectedDietician, setSelectedDietician] = useState<Dietician | null>(null);
    const [chatHistory, setChatHistory] = useState<Message[]>([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
        if(scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [chatHistory]);

    const handleConnect = (dietician: Dietician) => {
      setSelectedDietician(dietician);
      setChatHistory([
        {
          role: 'model',
          parts: [{ text: `Hello! I'm ${dietician.name}. How can I help you today with ${dietician.specialization.toLowerCase()}?` }],
        },
      ]);
    };
  
    const handleSendMessage = async () => {
      if (!currentMessage.trim() || !selectedDietician) return;
  
      const userMessage: Message = {
        role: 'user',
        parts: [{ text: currentMessage }],
      };
      
      const newHistory = [...chatHistory, userMessage];
      setChatHistory(newHistory);
      setCurrentMessage('');
      setIsTyping(true);

      try {
        const stream = await chatWithDieticianAction({
            dieticianName: selectedDietician.name,
            dieticianSpecialization: selectedDietician.specialization,
            message: currentMessage,
            history: chatHistory,
        });

        let fullResponse = '';
        for await (const chunk of stream) {
            fullResponse += chunk;
            setChatHistory([
                ...newHistory,
                { role: 'model', parts: [{ text: fullResponse }] }
            ]);
        }
      } catch (error) {
          toast({
              title: "Error sending message",
              description: "There was a problem with the chat service. Please try again.",
              variant: "destructive"
          })
      } finally {
          setIsTyping(false);
      }
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
            <CardContent className="text-center flex-1 space-y-2">
              <Badge variant="secondary">{dietician.specialization}</Badge>
              <p className="text-xs text-muted-foreground">{dietician.qualifications}</p>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => handleConnect(dietician)}
              >
                <Phone className="mr-2 h-4 w-4" />
                Connect Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Dialog open={!!selectedDietician} onOpenChange={() => setSelectedDietician(null)}>
        <DialogContent className="sm:max-w-[525px] h-[80vh] flex flex-col bg-card text-card-foreground">
            {selectedDietician && (
                <>
                    <DialogHeader className="text-left">
                        <DialogTitle className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src={selectedDietician.image} />
                                <AvatarFallback>{selectedDietician.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p>{selectedDietician.name}</p>
                                <p className="text-sm font-light text-muted-foreground">{selectedDietician.specialization}</p>
                            </div>
                        </DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                        <div className="space-y-4">
                            {chatHistory.map((msg, index) => (
                                <div key={index} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                                    {msg.role === 'model' && (
                                        <Avatar className="w-8 h-8">
                                            <AvatarImage src={selectedDietician.image} />
                                            <AvatarFallback><Bot/></AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className={`rounded-lg p-3 max-w-[80%] ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                        <p className="text-sm">{msg.parts[0].text}</p>
                                    </div>
                                     {msg.role === 'user' && (
                                        <Avatar className="w-8 h-8">
                                            <AvatarFallback><User/></AvatarFallback>
                                        </Avatar>
                                    )}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex items-end gap-2">
                                     <Avatar className="w-8 h-8">
                                        <AvatarImage src={selectedDietician.image} />
                                        <AvatarFallback><Bot/></AvatarFallback>
                                    </Avatar>
                                    <div className="rounded-lg p-3 bg-muted">
                                        <div className="flex items-center gap-1">
                                            <span className="h-2 w-2 rounded-full bg-primary animate-pulse delay-0"></span>
                                            <span className="h-2 w-2 rounded-full bg-primary animate-pulse delay-150"></span>
                                            <span className="h-2 w-2 rounded-full bg-primary animate-pulse delay-300"></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                    <div className="flex items-center p-4 border-t">
                        <Input 
                            placeholder="Type your message..." 
                            value={currentMessage}
                            onChange={(e) => setCurrentMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            className="flex-1"
                        />
                        <Button onClick={handleSendMessage} className="ml-2">
                            <Send className="w-4 h-4" />
                        </Button>
                    </div>
                </>
            )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
