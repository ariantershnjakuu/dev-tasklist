import { Booking } from '@/types/booking.types';
import { formatDate } from '@/utils/formatDate';
import Link from 'next/link';

const BookingListItem: React.FC<Booking> = ({ id, date, start_time }) => {
  return (
      <Link href={`/booking/${id}`} className="text-slate-700 border border-slate-200 rounded-md p-4 hover:shadow-md transition-all duration-300">
        A Booking on {formatDate(date)} starting at {start_time}
      </Link>
  );
};

export default BookingListItem;