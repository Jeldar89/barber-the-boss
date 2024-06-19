import type { IAppointment } from "./Appointment";
import type { IBarber } from "./Barbers";
import type { IService } from "./Services";
import type { ITypeService } from "./TypeServices";

export interface IData {
    typeServices: ITypeService[];
    services:     IService[];
    appointment:  IAppointment[];
    barbers:      IBarber[];
}