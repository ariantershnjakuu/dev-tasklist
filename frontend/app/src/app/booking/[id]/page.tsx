'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Booking {
  id: number;
  service: string;
  doctor_name: string;
  start_time: string;
  end_time: string;
  date: string;
}

export default function BookingDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [booking, setBooking] = useState<Booking | null>(null);
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Booking Details</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <strong className="block text-gray-700 text-sm font-bold mb-2">Service:</strong>
          <p className="text-gray-700">{booking.service}</p>
        </div>
        <div className="mb-4">
          <strong className="block text-gray-700 text-sm font-bold mb-2">Doctor Name:</strong>
          <p className="text-gray-700">{booking.doctor_name}</p>
        </div>
        <div className="mb-4">
          <strong className="block text-gray-700 text-sm font-bold mb-2">Start Time:</strong>
          <p className="text-gray-700">{booking.start_time}</p>
        </div>
        <div className="mb-4">
          <strong className="block text-gray-700 text-sm font-bold mb-2">End Time:</strong>
          <p className="text-gray-700">{booking.end_time}</p>
        </div>
        <div className="mb-4">
          <strong className="block text-gray-700 text-sm font-bold mb-2">Date:</strong>
          <p className="text-gray-700">{booking.date}</p>
        </div>
      </div>
      <button
        onClick={() => router.push('/')}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Back to Home
      </button>
    </div>
  );
}