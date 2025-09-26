'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  ChevronRight, 
  Plus, 
  Filter,
  Eye,
  MessageCircle,
  Calendar,
  FileText,
  MoreVertical,
  Phone,
  Mail,
  AlertTriangle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock patient data - in a real app, this would come from an API
const mockPatients = [
  {
    id: '1',
    name: 'Priya Sharma',
    age: 28,
    gender: 'female' as const,
    prakriti: 'Vata-Pitta' as const,
    email: 'priya.sharma@example.com',
    phone: '+91 98765 43210',
    profilePicture: 'https://picsum.photos/200/200?random=1',
    lastVisit: '2024-12-20',
    status: 'active' as const,
    allergies: ['Nuts', 'Dairy'],
    dietaryHabits: 'Vegetarian, Low spice',
    healthGoals: ['Weight management', 'Better digestion'],
    riskLevel: 'low' as const,
    consultations: 8,
    compliance: 85
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    age: 45,
    gender: 'male' as const,
    prakriti: 'Kapha' as const,
    email: 'rajesh.kumar@example.com',
    phone: '+91 87654 32109',
    profilePicture: 'https://picsum.photos/200/200?random=2',
    lastVisit: '2024-12-18',
    status: 'active' as const,
    allergies: ['Shellfish'],
    dietaryHabits: 'Non-vegetarian, Moderate spice',
    healthGoals: ['Weight loss', 'Cholesterol management'],
    riskLevel: 'medium' as const,
    consultations: 12,
    compliance: 70
  },
  {
    id: '3',
    name: 'Anjali Patel',
    age: 32,
    gender: 'female' as const,
    prakriti: 'Pitta' as const,
    email: 'anjali.patel@example.com',
    phone: '+91 76543 21098',
    profilePicture: 'https://picsum.photos/200/200?random=3',
    lastVisit: '2024-12-15',
    status: 'inactive' as const,
    allergies: ['Gluten', 'Lactose'],
    dietaryHabits: 'Gluten-free, Vegan',
    healthGoals: ['Increase energy', 'Manage stress'],
    riskLevel: 'low' as const,
    consultations: 5,
    compliance: 92
  },
  {
    id: '4',
    name: 'Vikram Singh',
    age: 38,
    gender: 'male' as const,
    prakriti: 'Vata-Kapha' as const,
    email: 'vikram.singh@example.com',
    phone: '+91 65432 10987',
    profilePicture: 'https://picsum.photos/200/200?random=4',
    lastVisit: '2024-12-22',
    status: 'active' as const,
    allergies: [],
    dietaryHabits: 'Vegetarian, High protein',
    healthGoals: ['Muscle gain', 'Improve immunity'],
    riskLevel: 'high' as const,
    consultations: 15,
    compliance: 60
  }
];

type Patient = typeof mockPatients[0];

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [prakritivFilter, setPrakritivFilter] = useState<string>('all');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const router = useRouter();

  const filteredPatients = mockPatients.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
    const matchesPrakriti = prakritivFilter === 'all' || patient.prakriti === prakritivFilter;
    
    return matchesSearch && matchesStatus && matchesPrakriti;
  });

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'default' : 'secondary';
  };

  const handleViewPatient = (patientId: string) => {
    router.push(`/dietician/patients/${patientId}`);
  };

  const handleCreateDietPlan = (patientId: string) => {
    router.push(`/dietician/diet-plans/create?patientId=${patientId}`);
  };

  const handleScheduleConsultation = (patientId: string) => {
    router.push(`/dietician/consultations/schedule?patientId=${patientId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold">Patient Management</h1>
          <p className="text-muted-foreground">
            Manage and monitor all your patients in one place.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add New Patient
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockPatients.length}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockPatients.filter(p => p.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">
              75% of total patients
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {mockPatients.filter(p => p.riskLevel === 'high').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Requires attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(mockPatients.reduce((acc, p) => acc + p.compliance, 0) / mockPatients.length)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Overall patient compliance
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Directory</CardTitle>
          <CardDescription>
            Search and filter through your patient database.
          </CardDescription>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients by name or email..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={prakritivFilter} onValueChange={setPrakritivFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by Prakriti" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prakriti</SelectItem>
                <SelectItem value="Vata">Vata</SelectItem>
                <SelectItem value="Pitta">Pitta</SelectItem>
                <SelectItem value="Kapha">Kapha</SelectItem>
                <SelectItem value="Vata-Pitta">Vata-Pitta</SelectItem>
                <SelectItem value="Pitta-Kapha">Pitta-Kapha</SelectItem>
                <SelectItem value="Vata-Kapha">Vata-Kapha</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Prakriti</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Compliance</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={patient.profilePicture} alt={patient.name} />
                        <AvatarFallback>
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{patient.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {patient.age} years, {patient.gender}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3" />
                        {patient.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-3 w-3" />
                        {patient.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{patient.prakriti}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(patient.status)}>
                      {patient.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getRiskColor(patient.riskLevel)}>
                      {patient.riskLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>{patient.lastVisit}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`text-sm font-medium ${
                        patient.compliance >= 80 ? 'text-green-600' :
                        patient.compliance >= 60 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {patient.compliance}%
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewPatient(patient.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleCreateDietPlan(patient.id)}>
                          <FileText className="mr-2 h-4 w-4" />
                          Create Diet Plan
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleScheduleConsultation(patient.id)}>
                          <Calendar className="mr-2 h-4 w-4" />
                          Schedule Consultation
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Send Message
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}