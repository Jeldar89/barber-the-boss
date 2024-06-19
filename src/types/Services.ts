import type { ITypeService } from "./TypeServices";

export interface IService {
    id:          number | string;
    name:        string;
    description: string;
    price:       number;
    duration:    number;
    typeService: ITypeService;
}
