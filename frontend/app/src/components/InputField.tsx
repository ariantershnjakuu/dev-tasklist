import { InputFieldProps } from '@/types/input.types';
import Flex from '@/UI/Flex';
import React from 'react';


const InputField: React.FC<InputFieldProps> = ({ label, type, name, value, onChange, required }) => {
  return (
    <Flex className="flex flex-col mb-4 w-full">
      <label htmlFor={name} className="block mb-2">{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset
         ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
      />
    </Flex>
  );
};

export default InputField;