'use client';

import { useState } from 'react';
import { useUser, type UserProfile } from '@/context/user-context';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Save, X, Plus, Trash2 } from 'lucide-react';

interface ProfileEditFormProps {
  onClose: () => void;
}

export function ProfileEditForm({ onClose }: ProfileEditFormProps) {
  const { user, updateUser } = useUser();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: user?.name || '',
    email: user?.email || '',
    age: user?.age || 0,
    gender: user?.gender || 'male',
    prakriti: user?.prakriti,
    phoneNumber: user?.phoneNumber || '',
    height: user?.height || 0,
    weight: user?.weight || 0,
    activityLevel: user?.activityLevel,
    dietaryHabits: user?.dietaryHabits || [],
    allergies: user?.allergies || [],
    healthGoals: user?.healthGoals || [],
  });

  const [newDietaryHabit, setNewDietaryHabit] = useState('');
  const [newAllergy, setNewAllergy] = useState('');
  const [newHealthGoal, setNewHealthGoal] = useState('');

  const handleInputChange = (field: keyof UserProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addItem = (field: 'dietaryHabits' | 'allergies' | 'healthGoals', value: string) => {
    if (!value.trim()) return;
    
    const currentItems = formData[field] as string[] || [];
    if (!currentItems.includes(value.trim())) {
      handleInputChange(field, [...currentItems, value.trim()]);
    }
    
    // Clear the input
    if (field === 'dietaryHabits') setNewDietaryHabit('');
    if (field === 'allergies') setNewAllergy('');
    if (field === 'healthGoals') setNewHealthGoal('');
  };

  const removeItem = (field: 'dietaryHabits' | 'allergies' | 'healthGoals', index: number) => {
    const currentItems = formData[field] as string[] || [];
    handleInputChange(field, currentItems.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    try {
      updateUser(formData);
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been successfully updated.',
      });
      onClose();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Edit Profile</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose} className="gap-2">
            <X className="h-4 w-4" />
            Cancel
          </Button>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                min="1"
                max="120"
                value={formData.age}
                onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
                placeholder="Enter your age"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>
        </CardContent>
      </Card>

      {/* Physical Information */}
      <Card>
        <CardHeader>
          <CardTitle>Physical Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                min="100"
                max="250"
                value={formData.height}
                onChange={(e) => handleInputChange('height', parseInt(e.target.value) || 0)}
                placeholder="Enter your height in cm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                min="30"
                max="200"
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', parseInt(e.target.value) || 0)}
                placeholder="Enter your weight in kg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="prakriti">Prakriti (Body Constitution)</Label>
              <Select value={formData.prakriti} onValueChange={(value) => handleInputChange('prakriti', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your prakriti" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Vata">Vata</SelectItem>
                  <SelectItem value="Pitta">Pitta</SelectItem>
                  <SelectItem value="Kapha">Kapha</SelectItem>
                  <SelectItem value="Vata-Pitta">Vata-Pitta</SelectItem>
                  <SelectItem value="Pitta-Kapha">Pitta-Kapha</SelectItem>
                  <SelectItem value="Vata-Kapha">Vata-Kapha</SelectItem>
                  <SelectItem value="Tridoshic">Tridoshic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="activity">Activity Level</Label>
              <Select value={formData.activityLevel} onValueChange={(value) => handleInputChange('activityLevel', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="very-active">Very Active</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dietary Habits */}
      <Card>
        <CardHeader>
          <CardTitle>Dietary Habits</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newDietaryHabit}
              onChange={(e) => setNewDietaryHabit(e.target.value)}
              placeholder="Add a dietary habit..."
              onKeyPress={(e) => e.key === 'Enter' && addItem('dietaryHabits', newDietaryHabit)}
            />
            <Button 
              type="button" 
              onClick={() => addItem('dietaryHabits', newDietaryHabit)}
              size="icon"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.dietaryHabits?.map((habit, index) => (
              <Badge key={index} variant="secondary" className="gap-1">
                {habit}
                <button 
                  onClick={() => removeItem('dietaryHabits', index)}
                  className="ml-1 hover:text-destructive"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Allergies */}
      <Card>
        <CardHeader>
          <CardTitle>Allergies & Restrictions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newAllergy}
              onChange={(e) => setNewAllergy(e.target.value)}
              placeholder="Add an allergy or restriction..."
              onKeyPress={(e) => e.key === 'Enter' && addItem('allergies', newAllergy)}
            />
            <Button 
              type="button" 
              onClick={() => addItem('allergies', newAllergy)}
              size="icon"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.allergies?.map((allergy, index) => (
              <Badge key={index} variant="destructive" className="gap-1">
                {allergy}
                <button 
                  onClick={() => removeItem('allergies', index)}
                  className="ml-1 hover:text-destructive-foreground"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Health Goals */}
      <Card>
        <CardHeader>
          <CardTitle>Health Goals</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newHealthGoal}
              onChange={(e) => setNewHealthGoal(e.target.value)}
              placeholder="Add a health goal..."
              onKeyPress={(e) => e.key === 'Enter' && addItem('healthGoals', newHealthGoal)}
            />
            <Button 
              type="button" 
              onClick={() => addItem('healthGoals', newHealthGoal)}
              size="icon"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.healthGoals?.map((goal, index) => (
              <Badge key={index} variant="outline" className="gap-1 bg-green-50 text-green-700 border-green-200">
                {goal}
                <button 
                  onClick={() => removeItem('healthGoals', index)}
                  className="ml-1 hover:text-destructive"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}