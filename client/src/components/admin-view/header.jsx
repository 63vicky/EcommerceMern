/* eslint-disable react/prop-types */
import { LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { logoutUser } from '@/store/auth-slice';
import { useDispatch } from 'react-redux';

const AdminHeader = ({ setOpen }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header className="flex items-center px-4 py-3 justify-between bg-background border-b">
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <Menu />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex justify-end flex-1">
        <Button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
        >
          <LogOut />
          LogOut
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
