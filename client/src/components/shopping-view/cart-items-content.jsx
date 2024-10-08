import { Minus, Plus, Trash } from 'lucide-react';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartItem, updateCartQuantity } from '@/store/shop/cart-slice';
import { useToast } from '@/hooks/use-toast';

/* eslint-disable react/prop-types */
const UserCartItemsContent = ({ cartItem }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleUpdateQuantity = (getCartItem, typeOfAct) => {
    dispatch(
      updateCartQuantity({
        productId: getCartItem?.productId,
        userId: user?.id,
        quantity:
          typeOfAct === 'plus'
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    );
  };

  const handleDeleteCartItem = (getCartItem) => {
    dispatch(
      deleteCartItem({ productId: getCartItem?.productId, userId: user?.id })
    )
      .then((data) => {
        if (data?.payload?.success) {
          toast({ title: 'Product removed successfully!' });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Button
            onClick={() => handleUpdateQuantity(cartItem, 'minus')}
            variant="outline"
            disabled={cartItem?.quantity === 1}
            className="w-8 h-8"
            size="icon"
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            className="w-8 h-8"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, 'plus')}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleDeleteCartItem(cartItem)}
          size={20}
          className="cursor-pointer mt-1"
        />
      </div>
    </div>
  );
};

export default UserCartItemsContent;
