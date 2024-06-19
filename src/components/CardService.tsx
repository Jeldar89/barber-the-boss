import type { IService } from "@/types/Services";

export default function CardService({ service }: { service: IService }) {
  return (
    <>
      <article className="p-4 md:py-4 md:px-4 flex flex-col justify-center border border-black">
        <header>
          <h2 className="text-lg md:text-xl lg:text-xl font-bold">
            {service.name} - {service.price}
          </h2>
        </header>
        <div className="">
          <p className="text-sm md:text-base">{service.description}</p>
        </div>
        <footer className="flex justify-between items-center mt-10 w-full">
          <span className="text-sm ">{service.duration} h</span>
          <a
            href={`./services/${service.id}/barber`}
            className="bg-gray-950 hover:bg-gray-800 text-white px-12 py-2 text-sm"
          >
            <span>Agregar +</span>
          </a>
        </footer>
      </article>
    </>
  );
}
