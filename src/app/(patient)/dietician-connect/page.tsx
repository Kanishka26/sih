
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
import { Phone, Send, Bot, User, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
  bio: string;
  image: string;
  dataAiHint: string;
  fees: number;
};

const dieticians: Dietician[] = [
  {
    name: 'Dr. Anjali Sharma',
    hospital: 'Apollo Hospital, Delhi',
    specialization: 'Clinical Nutrition',
    qualifications: 'M.Sc. (Food & Nutrition), RD',
    bio: 'Dr. Anjali Sharma is a renowned clinical nutritionist with over 12 years of experience in managing lifestyle diseases through diet. She specializes in creating personalized diet plans for diabetes, cardiac health, and weight management, with a focus on integrating Ayurvedic principles.',
    image: 'https://picsum.photos/seed/doc1/400/400',
    dataAiHint: 'female doctor portrait',
    fees: 1200,
  },
  {
    name: 'Dr. Rohan Verma',
    hospital: 'Fortis Hospital, Mumbai',
    specialization: 'Pediatric Nutrition',
    qualifications: 'M.Sc. (Pediatric Nutrition), RD',
    bio: 'Dr. Rohan Verma focuses on child nutrition from infancy to adolescence. He has helped countless families establish healthy eating habits and address issues like picky eating, food allergies, and childhood obesity. He believes in a gentle, family-centered approach.',
    image: 'https://picsum.photos/seed/doc2/400/400',
    dataAiHint: 'male doctor portrait',
    fees: 1500,
  },
  {
    name: 'Dr. Priya Singh',
    hospital: 'Max Healthcare, Bangalore',
    specialization: 'Sports Nutrition',
    qualifications: 'PG Diploma (Sports Nutrition), RD',
    bio: 'An expert in sports nutrition, Dr. Priya Singh works with athletes of all levels to optimize their performance, recovery, and overall health. She combines modern sports science with Ayurvedic wisdom to create holistic nutritional strategies.',
    image: 'https://picsum.photos/seed/doc3/400/400',
    dataAiHint: 'female doctor smiling',
    fees: 1800,
  },
  {
    name: 'Dr. Sameer Patel',
    hospital: 'Artemis Hospital, Gurgaon',
    specialization: 'Ayurvedic Dietetics',
    qualifications: 'BAMS, M.Sc. (Ayurvedic Dietetics)',
    bio: "Dr. Sameer Patel is a classically trained Ayurvedic doctor who specializes in 'Ahar Chikitsa' (diet-based therapy). He excels at diagnosing dosha imbalances and prescribing food-based remedies to restore health and prevent disease.",
    image: 'https://picsum.photos/seed/doc4/400/400',
    dataAiHint: 'male doctor smiling',
    fees: 1000,
  },
  {
    name: 'Dr. Meera Desai',
    hospital: 'Narayana Health, Kolkata',
    specialization: 'Geriatric Nutrition',
    qualifications: 'M.Sc. (Geriatric Nutrition), CDE',
    bio: 'With a compassionate approach, Dr. Meera Desai supports the elderly population in maintaining their health and vitality through appropriate nutrition. She has extensive experience in managing age-related conditions and dietary needs.',
    image: 'https://picsum.photos/seed/doc5/400/400',
    dataAiHint: 'doctor portrait',
    fees: 1100,
  },
  {
    name: 'Dr. Vikram Rathore',
    hospital: 'Medanta, Lucknow',
    specialization: 'Weight Management',
    qualifications: 'M.Sc. (Nutrition), CWC',
    bio: 'Dr. Vikram Rathore is a certified wellness coach who focuses on sustainable weight management. He avoids crash diets and instead empowers his clients with the knowledge of mindful eating and Ayurvedic principles for long-term results.',
    image: 'https://picsum.photos/seed/doc6/400/400',
    dataAiHint: 'doctor face',
    fees: 2000,
  },
];

type Message = {
  role: 'user' | 'model';
  parts: { text: string }[];
};


