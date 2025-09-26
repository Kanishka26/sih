'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  ArrowLeft,
  Mail, 
  Phone, 
  Calendar, 
  Scale, 
  Ruler, 
  Heart, 
  AlertTriangle, 
  Utensils,
  Edit3,
  FileText,
  MessageCircle,
  Video,
  TrendingUp,
  Activity,
  User
} from 'lucide-react';

// Mock patient data - would come from API in real app
const getPatientById = (id: string) => {
  const patients = {
    '1': {
      id: '1',
      name: 'Priya Sharma',
      age: 28,
      gender: 'female' as const,
      prakriti: 'Vata-Pitta' as const,
      email: 'priya.sharma@example.com',
      phone: '+91 98765 43210',
      profilePicture: 'https://picsum.photos/200/200?random=1',
      height: 165,
      weight: 58,
      activityLevel: 'moderate',
      allergies: ['Nuts', 'Shellfish', 'Dairy (lactose intolerant)'],
      dietaryHabits: ['Vegetarian', 'No spicy food', 'Prefers warm meals'],
      healthGoals: ['Weight management', 'Better digestion', 'Increased energy'],
      medicalHistory: 'No major medical conditions. Mild digestive issues.',
      currentMedications: 'None',
      lastVisit: '2024-12-20',
      nextAppointment: '2025-01-05',
      compliance: 85,
      consultations: [
        {
          id: '1',
          date: '2024-12-20',
          type: 'Video Call',
          duration: '45 min',
          notes: 'Patient showing good progress with diet plan. Digestive issues improving.',
          status: 'completed'
        },
        {
          id: '2',
          date: '2024-12-10',
          type: 'In-person',
          duration: '60 min',
          notes: 'Initial consultation. Created personalized diet plan based on Vata-Pitta constitution.',
          status: 'completed'
        }
      ],
      dietPlans: [
        {
          id: '1',
          name: 'Vata-Pitta Balancing Diet',
          createdDate: '2024-12-10',
          status: 'active',
          compliance: 85
        }
      ],
      healthMetrics: [
        { date: '2024-12-20', weight: 58, bloodPressure: '120/80', energy: 4 },
        { date: '2024-12-10', weight: 59, bloodPressure: '118/78', energy: 3 },
        { date: '2024-11-30', weight: 60, bloodPressure: '122/82', energy: 3 }
      ]
    }
  };
  return patients[id as keyof typeof patients] || null;
};

export default function PatientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const patientId = params?.id as string;
  const patient = getPatientById(patientId);
  const [activeTab, setActiveTab] = useState('overview');

  if (!patient) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Patient Not Found</h2>
          <p className="text-muted-foreground mb-4">The requested patient could not be found.</p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-headline font-bold">Patient Profile</h1>
          <p className="text-muted-foreground">
            Comprehensive view of {patient.name}'s health journey
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <MessageCircle className="h-4 w-4" />
            Message
          </Button>
          <Button variant="outline" className="gap-2">
            <Video className="h-4 w-4" />
            Video Call
          </Button>
          <Button className="gap-2">
            <Calendar className="h-4 w-4" />
            Schedule Appointment
          </Button>
        </div>
      </div>

      {/* Patient Overview Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={patient.profilePicture} alt={patient.name} />
              <AvatarFallback className="text-lg">
                {patient.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold">{patient.name}</h2>
              <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                <span>{patient.age} years • {patient.gender}</span>
                <Badge variant="outline">{patient.prakriti}</Badge>
                <span className="flex items-center gap-1">
                  <Activity className="h-4 w-4" />
                  {patient.compliance}% Compliance
                </span>
              </div>
              <div className="flex items-center gap-6 mt-3 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{patient.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{patient.phone}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Next Appointment</div>
              <div className="font-medium">{patient.nextAppointment}</div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Tabs Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="health-metrics">Health Metrics</TabsTrigger>
          <TabsTrigger value="diet-plans">Diet Plans</TabsTrigger>
          <TabsTrigger value="consultations">Consultations</TabsTrigger>
          <TabsTrigger value="notes">Clinical Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Height</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Ruler className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{patient.height} cm</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Weight</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Scale className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{patient.weight} kg</span>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Activity Level</label>
                  <div className="mt-1">
                    <Badge variant="secondary" className="capitalize">
                      {patient.activityLevel}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Medical History</label>
                  <p className="text-sm mt-1">{patient.medicalHistory}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Current Medications</label>
                  <p className="text-sm mt-1">{patient.currentMedications}</p>
                </div>
              </CardContent>
            </Card>

            {/* Health Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Health Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {patient.healthGoals.map((goal, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-sm">{goal}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Dietary Habits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="h-5 w-5" />
                  Dietary Habits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {patient.dietaryHabits.map((habit, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-sm">{habit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Allergies */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                  Allergies & Restrictions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {patient.allergies.map((allergy, index) => (
                    <Badge 
                      key={index} 
                      variant="destructive" 
                      className="bg-red-50 text-red-700 border-red-200"
                    >
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      {allergy}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="health-metrics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Health Metrics Tracking</CardTitle>
              <CardDescription>
                Track patient's progress over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Weight (kg)</TableHead>
                    <TableHead>Blood Pressure</TableHead>
                    <TableHead>Energy Level</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patient.healthMetrics.map((metric, index) => (
                    <TableRow key={index}>
                      <TableCell>{metric.date}</TableCell>
                      <TableCell>{metric.weight}</TableCell>
                      <TableCell>{metric.bloodPressure}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-2 rounded-full mr-1 ${
                                  i < metric.energy ? 'bg-green-500' : 'bg-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm">{metric.energy}/5</span>
                        </div>
                      </TableCell>
                      <TableCell>-</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="diet-plans" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Diet Plans</CardTitle>
                  <CardDescription>
                    Manage and track diet plan compliance
                  </CardDescription>
                </div>
                <Button className="gap-2">
                  <FileText className="h-4 w-4" />
                  Create New Plan
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patient.dietPlans.map((plan) => (
                  <Card key={plan.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{plan.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Created on {plan.createdDate}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">Compliance</div>
                            <div className="font-medium">{plan.compliance}%</div>
                          </div>
                          <Badge variant={plan.status === 'active' ? 'default' : 'secondary'}>
                            {plan.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="consultations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Consultation History</CardTitle>
              <CardDescription>
                All past and upcoming consultations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patient.consultations.map((consultation) => (
                  <Card key={consultation.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{consultation.type}</Badge>
                            <span className="text-sm text-muted-foreground">
                              {consultation.duration}
                            </span>
                          </div>
                          <h3 className="font-medium mb-2">{consultation.date}</h3>
                          <p className="text-sm text-muted-foreground">
                            {consultation.notes}
                          </p>
                        </div>
                        <Badge variant={consultation.status === 'completed' ? 'default' : 'secondary'}>
                          {consultation.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Clinical Notes</CardTitle>
              <CardDescription>
                Add and manage clinical observations and notes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No clinical notes yet.</p>
                <p className="text-sm">Start by adding your first note about this patient.</p>
                <Button className="mt-4">Add Note</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}