export const prerender = true;
import type { APIRoute } from "astro";
import { getFirestore } from "firebase-admin/firestore";
import { app } from "@/firebase/server";
import type { IBarber } from "@/types/Barbers";
//import data from "public/data.json";

const db = getFirestore(app);
const barbersCollection = db.collection("barbers");
const barbersSnapshot = await barbersCollection.get();
const barbersDB = barbersSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
        id: doc.id,
        ...data,
    };
}) as IBarber[];

export const GET: APIRoute = () => {
    const barberData = barbersDB;
    return new Response(JSON.stringify(barberData));
}