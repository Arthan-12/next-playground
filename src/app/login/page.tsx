'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import * as yup from 'yup';
import { LoginDTO, loginService } from '@/services/user/login-service';

type UserInputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { user, authUser } = useAuth();
  const [loginError, setLoginError] = useState(false);
  const router = useRouter();
  const requiredMessage = 'field is required';
  const loginErrorMessage = "email and/or password doesn't match";
  const schema = yup
    .object({
      email: yup.string().required(requiredMessage),
      password: yup.string().required(requiredMessage),
    })
    .required();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<UserInputs>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const onSubmit = async () => {
    const email = control._formValues.email;
    const password = control._formValues.password;
    handleLogin(email, password);
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const result = await loginService
        .login({ email, password })
        .then((res) => {
          if (res?.data) {
            authUser({ email: res.data.email, username: res.data.username });
            console.log(res);
          }
        });
      setLoginError(false);
    } catch (error: any) {
      console.error('Login failed:', error.response?.data || error.message);
      setLoginError(true);
    }
  };

  const redirectToAccountPage = () => {
    router.push('/create-account');
  };

  return (
    <div className="w-full flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 bg-white p-8 rounded shadow-md w-96"
      >
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold text-center">Login</h2>
          <input
            type="text"
            placeholder="E-mail"
            className="w-full px-4 py-2 border rounded mb-4"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded"
            {...register('password')}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
          {!errors.password && loginError && (
            <p className="text-red-500 text-sm">{loginErrorMessage}</p>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full ${
              isValid
                ? 'cursor-pointer bg-blue-500  hover:bg-blue-600'
                : 'bg-gray-500'
            } py-2 rounded text-white`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={redirectToAccountPage}
            className="w-full cursor-pointer border border-blue-500 hover:text-white  hover:bg-blue-600
          py-2 rounded text-blue-500"
          >
            Create account
          </button>
        </div>
      </form>
    </div>
  );
}
