/* eslint-disable react/prop-types */
import {
  BaggageClaim,
  ChartPie,
  MonitorCog,
  ShoppingBasket,
} from 'lucide-react';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';

const adminSidebarMenuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/admin/dashboard',
    icon: <ChartPie />,
  },
  {
    id: 'products',
    label: 'Products',
    path: '/admin/products',
    icon: <ShoppingBasket />,
  },
  {
    id: 'orders',
    label: 'Orders',
    path: '/admin/orders',
    icon: <BaggageClaim />,
  },
];

const MenuItems = ({ setOpen }) => {
  const navigate = useNavigate();
  return (
    <nav className="mt-8 flex flex-col gap-2">
      {adminSidebarMenuItems.map((item) => {
        return (
          <div
            onClick={() => {
              navigate(item.path);
              setOpen ? setOpen(false) : null;
            }}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground text-xl cursor-pointer"
            key={item.id}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        );
      })}
    </nav>
  );
};

const AdminSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle
                className="flex gap-2 mt-6 mb-2 cursor-pointer"
                onClick={() => {
                  navigate('/admin/dashboard');
                  setOpen ? setOpen(false) : null;
                }}
              >
                <MonitorCog size={30} />
                <h1 className="font-extrabold text-2xl">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 bg-background border-r flex-col p-6 lg:flex">
        <div
          onClick={() => navigate('/admin/dashboard')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <MonitorCog size={30} />
          <h1 className="font-extrabold text-2xl">Admin Panel</h1>
        </div>

        <MenuItems />
      </aside>
    </Fragment>
  );
};

export default AdminSidebar;
