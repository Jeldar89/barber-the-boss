import type { IAppointment } from "./Appointment";
import type { IBarber } from "./Barbers";

export interface IEvent {
  id?: string | number;
  title: string;
  start: Date|string;
  end: Date | string;
  appointment?: IAppointment;
  barber?: IBarber;
  user?:{
    id: number | string
  }
  allDay?: boolean;
  resource?: any;
}
