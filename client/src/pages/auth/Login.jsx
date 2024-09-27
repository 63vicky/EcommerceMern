import { Link } from 'react-router-dom';
import FormCommon from '../../components/common/form';
import { LoginFormControls } from '../../config';
import { useState } from 'react';
import { loginUser } from '../../store/auth-slice';
import { useToast } from '../../hooks/use-toast';
import { useDispatch } from 'react-redux';

const Login = () => {
  let initialState = {
    email: '',
    password: '',
  };

  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: 'destructive',
        });
      }
    });
  };
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to Your Account
        </h1>
        <p>
          Don{"'"}t Have an account?{' '}
          <Link
            className="text-primary font-medium hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <FormCommon
        formData={formData}
        buttonText={'Log In'}
        formControls={LoginFormControls}
        onSubmit={onSubmit}
        setFormData={setFormData}
      />
    </div>
  );
};

export default Login;
