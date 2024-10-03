import BookingListItem from '@/components/BookingListItem';
import Container from '@/UI/Container';
import Flex from '@/UI/Flex';
import Text from '@/UI/Text';
import { Booking } from '@/types/booking.types';

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
    <Flex className="mx-auto px-4 py-8 flex-col">
      <Text className="text-3xl font-bold mb-6 text-center">Bookings</Text>
      <Container className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {bookings.map((booking) => (
          <BookingListItem key={booking.id} {...booking} />
        ))}
      </Container>
    </Flex>
  );
}
