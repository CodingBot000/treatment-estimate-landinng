
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';

interface UserInfoStepProps {
  data: any;
  onDataChange: (data: any) => void;
}

const UserInfo: React.FC<UserInfoStepProps> = ({ data, onDataChange }) => {
  const userInfo = data.userInfo || {};
  const [messengerInputs, setMessengerInputs] = useState<string[]>([]);

  useEffect(() => {
    const existingMessengers = userInfo.messengers || [];
    if (existingMessengers.length > 0) {
      setMessengerInputs(existingMessengers);
    } else if (messengerInputs.length === 0) {
      setMessengerInputs(['']);
    }
  }, [userInfo.messengers]);
  
  const handleChange = (field: string, value: string) => {
    onDataChange({
      ...data,
      userInfo: {
        ...userInfo,
        [field]: value
      }
    });
  };

  const handleMessengerChange = (index: number, value: string) => {
    const updatedInputs = [...messengerInputs];
    updatedInputs[index] = value;
    setMessengerInputs(updatedInputs);

    const nonEmptyMessengers = updatedInputs.filter(msg => msg.trim() !== '');
    onDataChange({
      ...data,
      userInfo: {
        ...userInfo,
        messengers: nonEmptyMessengers
      }
    });
  };

  const addMessengerInput = () => {
    if (messengerInputs.length < 5) {
      setMessengerInputs([...messengerInputs, '']);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-gray-700 font-medium">First Name</Label>
          <Input
            id="firstName"
            value={userInfo.firstName || ''}
            onChange={(e) => handleChange('firstName', e.target.value)}
            className="border-rose-200 focus:border-rose-400 focus:ring-rose-400/20"
            placeholder="Enter your first name"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-gray-700 font-medium">Last Name</Label>
          <Input
            id="lastName"
            value={userInfo.lastName || ''}
            onChange={(e) => handleChange('lastName', e.target.value)}
            className="border-rose-200 focus:border-rose-400 focus:ring-rose-400/20"
            placeholder="Enter your last name"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-gray-700 font-medium">Age Range</Label>
          <Select value={userInfo.ageRange || ''} onValueChange={(value) => handleChange('ageRange', value)}>
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
          <Select value={userInfo.gender || ''} onValueChange={(value) => handleChange('gender', value)}>
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
          value={userInfo.email || ''}
          onChange={(e) => handleChange('email', e.target.value)}
          className="border-rose-200 focus:border-rose-400 focus:ring-rose-400/20"
          placeholder="Enter your email address"
        />
        <p className="text-sm text-gray-500">We'll use this to send your personalized treatment recommendations</p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Label className="text-gray-700 font-medium">Input your messengers</Label>
          <button
            type="button"
            onClick={addMessengerInput}
            disabled={messengerInputs.length >= 5}
            className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-rose-100 hover:bg-rose-200 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
          >
            <Plus className="w-4 h-4 text-rose-600" />
          </button>
        </div>
        
        <div className="space-y-3">
          {messengerInputs.map((messenger, index) => (
            <Input
              key={index}
              value={messenger}
              onChange={(e) => handleMessengerChange(index, e.target.value)}
              className="border-rose-200 focus:border-rose-400 focus:ring-rose-400/20"
              placeholder={`Messenger ${index + 1}${index === 0 ? ' (Required)' : ''}`}
              required={index === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
