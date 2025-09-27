'use client';

import { useState } from 'react';
import { useUser } from '@/context/user-context';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Heart,
  Scale,
  Ruler,
  Activity,
  Target,
  AlertCircle,
  Edit,
  Check,
  X,
  Camera,
  Utensils
} from 'lucide-react';
import Image from 'next/image';
import { ProfileEditForm } from '@/components/ui/profile-edit-form';

export default function ProfilePage() {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <User className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-muted-foreground">Please log in to view your profile</h3>
        </div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Edit Profile</h1>
          <Button
            variant="outline"
            onClick={() => setIsEditing(false)}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Cancel
          </Button>
        </div>
        <ProfileEditForm onClose={() => setIsEditing(false)} />
      </div>
    );
  }

  const getPrakritiColor = (prakriti: string | undefined) => {
    if (!prakriti) return 'bg-gray-100 text-gray-800';
    if (prakriti.includes('Vata')) return 'bg-blue-100 text-blue-800';
    if (prakriti.includes('Pitta')) return 'bg-red-100 text-red-800';
    if (prakriti.includes('Kapha')) return 'bg-green-100 text-green-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getActivityLevelColor = (level: string | undefined) => {
    switch (level) {
      case 'sedentary': return 'bg-red-100 text-red-800';
      case 'light': return 'bg-yellow-100 text-yellow-800';
      case 'moderate': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'very-active': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Profile</h1>
        <Button
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-2"
        >
          <Edit className="h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      {/* Profile Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Picture and Basic Info */}
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="relative">
              {user.profilePicture ? (
                <Image
                  src={user.profilePicture}
                  alt={user.name}
                  width={120}
                  height={120}
                  className="rounded-full object-cover border-4 border-primary/10"
                />
              ) : (
                <div className="w-30 h-30 bg-muted rounded-full flex items-center justify-center border-4 border-primary/10">
                  <User className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
              <Button
                size="sm"
                variant="secondary"
                className="absolute -bottom-2 -right-2 rounded-full h-10 w-10 p-0"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Name</p>
                  <p className="text-lg font-semibold">{user.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Age</p>
                  <p className="text-lg">{user.age} years</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Gender</p>
                  <p className="text-lg capitalize">{user.gender}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Prakriti</p>
                  {user.prakriti ? (
                    <Badge className={getPrakritiColor(user.prakriti)}>
                      {user.prakriti}
                    </Badge>
                  ) : (
                    <p className="text-muted-foreground">Not determined</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p>{user.email}</p>
              </div>
            </div>
            {user.phoneNumber && (
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                  <p>{user.phoneNumber}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Health Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Health Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {user.height && (
              <div className="flex items-center gap-3">
                <Ruler className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Height</p>
                  <p className="text-lg font-semibold">{user.height} cm</p>
                </div>
              </div>
            )}
            {user.weight && (
              <div className="flex items-center gap-3">
                <Scale className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Weight</p>
                  <p className="text-lg font-semibold">{user.weight} kg</p>
                </div>
              </div>
            )}
            {user.activityLevel && (
              <div className="flex items-center gap-3">
                <Activity className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Activity Level</p>
                  <Badge className={getActivityLevelColor(user.activityLevel)}>
                    {user.activityLevel.charAt(0).toUpperCase() + user.activityLevel.slice(1)}
                  </Badge>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Dietary Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dietary Habits */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Utensils className="h-5 w-5" />
              Dietary Habits
            </CardTitle>
          </CardHeader>
          <CardContent>
            {user.dietaryHabits && user.dietaryHabits.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {user.dietaryHabits.map((habit, index) => (
                  <Badge key={index} variant="secondary">
                    {habit}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No dietary habits specified</p>
            )}
          </CardContent>
        </Card>

        {/* Allergies */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Allergies & Restrictions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {user.allergies && user.allergies.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {user.allergies.map((allergy, index) => (
                  <Badge key={index} variant="destructive">
                    {allergy}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No allergies specified</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Health Goals */}
      {user.healthGoals && user.healthGoals.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Health Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {user.healthGoals.map((goal, index) => (
                <Badge key={index} className="bg-primary/10 text-primary hover:bg-primary/20">
                  {goal}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
