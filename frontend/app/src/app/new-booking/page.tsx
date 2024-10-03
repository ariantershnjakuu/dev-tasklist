'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import InputField from '@/components/InputField';
import Button from '@/UI/Button';
import Container from '@/UI/Container';
import Flex from '@/UI/Flex';
import Text from '@/UI/Text';
import { AddBookingFormData } from '@/types/booking.types';

export default function NewBookingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<AddBookingFormData>({
    service: '',
    doctor_name: '',
    start_time: '',
    end_time: '',
    date: '',
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors([]);

    try {
      const response = await fetch(`http://localhost:5001/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/booking/${data.id}`);
      } else {
        const errorData = await response.json();
        setErrors(errorData.error ? [errorData.error] : ['An error occurred while creating the booking']);
      }
    } catch (error) {
      setErrors(['An error occurred while submitting the form']);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Container className="isolate bg-white px-6 pb-24 pt-16 lg:px-8 flex flex-col">
      <Flex className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold mb-6">Create New Booking</h1>
      </Flex>
      <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-lg min-w-[500px]">
        <InputField label="Service" type="text" name="service" value={formData.service} onChange={handleInputChange} required />
        <InputField label="Doctor Name" type="text" name="doctor_name" value={formData.doctor_name} onChange={handleInputChange} required />
        <Flex className="flex gap-5">
        <InputField label="Start Time" type="time" name="start_time" value={formData.start_time} onChange={handleInputChange} required />
        <InputField label="End Time" type="time" name="end_time" value={formData.end_time} onChange={handleInputChange} required />
        </Flex>
        <InputField label="Date" type="date" name="date" value={formData.date} onChange={handleInputChange} required />
        <Button type="submit" className='text-white rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold 
        outline-none hover:bg-indigo-500transition-all duration-300 w-full'>
          Create Booking
        </Button>
      </form>
      {errors.length > 0 && (
        <Flex className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <Text>{errors}</Text>
        </Flex>
      )}
    </Container>
  );
}