export default function DieticianConnectPage() {
    const { toast } = useToast();
    const [viewingDietician, setViewingDietician] = useState<Dietician | null>(null);
    const [isChatOpen, setIsChatOpen] = useState(false);
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
        setIsChatOpen(true);
        setChatHistory([
            {
            role: 'model',
            parts: [{ text: `Hello! I'm ${dietician.name}. How can I help you today with ${dietician.specialization.toLowerCase()}?` }],
            },
        ]);
    };

    const closeAllDialogs = () => {
        setViewingDietician(null);
        setIsChatOpen(false);
        setChatHistory([]);
    }
  
    const handleSendMessage = async () => {
      if (!currentMessage.trim() || !viewingDietician) return;
  
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
            dieticianName: viewingDietician.name,
            dieticianSpecialization: viewingDietician.specialization,
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
          <Card key={dietician.name} className="flex flex-col cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setViewingDietician(dietician)}>
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
            <CardFooter className="flex-col gap-2 pt-0">
                <div className="pt-2">
                  <p className="text-2xl font-bold">₹{dietician.fees}</p>
                  <p className="text-xs text-muted-foreground">Consultation Fee</p>
                </div>
                 <Button
                    className="w-full mt-2"
                    variant="outline"
                  >
                    View Details
                  </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

    {/* Details Dialog */}
    <Dialog open={!!viewingDietician && !isChatOpen} onOpenChange={(open) => !open && closeAllDialogs()}>
        <DialogContent className="sm:max-w-lg bg-card text-card-foreground">
            {viewingDietician && (
                <>
                    <DialogHeader className="items-center text-center">
                         <div className="relative w-32 h-32 mb-4">
                            <Image
                            src={viewingDietician.image}
                            alt={viewingDietician.name}
                            data-ai-hint={viewingDietician.dataAiHint}
                            fill
                            className="rounded-full object-cover border-4 border-primary/20"
                            />
                        </div>
                        <DialogTitle className="text-2xl font-headline">{viewingDietician.name}</DialogTitle>
                        <DialogDescription>
                            <p>{viewingDietician.hospital}</p>
                            <div className="flex gap-2 justify-center mt-2">
                               <Badge variant="secondary">{viewingDietician.specialization}</Badge>
                               <Badge variant="outline">{viewingDietician.qualifications}</Badge>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="px-6 py-4 space-y-4">
                        <div>
                            <h4 className="font-semibold mb-1">About</h4>
                            <p className="text-sm text-muted-foreground">{viewingDietician.bio}</p>
                        </div>
                        <div className="text-center pt-2">
                            <p className="text-3xl font-bold">₹{viewingDietician.fees}</p>
                            <p className="text-sm text-muted-foreground">Consultation Fee</p>
                        </div>
                    </div>
                    <div className="px-6 pb-6">
                        <Button
                            className="w-full"
                            onClick={() => handleConnect(viewingDietician)}
                        >
                            <Phone className="mr-2 h-4 w-4" />
                            Connect for ₹{viewingDietician.fees}
                        </Button>
                    </div>
                </>
            )}
        </DialogContent>
    </Dialog>


    {/* Chat Dialog */}
    <Dialog open={isChatOpen} onOpenChange={(open) => !open && closeAllDialogs()}>
        <DialogContent className="sm:max-w-[525px] h-[80vh] flex flex-col bg-card text-card-foreground">
            {viewingDietician && (
                <>
                    <DialogHeader className="text-left relative">
                        <DialogTitle className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src={viewingDietician.image} />
                                <AvatarFallback>{viewingDietician.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p>{viewingDietician.name}</p>
                                <p className="text-sm font-light text-muted-foreground">{viewingDietician.specialization}</p>
                            </div>
                        </DialogTitle>
                         <button onClick={() => setIsChatOpen(false)} className="absolute right-0 top-0 p-2 rounded-full hover:bg-muted">
                            <X className="w-4 h-4"/>
                        </button>
                    </DialogHeader>
                    <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                        <div className="space-y-4">
                            {chatHistory.map((msg, index) => (
                                <div key={index} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                                    {msg.role === 'model' && (
                                        <Avatar className="w-8 h-8">
                                            <AvatarImage src={viewingDietician.image} />
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
                                        <AvatarImage src={viewingDietician.image} />
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
