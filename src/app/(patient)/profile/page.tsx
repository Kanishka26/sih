'use client';

import { useState } from 'react';
import { useUser } from '@/context/user-context';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Scale, 
  Ruler, 
  Heart, 
  AlertTriangle, 
  Utensils,
  Edit3,
  Camera
} from 'lucide-react';
import Image from 'next/image';
import { ProfileEditForm } from '@/components/profile-edit-form';

export default function ProfilePage() {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <p className="text-muted-foreground">Please log in to view your profile.</p>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <ProfileEditForm onClose={() => setIsEditing(false)} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
        <Button onClick={() => setIsEditing(true)} className="gap-2">
          <Edit3 className="h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      {/* Profile Overview Card */}
      <Card>
        <CardHeader className="pb-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <Avatar className="h-32 w-32">
                <AvatarImage src={user.profilePicture} alt={user.name} />
                <AvatarFallback className="text-2xl bg-primary/10">
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="secondary"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                onClick={() => {
                  // TODO: Implement profile picture upload
                  console.log('Profile picture upload');
                }}
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-center sm:text-left space-y-2">
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
              {user.phoneNumber && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{user.phoneNumber}</span>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

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
                <label className="text-sm font-medium text-muted-foreground">Age</label>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{user.age} years</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Gender</label>
                <div className="mt-1">
                  <Badge variant="secondary" className="capitalize">
                    {user.gender}
                  </Badge>
                </div>
              </div>
            </div>
            
            {(user.height || user.weight) && (
              <>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  {user.height && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Height</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Ruler className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{user.height} cm</span>
                      </div>
                    </div>
                  )}
                  {user.weight && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Weight</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Scale className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{user.weight} kg</span>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {user.prakriti && (
              <>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Prakriti (Body Constitution)</label>
                  <div className="mt-1">
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                      {user.prakriti}
                    </Badge>
                  </div>
                </div>
              </>
            )}

            {user.activityLevel && (
              <>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Activity Level</label>
                  <div className="mt-1">
                    <Badge variant="secondary" className="capitalize">
                      {user.activityLevel.replace('-', ' ')}
                    </Badge>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Health Goals */}
        {user.healthGoals && user.healthGoals.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Health Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {user.healthGoals.map((goal, index) => (
                  <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {goal}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Dietary Information */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Dietary Habits */}
        {user.dietaryHabits && user.dietaryHabits.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="h-5 w-5" />
                Dietary Habits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {user.dietaryHabits.map((habit, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-sm">{habit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Allergies */}
        {user.allergies && user.allergies.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                Allergies & Restrictions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {user.allergies.map((allergy, index) => (
                  <Badge 
                    key={index} 
                    variant="destructive" 
                    className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                  >
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    {allergy}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}