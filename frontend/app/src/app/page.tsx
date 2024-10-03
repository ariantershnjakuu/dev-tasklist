import Link from 'next/link';

interface Booking {
  id: number;
  service: string;
  doctor_name: string;
  start_time: string;
  end_time: string;
  date: string;
}

async function getBookings(): Promise<Booking[]> {
  const res = await fetch('http://backend:5000/api/bookings', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch bookings');
  }
  return res.json();
}

export default async function Home() {
  const bookings = await getBookings();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Bookings</h1>
      <ul className="space-y-4">
        {bookings.map((booking) => (
          <li key={booking.id} className="bg-white shadow rounded-lg p-4">
            <Link href={`/booking/${booking.id}`} className="text-blue-600 hover:underline">
              A Booking on {booking.date} starting at {booking.start_time}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
