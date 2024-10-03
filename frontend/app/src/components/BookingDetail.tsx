import { BookingDetailProps } from "@/types/booking-details.types";
import Flex from "@/UI/Flex";

const BookingDetail: React.FC<BookingDetailProps> = ({ label, value }) => (
  <Flex className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 flex-col">
     <dt className="text-sm font-medium leading-6 text-gray-900">{label}</dt>
     <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{value}</dd>
  </Flex>
);

export default BookingDetail;