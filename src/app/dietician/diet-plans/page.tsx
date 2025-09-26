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
  Plus,
  FileText,
  Eye,
  Edit3,
  Copy,
  Trash2,
  Calendar,
  TrendingUp,
  Users,
  Activity,
  MoreVertical
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Mock diet plan data
const mockDietPlans = [
  {
    id: '1',
    name: 'Vata-Pitta Balancing Diet',
    patientId: '1',
    patientName: 'Priya Sharma',
    patientAvatar: 'https://picsum.photos/200/200?random=1',
    prakriti: 'Vata-Pitta',
    createdDate: '2024-12-10',
    lastModified: '2024-12-20',
    status: 'active' as const,
    compliance: 85,
    duration: '4 weeks',
    goals: ['Weight management', 'Better digestion'],
    description: 'Personalized diet plan focusing on balancing Vata and Pitta doshas',
    meals: {
      breakfast: 3,
      lunch: 4,
      dinner: 3,
      snacks: 2
    }
  },
  {
    id: '2',
    name: 'Kapha Weight Loss Program',
    patientId: '2',
    patientName: 'Rajesh Kumar',
    patientAvatar: 'https://picsum.photos/200/200?random=2',
    prakriti: 'Kapha',
    createdDate: '2024-12-05',
    lastModified: '2024-12-18',
    status: 'active' as const,
    compliance: 70,
    duration: '6 weeks',
    goals: ['Weight loss', 'Cholesterol management'],
    description: 'Structured plan to reduce Kapha imbalance and promote weight loss',
    meals: {
      breakfast: 2,
      lunch: 3,
      dinner: 3,
      snacks: 1
    }
  },
  {
    id: '3',
    name: 'Pitta Cooling Diet',
    patientId: '3',
    patientName: 'Anjali Patel',
    patientAvatar: 'https://picsum.photos/200/200?random=3',
    prakriti: 'Pitta',
    createdDate: '2024-11-28',
    lastModified: '2024-12-15',
    status: 'paused' as const,
    compliance: 92,
    duration: '3 weeks',
    goals: ['Increase energy', 'Manage stress'],
    description: 'Cooling foods and herbs to balance excess Pitta',
    meals: {
      breakfast: 3,
      lunch: 4,
      dinner: 3,
      snacks: 2
    }
  },
  {
    id: '4',
    name: 'Muscle Building Protocol',
    patientId: '4',
    patientName: 'Vikram Singh',
    patientAvatar: 'https://picsum.photos/200/200?random=4',
    prakriti: 'Vata-Kapha',
    createdDate: '2024-12-01',
    lastModified: '2024-12-22',
    status: 'active' as const,
    compliance: 60,
    duration: '8 weeks',
    goals: ['Muscle gain', 'Improve immunity'],
    description: 'High-protein Ayurvedic diet for lean muscle development',
    meals: {
      breakfast: 4,
      lunch: 5,
      dinner: 4,
      snacks: 3
    }
  }
];

const templates = [
  {
    id: 'vata-balance',
    name: 'Vata Balancing Template',
    description: 'Warm, nourishing foods for Vata constitution',
    category: 'Constitutional'
  },
  {
    id: 'pitta-cooling',
    name: 'Pitta Cooling Template',
    description: 'Cool, calming foods for Pitta constitution',
    category: 'Constitutional'
  },
  {
    id: 'kapha-stimulating',
    name: 'Kapha Stimulating Template',
    description: 'Light, spicy foods for Kapha constitution',
    category: 'Constitutional'
  },
  {
    id: 'weight-loss',
    name: 'Weight Loss Protocol',
    description: 'Structured plan for healthy weight reduction',
    category: 'Therapeutic'
  },
  {
    id: 'digestive-health',
    name: 'Digestive Health Plan',
    description: 'Foods to improve digestion and gut health',
    category: 'Therapeutic'
  }
];

