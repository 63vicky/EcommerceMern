import Address from '@/components/shopping-view/address';
import addressImg from '../../assets/account.jpg';
import UserCartItemsContent from '@/components/shopping-view/cart-items-content';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';

const ShoppingCheckout = () => {
  const { cartItems } = useSelector((state) => state.shopCart);

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
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
    <div className="flex flex-col bg-background">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={addressImg}
          alt="AddressImage"
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5 p-5">
        <Address />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent cartItem={item} key={item?._id} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
            <Button className="w-full mt-6">Pay with paypal</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
