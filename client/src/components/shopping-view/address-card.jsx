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
    <Card className="flex flex-col justify-between">
      <CardContent className="grid gap-4 p-4">
        <Label>Address: {addressInfo?.address}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>Pincode: {addressInfo?.pincode}</Label>
        <Label>Phone: {addressInfo?.phone}</Label>
        <Label>Notes: {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="flex p-3 justify-between">
        <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
        <Button onClick={() => handleDeleteAddress(addressInfo)}>Delete</Button>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
