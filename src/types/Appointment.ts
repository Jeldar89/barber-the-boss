import type { IService } from "./Services";

export interface IAppointment {
    id:      number | string;
    date:    Date;
    time:    string;
    service: IService;
}


