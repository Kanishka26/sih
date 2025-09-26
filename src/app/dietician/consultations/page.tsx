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
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Calendar as CalendarIcon,
  Clock,
  Video,
  Phone,
  MessageCircle,
  Plus,
  Search,
  Filter,
  User,
  MapPin
} from 'lucide-react';
import { format } from 'date-fns';

// Mock consultation data
const mockConsultations = [
  {
    id: '1',
    patientId: '1',
    patientName: 'Priya Sharma',
    patientAvatar: 'https://picsum.photos/200/200?random=1',
    date: new Date('2024-12-28'),
    time: '10:00 AM',
    duration: 45,
    type: 'video' as const,
    status: 'scheduled' as const,
    notes: 'Follow-up on diet plan progress',
    prakriti: 'Vata-Pitta'
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'Rajesh Kumar',
    patientAvatar: 'https://picsum.photos/200/200?random=2',
    date: new Date('2024-12-28'),
    time: '2:30 PM',
    duration: 60,
    type: 'in-person' as const,
    status: 'scheduled' as const,
    notes: 'Initial consultation for weight management',
    prakriti: 'Kapha'
  },
  {
    id: '3',
    patientId: '3',
    patientName: 'Anjali Patel',
    patientAvatar: 'https://picsum.photos/200/200?random=3',
    date: new Date('2024-12-27'),
    time: '11:15 AM',
    duration: 30,
    type: 'phone' as const,
    status: 'completed' as const,
    notes: 'Quick check-in on gluten-free diet adaptation',
    prakriti: 'Pitta'
  },
  {
    id: '4',
    patientId: '4',
    patientName: 'Vikram Singh',
    patientAvatar: 'https://picsum.photos/200/200?random=4',
    date: new Date('2024-12-29'),
    time: '3:00 PM',
    duration: 45,
    type: 'video' as const,
    status: 'pending' as const,
    notes: 'Muscle gain diet consultation',
    prakriti: 'Vata-Kapha'
  }
];

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'
];

export default function ConsultationsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [consultationType, setConsultationType] = useState('');
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationNotes, setConsultationNotes] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredConsultations = mockConsultations.filter(consultation => {
    const matchesSearch = consultation.patientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || consultation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'phone': return <Phone className="h-4 w-4" />;
      case 'in-person': return <User className="h-4 w-4" />;
      default: return <MessageCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'default';
      case 'completed': return 'secondary';
      case 'pending': return 'outline';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const todayConsultations = filteredConsultations.filter(
    consultation => 
      format(consultation.date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
  );

  const upcomingConsultations = filteredConsultations.filter(
    consultation => 
      consultation.date > new Date() && consultation.status !== 'completed'
  );

  const handleScheduleConsultation = () => {
    // In a real app, this would make an API call
    console.log('Scheduling consultation:', {
      type: consultationType,
      patient: selectedPatient,
      date: selectedDate,
      time: selectedTime,
      notes: consultationNotes
    });
    
    // Reset form
    setConsultationType('');
    setSelectedPatient('');
    setSelectedTime('');
    setConsultationNotes('');
    setIsScheduleDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold">Consultations</h1>
          <p className="text-muted-foreground">
            Manage appointments and patient consultations.
          </p>
        </div>
        <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Schedule Consultation
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Schedule New Consultation</DialogTitle>
              <DialogDescription>
                Book a new consultation with a patient.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="patient">Select Patient</Label>
                <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a patient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Priya Sharma</SelectItem>
                    <SelectItem value="2">Rajesh Kumar</SelectItem>
                    <SelectItem value="3">Anjali Patel</SelectItem>
                    <SelectItem value="4">Vikram Singh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Consultation Type</Label>
                <Select value={consultationType} onValueChange={setConsultationType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select consultation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video Call</SelectItem>
                    <SelectItem value="phone">Phone Call</SelectItem>
                    <SelectItem value="in-person">In-Person</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Select Date</Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Select Time</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map(time => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any notes about this consultation..."
                  value={consultationNotes}
                  onChange={(e) => setConsultationNotes(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={handleScheduleConsultation}
                  disabled={!selectedPatient || !consultationType || !selectedDate || !selectedTime}
                  className="flex-1"
                >
                  Schedule Consultation
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsScheduleDialogOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Consultations</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayConsultations.length}</div>
            <p className="text-xs text-muted-foreground">
              {todayConsultations.filter(c => c.status === 'scheduled').length} scheduled
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingConsultations.length}</div>
            <p className="text-xs text-muted-foreground">
              Next 7 days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              8 video, 3 in-person, 1 phone
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Badge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule */}
      {todayConsultations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>
              {format(new Date(), 'EEEE, MMMM do, yyyy')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayConsultations
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((consultation) => (
                <Card key={consultation.id}>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={consultation.patientAvatar} alt={consultation.patientName} />
                          <AvatarFallback>
                            {consultation.patientName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{consultation.patientName}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-2">
                            {getTypeIcon(consultation.type)}
                            <span className="capitalize">{consultation.type}</span>
                            <span>•</span>
                            <Badge variant="outline">{consultation.prakriti}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-medium">{consultation.time}</div>
                          <div className="text-sm text-muted-foreground">
                            {consultation.duration} min
                          </div>
                        </div>
                        <Badge variant={getStatusColor(consultation.status)}>
                          {consultation.status}
                        </Badge>
                        <Button size="sm">Join</Button>
                      </div>
                    </div>
                    {consultation.notes && (
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-sm text-muted-foreground">{consultation.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Consultations */}
      <Card>
        <CardHeader>
          <CardTitle>All Consultations</CardTitle>
          <CardDescription>
            Manage and filter all your consultations.
          </CardDescription>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search consultations by patient name..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredConsultations.map((consultation) => (
              <Card key={consultation.id}>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={consultation.patientAvatar} alt={consultation.patientName} />
                        <AvatarFallback>
                          {consultation.patientName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{consultation.patientName}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          {getTypeIcon(consultation.type)}
                          <span className="capitalize">{consultation.type}</span>
                          <span>•</span>
                          <Badge variant="outline">{consultation.prakriti}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-medium">
                          {format(consultation.date, 'MMM dd, yyyy')}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {consultation.time} • {consultation.duration} min
                        </div>
                      </div>
                      <Badge variant={getStatusColor(consultation.status)}>
                        {consultation.status}
                      </Badge>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {consultation.status === 'scheduled' && (
                          <Button size="sm">Join</Button>
                        )}
                      </div>
                    </div>
                  </div>
                  {consultation.notes && (
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-sm text-muted-foreground">{consultation.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}