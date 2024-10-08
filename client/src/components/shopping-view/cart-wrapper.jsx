/* eslint-disable react/prop-types */
import { Button } from '../ui/button';
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import UserCartItemsContent from './cart-items-content';

const UserCartWrapper = ({ cartItems }) => {
  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md max-h-dvh flex flex-col justify-between">
      <SheetHeader>
        <SheetTitle>User Cart</SheetTitle>
      </SheetHeader>

      <div className="mt-8 gap-4 flex-col flex space-y-4 flex-1 overflow-y-auto">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => (
              <UserCartItemsContent cartItem={item} key={item?._id} />
            ))
          : null}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartAmount}</span>
        </div>
        <Button className="w-full mt-6">CheckOut</Button>
      </div>
    </SheetContent>
  );
};

export default UserCartWrapper;
