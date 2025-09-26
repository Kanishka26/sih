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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';
import { 
  TrendingUp,
  Users,
  Calendar,
  Target,
  Download,
  Filter,
  Activity,
  Heart,
  Zap,
  Award
} from 'lucide-react';

// Mock analytics data
const patientGrowthData = [
  { month: 'Jan', patients: 12, consultations: 48 },
  { month: 'Feb', patients: 18, consultations: 72 },
  { month: 'Mar', patients: 25, consultations: 95 },
  { month: 'Apr', patients: 32, consultations: 128 },
  { month: 'May', patients: 41, consultations: 164 },
  { month: 'Jun', patients: 38, consultations: 152 },
  { month: 'Jul', patients: 45, consultations: 180 },
  { month: 'Aug', patients: 52, consultations: 208 },
  { month: 'Sep', patients: 48, consultations: 192 },
  { month: 'Oct', patients: 55, consultations: 220 },
  { month: 'Nov', patients: 62, consultations: 248 },
  { month: 'Dec', patients: 58, consultations: 232 }
];

const complianceData = [
  { range: '90-100%', count: 18, color: '#10B981' },
  { range: '80-89%', count: 24, color: '#F59E0B' },
  { range: '70-79%', count: 12, color: '#F97316' },
  { range: '60-69%', count: 8, color: '#EF4444' },
  { range: 'Below 60%', count: 3, color: '#DC2626' }
];

const prakritivDistribution = [
  { name: 'Vata', value: 28, color: '#8B5CF6' },
  { name: 'Pitta', value: 24, color: '#F59E0B' },
  { name: 'Kapha', value: 20, color: '#10B981' },
  { name: 'Vata-Pitta', value: 15, color: '#06B6D4' },
  { name: 'Pitta-Kapha', value: 8, color: '#F97316' },
  { name: 'Vata-Kapha', value: 5, color: '#EC4899' }
];

const consultationTrends = [
  { day: 'Mon', video: 8, inPerson: 4, phone: 2 },
  { day: 'Tue', video: 12, inPerson: 6, phone: 3 },
  { day: 'Wed', video: 10, inPerson: 8, phone: 1 },
  { day: 'Thu', video: 15, inPerson: 5, phone: 4 },
  { day: 'Fri', video: 18, inPerson: 7, phone: 2 },
  { day: 'Sat', video: 6, inPerson: 12, phone: 1 },
  { day: 'Sun', video: 3, inPerson: 8, phone: 0 }
];

