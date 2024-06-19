import type { IService } from "@/types/Services";
import CardService from "./CardService";
import { useTypeServiceStore } from "@/store/TypeServiceStore";
import { useEffect, useState } from "react";
import { useSearchStore } from "@/store/SearchStore";

export default function GridCards({ services }: { services: IService[] }) {
  const [filteredServices, setFilteredServices] = useState<IService[]>([]);
  const serviceSelected = useTypeServiceStore((state: any) => state.id);
  const search = useSearchStore((state: any) => state.search);

  useEffect(() => {
    if (serviceSelected === 0) {
      setFilteredServices(services);
    }
    if (serviceSelected !== 0) {
      const filtered = services.filter((service) => service.typeService.id === serviceSelected);
      setFilteredServices(filtered);
    }
    if (search) {
      const filtered = services.filter((service) => service.name.toLowerCase().includes(search.toLowerCase()) || service.description.toLowerCase().includes(search.toLowerCase()));
      setFilteredServices(filtered);
    }
  }, [serviceSelected, search, services]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3  gap-2">
      {filteredServices.map((service: IService) => (
        <CardService key={service.id} service={service} />
      ))}
    </div>
  );
}
