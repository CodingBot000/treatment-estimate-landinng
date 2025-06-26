
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PrivateInfoStepProps {
  data: any;
  onDataChange: (data: any) => void;
}

const PrivateInfo: React.FC<PrivateInfoStepProps> = ({ data, onDataChange }) => {
  const handleChange = (field: string, value: string) => {
    onDataChange({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-gray-700 font-medium">First Name</Label>
          <Input
            id="firstName"
            value={data.firstName || ''}
            onChange={(e) => handleChange('firstName', e.target.value)}
            className="border-rose-200 focus:border-rose-400 focus:ring-rose-400/20"
            placeholder="Enter your first name"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-gray-700 font-medium">Last Name</Label>
          <Input
            id="lastName"
            value={data.lastName || ''}
            onChange={(e) => handleChange('lastName', e.target.value)}
            className="border-rose-200 focus:border-rose-400 focus:ring-rose-400/20"
            placeholder="Enter your last name"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-gray-700 font-medium">Age Range</Label>
          <Select value={data.ageRange || ''} onValueChange={(value) => handleChange('ageRange', value)}>
            <SelectTrigger className="border-rose-200 focus:border-rose-400">
              <SelectValue placeholder="Select your age range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="teen">Teen (14–19)</SelectItem>
              <SelectItem value="20s">20s</SelectItem>
              <SelectItem value="30s">30s</SelectItem>
              <SelectItem value="40s">40s</SelectItem>
              <SelectItem value="50s">50s</SelectItem>
              <SelectItem value="60s">60s</SelectItem>
              <SelectItem value="70s+">70+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-gray-700 font-medium">Gender</Label>
          <Select value={data.gender || ''} onValueChange={(value) => handleChange('gender', value)}>
            <SelectTrigger className="border-rose-200 focus:border-rose-400">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="non-binary">Non-binary</SelectItem>
              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={data.email || ''}
          onChange={(e) => handleChange('email', e.target.value)}
          className="border-rose-200 focus:border-rose-400 focus:ring-rose-400/20"
          placeholder="Enter your email address"
        />
        <p className="text-sm text-gray-500">We'll use this to send your personalized treatment recommendations</p>
      </div>
    </div>
  );
};

export default PrivateInfo;
