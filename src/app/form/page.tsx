'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Dialog from '@/components/dialog/dialog';

type FormInputs = {
  field1: string;
  field2: string;
  field3: string;
  field4: string;
};

export default function Form() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const maxChar = 6;
  const minChar = 3;
  const requiredMessage = 'field is required';
  const schema = yup
    .object({
      field1: yup.string().required(requiredMessage),
      field2: yup
        .string()
        .required(requiredMessage)
        .min(minChar, `field must be at least ${minChar} characters`),
      field3: yup
        .string()
        .required(requiredMessage)
        .max(maxChar, `field must contain max ${maxChar} characters`),
      field4: yup.string().required(requiredMessage),
    })
    .required();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormInputs) => {
    console.log('Form submitted with data: ', data);
    setIsDialogOpen(true);
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
          <label htmlFor="field1" className="block text-gray-700">
            Field 1
          </label>
          <input className="border rounded-md" {...register('field1')} />
          {errors.field1 && (
            <p className="text-red-500 text-sm">{errors.field1.message}</p>
          )}
        </div>

        {/* Username field */}
        <div className="mb-4">
          <label htmlFor="field2" className="block text-gray-700">
            Field 2
          </label>
          <input className="border rounded-md" {...register('field2')} />
          {errors.field2 && (
            <p className="text-red-500 text-sm">{errors.field2.message}</p>
          )}
        </div>

        {/* Username field */}
        <div className="mb-4">
          <label htmlFor="field2" className="block text-gray-700">
            Field 3
          </label>
          <input className="border rounded-md" {...register('field3')} />
          {errors.field3 && (
            <p className="text-red-500 text-sm">{errors.field3.message}</p>
          )}
        </div>

        {/* Username field */}
        <div className="mb-4">
          <label htmlFor="field2" className="block text-gray-700">
            Field 4
          </label>
          <input
            type="number"
            min={0}
            className="border rounded-md"
            {...register('field4')}
          />
          {errors.field4 && (
            <p className="text-red-500 text-sm">{errors.field4.message}</p>
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
            disabled={!isValid}
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
            <h2 className="text-xl font-semibold mb-2">This is a dialog</h2>
            <p className="text-gray-700">Some dialog content goes here.</p>
            <span className="px-3 break-words">
              {JSON.stringify(control?._formValues)}
            </span>
          </Dialog>
        </div>
      </form>
    </div>
  );
}
