'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Search,
  Send,
  Plus,
  MoreVertical,
  Phone,
  Video,
  Paperclip,
  Smile,
  Circle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock conversation data
const conversations = [
  {
    id: '1',
    patientId: '1',
    patientName: 'Priya Sharma',
    patientAvatar: 'https://picsum.photos/200/200?random=1',
    lastMessage: 'Thank you for the diet plan! I have a question about the morning routine.',
    lastMessageTime: '2 min ago',
    unreadCount: 2,
    isOnline: true,
    prakriti: 'Vata-Pitta'
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'Rajesh Kumar',
    patientAvatar: 'https://picsum.photos/200/200?random=2',
    lastMessage: 'I\'ve been following the plan for a week now. Feeling much better!',
    lastMessageTime: '1 hour ago',
    unreadCount: 0,
    isOnline: false,
    prakriti: 'Kapha'
  },
  {
    id: '3',
    patientId: '3',
    patientName: 'Anjali Patel',
    patientAvatar: 'https://picsum.photos/200/200?random=3',
    lastMessage: 'Can we schedule a follow-up consultation?',
    lastMessageTime: '3 hours ago',
    unreadCount: 1,
    isOnline: true,
    prakriti: 'Pitta'
  },
  {
    id: '4',
    patientId: '4',
    patientName: 'Vikram Singh',
    patientAvatar: 'https://picsum.photos/200/200?random=4',
    lastMessage: 'The meal prep guide was very helpful. Thank you!',
    lastMessageTime: '1 day ago',
    unreadCount: 0,
    isOnline: false,
    prakriti: 'Vata-Kapha'
  }
];

const messages = [
  {
    id: '1',
    senderId: '1',
    senderName: 'Priya Sharma',
    content: 'Hi Doctor, I hope you\'re doing well. I have been following the diet plan you gave me.',
    timestamp: '10:30 AM',
    isFromPatient: true
  },
  {
    id: '2',
    senderId: 'dietician',
    senderName: 'Dr. Ayurveda',
    content: 'Hello Priya! That\'s wonderful to hear. How are you feeling so far?',
    timestamp: '10:32 AM',
    isFromPatient: false
  },
  {
    id: '3',
    senderId: '1',
    senderName: 'Priya Sharma',
    content: 'I\'m feeling much more energetic! My digestion has improved too. But I have a question about the morning routine.',
    timestamp: '10:35 AM',
    isFromPatient: true
  },
  {
    id: '4',
    senderId: '1',
    senderName: 'Priya Sharma',
    content: 'Should I drink warm water with lemon before or after the ginger tea?',
    timestamp: '10:35 AM',
    isFromPatient: true
  },
  {
    id: '5',
    senderId: 'dietician',
    senderName: 'Dr. Ayurveda',
    content: 'Great question! For your Vata-Pitta constitution, I recommend drinking the warm lemon water first thing in the morning, then wait 15-20 minutes before having the ginger tea.',
    timestamp: '10:40 AM',
    isFromPatient: false
  }
];

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewMessageDialogOpen, setIsNewMessageDialogOpen] = useState(false);

  const filteredConversations = conversations.filter(conv =>
    conv.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message via API
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const totalUnreadCount = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  return (
    <div className="flex h-[calc(100vh-180px)] gap-6">
      {/* Conversations List */}
      <div className="w-1/3 flex flex-col">
        <Card className="flex-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  Messages
                  {totalUnreadCount > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {totalUnreadCount}
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  Patient communications and consultations
                </CardDescription>
              </div>
              <Dialog open={isNewMessageDialogOpen} onOpenChange={setIsNewMessageDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    New
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Start New Conversation</DialogTitle>
                    <DialogDescription>
                      Select a patient to start messaging with.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="text-center py-8 text-muted-foreground">
                      <p>Patient selection interface would go here</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px]">
              <div className="space-y-1 p-4">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedConversation.id === conversation.id
                        ? 'bg-primary/10 border border-primary/20'
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={conversation.patientAvatar} alt={conversation.patientName} />
                        <AvatarFallback>
                          {conversation.patientName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.isOnline && (
                        <Circle className="absolute -bottom-1 -right-1 h-4 w-4 fill-green-500 text-green-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="font-medium truncate">{conversation.patientName}</div>
                        <div className="text-xs text-muted-foreground">{conversation.lastMessageTime}</div>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.lastMessage}
                        </p>
                        {conversation.unreadCount > 0 && (
                          <Badge variant="destructive" className="text-xs min-w-[20px] h-5">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                      <Badge variant="outline" className="text-xs mt-1">
                        {conversation.prakriti}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <Card className="flex-1 flex flex-col">
          {/* Chat Header */}
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedConversation.patientAvatar} alt={selectedConversation.patientName} />
                    <AvatarFallback>
                      {selectedConversation.patientName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {selectedConversation.isOnline && (
                    <Circle className="absolute -bottom-1 -right-1 h-3 w-3 fill-green-500 text-green-500" />
                  )}
                </div>
                <div>
                  <div className="font-medium">{selectedConversation.patientName}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">{selectedConversation.prakriti}</Badge>
                    <span>•</span>
                    <span>{selectedConversation.isOnline ? 'Online' : 'Offline'}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Phone className="h-4 w-4" />
                  Call
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Video className="h-4 w-4" />
                  Video
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Patient Profile</DropdownMenuItem>
                    <DropdownMenuItem>Schedule Appointment</DropdownMenuItem>
                    <DropdownMenuItem>Create Diet Plan</DropdownMenuItem>
                    <DropdownMenuItem>Archive Conversation</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>

          {/* Messages Area */}
          <CardContent className="flex-1 p-0">
            <ScrollArea className="h-[400px] p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isFromPatient ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        message.isFromPatient
                          ? 'bg-muted text-foreground'
                          : 'bg-primary text-primary-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.isFromPatient ? 'text-muted-foreground' : 'text-primary-foreground/70'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>

          {/* Message Input */}
          <div className="border-t p-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Smile className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                size="sm"
                className="gap-2"
              >
                <Send className="h-4 w-4" />
                Send
              </Button>
            </div>
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
              <span>Quick responses:</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs h-6"
                onClick={() => setNewMessage('Thank you for the update. Keep following the plan.')}
              >
                Thanks for update
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs h-6"
                onClick={() => setNewMessage('Let\'s schedule a follow-up consultation.')}
              >
                Schedule follow-up
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs h-6"
                onClick={() => setNewMessage('I\'ll prepare a customized meal plan for you.')}
              >
                Custom meal plan
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}