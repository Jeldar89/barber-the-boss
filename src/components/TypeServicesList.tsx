import type { ITypeService } from "@/types/TypeServices";
import FilterButton from "./FilterButton";
import { useEffect, useState } from "react";
import { useTypeServiceStore } from "@/store/TypeServiceStore";



export default function TypeServicesList({
  typeServices,
}: {
  typeServices: ITypeService[];
}) {
  const [services, setServices] = useState(typeServices);
  const selected = useTypeServiceStore((state: any) => state.id);

  const onClick = (id: number) => {
    useTypeServiceStore.setState({ id });
  };

  useEffect(() => {
    setServices(typeServices);
  }, [typeServices]);

  return (
    <div className="flex flex-col items-center">
      {services.map((type: ITypeService) => (
        <FilterButton
          key={type.id}
          id={type.id}
          name={type.name}
          select={onClick}
          isSelected={selected === type.id}
        />
      ))}
    </div>
  );
}
