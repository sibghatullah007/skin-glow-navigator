import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { User } from 'lucide-react';
import NavBar from '@/components/NavBar';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type SkinType = 'oily' | 'dry' | 'combination' | 'normal';

const ProfilePage: React.FC = () => {
  const { user, updateUserProfile } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [skinType, setSkinType] = useState<SkinType>(user?.skinType as SkinType || 'normal');

  if (!user) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateUserProfile({ name, skinType });
    
    toast({
      title: "Success",
      description: "Profile updated successfully",
    });
    
    setIsEditing(false);
  };

  const handleSkinTypeChange = (value: string) => {
    setSkinType(value as SkinType);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container max-w-xl mx-auto py-12 px-4 md:py-16 md:px-0 pb-20 md:pb-12 md:ml-24">
        <h1 className="text-2xl font-semibold mb-6">Your Profile</h1>
        
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                {user.photoUrl ? (
                  <AvatarImage src={user.photoUrl} alt={user.name} />
                ) : (
                  <AvatarFallback>
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                )}
              </Avatar>
              <CardTitle>{user.name}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input
                    id="email"
                    value={user.email}
                    disabled
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="skinType" className="text-sm font-medium">Skin Type</label>
                  <Select value={skinType} onValueChange={handleSkinTypeChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select skin type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="oily">Oily</SelectItem>
                        <SelectItem value="dry">Dry</SelectItem>
                        <SelectItem value="combination">Combination</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex space-x-2 pt-2">
                  <Button type="submit">Save Changes</Button>
                  <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p>{user.email}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Skin Type</p>
                  <p className="capitalize">{user.skinType || 'Not specified'}</p>
                </div>
                
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <NavBar />
    </div>
  );
};

export default ProfilePage;
