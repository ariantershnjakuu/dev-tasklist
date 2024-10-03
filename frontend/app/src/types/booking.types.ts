export interface Booking {
    id: number;
    date: string;
    start_time: string;
  }

  export interface BookingData {
    id: number;
    service: string;
    doctor_name: string;
    start_time: string;
    end_time: string;
    date: string;
  }
  
  export interface ViewBooking {
    id: number;
    service: string;
    doctor_name: string;
    start_time: string;
    end_time: string;
    date: string;
  }

  export interface AddBookingFormData {
    service: string;
    doctor_name: string;
    start_time: string;
    end_time: string;
    date: string;
  }
  