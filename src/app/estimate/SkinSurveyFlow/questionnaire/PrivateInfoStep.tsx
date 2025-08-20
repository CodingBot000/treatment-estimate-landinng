
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PrivateInfoStepProps {
  data: any;
  onDataChange: (data: any) => void;
}

const PrivateInfo: React.FC<PrivateInfoStepProps> = ({ data, onDataChange }) => {
  const privateInfo = data.privateInfo || {};
  
  const handleChange = (field: string, value: string) => {
    onDataChange({
      ...data,
      privateInfo: {
        ...privateInfo,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-gray-700 font-medium">First Name</Label>
          <Input
            id="firstName"
            value={privateInfo.firstName || ''}
            onChange={(e) => handleChange('firstName', e.target.value)}
            className="border-rose-200 focus:border-rose-400 focus:ring-rose-400/20"
            placeholder="Enter your first name"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-gray-700 font-medium">Last Name</Label>
          <Input
            id="lastName"
            value={privateInfo.lastName || ''}
            onChange={(e) => handleChange('lastName', e.target.value)}
            className="border-rose-200 focus:border-rose-400 focus:ring-rose-400/20"
            placeholder="Enter your last name"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-gray-700 font-medium">Age Range</Label>
          <Select value={privateInfo.ageRange || ''} onValueChange={(value) => handleChange('ageRange', value)}>
            <SelectTrigger className="border-rose-200 focus:border-rose-400" translate="no">
              <SelectValue placeholder="Select your age range" />
            </SelectTrigger>
            <SelectContent translate="no">
              <SelectItem value="teen" translate="no">
                <span translate="yes">Teen (14–19)</span>
              </SelectItem>
              <SelectItem value="20s" translate="no">
                <span translate="yes">20s</span>
              </SelectItem>
              <SelectItem value="30s" translate="no">
                <span translate="yes">30s</span>
              </SelectItem>
              <SelectItem value="40s" translate="no">
                <span translate="yes">40s</span>
              </SelectItem>
              <SelectItem value="50s" translate="no">
                <span translate="yes">50s</span>
              </SelectItem>
              <SelectItem value="60s" translate="no">
                <span translate="yes">60s</span>
              </SelectItem>
              <SelectItem value="70s+" translate="no">
                <span translate="yes">70+</span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-gray-700 font-medium">Gender</Label>
          <Select value={privateInfo.gender || ''} onValueChange={(value) => handleChange('gender', value)}>
            <SelectTrigger className="border-rose-200 focus:border-rose-400" translate="no">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent translate="no">
              <SelectItem value="female" translate="no">
                <span translate="yes">Female</span>
              </SelectItem>
              <SelectItem value="male" translate="no">
                <span translate="yes">Male</span>
              </SelectItem>
              <SelectItem value="non-binary" translate="no">
                <span translate="yes">Non-binary</span>
              </SelectItem>
              <SelectItem value="prefer-not-to-say" translate="no">
                <span translate="yes">Prefer not to say</span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={privateInfo.email || ''}
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
