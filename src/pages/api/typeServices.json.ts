import type { APIRoute } from "astro";
import { getFirestore } from "firebase-admin/firestore";
import { app } from "@/firebase/server";
import type { ITypeService } from "@/types/TypeServices";
//import data from "public/data.json";

const db = getFirestore(app);
const servicesCollection = db.collection("type_service");
const servicesSnapshot = await servicesCollection.get();
const servicesDB = servicesSnapshot.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
})) as ITypeService[];
export const GET: APIRoute = () => {
    const typeServices = servicesDB;
    return new Response(JSON.stringify(typeServices));
}