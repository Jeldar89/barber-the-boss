import type { IService } from "@/types/Services";
import type { APIRoute } from "astro";
import { getFirestore } from "firebase-admin/firestore";
import { app } from "@/firebase/server";
//import data from "public/data.json";

const db = getFirestore(app);
const servicesCollection = db.collection("services");
const servicesSnapshot = await servicesCollection.get();
const servicesDB = servicesSnapshot.docs.map((doc) => {
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
  };
}) as IService[];

//console.log(servicesDB);


export const GET: APIRoute = ({ params }) => {
  const id = params.id;
  const services = servicesDB;

  //si el id es diferente a un numero entero, se retorna un error
  // if (id && isNaN(parseInt(id))) {
  //   return new Response("Invalid id", { status: 400 });
  // }

  if (id) {
    const filteredServices = services.filter(
      (service) => service.id === parseInt(id)
    );
    return new Response(JSON.stringify(filteredServices), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(services), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
