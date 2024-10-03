'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/UI/Button';
import Text from '@/UI/Text';
import Container from '@/UI/Container';
import Flex from '@/UI/Flex';
import BookingDetail from '@/components/BookingDetail';
import { ViewBooking } from '@/types/booking.types';
import { formatDate } from '@/utils/formatDate';


export default function BookingDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [booking, setBooking] = useState<ViewBooking | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/bookings/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setBooking(data);
        } else {
          const errorData = await response.json();
          setError(errorData.error || 'Failed to fetch booking details');
        }
      } catch (error) {
        setError(`An error while fetching the booking: ${error?.message || error}`);
      }
    };

    fetchBooking();
  }, [params.id]);

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-red-600">{error}</div>;
  }

  if (!booking) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <Container className="container mx-auto px-4 py-8">
      <Text className="text-3xl font-bold mb-6 text-start pl-8">Booking Details</Text>
      <Flex className="bg-white rounded px-8 pt-6 pb-8 mb-4 flex-col">
    <dl className="divide-y divide-gray-100">
        <BookingDetail label="Service" value={booking.service} />
        <BookingDetail label="Doctor Name" value={booking.doctor_name} />
        <BookingDetail label="Start Time" value={booking.start_time} />
        <BookingDetail label="End Time" value={booking.end_time} />
        <BookingDetail label="Date" value={formatDate(booking.date)} />
    </dl>
      </Flex>
      <Button onClick={() => router.push('/')} className='ml-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-center 
      text-sm font-semibold outline-none hover:bg-indigo-500transition-all duration-300 text-white'>
        Back to Home
      </Button>
    </Container>
  );
}