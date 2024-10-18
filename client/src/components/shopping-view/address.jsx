import { useEffect, useState } from 'react';
import FormCommon from '../common/form';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { addressFormControls } from '@/config';
import { useDispatch, useSelector } from 'react-redux';
import { addNewAddress, fetchAllAddresses } from '@/store/shop/address-slice';
import AddressCard from './address-card';

const initialAddressFormData = {
  address: '',
  city: '',
  phone: '',
  pincode: '',
  notes: '',
};

const Address = () => {
  const [formData, setFormData] = useState(initialAddressFormData);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);

  const handleManageAddress = (e) => {
    e.preventDefault();
    dispatch(addNewAddress({ ...formData, userId: user?.id }))
      .then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllAddresses(user?.id));
          setFormData(initialAddressFormData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== '')
      .every((item) => item);
  };

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch]);

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((addressItem, idx) => (
              <AddressCard key={idx} addressInfo={addressItem} />
            ))
          : null}
      </div>

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
          isButtonDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
};

export default Address;
