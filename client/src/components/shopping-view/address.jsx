import { useState } from 'react';
import FormCommon from '../common/form';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { addressFormControls } from '@/config';

const initialFormData = {
  address: '',
  city: '',
  phone: '',
  pincode: '',
  notes: '',
};

const handleManageAddress = (e) => {
  e.preventDefault();
};

const Address = () => {
  const [formData, setFormData] = useState(initialFormData);
  return (
    <Card>
      <div>Address List</div>

      <CardHeader>
        <CardTitle>Add New Address</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <FormCommon
          formData={formData}
          setFormData={setFormData}
          formControls={addressFormControls}
          buttonText={'Add'}
          onSubmit={handleManageAddress}
        />
      </CardContent>
    </Card>
  );
};

export default Address;