const goalAchievementData = [
  { goal: 'Weight Loss', achieved: 85, total: 100 },
  { goal: 'Digestion', achieved: 92, total: 100 },
  { goal: 'Energy', achieved: 78, total: 100 },
  { goal: 'Sleep', achieved: 88, total: 100 },
  { goal: 'Stress', achieved: 75, total: 100 }
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('12months');
  const [activeTab, setActiveTab] = useState('overview');

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg shadow-lg p-3">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold">Analytics & Reports</h1>
          <p className="text-muted-foreground">
            Track your practice performance and patient outcomes.
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="3months">Last 3 months</SelectItem>
              <SelectItem value="6months">Last 6 months</SelectItem>
              <SelectItem value="12months">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="consultations">Consultations</TabsTrigger>
          <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">58</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  +12% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Month</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">232</div>
                <p className="text-xs text-muted-foreground">
                  Consultations completed
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">84%</div>
                <p className="text-xs text-muted-foreground">
                  Goal achievement rate
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Compliance</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">77%</div>
                <p className="text-xs text-muted-foreground">
                  Patient adherence
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Growth Charts */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Patient Growth</CardTitle>
                <CardDescription>
                  New patients and consultation trends over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={patientGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="patients" 
                      stackId="1"
                      stroke="#8884d8" 
                      fill="#8884d8" 
                      fillOpacity={0.6}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="consultations" 
                      stackId="2"
                      stroke="#82ca9d" 
                      fill="#82ca9d" 
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prakriti Distribution</CardTitle>
                <CardDescription>
                  Constitutional types of your patients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={prakritivDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {prakritivDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Compliance Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Patient Compliance Overview</CardTitle>
              <CardDescription>
                Distribution of patient adherence to diet plans
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-5">
                {complianceData.map((item, index) => (
                  <div key={index} className="text-center">
                    <div 
                      className="h-20 w-full rounded-t-lg"
                      style={{ 
                        backgroundColor: item.color,
                        height: `${(item.count / Math.max(...complianceData.map(d => d.count))) * 80}px`
                      }}
                    />
                    <div className="pt-2">
                      <div className="font-bold text-lg">{item.count}</div>
                      <div className="text-sm text-muted-foreground">{item.range}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patients" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-muted-foreground">
                  Currently following plans
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New This Month</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">
                  +33% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Retention Rate</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <p className="text-xs text-muted-foreground">
                  6-month retention
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Patient Risk Assessment</CardTitle>
              <CardDescription>
                Categorization of patients by health risk levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-red-500" />
                    <div>
                      <div className="font-medium">High Risk</div>
                      <div className="text-sm text-muted-foreground">Requires immediate attention</div>
                    </div>
                  </div>
                  <Badge variant="destructive">3 patients</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-yellow-500" />
                    <div>
                      <div className="font-medium">Medium Risk</div>
                      <div className="text-sm text-muted-foreground">Monitor closely</div>
                    </div>
                  </div>
                  <Badge variant="outline">12 patients</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-green-500" />
                    <div>
                      <div className="font-medium">Low Risk</div>
                      <div className="text-sm text-muted-foreground">Stable and progressing well</div>
                    </div>
                  </div>
                  <Badge variant="secondary">43 patients</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="consultations" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Week</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28</div>
                <p className="text-xs text-muted-foreground">
                  Consultations scheduled
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">96%</div>
                <p className="text-xs text-muted-foreground">
                  Last 30 days
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Duration</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42m</div>
                <p className="text-xs text-muted-foreground">
                  Per consultation
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">No-Shows</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4%</div>
                <p className="text-xs text-muted-foreground">
                  Below industry average
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Weekly Consultation Patterns</CardTitle>
              <CardDescription>
                Breakdown of consultation types by day of week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={consultationTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="video" stackId="a" fill="#8884d8" />
                  <Bar dataKey="inPerson" stackId="a" fill="#82ca9d" />
                  <Bar dataKey="phone" stackId="a" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="outcomes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Goal Achievement Rates</CardTitle>
              <CardDescription>
                Success rates for different health objectives
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {goalAchievementData.map((goal, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{goal.goal}</span>
                      <span className="text-sm font-medium">{goal.achieved}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${goal.achieved}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Treatment Outcomes</CardTitle>
                <CardDescription>
                  Patient improvement across key metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Significant Improvement</span>
                    <Badge className="bg-green-100 text-green-800">68%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Moderate Improvement</span>
                    <Badge className="bg-blue-100 text-blue-800">24%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Minimal Change</span>
                    <Badge className="bg-yellow-100 text-yellow-800">6%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>No Improvement</span>
                    <Badge className="bg-red-100 text-red-800">2%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Patient Satisfaction</CardTitle>
                <CardDescription>
                  Feedback and satisfaction scores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold text-green-600">4.8</div>
                  <div className="text-sm text-muted-foreground">
                    Average rating out of 5.0
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <span>5 stars</span>
                      <div className="flex-1 bg-secondary rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }} />
                      </div>
                      <span>78%</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span>4 stars</span>
                      <div className="flex-1 bg-secondary rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '18%' }} />
                      </div>
                      <span>18%</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span>3 stars</span>
                      <div className="flex-1 bg-secondary rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '3%' }} />
                      </div>
                      <span>3%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}