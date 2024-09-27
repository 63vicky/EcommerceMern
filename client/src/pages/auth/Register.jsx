import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormCommon from '@/components/common/form';
import { registerFormControls } from '@/config';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../store/auth-slice';
import { useToast } from '../../hooks/use-toast';

const Register = () => {
  let initialState = {
    userName: '',
    email: '',
    password: '',
  };

  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate('/auth/login');
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
          Create New Account
        </h1>
        <p>
          Already Have an account?{' '}
          <Link
            className="text-primary font-medium hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <FormCommon
        formData={formData}
        buttonText={'Sign Up'}
        formControls={registerFormControls}
        onSubmit={onSubmit}
        setFormData={setFormData}
      />
    </div>
  );
};

export default Register;
