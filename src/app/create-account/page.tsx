'use client';
import Dialog from '@/components/dialog/dialog';
import { userService } from '@/services/user/user-services';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

type FormInputs = {
  email: string;
  username: string;
  password: string;
  passwordConfirmation: string;
};

export default function CreateAccount() {
  const maxChar = 6;
  const minChar = 3;
  const requiredMessage = 'field is required';
  const passwordMessage = "password doesn't match";
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPasswordChecked, setPasswordCheck] = useState(false);
  const schema = yup
    .object({
      email: yup.string().required(requiredMessage),
      username: yup
        .string()
        .required(requiredMessage)
        .min(minChar, `field must be at least ${minChar} characters`),
      password: yup
        .string()
        .required(requiredMessage)
        .min(minChar, `field must be at least ${minChar} characters`),
      passwordConfirmation: yup
        .string()
        .required(requiredMessage)
        .min(minChar, `field must be at least ${minChar} characters`)
        .oneOf([yup.ref('password')], passwordMessage),
    })
    .required();

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const watchPassword = watch('password');
  const watchPasswordConfirmation = watch('passwordConfirmation');

  useEffect(() => {
    setPasswordCheck(watchPassword === watchPasswordConfirmation);
  }, [watchPassword, watchPasswordConfirmation]);

  const onSubmit = async (data: FormInputs) => {
    try {
      const newUser = await userService.createUser({
        email: data.email,
        username: data.username,
        password: data.password,
      });

      console.log('User created:', newUser);
      setIsDialogOpen(true);
    } catch (error: any) {
      console.error(
        'Registration failed:',
        error.response?.data || error.message
      );
      alert('Registration failed. Please try again.');
    }
  };

  function showConsoleLogs() {
    console.log('Form values:', control._formValues);
    console.log('Form errors:', errors);
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl mb-4 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            className="border rounded-md px-3 py-2"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Username field */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">
            Username
          </label>
          <input
            type="text"
            className="border rounded-md px-3 py-2"
            {...register('username')}
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>

        {/* Username field */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            className="border rounded-md px-3 py-2"
            {...register('password')}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Username field */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Repeat password
          </label>
          <input
            type="password"
            className="border rounded-md px-3 py-2"
            {...register('passwordConfirmation')}
          />
          {errors.passwordConfirmation && (
            <p className="text-red-500 text-sm">
              {errors.passwordConfirmation.message}
            </p>
          )}
        </div>

        {/* Submit button */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            className="cursor-pointer w-full border border-blue-500 text-blue-500 py-2 px-4 rounded-md hover:bg-blue-600 hover:text-white"
            onClick={showConsoleLogs}
          >
            Console form
          </button>
          <button
            disabled={!isValid || !isPasswordChecked}
            type="submit"
            className={`${
              isValid
                ? 'cursor-pointer bg-blue-500 hover:bg-blue-600'
                : 'bg-gray-500'
            } w-full  text-white py-2 px-4 rounded-md `}
            onClick={showConsoleLogs}
          >
            Submit form
          </button>

          <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
            <h2 className="text-xl font-semibold mb-2">
              User cerated successfully!
            </h2>
          </Dialog>
        </div>
      </form>
    </div>
  );
}