export default function DietPlansPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const router = useRouter();

  const filteredDietPlans = mockDietPlans.filter(plan => {
    const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.patientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || plan.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'paused': return 'secondary';
      case 'completed': return 'outline';
      case 'draft': return 'destructive';
      default: return 'secondary';
    }
  };

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 80) return 'text-green-600';
    if (compliance >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleCreateFromTemplate = () => {
    if (selectedTemplate) {
      router.push(`/dietician/diet-plans/create?template=${selectedTemplate}`);
    }
  };

  const handleViewPlan = (planId: string) => {
    router.push(`/dietician/diet-plans/${planId}`);
  };

  const handleEditPlan = (planId: string) => {
    router.push(`/dietician/diet-plans/${planId}/edit`);
  };

  const handleDuplicatePlan = (planId: string) => {
    // In a real app, this would create a copy of the plan
    console.log('Duplicating plan:', planId);
  };

  const totalMeals = (meals: any) => {
    return meals.breakfast + meals.lunch + meals.dinner + meals.snacks;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold">Diet Plans</h1>
          <p className="text-muted-foreground">
            Create, manage, and monitor personalized Ayurvedic diet plans.
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Copy className="h-4 w-4" />
                From Template
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Create from Template</DialogTitle>
                <DialogDescription>
                  Choose a template to start creating a new diet plan.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-3">
                  {templates.map((template) => (
                    <Card 
                      key={template.id} 
                      className={`cursor-pointer transition-colors ${
                        selectedTemplate === template.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">{template.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {template.description}
                            </p>
                          </div>
                          <Badge variant="secondary">{template.category}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={handleCreateFromTemplate}
                    disabled={!selectedTemplate}
                    className="flex-1"
                  >
                    Create Plan
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsCreateDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button className="gap-2" onClick={() => router.push('/dietician/diet-plans/create')}>
            <Plus className="h-4 w-4" />
            Create New Plan
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Plans</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockDietPlans.length}</div>
            <p className="text-xs text-muted-foreground">
              {mockDietPlans.filter(p => p.status === 'active').length} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockDietPlans.filter(p => p.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently following plans
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Compliance</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(mockDietPlans.reduce((acc, p) => acc + p.compliance, 0) / mockDietPlans.length)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Across all plans
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">
              Goal achievement rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Start Templates</CardTitle>
          <CardDescription>
            Use pre-built templates to quickly create diet plans.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-5">
            {templates.map((template) => (
              <Card 
                key={template.id} 
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => router.push(`/dietician/diet-plans/create?template=${template.id}`)}
              >
                <CardContent className="pt-4 text-center">
                  <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <h3 className="font-medium text-sm">{template.name}</h3>
                  <Badge variant="secondary" className="mt-2 text-xs">
                    {template.category}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Diet Plans List */}
      <Card>
        <CardHeader>
          <CardTitle>All Diet Plans</CardTitle>
          <CardDescription>
            Manage and monitor all your diet plans.
          </CardDescription>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search plans by name or patient..."
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
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan Name</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Compliance</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDietPlans.map((plan) => (
                <TableRow key={plan.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{plan.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {totalMeals(plan.meals)} meals • {plan.goals.join(', ')}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={plan.patientAvatar} alt={plan.patientName} />
                        <AvatarFallback>
                          {plan.patientName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm">{plan.patientName}</div>
                        <Badge variant="outline" className="text-xs">{plan.prakriti}</Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(plan.status)}>
                      {plan.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className={`font-medium ${getComplianceColor(plan.compliance)}`}>
                      {plan.compliance}%
                    </div>
                  </TableCell>
                  <TableCell>{plan.duration}</TableCell>
                  <TableCell>{plan.lastModified}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewPlan(plan.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditPlan(plan.id)}>
                          <Edit3 className="mr-2 h-4 w-4" />
                          Edit Plan
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicatePlan(plan.id)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
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