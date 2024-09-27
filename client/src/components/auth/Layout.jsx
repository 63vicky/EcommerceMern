import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full flex">
      <div className="hidden lg:flex justify-center items-center w-1/2 bg-primary px-12">
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Welcome to E-commerce shopping
          </h1>
        </div>
      </div>
      <div className="flex flex-1 bg-background items-center justify-center px-4 py-4 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
