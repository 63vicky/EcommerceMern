/* eslint-disable react/prop-types */
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Label } from '../ui/label';

const AddressCard = ({
  addressInfo,
  handleEditAddress,
  handleDeleteAddress,
}) => {
  return (
    <Card>
      <CardContent className="grid gap-4 p-4">
        <Label>{addressInfo?.address}</Label>
        <Label>{addressInfo?.city}</Label>
        <Label>{addressInfo?.pincode}</Label>
        <Label>{addressInfo?.phone}</Label>
        <Label>{addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="flex p-3 justify-between">
        <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
        <Button onClick={() => handleDeleteAddress(addressInfo)}>Delete</Button>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
