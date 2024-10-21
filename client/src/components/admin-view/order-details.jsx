import { useState } from 'react';
import FormCommon from '../common/form';
import { DialogContent } from '../ui/dialog';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';

const initialFormData = {
  status: '',
};

const AdminOrderDetailsView = () => {
  const [formData, setFormData] = useState(initialFormData);

  const handleUpdateStatus = (e) => {
    e.preventDefault();
  };

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex items-center justify-between mt-6">
            <p className="font-medium">Order Id:</p> <Label>123456</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Order Date:</p>{' '}
            <Label>20-Oct-2024</Label>
          </div>
          <div className="flex items-center justify-between ">
            <p className="font-medium">Order Price:</p> <Label>$500</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Order Status:</p>{' '}
            <Label>In Progress</Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              <li className="flex justify-between items-center">
                <span>Product One</span>
                <span>$100</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>Vivek Gangani</span>
              <span>Address</span>
              <span>City</span>
              <span>Pincode</span>
              <span>Phone</span>
              <span>notes</span>
            </div>
          </div>
        </div>
        <FormCommon
          formControls={[
            {
              label: 'Order Status',
              name: 'status',
              componentType: 'select',
              options: [
                { id: 'pending', label: 'Pending' },
                { id: 'inProgress', label: 'In Progress' },
                { id: 'inShipping', label: 'In Shipping' },
                { id: 'delivered', label: 'Delivered' },
                { id: 'rejected', label: 'Rejected' },
              ],
            },
          ]}
          formData={formData}
          setFormData={setFormData}
          buttonText={'Update'}
          onSubmit={handleUpdateStatus}
        />
      </div>
    </DialogContent>
  );
};

export default AdminOrderDetailsView;
