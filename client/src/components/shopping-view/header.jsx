/* eslint-disable react/prop-types */
import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { logoutUser } from '@/store/auth-slice';
import { useEffect, useState } from 'react';
import UserCartWrapper from './cart-wrapper';
import { fetchCartItems } from '@/store/shop/cart-slice';
import { Label } from '../ui/label';

const headerMenuItems = [
  {
    id: 'home',
    label: 'Home',
    path: '/shop/home',
  },

  {
    id: 'men',
    label: 'Men',
    path: '/shop/listing',
  },

  {
    id: 'women',
    label: 'Women',
    path: '/shop/listing',
  },
  {
    id: 'kids',
    label: 'Kids',
    path: '/shop/listing',
  },
  {
    id: 'footwear',
    label: 'Footwear',
    path: '/shop/listing',
  },
  {
    id: 'accessories',
    label: 'Accessories',
    path: '/shop/listing',
  },
];

const MenuItems = ({ setOpen }) => {
  const navigate = useNavigate();

  const handleNavigate = (getCurrentMenuItem, setOpen) => {
    sessionStorage.removeItem('filters');

    const currentFilters =
      getCurrentMenuItem.id !== 'home'
        ? { category: [getCurrentMenuItem.id] }
        : null;

    sessionStorage.setItem('filters', JSON.stringify(currentFilters));

    navigate(getCurrentMenuItem.path);
    setOpen ? setOpen(false) : null;
  };

  return (
    <nav className="flex mb-3 gap-6 lg:mb-0 lg:items-center lg:flex-row flex-col">
      {headerMenuItems.map((item) => {
        return (
          <Label
            className="text-sm font-medium cursor-pointer"
            onClick={() => handleNavigate(item, setOpen)}
            key={item.id}
          >
            {item.label}
          </Label>
        );
      })}
    </nav>
  );
};

const HeaderRightContent = ({ setOpen }) => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openCartDialog, setOpenCartDialog] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    setOpen ? setOpen(false) : null;
  };

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet
        open={openCartDialog}
        onOpenChange={() => setOpenCartDialog(false)}
      >
        <Button
          variant="outline"
          onClick={() => setOpenCartDialog(true)}
          size="icon"
        >
          <ShoppingCart className="h-6 w-6" />
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartDialog={setOpenCartDialog}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <Avatar className="bg-foreground">
            <AvatarFallback className="bg-foreground text-background font-extrabold">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              navigate('/shop/account');
              setOpen ? setOpen(false) : null;
            }}
          >
            <UserCog className="w-4 h-4 mr-2" />
            Account
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const ShoppingHeader = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="flex justify-between items-center h-16 px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <HousePlug className="h-6 w-6"></HousePlug>
          <span className="font-bold">Ecommerce</span>
        </Link>

        <Sheet open={openMenu} onOpenChange={setOpenMenu}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Header Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems setOpen={setOpenMenu} />

            <HeaderRightContent setOpen={setOpenMenu} />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
};

export default ShoppingHeader;
